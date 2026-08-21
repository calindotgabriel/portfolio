# Jurnal

Scriu aici tot. Cel mai nou sus. Adaug, nu rescriu.

**Taguri:** `#log` ziua · `#redo` problemă de refăcut · `#problema` enunț din interviu real ·
`#nota` orice altceva.

Exemple pentru fiecare tip și pentru ciclul complet de redo: [`journal-manual.md`](journal-manual.md).

---

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

---

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
despre poziții în același array. Semnalele pe care le-am ratat: *in-place*, *păstrează ordinea
relativă*, *array*.

Soluția: doi indici, `slow` unde scriu următorul non-zero, `fast` ce citesc. O(n) timp, O(1) spațiu.

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
