# Prompt #7 — Job scheduler / delayed-task system · REFERINȚĂ

> **Nu citi asta înainte de a reface promptul oarbă.** Sesiunea originală a fost comprimată la
> 25 min (din 90 obișnuit) — un slot neplanificat, asignat pe loc. Refă-l singur la **+7 (10.09)**,
> de data asta cei 90 min întregi, cadrul de 7 pași, apoi compară cu fișierul ăsta.

Promptul: *„Design a system that lets clients schedule a task to run at a specific time in the
future, or after a delay."*

---

## 1. Cerințe

### Funcționale
- **Schedule:** clientul programează un task cu un moment de execuție (`due_at`) și un payload.
- **Read:** clientul citește statusul/rezultatul unui task după `id`.
- **Cancel:** clientul poate anula un task cât timp încă e `pending`.
- **Execuție:** sistemul declanșează task-ul o singură dată, la sau după `due_at`.

### Non-funcționale
| Dimensiune | Alegere | Ce forțează în design |
|---|---|---|
| Throughput | 20M task-uri/zi → ~230/sec avg, ~700/sec peak | Volum trivial pentru Postgres — nu asta e partea grea. |
| Procesare | p99 < 500ms **per task executat** (nu dispatch latency — sunt două SLA-uri diferite, ține-le separate) | Timeout pe execuția payload-ului, nu pe cât de repede îl iei din coadă. |
| Durabilitate | un task programat nu se pierde niciodată, nici la crash de proces | Persistență în DB înainte de a confirma create-ul către client. |
| Delivery | **at-least-once**, niciodată exact-o-dată garantat la nivel de infra | Executorul trebuie să fie safe la re-execuție → idempotency, nu doar retry. |
| Consistență | staleness de câteva secunde la citirea statusului e ok; claim-ul unui task due trebuie să fie **strict exclusiv** | Citirile pot merge pe replică; claim-ul trebuie să fie atomic pe primary. |

### Scope decis explicit
Fără task-uri recurente/cron (doar one-off) · fără politică de retry configurabilă per client
(fix, N încercări) · fără priorități între task-uri. Un senior clarifică scope-ul, nu presupune.

---

## 2. Cifre — back-of-envelope

Presupunere: **20M task-uri/zi**, payload ~5KB, retenție **3 zile** pentru task-uri completate
(după aceea arhivate/șterse — asumția lipsea în sesiunea live, aici e explicită).

- **Rate:** 20e6 ÷ 86.400 ≈ **230/sec avg** · peak 3× ≈ **~700/sec**
- **Storage brut:** 20e6 × 5KB = **100GB/zi**
- **Storage total (3 zile retenție):** ~**300GB** hot în Postgres

> **Verdict:** 700 scrieri/sec și 300GB sunt modeste pentru un singur Postgres primary + o read
> replica — nu asta e problema grea. Partea interesantă e **cum găsești, la orice secundă, care
> din milioanele de task-uri sunt scadente acum, fără să scanezi tot tabelul, și cum previi ca doi
> workeri să execute același task de două ori.**

---

## 3. Suprafața de API

```
POST /tasks
  body:  { "due_at": "2026-09-10T14:30:00Z", "payload": {...} }
  201:   { "id": "...", "status": "pending", "due_at": "..." }
  400:   due_at în trecut sau payload invalid
  header opțional: Idempotency-Key: <uuid generat de client>   (vezi pasul 6)

GET /tasks/{id}
  200:   { "id", "status": "pending"|"running"|"succeeded"|"failed"|"cancelled",
           "due_at", "result"?, "error"? }
  404:   id inexistent

DELETE /tasks/{id}
  204:   anulat (doar dacă status == "pending")
  409:   nu mai poate fi anulat (deja running/succeeded/failed)
```

**`due_at` e timestamp absolut, nu delay relativ.** Elimină ambiguitatea de ceas
client/server — dacă clientul vrea „peste 5 minute", calculează el `now() + 5m` local, cu
ceasul lui. Serverul nu interpretează niciodată un „delay" ambiguu.

**Un task nefinalizat răspunde `200` cu `status: "pending"`, nu un cod de eroare.** Clientul a
cerut ceva valid, pur și simplu rezultatul nu există încă — `400`/`404` ar însemna „cererea ta e
greșită", ceea ce nu e cazul.

