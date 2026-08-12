# Briefing tehnic: migrare SFMC → Iterable

Pentru call-ul de vineri 2026-08-14, 15:00. Companion la
[`razvan-iterable-migration.md`](razvan-iterable-migration.md) — acolo e strategia, aici e substanța.

Obiectiv: 10 minute de conversație credibilă. Nu mastery. Vorbești 30% din timp.

---

## 0. Dacă reții doar trei propoziții

1. **„În SFMC, logica reală de segmentare nu stă în Journey Builder — stă în SQL-urile din Automation
   Studio. Iterable nu are echivalent pentru asta, și de obicei blocul ăsta lipsește din estimare."**
2. **„Prima decizie în Iterable — tipul de proiect și cheia de identitate — nu se mai poate schimba
   după aceea. Aia se ia înainte de orice import, nu în timpul lui."**
3. **„La 600 de emailuri, prima întrebare nu e cum le migrăm. E câte dintre ele au trimis efectiv
   ceva în ultimele 12 luni."**

Oricare dintre astea, spusă natural, te scoate din categoria „dev care a citit despre Iterable".

---

## 1. Harta de traducere SFMC → Iterable

Asta e ce trebuie să poți parcurge din cap. Coloana a treia e unde se ascunde munca.

| Salesforce Marketing Cloud | Iterable | Ce se întâmplă la migrare |
| --- | --- | --- |
| Subscriber Key / Contact Key | `userId` sau `email` | **Decizie ireversibilă.** Vezi capcana 1 |
| Data Extension (sendable) | Profil user + Liste / Segmente | Iterable nu are tabele arbitrare |
| Data Extension relațional (non-sendable) | Catalog, event data, sau Data Feed | Fiecare DE trebuie realocat manual |
| Contact Builder + data relationships | Profil user plat + evenimente | **Iterable nu face join-uri.** Datele vin denormalizate |
| Automation Studio + SQL Query Activity | *nu există echivalent* | Vezi capcana 2. Blocul cel mai subestimat |
| Journey Builder journey | Journey | Nu se traduce 1:1, se regândește |
| Entry source = Data Extension | Trigger: eveniment / listă / intrare în segment | Model complet diferit |
| Filter / Filtered DE | Segment (dinamic) | OK dacă datele sunt pe profil |
| Content Builder template + blocks | Template + Snippets | Snippets = biblioteca ta de blocuri reutilizabile |
| AMPscript / SSJS / GTL | Handlebars | **Rescriere, nu conversie** |
| `Lookup()` / `LookupRows()` în AMPscript | *nu există* → profil / Catalog / Data Feed | Vezi capcana 3 |
| Publication List (subscription) | Message Type | Mapare explicită, nu automată |
| Opt-out la nivel de All Subscribers | Global unsubscribe | |
| Send Classification (transactional) | Message Channel marcat transactional | Utilizatorii nu se pot dezabona de la el |
| `%%unsub_center_url%%` | `{{hostedUnsubscribeUrl}}` | Se rupe tăcut dacă îl uiți în cele 600 |
| Business Unit (MID) | Project | **Proiectele Iterable nu împart useri între ele** |
| Triggered Send | Journey pe eveniment / trigger prin API | |
| Sender Authentication Package | Sending domain + DKIM/SPF + IP | Reputația nu se transferă |
| Tracking data views (opens, clicks, sends) | *nu migrează* | Vezi capcana 4 |

Notă despre Business Units: dacă au mai multe BU-uri (per brand sau per țară), întrebarea „un proiect
Iterable sau mai multe?" e o decizie de arhitectură cu consecințe mari — proiectele separate nu văd
userii unul altuia. Și e foarte probabil legată de cele 600 de emailuri, care aproape sigur sunt
variante brand × limbă × etapă.

---

## 2. Capcanele de numit pe call

Alege două. Trei dacă merge conversația. Nu le recita — le strecori ca răspuns la ceva ce zic ei.

### Capcana 1 — Identitatea și tipurile de câmpuri se fixează la început și nu se mai schimbă

Iterable are trei tipuri de proiect: **email-based**, **userId-based** și **hybrid**. Setarea se face
la crearea proiectului și **nu se poate modifica ulterior**. Dacă în CRM-ul lor cheia master e un ID
de contact (cum e de obicei Subscriber Key în SFMC), iar proiectul Iterable se creează email-based,
fiecare sincronizare ulterioară va lucra împotriva modelului. Merge-urile de useri în Iterable sunt
la rândul lor ireversibile.

