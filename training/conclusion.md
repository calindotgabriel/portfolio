# Concluzie — programul de pregătire pentru interviuri tehnice

**Data închiderii: 2026-09-10.** Programul a rulat din 2026-08-07. Se oprește la ziua 28 din 48 din
[`curriculum.md`](curriculum.md); [`journal.md`](journal.md) numără 26 de zile de antrenament logate.

Documentul citește `journal.md`, `curriculum.md`, `training-plan.md` (`~/job-search/docs/`),
`leetcode-primer.md`, ce e în `depth/`, `design/`, `study/`, plus `sales/weekly/2026-W34.md` și
dosarele de cont din `~/job-search/sales/accounts/`. Spune ce s-a făcut și cât din plan a fost
acoperit. Nu e un post-mortem al funnelului de aplicări — aia rămâne pentru mai târziu (secțiunea 8).

## 1. De ce se închide

Nu mai există runway. Chiria e scadentă pe 15, cu preaviz de 2 luni în contract. Intru în modul
„aplic cu tot ce am" și e foarte probabil să încep livrări cu Bold ca venit-punte. Cele ~3 ore/zi
de practică deliberată pe care le cerea planul nu mai pot fi finanțate.

`docs/bridge-income.md` avea deja regula scrisă: sub 4–6 săptămâni de runway → deschizi puntea de
venit, antrenamentul scade la blocul de live coding; sub 2 săptămâni → live coding 60–90 min și atât.
Aici merg mai departe decât tabelul: stop complet + muncă manuală, exact instrumentul pe care
documentul îl numea „supapă de urgență", nu plan. Motivul e simplu — puntea „corectă" (tech la
€25–35/h, part-time) n-a apărut la timp și nu mai am marja s-o aștept.

## 2. Ce era planul

`training-plan.md`, 8 săptămâni, pornit de la diagnosticul funnelului:

| Etapă | Cifre | Conversie |
|---|---:|---|
| Aplicări | ~150 | — |
| Screen-uri | 10 | 6.7% |
| Runde tehnice | 5–6 | ~55% |
| Oferte | 0 | **0%** |

Concluzia din care a pornit: CV-ul și poziționarea funcționează, pică tot ce e după runda tehnică,
și nu exista niciun debrief care să spună de ce. Cinci blocuri:

1. **Live coding** — NeetCode 150, 12 pattern-uri în ordine, TypeScript, cronometru, cu voce tare,
   redo la +7/+21. Țintă: 80–100 probleme, ~60% medium. Metrica: *probleme rezolvate în cronometru,
   prima încercare, cu narație* — și nimic altceva.
2. **System design** — 10 prompturi la scară de contractor (nu FAANG), cadru fix de 7 pași, 40 min
   la tablă cu voce tare → comparație cu referință → 3 goluri notate.
3. **Adâncime Node/JS/DB** — 12 topicuri, fiecare cu o fișă de ~200 de cuvinte în cuvinte proprii +
   un demo care rulează.
4. **Mock interviews** — „cel mai valoros item din plan". 1–2/săptămână, primul rezervat în
   săptămâna 1. Fiecare mock → post-mortem în `sales/interviews/`.
5. **Repo-dovadă** — serviciul de worker-pool cu benchmark, construit ca topicul 2 din blocul 3,
   publicat în săptămânile 3–4, articol în 5–6.

## 3. Ce s-a făcut efectiv

Din `journal.md`, ziua 0 (07.08) → ultima intrare (08.09):

### Live coding
- **~12 sesiuni logate** din ~28 de zile calendaristice. Prima (ziua 0, Move Zeroes): „am fugit
  după ~10 minute — alt tab, apoi altul". Descoperirea zilei 0 a fost că problema e fuga, nu
  algoritmul.
- Categorii atinse: arrays & hashing (Contains Duplicate, Valid Anagram), two pointers (Move
  Zeroes), sliding window (Best Time to Buy and Sell Stock, Minimum Window Substring 2/3, Longest
  Substring Without Repeating Characters — a ieșit), stack (neatins), binary search (Koko Eating
  Bananas — „nu am idee cum sa o fac"), linked list (Reverse Linked List cu ajutor tier 2–3, Merge
  Two Sorted Lists — strategie greșită), trees (LCA of a BST — ratat în 25 min, Level Order
  Traversal — dus cu un indiciu, Maximum Depth — pe redo), heap (Kth Largest 07.09 și K Closest
  08.09 — ambele ~1–1.2h, ghidate, neterminate).
- **0 probleme marcate „rezolvată în cronometru, prima încercare, cu narație".** Asta era singura
  metrică a blocului.