---

## 4. Model de date

```sql
CREATE TABLE tasks (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  status          text        NOT NULL DEFAULT 'pending',
  due_at          timestamptz NOT NULL,
  payload         jsonb       NOT NULL,
  locked_until    timestamptz,                    -- lease-ul: NULL = neclaim-uit
  attempts        int         NOT NULL DEFAULT 0,
  result          jsonb,
  error           text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  idempotency_key varchar     UNIQUE
);

CREATE INDEX idx_tasks_due ON tasks (status, due_at);
```

- **Index compus `(status, due_at)`** — egalitate înainte de range, exact regula ESR din topicul 5
  (`mongo-explain-indexes`). Servește direct query-ul de claim, fără scan pe 20M+ rânduri.
- **`locked_until` e piesa care lipsea din răspunsul live.** Un boolean `processing` nu e
  suficient: dacă workerul cade cu flag-ul pe `true`, task-ul rămâne blocat la nesfârșit —
  contrazice direct cerința de recovery de la pasul 1. Un lease cu expirare rezolvă asta.
- **Claim query — atomic, exclusiv, reclaim inclus:**
  ```sql
  UPDATE tasks
  SET status = 'running', locked_until = now() + interval '30 seconds', attempts = attempts + 1
  WHERE id IN (
    SELECT id FROM tasks
    WHERE (status = 'pending' AND due_at <= now())
       OR (status = 'running' AND locked_until < now())   -- lease expirat, worker mort
    ORDER BY due_at
    LIMIT 100
    FOR UPDATE SKIP LOCKED
  )
  RETURNING id, payload;
  ```
  `FOR UPDATE SKIP LOCKED` e clauza care lipsea în răspunsul live: un `processing = true` +
  tranzacție simplă tot lasă o fereastră în care doi workeri văd același rând `false` înainte ca
  vreunul să apuce update-ul. `SKIP LOCKED` face ca al doilea worker să sară pur și simplu la
  următorul rând disponibil, fără să aștepte și fără coliziune posibilă.

---

## 5. Componente și flux

```
Client
  │
  ▼
API servers (stateless)  ── POST/GET/DELETE ──►  Postgres primary
  │                                                 (writes: schedule, cancel)
  └── GET /tasks/{id} ─► read replica

Worker pool (stateless, N instanțe)
  │  poll loop, ~1×/sec
  ▼
  Claim query (FOR UPDATE SKIP LOCKED) pe primary
  │
  ├─ succes ─► execută payload (ex: apel webhook, cu Idempotency-Key propagat)
  │              ├─ ok      ─► UPDATE status='succeeded', result=...
  │              └─ eroare  ─► attempts < max? UPDATE status='pending' (retry)
  │                             attempts >= max? UPDATE status='failed' → dead-letter
  │
  └─ nimic due ─► sleep, poll din nou
```

**De ce polling, nu push:** la 700/sec peak, un index compus servește claim-ul instant — nu e
nevoie de LISTEN/NOTIFY sau de un broker dedicat. Costul e o latență de dispatch de până la
~1sec peste `due_at`, acceptabilă pentru că SLA-ul de 500ms e pe procesare, nu pe declanșare
(vezi pasul 1).

---

## 6. Moduri de eșec