Al doilea strat, mai subtil: **tipul de dată al unui câmp de profil se deduce la prima scriere și nu
mai poate fi schimbat.** Dacă primul import trimite `"42"` în loc de `42`, câmpul devine string pe
vecie și nu mai poți segmenta pe interval numeric. La fel cu datele calendaristice trimise ca text.
Un import de test făcut neatent otrăvește schema.

> **Formulare:** „Un lucru pe care l-aș vrea clarificat înainte de orice import: tipul de proiect
> Iterable și cheia de identitate nu se mai pot schimba după creare, iar tipurile câmpurilor de
> profil se fixează la primul write. Deci mapping-ul din CRM nu e un pas de execuție — e o decizie
> de arhitectură care se ia în prima săptămână, cu un import de test într-un proiect de sacrificiu."

De ce funcționează: arată că gândești în termeni de decizii ireversibile, ceea ce e exact ce vrea
cineva care plătește o migrare.

### Capcana 2 — Logica reală nu e în Journey Builder, e în Automation Studio *(cea mai bună)*

În majoritatea conturilor SFMC mature, segmentarea nu trăiește în journey-uri. Trăiește în **SQL Query
Activities** rulate pe program în Automation Studio, care populează Data Extensions; Journey Builder
doar citește DE-ul rezultat. Din interfața de journey-uri nu se vede nimic din asta.

Iterable nu are nimic echivalent. Nu poți rula SQL programat peste datele tale în Iterable. Fiecare
query devine una din două:

- **un segment Iterable** — dar numai dacă toate datele de care depinde sunt deja pe profilul userului
  sau în evenimente;
- **un job în stack-ul lor**, care calculează valoarea și o împinge în Iterable ca un câmp de profil.

A doua variantă e muncă de inginerie, la ei, nu la marketing. Și e blocul care lipsește din aproape
orice estimare, fiindcă nimeni nu se uită în Automation Studio când numără journey-uri.

> **Formulare:** „Întrebarea pe care aș pune-o devreme: cât din segmentarea voastră stă în SQL-uri
> programate în Automation Studio, nu în Journey Builder? De obicei acolo e cea mai mare parte a
> logicii, și Iterable nu are echivalent — deci fiecare query devie ori un segment, dacă datele sunt
> deja pe profil, ori un job la voi în stack care calculează și împinge câmpul. Partea aia atinge
> echipa de development, nu doar marketing-ul."

De ce funcționează: e exact perspectiva unui backend dev, nu a unui consultant de marketing. Și e
verificabil adevărată — dacă au SFMC serios, o să confirme imediat, poate cu ușurare.

### Capcana 3 — Consimțământ și dezabonare nu se mapează 1:1

SFMC are trei niveluri de opt-out care coexistă: la nivel de **All Subscribers** (global), la nivel de
**listă**, și la nivel de **Publication List** (preferințe pe tip de conținut) — plus **Send
Classification**, unde un send marcat transactional ocolește dezabonările.

Iterable are propriul model: **global unsubscribe**, **message channel** (marketing vs transactional)
și **message type** în interiorul canalului. Suprapunerea e parțială. Nu există mapare automată — cine
face migrarea decide, iar singurul default sigur este *cea mai restrictivă interpretare câștigă*.

Plus detaliul care se rupe tăcut: linkurile de dezabonare din cele 600 de template-uri arată spre
SFMC. Trebuie să devină `{{hostedUnsubscribeUrl}}`. Un template migrat cu link vechi trimite oameni
către un centru de preferințe al unui sistem pe care l-ai stins.

> **Formulare:** „Aici nu e o mapare, e o decizie. SFMC are opt-out pe trei niveluri plus send
> classification, Iterable are global, canal și message type. Se suprapun parțial. Regula pe care aș
> aplica-o e: în caz de ambiguitate, câștigă interpretarea cea mai restrictivă — la GDPR, o greșeală
> aici nu e bug, e expunere legală."

### Capcana 4 — Istoricul de engagement nu vine cu tine *(rezervă)*

Opens, clicks, sends rămân în SFMC. În ziua 1 pe Iterable, orice segment de tip „a deschis în ultimele
90 de zile" e gol. Adică fiecare journey de reactivare, win-back sau supresie pe inactivitate e mort
la cutover și rămâne subțire vreo trei luni.

Mitigare concretă: backfill al câtorva câmpuri sumar pe profil (`lastOpenAt`, `lastClickAt`, un scor
de engagement) prin bulk update, plus păstrarea accesului read-only la SFMC pentru o perioadă. Nu e
migrare de istoric, e migrare de *derivate* — suficient cât să funcționeze segmentarea.

### Capcana 5 — Deliverability impune cutover pe etape *(rezervă)*

