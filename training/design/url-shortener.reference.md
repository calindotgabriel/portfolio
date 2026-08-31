# Warm-up — URL shortener · REFERINȚĂ

> **Nu citi asta înainte de a reface promptul oarbă.** A fost prima sesiune de system design,
> ghidată pas cu pas. Refă-l singur la **+7 (04.09)**, 40 min la tablă, cadrul de 7 pași, apoi
> compară cu fișierul ăsta și scrie 3 goluri.
>
> Nu e unul din cele 10 prompturi din `curriculum.md` — e un warm-up ca să înveți cadrul fără
> presiunea unei probleme grele. Promptul #1 real (webhook-uri idempotente) rămâne pentru Runda 1.

Promptul: *„Construiești un URL shortener ca bit.ly. Un user dă un URL lung, primește unul scurt
(`sho.rt/aX9k2b7`). Când cineva accesează linkul scurt, e redirectat la URL-ul original."*

---

## 1. Cerințe

### Funcționale
- **Create:** dat un URL lung, generezi un cod unic de 7 caractere și stochezi maparea.
- **Redirect:** dat un cod, cauți URL-ul lung și redirectezi (302 — vezi pasul 3).
- **Expiry:** fiecare mapare are un TTL configurabil. Default: 1 an.
- **Acces expirat sau cod inexistent:** redirect la homepage (`/`), nu 404.

### Non-funcționale
| Dimensiune | Alegere | Ce forțează în design |
|---|---|---|
| Latență | redirect p99 < 50ms · create p99 < 300ms | Redirectul e în calea critică a unui click uman. Create-ul nu-l vede nimeni. |
| Read:write | ~10:1 (real e adesea 100:1+) | Optimizezi din greu calea de citire. |
| Disponibilitate | redirecturile nu pică; create-urile pot pica | Calea de citire trebuie să fie trivial de simplă și replicată. Scrierea poate avea mai multe piese. |
| Consistență | lag global de 1–2s e ok | Ai voie să cache-uiești și să folosești replicare asincronă. Fără tranzacții distribuite. |
| Durabilitate | nu pierzi niciodată o mapare; create eșuat → eroare la client | Create-ul se commit-uie durabil **înainte** de a returna codul. Fără fire-and-forget. |

### Scope decis explicit
Fără dedupe de URL-uri identice · fără alias custom · fără analytics de click. Un senior
clarifică scope-ul, nu presupune.

---

## 2. Cifre — back-of-envelope

Presupunere: **10 milioane de create-uri/zi**, retenție 1 an, read:write 10:1. O zi ≈ `10⁵` sec.

- **Writes:** 10⁷ ÷ 10⁵ = **100/sec** avg · peak 3× = **~300/sec**
- **Reads:** 10× writes = **1000/sec** avg · peak = **~3000/sec**
- **Rânduri:** 10M × 365 ≈ **3,7 miliarde/an**
- **Storage:** 3,7e9 × ~500 B ≈ **~2 TB/an** (poate 3 TB cu indexuri)
- **Spațiul de coduri:** base62 (`[a-zA-Z0-9]`). 62⁶ ≈ 56 mld, 62⁷ ≈ 3,5 tril. Am nevoie de 3,7
  mld/an ⇒ **6 caractere țin ~15 ani**; folosesc **7** pentru headroom.

> **Verdict:** 3000 reads/sec e modest. Un DB indexat + un cache rezolvă asta. Scala nu e partea
> grea — deciziile interesante sunt **cum generezi codurile** și **cum ții calea de redirect mereu
> sus**. Ai făcut matematica ca să dovedești unde e problema reală.

---

## 3. Suprafața de API

```
POST /shorten
  body:  { "long_url": "https://example.com/very/long/path" }
  201:   { "code": "aX9k2b7",
           "short_url": "https://sho.rt/aX9k2b7",
           "expires_at": "2027-08-28T00:00:00Z" }
  400:   URL invalid sau lipsă
  header opțional: Idempotency-Key: <uuid generat de client>   (vezi pasul 6)

GET /:code
  302:   Location: <long_url>
  302:   Location: /          (cod expirat SAU inexistent — decizie: ambele la homepage)
```