- `leetcode-primer.md` (cel mai bun material scris de mine în tot programul) definește un track de
  recuperare pentru pattern-urile 1–5 („fundația, apar cel mai des în interviuri"), câte unul pe
  sâmbătă. Track-ul n-a fost pornit — nu există intrări de sâmbătă în jurnal.
- Redo list deschisă: Move Zeroes (ratat 14.08 și 28.08), Contains Duplicate, Valid Anagram (redo
  RATATĂ, resetat), Merge Two Sorted Lists, Maximum Depth of Binary Tree, LCA of a BST, Kth Largest,
  K Closest. Mai multe redo-uri sunt ele însele restante sau ratate.
- Blocaj real, semnalat de două ori: mecanica de heap. „Nu e problema, e categoria."

### System design
- **Prima sesiune vreodată: 28.08** (ziua 17) — abia în săptămâna 3–4 din 8, deși planul le voia
  3×/săptămână din săptămâna 1.
- Prompturi atinse: url-shortener (warm-up, ghidat), #5 multi-tenant (ghidat, blocat la pasul 3),
  #6 search API caching (semi-blind, pașii 1–3 singur), #7 job scheduler (făcut ca lab de cod, cele
  3 subprobleme pass).
- Prompturile 1, 2, 3, 4, 8, 9, 10 — neatinse. Promptul #1 (webhook-uri idempotente), livrabilul
  pentru „Runda 1", n-a fost făcut niciodată la tablă — `design/01-idempotent-webhooks.md` e 0 bytes
  (există doar referința).
- Gol recurent, trei sesiuni la rând: cerințele non-funcționale sărite. Jurnalul: „ăsta e
  diagnosticul, nu o scăpare".
- Ultimele două sloturi făcute ca lab-uri de cod, nu la tablă. Jurnalul: „skill-ul de interviu…
  tot nu-l exersez".

### Adâncime Node/JS/DB
- **0 din 12 fișe de ~200 de cuvinte scrise.** `depth/` are doar `README.md` și
  `01-event-loop-phases.md` (555 bytes, tot boilerplate).
- Laburi cu cod care rulează, în `study/node/`: GC, indecși Mongo (`explain()`), tranzacții +
  isolation levels, GraphQL N+1 + DataLoader, idempotency keys. Topicul 6 (tranzacții) cel mai
  complet — toate cele 6 scenarii de anomalie rulate de mână — dar și acolo fișa în cuvinte proprii
  a rămas datorată.
- Categorie nouă apărută din interviuri, nu din plan: **JS fundamentals** (hoisting, pass-by-reference
  vs by-value — ambele ratate la Cognizant).

### Mock interviews
- **1 rezervat** (marți 11.08, Exponent, DS&A). Rezultatul nu a fost scris niciodată. Niciun mock
  după. „A mock that is not debriefed is entertainment" — planul.

### Repo-dovadă
- Construit pe 21.08 în `~/Dev/node-worker-pool-bench` (Node/TS, zero dependențe, teste + benchmark).
  **Nepublicat** — publicarea rămâne decizia mea. Auditul din 21.08 îl nota drept „ranked #3 la
  sell-factors din 07.08 și nu există"; între timp există, local.

### Schela de urmărire
- Tabelul de checkpoint săptămânal din `training-plan.md`: **0 din 8 rânduri** completate.
- Running gaps list: goală.
- **Post-mortemuri de interviu: 0**, față de 5–6 runde tehnice. `sales/interviews/` are doar
  `_template.md`. Regula proprie era „post-mortemuri = interviuri, altfel opresc tot". Nu s-a scris
  niciunul.
- Enunțuri reale recuperate din interviuri (`#problema`): 3 în total (un joc cu perechi/triplete de
  la Proxify, plus hoisting și pass-by-value de la Cognizant).

## 4. Cât din curriculum s-a acoperit

Estimativ: **sub un sfert** din munca de antrenament planificată.

- Primele ~2 săptămâni: în mare pierdute. `sales/weekly/2026-W34.md` (21.08) confirmă — jurnalul avea
  o singură intrare, ziua 0; zilele 1–11 fără linie de log; `depth/` și `design/` doar cu README.
- De pe ~28.08: doar firele de adâncime-lab și system-design au primit atenție reală, și aia în mare
  ghidată, nu oarbă.
- Live coding: ~12 sesiuni din ~28 de zile, 0 rezolvări curate în cronometru.
- Blocurile 4 (mock-uri) și 5 (repo publicat) — practic neîncepute în forma cerută.
- Săptămâna 8 (28.09–03.10), care era numai revizuire, nu se mai atinge.