Domeniu nou de trimitere și IP nou înseamnă warm-up. Reputația nu se transferă între ESP-uri. Dacă
la prima trimitere pe IP rece bagi lista întreagă, inclusiv inactivii de doi ani, ajungi în spam și
strici reputația de la start.

Consecință de proiect, nu doar tehnică: **nu poate exista big bang**. Se merge campanie cu campanie,
în paralel, începând cu segmentele cele mai angajate, cu volum crescător. Asta trebuie să fie în plan
de la început, altfel deadline-ul e fictiv.

---

## 3. Blocul de 600 de emailuri — metoda

Ăsta e terenul tău. E refactoring, nu email marketing. Patru pași, în ordine.

**Pas 0 — întâi omori, apoi migrezi.**
Cere logurile de trimitere pe ultimele 12–18 luni. În conturi cu 600 de template-uri, o parte
consistentă nu a trimis nimic de un an. Fiecare template eliminat înainte de analiză e muncă
economisită de trei ori: nu îl clusterizezi, nu îl rescrii, nu îl testezi.

> „Prima întrebare la 600 nu e cum le migrăm. E câte au trimis efectiv ceva anul trecut. De obicei
> numărul real cu care lucrezi e semnificativ mai mic, și e cea mai ieftină reducere din tot proiectul."

**Pas 1 — clusterizare pe patru axe.**
Limbă / piață · brand sau business unit · etapă de lifecycle · structură de layout.
600 înseamnă tipic ceva de genul 40 de mesaje reale × 3 limbi × câteva variante.

**Pas 2 — separă tipurile de variație.** Aici e insight-ul real, și e unul de inginer:

| Ce variază | Unde se rezolvă în Iterable |
| --- | --- |
| Layout / structură | Un template + Handlebars conditionals + Snippets |
| Conținut (produse, prețuri, oferte) | Catalog, Data Feed, sau câmpuri de profil |
| Audiență / momentul trimiterii | *Același* template, journey diferit |

Cine nu face distincția asta ajunge fie la 600 de template-uri în sistemul nou, fie la un singur
template monstruos pe care nu-l mai poate întreține nimeni. Consolidarea corectă înseamnă să muți
variația la nivelul potrivit, nu să o comprimi.

**Pas 3 — fiecare `Lookup()` din AMPscript e un item de lucru.**
În SFMC, un template poate interoga orice Data Extension la momentul trimiterii. În Iterable,
Handlebars vede doar ce e pe profilul userului, în payload-ul evenimentului, într-un Catalog, sau ce
vine dintr-un **Data Feed** — un endpoint HTTP apelat la send time și îmbinat în context.

Deci fiecare `Lookup()` din cele 600 devine ori un câmp de profil, ori un item de catalog, ori un
endpoint pe care cineva trebuie să-l construiască **și să-l opereze**. Data Feeds sunt puternice și
sunt cheia consolidării, dar introduc o dependență la runtime: dacă endpointul e lent sau pică,
afectează trimiterea. Feed-urile dinamice, cu merge tags în URL, se cachează prost — un apel per user.

**Pas 4 — numărul realist.**
„Wenige" nu e un număr. Realist ajung la ceva de ordinul a **10–25 de template-uri de bază plus o
bibliotecă de snippets**, nu la 5. Spune asta pe call. Nu e ce vor să audă, și exact de asta te crede.

> „600 pot fi 8 template-uri sau 80, și diferența e de câteva ori efortul. Nu dau niciun număr până nu
> văd 20–30 de sample-uri. Ce pot să-ți spun deja e că răspunsul realist e mai aproape de 15–20 decât
> de 3, și dacă cineva îți promite 3, ori nu s-a uitat în ele, ori construiește ceva ce nu întreții."

---

## 4. „Ai mai făcut o migrare completă pe Iterable?"

Patru propoziții, exersate cu voce tare. Fără scuze, fără explicații lungi.

> „Nu, migrare completă de pe SFMC nu am condus. Am integrat Iterable în producție la ImmoScout24,
> deci modelul de date și API-ul le cunosc din mână. Migrări legacy am condus — la RWE, Java către
> NestJS, feliat și acoperit cu teste, nu rescris dintr-o bucată. Blocul de 600 de emailuri e o
> problemă de refactoring și modelare de date, care e exact ce fac; hai să-ți spun cum aș ataca-o și
> ce aș vrea să verific în primele două săptămâni."

Și treci imediat mai departe. Pauza de după „nu" e ce te costă, nu răspunsul.

Dacă întreabă adânc despre SFMC și te simți la limită:

> „SFMC îl cunosc ca sistem-sursă — ce trebuie scos din el și în ce formă. Nu l-am operat zilnic. La o
> migrare contează mai puțin decât pare, fiindcă tot ce iese de acolo se rescrie oricum."