**301 vs 302 — alegi 302.** 301 Permanent e cache-uit de browsere, CDN-uri și proxy-uri, adesea la nesfârșit — clientul nu mai ajunge niciodată la serverul tău. Pierzi: expiry, dezactivare,repointare, click count. 302 aduce fiecare click înapoi la tine ⇒ păstrezi controlul, exact ce cere cerința de expiry. Escape hatch dacă load-ul de citire devine problemă: `302 + Cache-Control:
max-age=60`.

---

## 4. Model de date

```sql
CREATE TABLE short_links (
  code        varchar(7)  PRIMARY KEY,      -- slug-ul; unic prin definiție
  long_url    text        NOT NULL,         -- URL-urile sunt lungi; TEXT nu VARCHAR
  created_at  timestamptz NOT NULL DEFAULT now(),
  expires_at  timestamptz                   -- NULL = nu expiră niciodată
);
```

- **`code` e cheia primară**, nu un surrogate `id`. E deja unic, imutabil, și e singura cheie de
  lookup (100% din redirecturi). Code-as-PK = un singur index în loc de două. Un `id` ar merita
  doar dacă generai codul din el (strategia de contor — respinsă la pasul 7).
- **Unicitatea e o constrângere DB, nu o speranță.** `PRIMARY KEY` o garantează. Dacă generarea
  produce o coliziune, `INSERT`-ul eșuează și reîncerci cu alt cod (pasul 6).
- **Idempotență la create** (opțional): coloană `idempotency_key varchar UNIQUE`, sau tabel  separat `idempotency_keys(key PRIMARY KEY, code, created_at)`.
- **Enforcement expiry:** la fiecare redirect `SELECT ... WHERE code = $1`, apoi în app verifici   `expires_at IS NULL OR expires_at > now()`. Expirat sau lipsă → 302 `/`.
- **Cleanup:** job nightly `DELETE WHERE expires_at < now()` ca să recuperezi spațiu. Cleanup, nu
  corectitudine.

---

## 5. Componente și flux

```
Client
  │
  ▼
Load balancer
  │
  ▼
API servers (stateless, multe)
  ├── POST /shorten ─► generează cod (nanoid, size 7, alfabet base62)
  │                     └─► INSERT short_links ─► 201
  │                          └─ on duplicate-key: regenerează, retry ≤5
  │                             └─ 5 eșecuri: 500 + alertă (RNG stricat / tabel prea plin → 8 car.)
  │
  └── GET /:code ─► verifică Redis ─hit─► 302
                        │
                       miss
                        ▼
                     SELECT short_links WHERE code=$1   (read replica)
                        ├─ găsit & neexpirat ─► populează Redis ─► 302 la long_url
                        └─ lipsă sau expirat ──► 302 la /

DB:    short_links, primary + 1–2 read replici
Redis: key = code, value = {long_url, expires_at}, TTL cache = min(1h, timp până la expirare)
Cron:  nightly DELETE WHERE expires_at < now()
```

**De ce cache-ul** (legat de pasul 1): redirecturile-nu-pică + 10:1 reads + staleness de 1–2s
acceptabilă ⇒ Redis în fața căii de citire e justificat. Un redirect devine de obicei un singur
lookup in-memory, mult sub bugetul de 50ms.

### Strategia de generare a codului

| Opțiune | Verdict | De ce |
|---|---|---|
| **Random 7-char base62 + retry pe coliziune** | **ALES** | Unguessable, stateless (fără contor central). Fill ratio 3,7e9 / 3,5e12 ≈ **0,1%** ⇒ ~1 insert din 1000 are nevoie de un retry, 2 retries e 1 la un milion. 5 retries = asigurare gratis. |
| Counter + base62 encode | respins | Zero coliziuni, dar codurile sunt secvențiale și enumerabile (`aaaa1 → aaaa2` — oricine scrapează toate linkurile) și ai nevoie de un contor global = punct de contenție. |
| Hash(long_url) trunchiat | respins | Determinist ⇒ forțează dedupe (nedorit). Hash-urile trunchiate coliziune mai des decât random uniform. |

---

## 6. Moduri de eșec

