# Lab: SFMC → Iterable, local și gratis

Scop: să pot fi **proactiv** într-o discuție de migrare, nu să obțin un certificat. Proactivitatea nu
vine din a ști pe de rost cum se cheamă feature-urile — vine din a avea o **metodă** și artefacte pe
care le-am rulat deja.

Context: [`../../sales/accounts/razvan-iterable-migration.md`](../../sales/accounts/razvan-iterable-migration.md)
și briefing-ul tehnic de lângă el.

---

## Constrângerea, verificată

**Nu există sandbox gratuit pentru niciuna din platforme.**

- **SFMC Engagement** — fără developer org gratuit. Trailhead are module gratuite, dar hands-on pe
  Engagement nu. *(Marketing Cloud Next — platforma nouă — are Developer Edition gratuit în Trailhead
  Playground, dar e alt produs decât cel de pe care migrează clienții.)*
- **Iterable** — enterprise, sales-led, fără self-serve. Documentația e publică și foarte bună.
  **Iterable Academy Foundations Certification e gratuită**, open-book, ~40 de întrebări, 80% prag,
  valabilă 24 de luni, cu certificat de pus pe LinkedIn. Activitățile hands-on cer cont Iterable
  propriu. *Dacă înscrierea la Academy e deschisă și non-clienților — de verificat direct, e o
  încercare de cinci minute.*

**Constrângerea asta e de fapt răspunsul.** Părțile din migrare care contează — și pentru care s-ar
plăti — sunt exact părțile care se pot construi local:

| Ce contează la migrare | Se poate local? |
| --- | --- |
| Traducerea modelului de date, relațional → profil plat + evenimente | **Da**, integral |
| Consolidarea a 600 de template-uri | **Da**, integral |
| Triajul SQL → segment / câmp calculat | **Da**, integral |
| Maparea stării de consimțământ | **Da**, integral |
| Făcut clic prin UI-ul Journey Builder | Nu — și contează cel mai puțin |

Nimeni nu plătește pentru cineva care știe unde e butonul. Plătesc pentru cineva care știe ce se
întâmplă cu datele.

---

## Proiectul: un toolkit de migrare, pe date sintetice

Node/TypeScript, adică stackul meu. Șase faze. **Fiecare fază e utilă singură** — dacă mă opresc după
faza 3, tot am artefactul cel mai valoros.

### Faza 1 — Construiesc un cont SFMC fals *(1 weekend)*

Generez Data Extensions sintetice: `Subscribers`, `Orders`, `Products`, `Preferences`, plus data views
`_Open`, `_Click`, `_Sent`, `_Bounce`. SQL Server în Docker, pentru că SFMC SQL e un subset de T-SQL
și vreau dialectul real, nu SQLite.

Apoi scriu Query Activities realiste — cele șase pattern-uri: filtrare, join, agregare, windowing,
engagement din data views, și un lanț unde query A populează un DE citit de B.

**Ce învăț:** modelul de date SFMC, construindu-l. Mult mai solid decât citindu-l.

### Faza 2 — Generez mizeria: ~600 de template-uri *(1-2 zile)*

Programatic, cu redundanță realistă: brand × limbă × etapă de lifecycle × variante de layout. Cu
`%%FirstName%%`, blocuri AMPscript, apeluri `Lookup()` și `LookupRows()`.

**De ce eu generez mizeria:** ca să știu exact cum arată mizeria. Când mă uit peste cele 20-30 de
sample-uri reale ale unui client, am deja un model mental despre ce caut.

### Faza 3 — Analizorul de consolidare ⭐ *(1-2 weekenduri)*

**Artefactul principal.** Un tool care:

- parsează cele 600 de template-uri (cheerio)
- extrage scheletul structural și le grupează prin similaritate
- extrage fiecare `Lookup()` și fiecare string de personalizare → **manifestul de cerințe de date**
- clusterizează pe cele patru axe: limbă, brand, lifecycle, layout
- scoate: N template-uri de bază + bibliotecă de snippets + ce date trebuie să existe pe profil

