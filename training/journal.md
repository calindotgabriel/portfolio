# Jurnal

Scriu aici tot. Cel mai nou sus. Adaug, nu rescriu.

**Taguri:** `#log` ziua · `#redo` problemă de refăcut · `#problema` enunț din interviu real ·
`#nota` orice altceva.

Exemple pentru fiecare tip și pentru ciclul complet de redo: [`journal-manual.md`](journal-manual.md).

---
## 2026-08-31 · ziua 19 #log Multi-tenant SD + depth tranzacții + primer trees

`LC —/— · adâncime 6 citit · design 5 · mock — · aplicări 0 · PM 0`

Trei blocuri, toate începute, niciunul „terminat" în sensul strict — dar am mers pe ordine.

**System design, promptul #5 (izolare multi-tenant).** Ghidat cu Claude (Sonnet 5). Am ajuns
până la pasul 3 și m-am blocat — prea multe concepte noi deodată (control plane, connection
pools, catalog de tenants). Cadrul a ținut, dar topicul cerea vocabularul citit înainte. Am
oprit sesiunea și am cerut referința completă: `design/05-multi-tenant-isolation.reference.md`.
Refac oarbă la **+7 (07.09)**, după ce citesc whitepaper-ul AWS „SaaS Tenant Isolation".
Notițe brute în `study/sysdesign/isolation/`.

**Depth, topicul 6 (tranzacții, isolation levels) — ziua 1 (citit + experimentat).** Am început
DDIA cap. 7, notițe în `study/node/transactions/`. Am primit lista de citit (DDIA 7 → PG docs
13.2–13.3 → brandur) și planul de experiment cu două sesiuni psql. Fișa + demo `.ts` rămân pe
zilele 20–21.

**Primer trees** (`study/algo/31.08.md`) — traversări pre/in/post-order de pe hellointerview,
plus noțiunile de balanced / complete / heap. Pregătire pentru săptămâna 4.

Goluri din sesiunea de design:
1. **Vocabular înainte de sesiune** — la topicuri abstracte (multi-tenant), citesc referința
   scurtă *înainte* de cele 40 min, nu după. Altfel cadrul se umple cu întrebări de definiție.
2. **Connection-explosion gotcha** — am confundat noisy-neighbor (rezolvi cu rate limiting) cu
   problema reală: pool per tenant × N tenants = mii de conexiuni. Fix: lazy pools + PgBouncer.
3. Progres față de sesiunea 1: instinctul de model (DB-per-tenant) a fost corect **și** l-am
   justificat din cerințe (chei per-tenant, residency, GDPR) — nu a mai trebuit scos cu cleștele.

## 2026-08-28 · ziua 17 #log Prima sesiune de system design

`LC —/— · adâncime — · design warm-up (url shortener) · mock — · aplicări 0 · PM 0`

Prima sesiune de system design vreodată. Ghidată cu Claude (Sonnet 5), nu oarbă — pas cu pas pe
cadrul de 7, cu coach care împinge la fiecare pas. Am ales url shortener ca warm-up ca să nu ard
promptul #1 (webhook-uri idempotente), care rămâne pentru Runda 1.

Am dus cadrul întreg până la capăt: cerințe, cifre, API, model de date, generare de cod (random
7-char base62 + retry pe coliziune), 302 vs 301, cache Redis, moduri de eșec, trade-offs.
Referința completă în `design/url-shortener.reference.md`. O refac oarbă la **+7 (04.09)**.

Trei goluri:
1. **Cerințe non-funcționale** — le-am sărit complet, a fost nevoie de un exemplu lucrat. Data
   viitoare le numesc înainte să trec mai departe: latență / read:write / disponibilitate /
   consistență / durabilitate.
2. **Back-of-envelope** — știam inputurile, nu formatul de narat. Șablon: assumption → ÷10⁵ →
   ratio → 3× peak → storage → **verdict**.
3. **Trade-offs** — am descris alegerile dar n-am numit alternativa respinsă fără să fiu împins.
   Propoziția e „X, nu Y, pentru că Z".
## 2028-08-25 #log Viziune

Cum ar fi in loc sa fac un calendar fix cum e acum planul de pregatire tehnica pt interviuri ca sa pot avea flexibilitate ce assignez la fiecare slot de exemplu acum a aparut un slot la 16 neplanificat ca am avut

## 2026-08-26 #log Aplicări focusate · Clera și Flosum

Am trimis și am confirmat două aplicări pentru roluri senior backend, alese pe direcția
Node.js/TypeScript, remote Europa/România și prag de minimum 6.000 EUR/lună:

- **Clera — Backend Engineer:** remote, Europa, interval public 116.000-146.000 EUR/an.
  Ashby a confirmat: „Your application was successfully submitted.”
