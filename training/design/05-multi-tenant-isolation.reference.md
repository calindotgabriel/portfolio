# 05 — Izolare multi-tenant · REFERINȚĂ

> Sesiunea din **2026-08-31** a fost ghidată și s-a oprit la pasul 3 (prea multe concepte noi
> deodată). Refă-l **oarbă la +7 (07.09)**, 40 min la tablă, cadrul de 7 pași, apoi compară cu
> fișierul ăsta și scrie 3 goluri. Înainte de asta citește whitepaper-ul AWS „SaaS Tenant
> Isolation Strategies" — sesiunea a arătat că topicul cere vocabularul citit înainte.

Promptul: *„SaaS B2B, tool de project management gen Linear/Asana. Fiecare client e o companie
(tenant) cu userii, proiectele și task-urile ei. Proiectează stocarea astfel încât tenant A să nu
poată vedea niciodată datele lui B."*

---

## 1. Cerințe

### Funcționale
- **Auth:** userul se loghează → sistemul rezolvă tenant-ul → afișează proiectele acelui tenant.
- **Proiecte → task-uri:** listezi task-urile unui proiect; filtrezi (ale mele / ale altora); CRUD pe task.
- **Oameni:** userul vede ceilalți useri din compania lui.
- **Ciclu de viață tenant** (control plane): provisionare, export complet (GDPR), ștergere completă (GDPR).

### Non-funcționale (răspunsurile din sesiune)
| Răspuns | Ce forțează |
|---|---|
| **~100 tenants**, +5/lună | DB-per-tenant e fezabil operațional. La 100k n-ar fi. |
| **Skew extrem** — whale 100k useri / 10M task-uri, minnow ~15 useri | Plasare pe mărime; whale-ul poate avea instanță proprie + replici. |
| **EU data residency** | Fiecare DB de tenant fixat într-o regiune UE. |
| **Chei de criptare per-tenant** | Forțează separare fizică (keyspace propriu / TDE per DB). |
| **Export + ștergere GDPR** | `DROP DATABASE` e primitiva curată; export = job async per DB. |
| **Onboarding în minute/ore** | Pipeline de provisionare automat, async e ok. |
| **Read-heavy 100:1–1000:1** | Read replici doar pentru DB-urile mari; cache cu chei prefixate pe tenant. |
| **Blast radius** | Un tenant căzut nu-i afectează pe ceilalți — plusul major al modelului. |

**Concluzia:** toate cerințele de compliance împing spre **database-per-tenant**. Nu e alegerea
ieftină, dar e singura care dă chei per-tenant + region pinning + `DROP DATABASE` pentru GDPR.

---

## 2. Cifre

- 100 tenants acum, ~5/lună ⇒ ~160 într-un an.
- **Whale:** 100k useri, 100 proiecte, 10M task-uri (~câțiva GB — încă modest). **Minnow:** ~15 useri, câteva proiecte, sute de task-uri.
- **Total rânduri:** dominat de whale, zeci de milioane. În absolut, mic — niciun DB nu e mare în afară de al whale-ului.
- **Read/write:** 100:1–1000:1.

### Capcana de conexiuni (gotcha-ul DB-per-tenant)
Pool per tenant × 100 tenants × 10 conexiuni = **1000 de conexiuni** deschise. Postgres ~10MB/conexiune
și se degradează peste câteva sute **per instanță**. Împachetezi 20 de tenants pe o instanță ⇒ 200
conexiuni înainte de orice load. La 500 de tenants se prăbușește.

Fix-uri: **lazy pools** (deschizi pool doar pentru tenants activi), pool-uri mici (2–3) pentru minnows,
**PgBouncer** în transaction mode, plasare pe mărime.

> **Verdict:** volumul de date e modest. Părțile grele sunt (a) managementul conexiunilor peste multe
> DB-uri, (b) pipeline-ul de provisionare, (c) rularea migrărilor peste 100+ DB-uri în siguranță.

---

## 3. Suprafața de API + rezolvarea tenant-ului

### API pentru tenant (toate cer JWT, mai puțin login)
```
POST  /login                              → { jwt }        (lovește identity store-ul partajat)
GET   /projects                           → lista de proiecte
GET   /projects/{projectId}/tasks         → task-uri, ?assignee=me|others
POST  /projects/{projectId}/tasks         → create
PATCH /tasks/{taskId}  ·  DELETE /tasks/{taskId}
GET   /users                              → userii din tenant
```

### API de control plane (auth intern/ops, NU JWT de tenant)
```
POST   /admin/tenants                     → provisionare
POST   /admin/tenants/{id}/export         → export GDPR (job async)
DELETE /admin/tenants/{id}                → ștergere GDPR (DROP DATABASE + purge)
```

