# Curriculum Iterable — 10 sesiuni × 55 min

Scop: să pot conduce o discuție tehnică de migrare fără să improvizez. Nu certificare de dragul
certificării — deși examenul e gratis și îl dau la final, ca verificare.

Pereche cu [`sfmc-iterable-lab.md`](sfmc-iterable-lab.md), care e proiectul de cod. Aici e ordinea de
învățare; acolo e ce construiesc.

**Structura fiecărei sesiuni:** ~25 min citit/curs, ~30 min exercițiu local. Fără exercițiu, sesiunea
nu se marchează făcută. Am citit destul despre platformele astea deja — problema nu mai e input-ul.

---

## Verificarea de 5 minute, înainte de sesiunea 1

**Încearcă să-ți faci cont pe [academy.iterable.com](https://academy.iterable.com/).** Nu e confirmat
public dacă înscrierea e deschisă și non-clienților. Două rezultate, ambele OK:

- **Merge** → urmez Academy ca sursă principală, docs ca referință.
- **Nu merge** (cere credențiale de client) → merg integral pe
  [support.iterable.com](https://support.iterable.com/), care e public, complet și de calitate. Tot
  briefing-ul tehnic de până acum vine de acolo.

De-aia fiecare sesiune de mai jos are **și** modulul Academy, **și** echivalentul din docs publice.
Curriculumul funcționează în ambele cazuri.

---

## Sesiunile

### S1 — Model de date și identitate ⭐
**Academy:** Foundations — projects, users, user profiles
**Docs:** *Project Types and Unique Identifiers* · *Field Data Types* · *Managing User Profile Fields*
**Exercițiu:** proiectez schema de profil Iterable pentru datele SFMC sintetice. Scriu în fișier
decizia de tip de proiect (email / userId / hybrid) **cu justificarea**, și tabelul de tipuri pentru
fiecare câmp.
**Gata când:** pot explica în două propoziții de ce am ales tipul de proiect, și am o listă de câmpuri
cu tipul fiecăruia fixat conștient, nu întâmplător.

### S2 — Evenimente și modelul plat ⭐
**Academy:** custom events, commerce events
**Docs:** *Events Overview* · *Managing Custom Events*
**Exercițiu:** iau `Subscribers` + `Orders` + `Products` din setul relațional și le denormalizez în
profil + evenimente, ca JSON. Ce urcă pe profil, ce devine eveniment, ce n-are unde să meargă.
**Gata când:** pot arăta un profil și un stream de evenimente care conțin tot ce conțineau cele trei
tabele — sau pot numi exact ce s-a pierdut și de ce.

*Asta e abilitatea centrală a migrării. Dacă fac o singură sesiune bine, asta e.*

### S3 — Segmente și triajul SQL
**Academy:** segmentation, lists vs segments
**Docs:** *Creating a Segmentation Query* · *Segmentation Reference*
**Exercițiu:** iau 5 query-uri SFMC scrise în lab și le trec prin cele trei găleți — segment / câmp
calculat / datele trebuie întâi aduse. Pentru cele care devin segmente, le scriu în pseudo-sintaxa de
segment builder.
**Gata când:** știu unde e granița reală între ce face segment builder-ul și ce trebuie precalculat.
*(Granița de agregare nu e clară în docs — asta e sesiunea în care o clarific.)*

### S4 — Template-uri și Handlebars
**Academy:** templates, snippets
**Docs:** *Personalizing Templates with Handlebars* · *Handlebars Reference: Built-In Merge Tags*
**Exercițiu:** convertesc 3 template-uri AMPscript în Handlebars, local, și le randez cu pachetul
`handlebars` peste profile false. Unul dintre ele să aibă un `Lookup()`.
**Gata când:** știu ce se întâmplă cu `Lookup()`-ul — pe profil, în catalog, sau data feed — și pot
justifica alegerea.

### S5 — Data Feeds și Catalogs
**Docs:** *Data Feeds Overview* · *Using Data Feeds in Templates* · *Managing Data Feeds*
**Exercițiu:** un endpoint Express minuscul care servește JSON, plus un template randat împotriva lui.
Testez și ce se întâmplă când endpointul e lent sau pică.
**Gata când:** pot explica de ce un data feed dinamic se cachează prost și ce înseamnă asta la send
time.

### S6 — Journeys și triggere
**Academy:** journeys, triggers, entry criteria
**Docs:** journeys section
**Exercițiu:** iau 3 journey-uri SFMC din lab și le mapez pe structura Iterable — pe hârtie. Pentru
fiecare, notez **ce date trebuie să ducă triggerul** ca template-ul să poată randa.
**Gata când:** lanțul `model de date → trigger → ce randează template-ul` e evident, nu teoretic.

### S7 — Canale, message types, consimțământ
**Docs:** *Message Channels and Message Types Overview* · *Best Practices* · *Creating a Subscription
Preference Center* · *Subscribe and Unsubscribe Events*
**Exercițiu:** scriu rezolvatorul „cel mai restrictiv câștigă", cu suită de teste pe cazuri
contradictorii — surse care se contrazic, date lipsă, granularitate care nu se potrivește, transactional
abuzat.
**Gata când:** testele trec și pot apăra fiecare default în fața cuiva care întreabă de ce.

### S8 — API și încărcare în masă
**Docs:** API reference — `/api/users/update`, `/api/users/bulkUpdate`, `/api/events/track`,
`/api/lists/subscribe`
**Exercițiu:** mock-ul de server din faza 6 a labului, **cu inferență de tip și imutabilitate**. Apoi
loaderul care duce datele sintetice în el.
**Gata când:** serverul meu respinge un `42` pentru că primul write a fost `"42"`, și înțeleg de ce
asta e o decizie de arhitectură, nu un bug.

### S9 — Deliverability și cutover
**Docs:** *Maximizing Email Deliverability*
**Exercițiu:** scriu planul de cutover pe etape pentru contul sintetic — ce segmente pleacă primele,
ce volume, pe câte săptămâni.
**Gata când:** am un plan cu date și volume, nu cu principii.

### S10 — Examenul Foundations
Gratuit, open-book, ~40 de întrebări, prag 80%, valabil 24 de luni, certificat pentru LinkedIn.
**Gata când:** e trecut. Dacă pică, e semnal despre ce am sărit, nu despre inteligență.

---

## Ordinea, și de ce nu e ordinea Academy

Academy predă pentru cineva care **operează** Iterable. Mie îmi trebuie ordinea pentru cineva care
**migrează pe** Iterable. De-aia modelul de date și evenimentele sunt primele două, iar journey-urile
abia la 6 — journey-urile sunt ușoare odată ce datele au sens, și imposibil de gândit înainte.

Dacă tai din curriculum, ordinea de importanță e: **S2 > S1 > S3 > S8 > S4 > restul.**

---

## Unde se ține evidența

Fiecare sesiune produce ceva scris sau cod, în repo. La final, `#nota` în
[`../journal.md`](../journal.md) cu ce am înțeles și ce a rămas neclar. Neclarul e mai valoros decât
înțelesul — e lista de întrebări pentru următorul call.