- **Flosum — Senior Node.js Developer (Romania):** remote; am comunicat așteptarea de
  72.000 EUR brut/an sau echivalent B2B/EOR. Workable a confirmat trimiterea și va expedia
  o copie a aplicării pe email.

Pentru ambele am folosit CV-ul actual și poziționarea factuală de senior backend. Dacă nu apare
niciun răspuns până la **2026-09-02**, fac follow-up.

## 2026-08-26 #interview #step 1

Am avut interviu cu 3pillar. Rolul de Senior Dev e aproape inchis si mi-au propus sa incepem procesul pt pozitia de Tech Lead.
Initial am fost cu dubii legat de capacitatea mea aici, dat fiind fails in interviurile tehnice si ca nu am ocupat o pozitie exacta pana atunci.
Dar cred ca e o idee buna sa fac ramp up aici ca sa devin mai proactiv si champion ownership.

## 2026-08-26 #log

Am facut problema Reverse Linked List cu ajutor ( tip tier 2 - 3 ) si am avut o incercare la Merge Two Sorted Lists unde am implementat o solutie incorecta ca strategie: eu incercam sa iterez amandoua listele odata si sa adaug elem. ceea ce nu convine pt ca 1 asignam gresit referintele si 2 am uitat de elementul de sortare ( nu am comparat ) si strategia/ideea implementarii era sa nu avansezi amandoua listele fiecare iteratie ci sa avansezi lista a carui nod il adaugi.
Ramane la redo a doua.

## 2026-08-25 #log

Am incercat problema Koko Eating Bananas bazata pe Binary Search si nu am idee cum sa o fac.
Am vazut un primer cu Binary Search dar nu inteleg cum se aplica.

Ma gandesc ca sa ma uit pe charts pe tradingview e o distragere si ar trebui planificat si organizat mai bine.

Cum le fac pe sarite nu apuc sa invat un model/pattern de rezolvare de la simplu. Nu ar fi mai bine probleme sa fie luate dintr-un queue ?

## 2026-08-25 #nota Am trecut proba tehnică de la Cognizant

1,5h foc continuu, cu goluri reale (hoisting, referință/valoare). Am avut un down puternic după.
Dar am trecut. Primul semnal concret și confirmat: ce simt eu în timpul unui interviu nu e ce
vede evaluatorul. 8 ani de livrare reală duc prin presiune, chiar cu goluri specifice.

## 2026-08-25 #problema Hoisting — Cognizant

- **Unde:** Cognizant · interviu tehnic, 1,5h foc continuu
- **Enunț:** întrebare de fundamente JS despre hoisting
- **Categorie:** JS fundamentals (categorie nouă — nu era în cele 12 topicuri de adâncime)
- **Ce am făcut atunci:** am uitat complet. Nu blocaj de gândire — uitare pură sub presiune.
- **Status:** ratat

## 2026-08-25 #problema Pass by reference vs by value — Cognizant

- **Unde:** Cognizant · același interviu
- **Enunț:** cum se transmit valorile în JS/TS — prin referință sau prin valoare
- **Categorie:** JS fundamentals
- **Ce am făcut atunci:** m-am pierdut deși știam răspunsul, „era îngropat în memorie". Recall
  sub presiune, nu gol de cunoștințe — aceeași familie cu Move Zeroes din ziua 0.
- **Status:** ratat

## 2026-08-21 #nota Audit al ofertei, făcut din exterior

Un audit al ofertei publice, cu perspectiva cuiva care angajează fullstack TypeScript. Scriu aici doar
ce e verificabil în repo și pe GitHub, ca să existe o dată de referință.

**Ce e în regulă:** funnel-ul zice că ambalajul convertește — ~150 aplicări → 10 screens (6.7%) →
5-6 tehnice (~55%). Ambele rate sunt sănătoase. Site-ul și CV-ul nu sunt problema.

**Ce lipsește, în ordinea impactului:**

1. Oferta era backend-only, deși majoritatea contractelor TS remote-EU sunt fullstack — iar singurul
   inbound cald din luni (Iterable, 89/100) a venit prin linia cea mai puțin promovată din toată
   oferta. Reparat azi: titlu, summary, skills, homepage, case file ImmoScout24, plus o variantă de
   segment nouă în `sales/core-proposal.md` v1.2.
2. Zero cod inspectabil. `energy-reporter` și `immobile-search` au doar `README.md` și poartă numele
   a două studii de caz. Repo-ul worker-pool e ranked #3 la sell-factors din 07.08 și nu există.