Asta e literalmente munca pentru care s-ar plăti, și e **răspunsul la „câte clustere sunt în cele 600
ale voastre"**. Se poate rula pe sample-urile reale ale unui client.

### Faza 4 — Ținta în Handlebars *(2-3 zile)*

Convertesc clusterele în template-uri Handlebars, le randez local cu pachetul `handlebars` peste
profile false. Snippets ca partials.

**Ce învăț:** Handlebars ca lucru real, care e exact ce folosește Iterable. Și unde se sparge
conversia din AMPscript.

### Faza 5 — Triajul SQL *(2-3 zile)*

Parsez query-urile din faza 1 și le clasific automat în cele trei găleți: devine segment · devine câmp
calculat · datele trebuie întâi aduse. Detectez JOIN-uri, window functions, agregări; raportez ce
coloane atinge fiecare.

**Ce învăț:** transform o intuiție într-un instrument. Și pot spune pe un call „am un clasificator
pentru asta", ceea ce e altceva decât „cred că depinde".

### Faza 6 — Mock de Iterable API *(2-3 zile)*

Un server Express mic care implementează `/api/users/update`, `/api/users/bulkUpdate`,
`/api/events/track`, `/api/lists/subscribe` — **cu semantica reală**, inclusiv:

- inferența tipului de câmp la prima scriere
- **imutabilitatea tipului** — respinge scrierile care nu se potrivesc
- modelul de subscription: global / channel / message type

Apoi scriu loaderul care duce datele din faza 1 în el.

**De ce merită:** implementez singur capcana despre care vorbesc. După ce scriu codul care respinge un
`42` pentru că primul write a fost `"42"`, nu mai uit niciodată de ce contează. Capcanele
implementate se rețin altfel decât capcanele citite.

### Faza 7, opțională — Rezolvatorul de consimțământ *(1 zi)*

Modelez opt-out-ul SFMC pe trei niveluri plus send classification, scriu rezolvatorul „cel mai
restrictiv câștigă", cu suită de teste pe cazuri contradictorii.

Mic, dar e partea de GDPR și un rezolvator testat e un artefact credibil.

---

## Ce e gratis și chiar merită

**Iterable Academy Foundations Certification** — gratuită, open-book. Cel mai bun raport
efort/credibilitate din tot ce e mai jos. De făcut prima.

**Trailhead** — gratuit, module de Marketing Cloud Engagement. Relevante: modelul de date, Journey
Builder, Automation Studio, AMPscript. Ajunge partea aia, nu tot trailul.

**Documentația Iterable** (support.iterable.com) — publică și de calitate. Tot ce am folosit în
briefing vine de acolo.

**Bloguri SFMC** care apar constant ca surse serioase: mateuszdabrowski.pl pentru SQL, gortonington.com,
blogul DESelect.

---

## Despre sindromul impostorului, pe scurt

Trei constatări, nu încurajări:

**Golul pe care l-am simțit pe call nu era cunoaștere de SFMC.** Era că n-aveam de unde să fiu
proactiv. Trivia despre platformă nu produce proactivitate — o metodă produce. Toolkitul de mai sus
*este* metoda.

**Clientul are deja oameni de SFMC.** Nimeni nu mă plătește pentru expertiză SFMC și nici n-ar avea de
ce. Ce n-au e cineva care poate reconstrui fluxul de date.

**Propoziția care contează nu e „știu Iterable".** E: *„am scris un analizor, l-am rulat pe 600 de
template-uri și uite ce distribuție de clustere iese."* A doua e mai puternică decât orice certificare,
și e adevărată după două weekenduri.

---

## Mișcarea cu cel mai mare efect de levier

**Rulez analizorul pe sample-urile reale ale clientului.** Din momentul ăla nu mai sunt candidat, sunt
omul care a făcut deja o parte din muncă. Nimic altceva din lista asta nu schimbă poziția atât de mult
— și e și motivul pentru care faza 3 se face înaintea oricărei certificări.