| Eșec | Ce se întâmplă | Fix |
|---|---|---|
| **DB primary jos** | Create-urile pică. Redirecturile merg din replici + cache (lag 1–2s, acceptabil). | Auto-failover promovează o replică în ~30–60s; în fereastra aia create → 503. Se potrivește exact cu prioritatea din pasul 1. „Redis-only" e fallback slab — cache rece ⇒ majoritatea redirecturilor 302 la homepage. |
| **Redis jos** | Redirecturile cad direct pe o replică — mai lent, tot sub 50ms de obicei. Create neafectat. | Redis e **strat de performanță, nu dependență de corectitudine.** |
| **Create reușit în DB, clientul n-a primit răspunsul, retrimite** | Fără idempotență: al doilea request generează alt cod aleator ⇒ user-ul are 2 linkuri pentru un create. | `Idempotency-Key` header (UUID de la client) + `UNIQUE(idempotency_key)`. Al doilea INSERT lovește constrângerea → cauți și întorci **același** cod. Același pattern ca `01-idempotent-webhooks.reference.md`. |
| **Firehose pe un singur cod (hot key)** | Redis absoarbe. Dar când cheia expiră/e evacuată, mii de miss-uri simultane lovesc DB cu aceeași query (stampede). | Rândul e imutabil ⇒ cache agresiv. Single-flight: primul miss ia un lock și reîmprospătează, ceilalți așteaptă. Serve-stale în timpul refresh-ului. |
| **Expiry neaplicat în cache** | Cache-uiești `{long_url, expires_at}` 1h. Linkul expiră în timpul orei ⇒ cache-ul tot îl servește. | Verifici `expires_at` în app **și** la cache hit, sau TTL cache = `min(1h, timp până la expirare)`. |
| **Long URL malițios** | Serverul redirectează spre malware/phishing. | Validezi formatul la create; verifici o blocklist / Safe Browsing API. |
| **Redirect loop** (`sho.rt/x → sho.rt/y → sho.rt/x`) | Buclă de redirecturi. | Respingi domeniile self-referential la create. |
| **Toate cele 5 retries de generare eșuează** | Create pică. | 500 + alertă. Înseamnă RNG stricat sau tabel mult mai plin decât modelat → treci la 8 caractere. |

---

## 7. Trade-offs

| Decizie | Ales | Respins | De ce |
|---|---|---|---|
| Generare cod | random 7-char base62 + retry | counter + encode | Secvențial/enumerabil; contor global = contenție. |
| " | " | hash(url) trunchiat | Forțează dedupe (nedorit); coliziune mai mare. |
| Redirect status | 302 | 301 Permanent | 301 e cache-uit permanent de clienți/CDN ⇒ pierzi expiry, dezactivare, repointare, click count. |
| Cheie primară | `code` ca PK | surrogate `bigserial id` + unique index pe `code` | `code` e deja unic, imutabil, singura cheie de lookup; `id` ar fi al doilea index degeaba. |
| Dedupe URL-uri identice | **fără dedupe** | dedupe pe hash de `long_url` | Dedupe rupe analytics per-link, creează conflict de TTL între owneri, și e un leak de privacy. Storage-ul e ieftin (~2 TB/an). Economie falsă. |
| Cache | Redis în fața căii de citire | direct pe replici, fără cache | 10:1 reads + p99 < 50ms + staleness 1–2s ok ⇒ cache justificat; redirectul devine un lookup in-memory. |

---

## Checklist de comparație — notează-ți Runda blind

- [ ] Ai numit cele **5 cerințe non-funcționale** ÎNAINTE să treci mai departe (latență / read:write / disponibilitate / consistență / durabilitate)?
- [ ] Ai făcut back-of-envelope cu **verdict** la final („modest — un DB + cache")?
- [ ] Codul: random + unique constraint + retry pe **DUPLICATE KEY** (nu `SELECT`-then-`INSERT`)?
- [ ] Ai **cuantificat** rata de coliziune (~0,1%) ca să justifici că retry-ul aproape nu se declanșează?
- [ ] **302** cu justificarea legată direct de expiry?
- [ ] **`code` ca PK**, nu surrogate `id`?
- [ ] Expiry verificat **și la cache hit**?
- [ ] **`Idempotency-Key`** pentru create-uri re-trimise?
- [ ] **Cache stampede** pe hot key?
- [ ] Redis = performanță, **nu** corectitudine (fallback pe replică)?
- [ ] 3 trade-offs cu propoziția „**X, nu Y, pentru că Z**"?

---

## Legături

- Sesiunea: ghidată, prima de system design, 2026-08-28. Vezi `journal.md`.
- Următorul, oarbă: promptul #1 real din `curriculum.md` — webhook idempotent, referință în `01-idempotent-webhooks.reference.md` (+ versiunea EN).
- Cadrul de 7 pași: `../../docs/training-plan.md`, Block 2.
