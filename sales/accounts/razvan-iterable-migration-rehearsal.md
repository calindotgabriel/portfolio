# Fișă de repetiție — call Iterable, vineri 2026-08-14, 15:00

Substanța e în [`razvan-iterable-migration-briefing.md`](razvan-iterable-migration-briefing.md).
Strategia e în [`razvan-iterable-migration.md`](razvan-iterable-migration.md).
**Aici e doar ce repeți cu gura, de unde vine, și ce risc acoperă.**

Principiu: un get-to-know se pierde în trei momente — primele 60 de secunde, întrebarea „ai mai făcut
asta?", și întrebarea de tarif. Restul e conversație. Deci repeți disproporționat de mult acele trei
momente, și aproape deloc restul.

Regula de bază: **cu voce tare, în picioare, cronometrat.** Citit în gând nu contează ca repetiție.

---

## Cele 9 blocuri

Fiecare bloc: ce spui · de unde vine · ce risc acoperă · cum știi că l-ai terminat.

---

### B1 — Deschiderea despre tine (40 de secunde, nu mai mult)

> „Sunt backend dev senior, Node și TypeScript. Momentan lucrez la Bitpanda, pe custodie
> instituțională de crypto pentru bănci. Iterable l-am integrat în producție la ImmoScout24 — platformă
> React/Node pe AWS. Și am condus migrări de sisteme legacy, cea mai mare la RWE, Java către NestJS.
> Din ce mi-a trimis Razvan, partea care mi-a sărit în ochi e blocul de 600 de emailuri — dar hai să-mi
> spui tu întâi de unde a pornit tot proiectul."

**De unde:** Snapshot + Entry Strategy din fișierul de account; rolul Bitpanda din memorie.
**Risc acoperit:** primele 60 de secunde fixează categoria în care te pun. Fără o deschidere
exersată, ori divaghezi, ori suni ca un CV citit.
**Criteriu de trecere:** sub 45 de secunde, cronometrat, și se termină cu o întrebare către ei.
Dacă durează un minut, ai pierdut deja jumătate din avantaj.

**De ce se termină cu întrebare:** predai mingea imediat. Ei trebuie să vorbească 70%.

---

### B2 — Întrebarea „de ce acum"

> „Ce vă face să migrați *acum*? E un contract care expiră, costul, o limită tehnică în care ați dat?"

**De unde:** Pre-Call Questions, secțiunea de pe call.
**Risc acoperit:** fără răspunsul ăsta nu știi dacă e proiect real sau explorare, și nu poți calibra
nimic după. E singura întrebare care schimbă tot ce urmează.
**Criteriu:** o pui în primele 3 minute, și **taci după ea.** Repetă tăcerea, nu întrebarea.

---

### B3 — „Ai mai făcut o migrare completă pe Iterable?" ⚠️ blocul cel mai important

> „Nu, migrare completă de pe SFMC nu am condus. Am integrat Iterable în producție la ImmoScout24,
> deci modelul de date și API-ul le cunosc din mână. Migrări legacy am condus — la RWE, Java către
> NestJS, feliat și acoperit cu teste, nu rescris dintr-o bucată. Blocul de 600 de emailuri e o
> problemă de refactoring și modelare de date, care e exact ce fac; hai să-ți spun cum aș ataca-o și
> ce aș vrea să verific în primele două săptămâni."