### Fluxul de rezolvare a tenant-ului
1. **Login** → tabelul global de identități (email unic global, sau `tenant-slug + email`), verifici parola → emiți **JWT semnat cu `userId` + `tenantId` în claims**, TTL scurt (15–60 min).
2. **Request ulterior** → verifici semnătura JWT → extragi `tenantId`. Fără hit în DB.
3. **Lookup în catalog:** `tenantId → { db_host, db_name, region, kms_key_id, status }` din control-plane DB, cache agresiv (LRU in-process + Redis).
4. **Rutare conexiune:** iei (sau creezi lazy) pool-ul pentru DB-ul tenant-ului (primary pentru scrieri, replică pentru citiri la cei mari); încarci data key prin `kms_key_id` din KMS.
5. Rulezi query-ul. La finalul request-ului **cureți contextul de tenant**.

**Reguli:** `tenantId` vine din claim-ul JWT semnat, **niciodată** dintr-un param/body. Catalogul e
un **tabel**, nu un fișier de config (provisionare la runtime, fără deploy).

---

## 4. Model de date

### DB per tenant (câte unul, schemă identică)
```sql
-- fără coloană tenant_id nicăieri: întreaga bază de date ESTE granița de tenant
users(id uuid pk, email citext, name text, role text, created_at timestamptz)
projects(id uuid pk, name text, created_at timestamptz)
tasks(id uuid pk, project_id uuid references projects(id),
      assignee_id uuid references users(id) null,
      title text, status text, created_at timestamptz,
      index (project_id), index (assignee_id))
```
**De ce fără `tenant_id`:** separarea e fizică. Ăsta e tot rostul modelului — nu poți interoga
accidental cross-tenant, conexiunea ajunge doar la DB-ul unui singur tenant.

### Control-plane DB (una singură, globală)
```sql
tenants(
  id uuid pk,
  slug text unique,
  status text,              -- provisioning | active | suspended | deleting
  db_host text, db_name text,
  region text,              -- 'eu-central-1'
  kms_key_id text,          -- handle-ul cheii de criptare per-tenant
  created_at timestamptz
)

identities(                 -- login global
  id uuid pk,
  email citext unique,      -- unic global ca login-ul să găsească tenant-ul
  password_hash text,
  tenant_id uuid references tenants(id),
  created_at timestamptz
)

provisioning_jobs(id uuid pk, tenant_id uuid, state text, error text, updated_at timestamptz)
```

---

## 5. Componente și flux

```
Client ──JWT──► API ──► Tenant middleware ──► Catalog cache ──miss──► Control-plane DB
                        (verifică JWT,          (tenantId →             (tenants,
                         extrage tenantId)       db_host/name/           identities)
                              │                  region/key_id)
                              ▼
                        Connection router ──► pool pentru DB-ul tenant-ului
                        (lazy pools, PgBouncer,     │
                         plasare pe mărime)         ▼
                                            ┌────────────┐  ┌────────────┐
                                            │ tenant_A DB│  │ tenant_B DB│  ... (regiune UE)
                                            │ (KMS key A)│  │ (KMS key B)│
                                            └────────────┘  └────────────┘
                                            whale: instanță dedicată + read replica
                                            minnows: 20–50 împachetați pe o instanță partajată

Control plane (serviciu separat):
  Pipeline provisionare: create DB → migrări → seed → KMS key → rând în `tenants` → status=active
  Migration runner: iterează toate DB-urile de tenant, cursor per DB, resumable, canary întâi
  Workeri export/delete: GDPR
```

- **Plasare pe mărime:** minnows împachetați mulți-per-instanță cu pool-uri mici; whale-ul pe instanța lui (+ replică). Toate instanțele într-o regiune UE.
- **Pipeline de provisionare (async, minute):** job de control plane — create DB → migrare → seed → provisionare cheie KMS → scrii rândul în `tenants` → `status = active`. Signup întoarce „provisioning", tenant-ul devine utilizabil când e gata.
- **Migrări — durerea operațională reală:** un runner iterează fiecare DB, aplică migrările în așteptare, ține un cursor per DB, e resumable, rulează un tenant canary întâi, iar codul aplicației trebuie să tolereze **și** schema veche **și** cea nouă în timpul rollout-ului.

---

## 6. Moduri de eșec