| Eșec | Ce se întâmplă | Fix |
|---|---|---|
| **Doi workeri fac claim simultan** | Fără `SKIP LOCKED`: ambii pot vedea același rând `pending` înainte de update, execuție dublă. | `FOR UPDATE SKIP LOCKED` — al doilea worker sare automat la alt rând, exclusivitate garantată de DB. |
| **Worker cade după claim, înainte de a termina** | Task rămâne `running` cu `locked_until` expirat. Fără lease: blocat la nesfârșit. | Claim query reia și rândurile `running` cu `locked_until < now()` — reluat automat de următorul worker liber. |
| **Worker cade după ce a produs efectul (ex: a trimis webhook-ul), dar înainte de `UPDATE succeeded`** | La reclaim, task-ul e executat a doua oară — efect dublu. | Destinatarul payload-ului trebuie să fie idempotent: `Idempotency-Key` propagat în apel, exact pattern-ul din `01-idempotent-webhooks.reference.md` și povestea de Iterable/Newxel. |
| **DB primary jos** | Schedule/cancel/claim pică. Citirile de status merg din replică (lag 1-2s, acceptabil). | Auto-failover ~30-60s. Task-urile deja programate nu se pierd — erau deja commit-uite. Execuția lor doar întârzie, ceea ce se potrivește cu prioritatea „durabilitate > latență" de la pasul 1. |
| **Client retrimite POST /tasks după timeout de rețea** | Fără idempotență: al doilea request creează un al doilea task pentru aceeași intenție. | `Idempotency-Key` header + `UNIQUE(idempotency_key)` — al doilea INSERT lovește constrângerea, întorci task-ul deja creat. |
| **Payload eșuează repetat** | Fără plafon: retry infinit, consumă capacitate. | `attempts` crescut la fiecare încercare; peste `max_attempts` → `status='failed'`, task iese din bucla de claim, ajunge într-o coadă/vizualizare dead-letter pentru inspecție manuală. |
| **Worker pool subdimensionat** | Task-uri due se acumulează, latența de dispatch crește peste buget. | Autoscale pe adâncimea cozii (`COUNT(*) WHERE status='pending' AND due_at <= now()`). |

---

## 7. Trade-offs

| Decizie | Ales | Respins | De ce |
|---|---|---|---|
| Claim mechanism | Postgres, `FOR UPDATE SKIP LOCKED` | broker dedicat (Kafka delayed topic / SQS delay queue / Redis sorted set) | La 700/sec, Postgres e trivial și rămâne o singură sursă de adevăr pentru status queries. Brokerul dedicat se justifică la >10× scara asta sau la fan-out multi-consumer, nu aici. |
| Dispatch | polling la interval fix (~1sec) | push (LISTEN/NOTIFY) | Polling e mai simplu de operat și de raționat despre backpressure. Costul (latență dispatch ≤1s) e acceptabil față de SLA-ul de procesare de 500ms. |
| `due_at` | timestamp absolut | delay relativ (`in_seconds`) | Elimină ambiguitatea de ceas client/server; clientul calculează el offsetul, cu propriul ceas. |
| Recovery de lease | `locked_until` cu expirare | boolean `processing` simplu | Boolean-ul nu are cum să expire — un worker căzut blochează task-ul definitiv. Lease-ul se auto-eliberează. |
| Idempotency | `Idempotency-Key` la create + propagat la payload execution | fără protecție, doar retry simplu | Fără ea, orice retry de rețea (la create sau la execuție) produce duplicate — inacceptabil dat fiind cerința de durabilitate/corectitudine de la pasul 1. |

---

## Checklist de comparație — notează-ți Runda blind

- [ ] Cele 5 NFR-uri numite explicit, **și** separi latența de dispatch de latența de procesare?
- [ ] Back-of-envelope cu **retenție explicită** înainte de a da un storage total?
- [ ] `due_at`/`when` ca timestamp absolut, fără ambiguitate de ceas?
- [ ] `GET` pe task nefinalizat → `200` + câmp `status`, nu un cod de eroare?
- [ ] Index compus `(status, due_at)` — regula ESR?
- [ ] Claim query cu `FOR UPDATE SKIP LOCKED`, nu doar un `UPDATE` simplu?
- [ ] Lease (`locked_until`) cu expirare, nu un boolean fără timeout?
- [ ] `Idempotency-Key` atât la creare cât și propagat la execuția payload-ului?
- [ ] `max_attempts` + dead-letter pentru task-uri care eșuează repetat?
- [ ] Cel puțin un trade-off cu propoziția „**X, nu Y, pentru că Z**"?

---

## Legături

- Sesiunea: ghidată, comprimată la 25 min (din 90 obișnuit), 2026-09-03. Vezi `journal.md`.
- Index-ul reia ESR-ul din topicul 5 depth (`study/node/mongo-explain-indexes/`).
- Idempotency-ul la execuție dublă reia povestea Iterable/Newxel din `interview-narrative.md` și
  pattern-ul din `01-idempotent-webhooks.reference.md`.
- Cadrul de 7 pași: `../../docs/training-plan.md`, Block 2.
- Refă oarbă la **+7 (2026-09-10)**.