**De unde:** briefing §4, dezvoltat din Positioning în fișierul de account.
**Risc acoperit:** singurul moment în care poți pierde call-ul în trei secunde. Nu prin răspuns —
prin *ezitarea dinaintea lui*. O pauză înainte de „nu" citește ca jenă, și jena citește ca lipsă de
competență.
**Criteriu de trecere:** sub 25 de secunde, **zero pauză înainte de „Nu"**, și se termină pe pivot
(„hai să-ți spun cum aș ataca-o"), nu pe scuză. Înregistrează-te pe telefon și ascultă-te o dată —
e singurul bloc unde merită efortul ăsta.

**Greșeala de evitat:** să explici de ce nu ai făcut, sau să adaugi „dar cred că..." Spui nu, apoi
spui ce ai. Fără punte de scuze între ele.

---

### B4 — Capcana Automation Studio (blocul care mută percepția)

> „O întrebare pe care aș pune-o devreme: cât din segmentarea voastră stă în SQL-uri programate în
> Automation Studio, nu în Journey Builder? De obicei acolo e cea mai mare parte a logicii, și
> Iterable nu are echivalent — deci fiecare query devine ori un segment, dacă datele sunt deja pe
> profilul userului, ori un job la voi în stack care calculează și împinge câmpul. Partea aia atinge
> echipa de development, nu doar marketing-ul."

**De unde:** briefing §2, capcana 2.
**Risc acoperit:** riscul de a fi perceput ca „dev care a citit despre Iterable ieri". Ăsta e blocul
care demonstrează că înțelegi *unde se ascunde munca*, nu doar cum se numesc feature-urile.
**Criteriu:** îl poți spune fără să te uiți, și poți continua natural dacă te întreabă „și cât
înseamnă asta?" — răspuns: *„depinde câte queries sunt și de ce date depind; e prima listă pe care
aș cere-o."*

**Când îl folosești:** când ajung ei să vorbească despre journeys sau despre date. Nu îl arunci la
întâmplare — îl legi de ce tocmai au zis.

---

### B5 — Capcana deciziilor ireversibile

> „Un lucru pe care l-aș vrea clarificat înainte de orice import: tipul de proiect Iterable și cheia
> de identitate nu se mai pot schimba după creare, iar tipurile câmpurilor de profil se fixează la
> primul write. Deci mapping-ul din CRM nu e un pas de execuție — e o decizie de arhitectură care se
> ia în prima săptămână, cu un import de test într-un proiect de sacrificiu."

**De unde:** briefing §2, capcana 1 (verificat în documentația Iterable).
**Risc acoperit:** acoperă direct blocul 1 din scope-ul lor („Mappings unserer Daten in das
Iterable-Datenmodell"). Arată că gândești în termeni de ce nu se mai poate repara.
**Criteriu:** îl spui în 20 de secunde fără să încurci cele două lucruri (tipul de proiect ≠ tipul
de câmp). Sunt două capcane separate, ambele ireversibile.

**Rezervă, dacă cere una în plus:** consimțământ/dezabonare (briefing capcana 3) sau istoricul de
engagement care nu migrează (capcana 4). Alegi în funcție de ce i-a preocupat pe ei.

---

### B6 — Blocul de 600 + refuzul de a da un număr

> „Prima întrebare la 600 nu e cum le migrăm — e câte au trimis efectiv ceva în ultimele 12 luni. De
> obicei numărul real e mult mai mic, și e cea mai ieftină reducere din tot proiectul. După aia le
> clusterizezi pe limbă, brand, etapă de lifecycle și structură, și separi ce variază: layout-ul se
> rezolvă cu un template și snippets, conținutul cu catalog sau data feed, audiența cu journey-uri
> diferite pe același template. 600 pot fi 8 template-uri sau 80, și diferența e de câteva ori
> efortul. Nu dau niciun număr până nu văd 20–30 de sample-uri. Ce pot să-ți spun deja e că răspunsul
> realist e mai aproape de 15–20 decât de 3."

**De unde:** briefing §3.
**Risc acoperit:** blocul ăsta e 70% din proiectul lor. Dacă aici suni vag, nu contează restul. Și
finalul — „mai aproape de 15–20 decât de 3" — e mișcarea de credibilitate: le spui ce nu vor să audă.
**Criteriu:** îl poți spune în sub 60 de secunde, și **nu cedezi** dacă insistă pentru un număr.
Repetă exact scenariul: cineva zice „dar aproximativ, cât ar dura?" și tu răspunzi tot cu asta.

---

### B7 — Tariful și bugetul

> „Care e bugetul alocat pentru proiect?"

Și dacă insistă să dai tu primul:

> „Depinde mult de forma colaborării și de durată. Ca să-ți dau un număr care înseamnă ceva, aș vrea
> întâi să văd sample-urile — dar dacă ai nevoie de un ordin de mărime ca să știi dacă are sens să
> continuăm, spune-mi tu în ce interval vă încadrați și îți zic direct dacă lucrez acolo."

**De unde:** Commercial Posture din fișierul de account (ancoră 55–65 €/h, prag lung 35 €/h efectiv).
**Risc acoperit:** cine spune primul numărul pierde. Și un număr dat înainte de a ști scope-ul, la un
proiect cu 600 de emailuri neanalizate, e cel mai scump minut din call.
**Criteriu:** poți întoarce întrebarea de **două ori** la rând fără să sune evaziv. Repetă a doua
întoarcere, nu prima — prima e ușoară, a doua e cea care cedează de obicei.
**Fără fixed price.** Cu scope nedefinit, un preț fix mută tot riscul la tine.

---

### B8 — Ieșirile de siguranță

Când nu știi. Două variante, ambele te fac să pari mai serios, nu mai puțin:

> „Asta nu știu exact — o verific și îți confirm luni."

> „SFMC îl cunosc ca sistem-sursă, ce trebuie scos din el și în ce formă. Nu l-am operat zilnic. La o
> migrare contează mai puțin decât pare, fiindcă tot ce iese de acolo se rescrie oricum."

**De unde:** briefing §4 și §6.
**Risc acoperit:** cel mai mare risc într-un call de credibilitate nu e să nu știi ceva — e să
improvizezi. Un feature Iterable inventat, prins de cineva care cunoaște platforma, anulează tot
call-ul.
**Criteriu:** îți vine automat. Repetă-l până nu mai trebuie să te gândești la el — exact fiindcă
o să-l folosești într-un moment în care nu ai timp să te gândești.

---

### B9 — Închiderea

> „Ce mi-ar folosi cel mai mult ca pas următor: un sample de 20–30 de emailuri din cele 600, cât mai
> diferite între ele. Mă uit peste ele și îți dau o evaluare de scope în trei zile — câte clustere
> reale sunt acolo și ce înseamnă asta ca efort. Fără angajament de nicio parte."

**De unde:** CTA din Entry Strategy.
**Risc acoperit:** call-uri bune care se termină în „ne mai auzim" mor. Un pas mic acceptat bate un
contract mare discutat.
**Criteriu:** îl spui **tu**, înainte să se termine call-ul, nu aștepți să întrebe ei. Repetă-l ca
ultimul lucru, ca să nu-l uiți.

---

## Calendar de repetiție

Ai două zile. Total ~2 ore, împărțite. Mai bine trei sesiuni scurte decât una lungă.

### Miercuri (azi), 35 de minute

1. Citește briefing-ul o dată, cap-coadă. O singură dată. (10 min)
2. **B3** cu voce tare × 5, cronometrat. Înregistrează ultima pe telefon și ascult-o. (10 min)
3. **B4** cu voce tare × 3. (5 min)
4. Trimite în scris cele 6 întrebări pre-call (4 din account + 2 din briefing §7). (10 min)

Întrebările trimise azi contează dublu: dacă răspund înainte de vineri, intri pe call cu informație
pe care nimeni nu ți-a dat-o gratis, și deja arăți ca cineva care lucrează la problemă.

### Joi, 45 de minute

1. Toate cele 9 blocuri, cu voce tare, o trecere. (20 min)
2. **B3, B6, B7** încă o dată fiecare — cele trei cu risc real. (15 min)
3. Simulare de presiune: pune-ți singur, cu voce tare, cele trei întrebări incomode și răspunde
   imediat, fără să te uiți în fișier: (10 min)
   - „Deci n-ai mai făcut asta niciodată?"
   - „Aproximativ cât ar dura? Dă-mi un ordin de mărime."
   - „Poți face un preț fix pe tot proiectul?"

Dacă la vreuna ezitezi mai mult de două secunde, ăla e blocul pe care îl mai repeți vineri.

### Vineri, 14:15–14:45

1. **B1, B3, B6, B7** — o trecere fiecare. Doar astea patru. (15 min)
2. Recitește tabelul de traducere din briefing §1, o dată, fără să-l memorezi. (5 min)
3. Recitește cele trei propoziții din briefing §0. (2 min)
4. **Pauză. Zece minute fără ecran înainte de call.** Nu mai citi nimic după 14:50 — repetiția de
   ultim moment strică fluența, nu o îmbunătățește.

### Dacă ai doar 20 de minute în total

B3 (× 5), B4 (× 3), B7 (× 3), și cele trei propoziții din §0. Atât. În ordinea asta.

---

## Ce ai deschis în timpul call-ului

**Pe ecran, într-un tab:** briefing §1 (tabelul de traducere) și §2 (capcanele). Nu le citești — sunt
plasă de siguranță pentru un nume de feature care îți fuge.

**Pe hârtie, în față, scris de mână:** șase rânduri, atât.

```
1. De ce ACUM?
2. NU. Dar: ImmoScout Iterable prod + RWE migrare. Pivot: "hai să-ți spun cum aș ataca-o."
3. Automation Studio SQL — cât din segmentare e acolo?
4. Tipul de proiect + tipurile de câmpuri: IREVERSIBILE
5. Câte din 600 au trimis anul trecut? Realist 15-20, nu 3.
6. Buget? → întoarce întrebarea. De două ori.
   CTA: 20-30 sample-uri → evaluare de scope în 3 zile
```

Hârtia bate ecranul: o privire în jos citește ca gândire, un scroll citește ca improvizație.

---

## Ce NU repeți

Timp pierdut, listat explicit ca să nu-l pierzi:

- **Termeni SFMC pe de rost.** Dacă apare unul pe care nu-l știi, e în tabel. Și oricum poziția ta nu
  e „expert SFMC".
- **Capcanele 4 și 5** (engagement history, deliverability). Sunt rezerve. Le citești o dată, nu le
  exersezi — dacă ajungi la a treia capcană, call-ul merge deja foarte bine.
- **Sintaxă Handlebars, nume de endpointuri API, detalii de Data Feeds.** E get-to-know. Nimeni nu
  te întreabă asta, și dacă o face, e B8.
- **Un pitch lung despre tine.** B1 e 40 de secunde cu motiv.
- **Răspunsuri la întrebări pe care nu ți le va pune nimeni.** Tentația e să repeți ce te face să te
  simți pregătit. Repetă ce te face să nu pierzi.

---

## Criteriul real de succes

Nu „am zis tot ce știam". Trei lucruri, în ordinea importanței:

1. **Ei au vorbit mai mult decât tine.**
2. **Ai spus cel puțin o dată ceva pe care nu îl știau** — cel mai probabil B4 sau B5.
3. **Ai plecat cu un pas următor concret**, nu cu „ne mai auzim".

Dacă ai bifat toate trei și ai zis „nu" fără ezitare la B3, call-ul a mers bine indiferent cum s-a
simțit.