Onest, și adevărat.

---

## 5. Arcul de 10 minute

1. **Ei vorbesc primii.** „Povestește-mi de unde a pornit — ce vă face să migrați *acum*?" Motivul
   (contract care expiră, cost, o limită tehnică, un om care a plecat) îți spune totul despre urgență
   și buget.
2. **Asculți și pui o singură întrebare tehnică ascuțită** — cea cu Automation Studio. E momentul în
   care se schimbă tonul conversației.
3. **Numești o capcană**, nu trei. Cea care se leagă de ce tocmai au zis.
4. **Poziționarea onestă**, dacă întreabă. Fără să aștepți să întrebe, dacă simți că plutește.
5. **Blocul de 600** — metoda, pe scurt, plus refuzul politicos de a da un număr.
6. **CTA:** 20–30 de sample-uri de emailuri, plus o evaluare de scope în trei zile.

---

## 6. Ce nu faci

- **Nu te dai expert SFMC.** Ei probabil îl cunosc mai bine decât tine. Poziția ta e „inginer care
  știe Iterable și știe migrări", nu „consultant SFMC".
- **Nu dai număr** — nici zile, nici tarif. Întrebarea se întoarce: *care e bugetul proiectului?*
- **Nu promiți 600 → 5.**
- **Nu inventezi nume de feature-uri Iterable.** Dacă nu ești sigur: „asta verific și îți confirm
  luni." Un dev care spune asta e mai credibil decât unul care nu greșește niciodată.
- **Nu vorbești mai mult de 30%.** E get-to-know. Cine pune întrebările controlează impresia.

---

## 7. Întrebări de trimis în scris înainte de vineri

Peste cele patru din fișierul de account, două care merită adăugate — ambele te fac să pari că ai mai
văzut asta:

5. Cât din segmentare stă în SQL-uri programate în Automation Studio, față de Journey Builder?
6. Din cele ~600 de emailuri, câte au trimis efectiv ceva în ultimele 12 luni?

---

## 8. Vocabular — să recunoști termenii dacă apar

**SFMC:** Data Extension (DE) · Subscriber Key · Contact Builder · Journey Builder · Automation Studio
· Query Activity · Content Builder · AMPscript · SSJS · GTL · Publication List · Send Classification ·
Sender Profile · Business Unit (MID) · Triggered Send · All Subscribers.

**Iterable:** User Profile · Custom Event · Catalog · List (statică) · Segment (dinamic) · Journey ·
Template · Snippet · Data Feed · Handlebars / merge tags · Message Channel · Message Type · Project ·
`{{hostedUnsubscribeUrl}}`.

**Din scope-ul german:** *Anbindung* = conectare/integrare · *Datenmodell* = model de date ·
*Entry Audiences* = audiențele de intrare în journey · *Inhalte* = conținut · *voraussichtlich* =
probabil/estimativ · *wenige* = puține (nu e un număr — asta e chiar problema).

---

## Surse verificate

- [Iterable — Project Types and Unique Identifiers](https://support.iterable.com/hc/en-us/articles/9216719179796-Project-Types-and-Unique-Identifiers)
- [Iterable — Field Data Types](https://support.iterable.com/hc/en-us/articles/208183076-Field-Data-Types)
- [Iterable — Managing User Profile Fields](https://support.iterable.com/hc/en-us/articles/206430145-Managing-User-Profile-Fields-in-Iterable)
- [Iterable — Data Feeds Overview](https://support.iterable.com/hc/en-us/articles/204795659-Personalizing-Templates-with-Data-Feeds-)
- [Iterable — Using Data Feeds in Templates](https://support.iterable.com/hc/en-us/articles/39206002278932-Using-Data-Feeds-in-Templates)
- [Iterable — Personalizing Templates with Handlebars](https://support.iterable.com/hc/en-us/articles/205480365-Personalizing-Templates-with-Handlebars)
- [Iterable — Message Channels and Message Types Overview](https://support.iterable.com/hc/en-us/articles/204780529-Message-Channels-and-Message-Types-Overview)
- [Iterable — Creating a Subscription Preference Center](https://support.iterable.com/hc/en-us/articles/208463956-Creating-a-Subscription-Preference-Center)
- [Iterable — Maximizing Email Deliverability](https://support.iterable.com/hc/en-us/articles/205480215-Maximizing-Email-Deliverability)
- [SFMC Query Activity SQL — ghid](https://rizexlabs.com/sfmc-query-activity-sql-guide/)
- [Automation Studio in Marketing Cloud — ghid](https://deselect.com/automation-studio-marketing-cloud-guide/)