| Eșec | Ce se întâmplă | Fix |
|---|---|---|
| **Catalog (control-plane DB) jos** | Fiecare request are nevoie de el → outage total. | Cache agresiv (in-proc + Redis, TTL lung); catalogul se schimbă doar la provisionare. Servești din cache în timpul outage-ului. Replică și control-plane DB. |
| **Explozie de conexiuni** | 100 tenants × pool ⇒ 1000+ conexiuni, instanțele thrash-uiesc. | Lazy pools (doar tenants activi), pool-uri mici pentru minnows, PgBouncer transaction mode. |
| **Context de tenant scurs pe o conexiune din pool** | Conexiune reutilizată cu `search_path` / `SET` de la tenant-ul anterior ⇒ date greșite. | Cureți contextul per request; ideal pool dedicat per tenant, fără reutilizare cross-tenant. |
| **Migrare aplicată pe jumătate pe 100 de DB-uri** | Tenants în stări de schemă mixte. | Runner resumable cu cursor per DB; aplicația tolerează vechi+nou; canary întâi; alertă pe rămași în urmă. |
| **Noisy neighbor (whale saturează instanța partajată)** | Minnows de pe aceeași instanță încetinesc. | Plasare pe mărime (whale izolat); `statement_timeout` per tenant; muți un tenant care-și depășește tier-ul. |
| **Ștergere GDPR lasă reziduu** | Backup-uri, replici, log-uri, cache, index de search tot au datele. | Ștergere = `DROP DATABASE` + purjezi backup-urile după retenție + evacuezi cache-ul pe prefix de tenant + scoți din pipeline-ul de search/analytics. Documentează fereastra de retenție. |
| **Cheie per-tenant indisponibilă (KMS)** | DB-ul tenant-ului necitibil. | KMS e dependență hard; cache-uiești data keys în memorie cu TTL; alertă; tenant-ul e jos, ceilalți neafectați (blast radius = 1). |
| **Chei de cache neprefixate pe tenant** | Cache poisoning cross-tenant. | Fiecare cheie Redis prefixată `t:{tenantId}:...`; enforce în wrapper-ul de cache. |
| **Enumerare de tenants** | ID-uri secvențiale ⇒ atacatorul probează `/admin`. | UUID pentru tenant id; admin API pe rețea/auth separate. |
| **Provisionare eșuată la mijloc** | DB pe jumătate creat, sau rând cu `status=provisioning` la infinit. | State machine urmărită (`provisioning_jobs`); pași idempotenți; retry/rollback; alertă pe timeout. |
| **DB-ul whale-ului depășește o instanță** | Problemă de scalare single-tenant. | Read replici, apoi partiționare în interiorul acelui DB (pe proiect), sau sharding — poveste normală de scalare, izolată la whale. |

---

## 7. Trade-offs

| Decizie | Ales | Respins | De ce |
|---|---|---|---|
| Model de izolare | **DB-per-tenant** | Shared schema + row-level (`tenant_id` + RLS) | Row-level nu dă chei de criptare per-tenant sau region pinning per-tenant — ambele cerințe hard. Și ștergerea GDPR devine un `DELETE` cascadat riscant care concurează cu traficul live, în loc de `DROP DATABASE`. |
| " | " | Schema-per-tenant | Partajează o instanță ⇒ cheile per-tenant + residency nu funcționează real; catalog bloat la mii de scheme. Opțiune de mijloc care nu trece bara de compliance. |
| Sursa `tenantId` | Claim JWT semnat | Param / body de request | `tenantId` de la client = gaură de acces cross-tenant. |
| Catalog | Tabel în control-plane DB | Fișier de config | Onboarding în minute = provisionare la runtime, fără deploy. |
| Plasare | Pe mărime (whale izolat, minnows împachetați) | Un tenant per instanță, uniform | 100 de instanțe dedicate pentru tenants mici = risipă; împachetarea uniformă lasă whale-ul să înfometeze minnows. |
| Conexiuni | Lazy pools + PgBouncer | Pool eager per tenant | Eager = mii de conexiuni idle; majoritatea tenants sunt inactivi în orice moment. |
| Analytics cross-tenant | Pipeline ETL / warehouse separat | Query direct peste DB-urile de tenant | DB-per-tenant face SQL cross-tenant imposibil by design; copiezi într-un warehouse. |

---

## Checklist de comparație — notează-ți Runda blind

- [ ] Ai legat **fiecare** cerință de compliance (chei, residency, ștergere GDPR) de alegerea modelului, explicit?
- [ ] Ai numit **cele trei modele** și ai respins două, nu doar ai ales unul?
- [ ] Ai prins gotcha-ul de **explozie de conexiuni** (nu doar noisy-neighbor)?
- [ ] Ai plasat **whale-ul diferit** de minnows?
- [ ] Login-ul rulează pe un **identity store partajat**, înainte de rezolvarea tenant-ului?
- [ ] `tenantId` din token-ul semnat, **niciodată** un param?
- [ ] Catalogul e un tabel, cache-uit, și un **single point of failure** pe care l-ai tratat?
- [ ] **Fără coloană `tenant_id`** în DB-ul de tenant — și ai spus de ce?
- [ ] Migrări peste N DB-uri: resumable, canary, aplicația tolerează ambele scheme?
- [ ] Ștergerea GDPR acoperă **backup-uri + replici + cache + search**, nu doar primary?
- [ ] 3 trade-offs cu „**X, nu Y, pentru că Z**"?

---

## Legături

- Sesiunea: ghidată cu Claude (Sonnet 5), oprită la pasul 3, 2026-08-31. Vezi `journal.md` și `study/sysdesign/isolation/`.
- Refă oarbă: **07.09** (+7).
- Cadrul de 7 pași: `../../docs/training-plan.md`, Block 2.
- Înrudite: `01-idempotent-webhooks.reference.md` (idempotency, `SKIP LOCKED`), `url-shortener.reference.md` (read replici, cache, format back-of-envelope).