Regula planului („nu recuperezi zilele pierdute, reiei de la data de azi") a ținut structura curată,
dar a și făcut ca golul acumulat să nu se mai închidă.

## 5. Ce s-a întâmplat în paralel — semnalul real

Antrenamentul n-a mers, dar fereastra n-a fost goală:

- **Cognizant — proba tehnică trecută pe 24.08.** 1,5h foc continuu, cu goluri reale (hoisting,
  referință/valoare) și un down puternic după. Prima trecere confirmată de la începutul programului.
  Jurnalul: „ce simt eu în timpul unui interviu nu e ce vede evaluatorul. 8 ani de livrare reală duc
  prin presiune." Urma runda cu hiring managers.
- **3Pillar** — rolul de Senior aproape închis, mi-au propus să încep procesul pentru **Tech Lead**.
- **Metro Systems Digital** — runda HR pe 18.08, „cred că a mers bine".
- **Razvan / migrare Iterable** — call de discovery pe 14.08 (în engleză), a mers bine; urmează
  call-ul de estimare. Singurul inbound cald.
- Aplicări trimise în fereastră: ~16 confirmate în jurnal (Clera, Flosum, OAK'S LAB, epilot,
  Innoverse, CYBERTEC, FINN, DualEntry + batch-ul din 08.09), plus ce e în `outreach-log.csv`.

Diagnosticul din `2026-W34.md`: exact munca-cheie — post-mortemuri, mock-uri, instrumentarea etapei
care pică — e ce n-a fost făcut. „Blanks below are not laziness — they are the finding." S-au
construit unelte și s-a lucrat un singur lead două săptămâni, în loc de repetiții.

## 6. Ce rămâne util

- **`leetcode-primer.md`** — fișa de recunoaștere a celor 12 pattern-uri, cu template TS și semnale.
  Cel mai bun lucru scris în tot programul. Se recitește în 20 de minute înainte de un interviu.
- **`~/job-search/interview-prep.html`** — story bank (5 povești STAR) + 3 povești comportamentale,
  complete și lustruite.
- **`~/job-search/docs/interview-narrative.md`** — 8 povești STAR + răspunsurile pregătite pentru
  golurile din CV și pentru întrebările de tenure. Două locuri încă marcate „de scris de Calin".
- **Laburile din `study/node/`** — tranzacții/isolation, GraphQL N+1, GC, indecși Mongo, idempotency.
  Cod care rulează, nu doar note.
- **`~/Dev/node-worker-pool-bench`** — dacă se publică vreodată, e singurul cod inspectabil; regula
  rămâne: deschizi URL-ul și îl citești înainte de a-l lega undeva.

Când vine un interviu: prep-ul ușor (refresh la story bank + one-liners + primer), nu reluarea
curriculumului.

## 7. Ce a mers și ce nu

**A mers:**
- Structura de jurnal (tag-uri, redo cu +7/+21, `#problema`). Onestă, ușor de citit retroactiv —
  documentul ăsta a putut fi scris repede din ea.
- Trecerea probei Cognizant a spart credința că „mă blochez mereu în interviuri".

**Nu a mers:**
- Volumul. ~3h/zi de practică deliberată nu s-au potrivit peste căutarea activă + presiunea de
  runway + o despărțire.
- Ordinea. Mock-urile și post-mortemurile — cele două lucruri pe care `bridge-income.md` le numea
  „nu se taie niciodată" — au fost primele tăiate.
- „Unelte în loc de repetiții" — tiparul semnalat în auditul din 21.08 s-a repetat.

## 8. Analiză amânată (explicit pentru mai târziu)

O trecere separată va cuantifica funnelul, nu antrenamentul:
- câte aplicări trimise, pe ce canale;
- câte au ajuns la screen, câte la runda tehnică, câte mai departe;
- conversia pe fiecare etapă și unde exact pică;
- ce canale au produs interviuri reale (first-party vs recruiteri vs platforme vs piața RO).

Surse: `~/job-search/outreach-log.csv`, `cluj-shortlist-2026-09-08.md`, intrările
`#log` / `#nota` / `#interview` din `journal.md`, dosarele din `~/job-search/sales/accounts/`,
`sales/weekly/2026-W34.md`.

## 9. Calendar

Pe 2026-09-10 s-a șters toată schela de calendar a sprintului de 8 săptămâni: Live coding, Adâncime
Node/JS/DB, System design, Mock interview, Aplicări + post-mortems, Checkpoint săptămânal, 🛑 STOP,
🌿 Duminică fără job search, 🏃 Mișcare, 📖 Citit + wind-down, 💛 Timp cu prietena, 🧭 Check-in cu
tine, plus marcajele 📍 S6 și 📍 S8.

Neatinse: cursul de producție muzicală („🎛️ Ziua N", zilele 13–30) și trimiterea la medicul de
familie.