3. Etapa cu 0% conversie e tot neinstrumentată. La 14 zile de la EXP-002: o intrare aici (ziua 0),
   `depth/` și `design/` doar cu README, `sales/interviews/` doar cu `_template.md`, zero checkpoint.
   Toate commit-urile 10–20.08 sunt prep Iterable.

**Regula curriculumului se aplică:** nu recuperez zilele pierdute, reiau de la data de azi. Doar redo
list-ul se duce mai departe — acolo e Move Zeroes, scadent 14.08 (ratat) și 28.08.

## 2026-08-21 #log

Am interviu la Cognizant cu Engineering Managers.

## 2026-08-21 #log

Am facut problema leetcode 'Longest Substring Without Repeating Characters' din urma pt a prinde curaj, a iesit bine, iterativ.

## 2026-08-20

Am trecut proba tehnica la Cognizant chiar daca nu ma asteptam, yohoo! Maine vineri 14 am ultima proba cu hiring managers.

## 2026-08-18

Interviu metro systems digital - hybrid, CI/CD oriented - partea HR, astept raspuns
Cred ca a mers bine interviul, nu m-am incurcat si dat raspunsuri lungi si argumentate

## 2026-08-18 #log

Am inceput problema Minimum Window Substring
Am reusit sa o fac 2/3
nu imi dau seama cum sa fac sa treaca si exemplu 3 unde t = "aa"
si candidatul substring devine "a" si alg. zice ca e match ca compara cand = "a" si apoi trece prin fiecare "aa" din t si zice ca "a" (cand) contine "a" deci lasa match pe true

Nu ar trebui sa ma mai uit in paralel la trades pt ca scade concentrarea si am petrecut 40m pe challenge asta

## 2026-08-17 #log

Am facut problema Best Time to Buy and Sell stock pe final de program

## 2026-08-11 #log Cognizant și sesiunea tehnică

Am avut call-ul cu Cognizant, apoi am trecut la problemele tehnice. Am reușit să termin doar prima
problemă. În timpul sesiunii am avut call-ul cu Mamaia, care m-a destabilizat puternic și mi-a
afectat concentrarea pentru restul exercițiilor.

Nu confund rezultatul de azi cu nivelul meu tehnic: prima problemă a fost dusă la capăt, iar
restul sesiunii s-a desfășurat într-o stare emoțională dificilă. Reiau problemele rămase când pot
lucra din nou cu atenția întreagă.

## 2026-08-11 #nota Newxel · Senior Backend Engineer Node.js/TypeScript

Ivan de la Newxel m-a contactat pentru un rol remote pe o platformă B2B de plăți: Node.js,
TypeScript, arhitectură event-driven, PostgreSQL, microservicii, Docker/CI/CD și AWS. Produsul
unifică mai mulți procesatori de plăți și pune accent pe routing, idempotency, execuție sub o
secundă, observability și investigarea incidentelor din producție.

Am pregătit răspunsul la screening și CV-ul actual. Poziționarea: aproximativ 7 ani de Node.js și
5+ ani de TypeScript; microservicii NestJS și optimizare la RWE; AWS/serverless la Bitpanda,
ImmoScout24 și Endava; experiență FinTech prin custody pentru bănci la Bitpanda, wallet și fluxuri
de plată Klarna/card. La PostgreSQL răspund precis, fără să pretind că a fost datastore-ul dominant
în toate rolurile recente.

Pentru discuția tehnică trebuie să pregătesc exemple clare despre tranzacții PostgreSQL,
idempotency, retry-uri, webhook-uri, limite între servicii și debugging în sisteme distribuite.

## 2026-08-11 #nota Newxel · compensație B2B

Ancora pentru rol este **7.000 USD brut/lună B2B**, negociabilă în funcție de responsabilități,
structura contractului, concediul plătit și beneficii. Nu pornesc de la 6.000 USD: diferența este
buffer pentru concediu neplătit, zile fără facturare și costurile firmei. La cursul și fiscalitatea
estimate acum, 7.000 USD facturați înseamnă aproximativ **23.800-24.200 lei net/lună** prin SRL
micro eligibil.

## 2026-08-07 · ziua 0 #log

`LC 0/1 · adâncime — · design — · mock — · aplicări 0 · PM 3`

Prima sesiune de live coding, Move Zeroes. A mers prost. Am fugit după ~10 minute — alt tab, apoi
altul. Am ajuns la hashmap pe o problemă care era clar de two pointers și n-am terminat-o.

Descoperirea nu e hashmap-ul, e fuga. Când m-am simțit incompetent, am plecat. Asta se întâmplă
probabil și în interviuri, doar că acolo nu pot deschide alt tab — acolo arată ca tăcere sau ca cod
scris fără plan.

