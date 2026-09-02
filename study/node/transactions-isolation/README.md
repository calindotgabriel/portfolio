# transactions & isolation levels — lab

Practic pentru depth **topicul 6** (zilele 20–21). Notițele teoretice: `../transactions/transactions.md`.

Două părți:

- **`scenarios.sql`** — cele 6 anomalii, rulate de mână în două sesiuni `psql`.
- **`demo/transfer.ts`** — transfer bancar concurent + wrapper-ul de retry pe `40001` / `40P01`.

## Prereq

- Docker
- Node 20+ (pentru `demo/`)

## 1. Pornește baza

```
docker compose up -d
```

Postgres 16 pe `localhost:5433`, user `postgres`, parolă `lab`, db `lab`. Datele stau în tmpfs —
`docker compose down` le șterge. Intenționat: fiecare rulare pornește curat.

## 2. Partea SQL — cele 6 anomalii

Două terminale, fiecare o sesiune `psql`:

```
docker compose exec db psql -U postgres -d lab
```

În `scenarios.sql`, `A>` = sesiunea 1, `B>` = sesiunea 2. Rulează blocul `SETUP` o dată, apoi
parcurgi un scenariu de sus în jos, alternând sesiunile. Ce urmărești:

- ce `SELECT` întoarce date vechi vs proaspete
- ce statement **blochează** (`psql` pare că îngheață → cealaltă sesiune ține un lock)
- ce `COMMIT` / `UPDATE` dă **ERROR**, și SQLSTATE-ul (`40001` → retry, `40P01` → deadlock)

| # | Anomalie | Read Committed | Repeatable Read (PG) | Serializable |
|---|---|---|---|---|
| 1 | Dirty read | prevenit | prevenit | prevenit |
| 2 | Non-repeatable read | **apare** | prevenit | prevenit |
| 3 | Phantom read | **apare** | prevenit *(PG, mai strict decât standardul)* | prevenit |
| 4 | Lost update (read-modify-write în app) | **apare** | eroare `40001` | eroare `40001` |
| 5 | Write skew | **apare** | **apare** | eroare `40001` |
| 6 | Deadlock | detectat `40P01` | detectat `40P01` | detectat `40P01` |

Note Postgres: „Read Uncommitted" = Read Committed (fără dirty reads nicăieri). „Repeatable Read" =
snapshot isolation. „Serializable" = SSI (Serializable Snapshot Isolation) — poate aborta tranzacții,
aplicația trebuie să reîncerce.

## 3. Partea Node — retry pe serialization failure

```
cd demo
npm install
npm start
```

`transfer.ts` încarcă `schema.sql`, apoi lansează 200 de transferuri concurente între 3 conturi la
`SERIALIZABLE`. Multe lovesc `40001`; `withRetry` le reîncearcă cu backoff + jitter. La final
verifică dacă suma totală s-a conservat.

**Ce ai de făcut:** corpul lui `transfer()` e un `TODO`. Implementează-l (citește ambele solduri →
verifică fonduri → două `UPDATE`-uri), apoi:

- schimbă `SERIALIZABLE` → `READ COMMITTED`. Ce se strică, și când?
- păstrează `SERIALIZABLE` dar scoate `withRetry` din `main()`. Câte transferuri eșuează?
- blochează rândurile în ordine fixă (id crescător) vs ordinea naturală de aici → rata de `40P01`.

## Cele 3 întrebări de intervievator (semințe pentru fișă)

1. Care e isolation level-ul default în Postgres și ce anomalie tot poate apărea? → Read Committed;
   non-repeatable / phantom la nivel de app, lost update în read-modify-write, write skew.
2. Două request-uri fac `SELECT balance; dacă ajunge, UPDATE balance - amount`. Ce se strică, cum
   repari? → lost update / cont în minus; `FOR UPDATE`, sau `UPDATE ... WHERE balance >= amount`
   atomic, sau version check optimist, sau Serializable + retry.
3. Ce garantează Repeatable Read în Postgres vs standardul SQL? → snapshot isolation: fără dirty /
   non-repeatable / phantom, dar write skew posibil; standardul cere doar „fără non-repeatable reads".
