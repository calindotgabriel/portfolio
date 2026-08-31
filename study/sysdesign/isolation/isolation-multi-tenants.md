
**Începem — Pasul 1: Cerințe**

Scenariul: Construiești un SaaS B2B — un **tool de project management gen Linear/Asana.** Fiecare client e **o companie (un tenant)** cu **userii**, **proiectele** și **task-urile ei**. Proiectează cum stochezi datele astfel încât tenant A să nu poată vedea niciodată datele lui B.

Dă-mi cerințe funcționale (ce trebuie să facă) și apoi non-funcționale. Pentru non-funcționale, întrebările care contează aici — răspunde-le cu un număr sau un cuvânt, ghicit e ok:

- Câți tenants? 100? 10.000? 1 milion?
	- 100 e safe pt inceput
- Skew de mărime — câțiva uriași și o coadă lungă de mici, sau uniform?
	- pot fi uni foarte mari alti f mici, neuniform
- Compliance — data residency (UE vs US), chei de criptare per-tenant, SOC2?
	- UE residency, chei per tenant
- Trebuie export / ștergere completă per-tenant (GDPR „șterge-mi organizația")?
	- da, avem endpoint/functionalitate
- Cât de repede trebuie să fie gata un tenant nou la signup?
	- rapid. ar trebui sa oferim ready to go / ready to send in cateva minute/ore dupa ce avem input-ul

cerinte functionale:
- un user se poate loga in sistem pt compania sa(tenant) si vede pe dashboard proiectele
- un user poate selecta un proiect si vede taskurile
	- poate filtra:
		- taskurile lui
		- ale altora
	- poate modifica un task
		- CRUD
 - un user poate vedea ceilalti useri din companie

cum stocam?
- facem schemas/baze de date diferite pt fiecare tenant

**Step 2: The numbers**

For a multi-tenant design the numbers are about tenants and skew, not raw RPS. Assume: 100 tenants, growing ~5/month. Give me:

1. Biggest tenant — how many users, projects, tasks? Smallest? (Guess.)
2. Total rows across all tenants, roughly.
3. Connections: if each active tenant gets its own pool of, say, 10 connections, and the 100 DBs sit on a handful of shared Postgres instances — what problem shows up? (This is the DB-per-tenant gotcha. Think about it.)
4. Read/write mix for a project-management tool.


❯ 1. biggest: 100k users, 100 projects, 10000k tasks ; smallest is in the 10-20s ; 2. millions 3. the bigger will eat capacity for the smaller ones - do we rate limit here ? 4. mostly reads - like 100-1000 compared to writes

**Step 3: API surface + tenant resolution**

Two things:

1. Sketch the main endpoints — login, list projects, list tasks in a project, CRUD a task, list users. Keep it short.
2. The question from Step 1: a request comes in with an auth token. How does the system know which tenant, and which database to route the query to? Walk me through it — token → ? → connection.
1)
POST /login body: { user, password }
	-> returns JWT
	
GET /projects w. JWT
	return array of projects data
POST /task , GET /task, PATCH /task, DELETE /task (by id) data via body/url param all w. JWT
	GET task/{projectId} filter by projectId tasks that belong to it
GET /users print all users from tenant (w.JWT)

2)
auth token gives the user object representation, each user has a tenantId attributed to it
	each tenantId is mapped(in a table? or config ) to the right DB to query
