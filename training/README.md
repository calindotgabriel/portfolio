# training/

Execuția zilnică a planului din `../docs/training-plan.md`.

Împărțirea responsabilităților, ca să nu existe două locuri care spun același lucru:

| Unde | Ce răspunde |
| --- | --- |
| Google Calendar | **Când.** Blocurile de timp, alarmele, granițele. |
| `../docs/training-plan.md` | **De ce.** Diagnosticul, metodele, regulile fiecărui bloc. |
| `curriculum.md` | **Ce fac azi.** 48 de zile, cu problemele și topicurile numite. |
| `log.md` | **Ce am făcut.** Un rând pe zi. Memoria sistemului. |
| `redo.md` | **Ce nu s-a prins încă.** Repetiție spațiată la +7 și +21 zile. Tabelele sunt generate. |
| `interview-problems.md` | **Ce m-au întrebat efectiv la interviuri.** Scris de mână, pe categorii. |
| `depth/` | Cele 12 fișe scrise + demo-urile. |
| `design/` | Notițele de la cele 10 prompturi + ce a fost ratat. |
| `../sales/interviews/` | Post-mortems de la interviuri reale și mock-uri. |

## Trackerul

```sh
npm run track:seed     # o singură dată: încarcă cele 48 de zile din curriculum.md
npm run track          # http://localhost:4173
npm run track:export   # regenerează tabelele din log.md și redo.md, pentru git
```

Zero dependențe — folosește `node:sqlite`, nativ în Node 22.5+. Ascultă doar pe `127.0.0.1`,
fără autentificare: e un tool local cu un singur utilizator și **nu trebuie expus în rețea**.

Baza de date e `training/tracker.db` și e gitignorată — e binară și ar intra în conflict la fiecare
merge. **Markdown-ul exportat e înregistrarea care se comite.** Rulează exportul sâmbăta, la
checkpoint, și comiți atunci.

Tabelele dintre markerele `<!-- BEGIN:TABLE -->` și `<!-- END:TABLE -->` din `log.md` și `redo.md`
sunt generate. Nu le edita de mână — se pierd la următorul export. Textul din jur rămâne neatins.

## Bucla zilnică

1. **10:00** — `npm run track`. Îți arată ziua N și cele trei blocuri din curriculum.
2. Faci blocurile de pe rând.
3. **15:15** — completezi formularul zilei. Se salvează singur. Ce ai ratat adaugi în redo — datele
   de +7 și +21 se calculează automat.
4. **17:30** — stop. Brain dump pe hârtie. Se închide tot.

Dacă trackerul nu pornește dintr-un motiv oarecare, `log.md` și `redo.md` rămân fișiere markdown
obișnuite. Scrii rândul de mână și îl aliniezi la următorul export. Tool-ul e comoditate, nu
dependență.

## Bucla săptămânală

**Sâmbătă 11:45** — aduni coloanele săptămânii din `log.md`, le treci în tabelul de checkpoint din
`../docs/training-plan.md` și în fișierul din `../sales/weekly/`. Apoi check-in-ul personal la 12:45,
care e o întrebare diferită și rămâne separat de cifre.

## Regula împotriva abandonului

Zilele ratate **nu se recuperează**. Sari peste ele și continui de la data de azi. Singurul lucru care
se recuperează e `redo.md`, pentru că el conține exact ce n-a intrat încă.

O săptămână la 60% e o săptămână bună. Încercarea de a face 100% după o săptămână slabă e cel mai
sigur mod de a ajunge la 0% în săptămâna următoare.