Post-mortems retroactive: m-am pierdut încercând să-mi amintesc. Din 5-6 interviuri am recuperat
**2-3 enunțuri**, parțiale. Restul s-a pierdut pentru că nu exista sistemul.

Mock rezervat pentru **marți 11.08, 16:00**, Exponent, Data Structures & Algorithms.

## 2026-08-07 #redo Move Zeroes · two pointers

Ratată **07.08** → refac la **14.08** și la **28.08**.

Am mers pe hashmap. Hashmap răspunde la „am mai văzut asta?" — o întrebare de căutare. Problema era
despre poziții în același array. Semnalele pe care le-am ratat: _in-place_, _păstrează ordinea
relativă_, _array_.

Soluția: doi indici, `slow` unde scriu următorul non-zero, `fast` ce citesc. O(n) timp, O(1) spațiu.

## 2026-08-10 · ziua 1 #log

`LC 0/2 · adâncime — · design — · mock — · aplicări 0 · PM 0`

Ambele atacate până la 50-75%, niciuna terminată în cronometru. Dar am stat până la capăt
la amândouă și mi-am găsit singur greșelile. Vineri fugisem după 10 minute.

Tiparul, a doua oară în două sesiuni: aleg structura de date din obișnuință, nu din
întrebarea la care trebuie să răspund.

## 2026-08-10 #redo Contains Duplicate · arrays & hashing

Ratată **10.08** → refac la **17.08** și la **31.08**.

Am folosit un array ca hash map, indexat pe valoare. Merge doar dacă valorile sunt întregi
mici și pozitive. Cu negative, `freq[-3] += 1` dă `undefined + 1 = NaN` — nu crapă, doar
răspunde greșit în tăcere.

Întrebarea era „am mai văzut valoarea asta?" — aia e apartenență, deci Set. Setul nu-i pasă
de domeniul valorilor.

## 2026-08-10 #redo Valid Anagram · arrays & hashing

Ratată **10.08** → refac la **17.08** și la **31.08**.

Compile error: `t[matchIndex] = ''`. **Stringurile sunt imutabile în JS** — nu poți tăia
caractere dintr-un string. Gol de fundament, nu de algoritm.

Și abordarea era O(n²): `indexOf` într-o buclă. Corect e o hartă de frecvențe: numeri
caracterele din `s`, scazi pe cele din `t`.

## 2026-08-10 · ziua 1 #log

`LC 0/2 · adâncime — · design — · mock — · aplicări 0 · PM 0`

Adâncimea și system design-ul nu s-au făcut: 4 call-uri spontane de pe LinkedIn, unul deja
merge spre NDA. Prima mișcare reală a funnelului în șase săptămâni. Le mut pe mâine și
miercuri — curriculumul are rezervă exact pentru asta.

## 2026-08-10 #problema Enunțuri recuperate din interviuri

Unde: Proxify
Enunt: a game ( don t remember name ) pairs, triplets

Primeai un string array de cifre ( > 0 ? )
Trebuia sa returnezi boolean
true daca: poti sa faci oricate triplete si o singura pereche
false daca: nu poti forma triplete si nu ai o pereche

## 2026-08-07 #problema Enunțuri recuperate din interviuri

<!-- Câte o intrare per enunț recuperat. Șablon:

### Titlu scurt
- **Unde:** firmă · dată aprox. · live coding / take-home / discuție
- **Enunț:** cât mai aproape de cuvintele lor
- **Categorie:** arrays & hashing / two pointers / graphs / system design / Node / SQL / practic / nu știu încă
- **Ce am făcut atunci:** unde m-am blocat, ce am livrat
- **Ce a zis intervievatorul:** corectări, hint-uri, întrebări repetate
- **Status:** neîncercat → ratat → rezolvat în timp
-->

---

Reflexul de antrenat, înainte de orice linie de cod, cu voce tare: „la ce întrebare răspund?”

- apartenență → Set
- numărare → Map
- poziții → indici
- ordine → sortare sau heap

## Ce citesc de aici sâmbăta

La checkpoint, patru lucruri:

1. **`LC` din intrările `#log`.** Partea din stânga — rezolvate în timp. Plată două săptămâni la rând
   înseamnă că problema e narația sau fundamentele, nu volumul: mai multe mock-uri, mai puține
   probleme noi.
2. **Câte post-mortemuri vs câte interviuri.** Trebuie să fie egale. Dacă nu, opresc tot și repar asta.
3. **Categoriile din `#problema`.** Dacă 3 din 5 cad în același loc, ăla e planul real de antrenament,
   nu curriculumul.
4. **Textul intrărilor `#log`.** Dacă aceeași propoziție apare de trei ori, nu mai e o observație —
   e diagnosticul.
