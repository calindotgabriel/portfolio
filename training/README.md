# training/

Execuția zilnică a planului din `../docs/training-plan.md`. Doar fișiere markdown — fără tool, fără
bază de date, fără nimic de pornit.

| Unde | Ce răspunde |
| --- | --- |
| Google Calendar | **Când.** Blocurile de timp, alarmele, granițele. |
| `../docs/training-plan.md` | **De ce.** Diagnosticul, metodele, regulile fiecărui bloc. |
| `curriculum.md` | **Ce fac azi.** 48 de zile, cu problemele și topicurile numite. |
| `journal.md` | **Ce am făcut.** Tot ce scriu, cu taguri. Memoria sistemului. |
| `journal-manual.md` | Referință: exemple pentru fiecare tip de intrare. Se citește, nu se scrie. |
| `depth/` | Cele 12 fișe scrise + demo-urile. |
| `design/` | Notițele de la cele 10 prompturi + ce a fost ratat. |
| `../sales/interviews/` | Post-mortems de la interviuri și mock-uri, câte un fișier. |

## Cum deschid jurnalul

Obsidian deschide **foldere ca vault**, nu fișiere — de asta nu merge dublu-click pe `journal.md`.

1. Obsidian → *Open folder as vault* → rădăcina repo-ului (nu fișierul, nu `training/`).
2. Settings → Files & Links → **Excluded files**: `node_modules`, `dist`, `.astro`.
   Fără asta, cele ~560 de `.md` din `node_modules` îmi îngroapă cele ~89 ale mele la fiecare căutare.

Rădăcina și nu `training/`, pentru că post-mortemurile stau în `../sales/interviews/` — un singur vault
le acoperă pe amândouă și pot lega o intrare direct de un post-mortem.

Cele patru taguri sunt taguri Obsidian native: click pe `#redo` îmi arată tot ce e de refăcut, click pe
`#problema` toate enunțurile din interviuri. Panoul de taguri **e** cititul de sâmbătă.

`.obsidian/` e gitignorat.

## Bucla zilnică

1. **10:00** — deschid `curriculum.md`, caut data de azi, fac cele trei blocuri de pe rând.
2. **15:15** — scriu o intrare `#log` în `journal.md`. Ce am ratat primește o intrare `#redo`, cu
   datele +7 și +21 scrise în ea.
3. **17:30** — stop. Brain dump pe hârtie. Se închide tot.

După fiecare interviu sau mock, în maximum 2 ore: un fișier în `../sales/interviews/`, plus o linie
în jurnal care îl menționează.

## Bucla săptămânală

**Sâmbătă 11:45** — citesc intrările săptămânii din `journal.md` și completez tabelul de checkpoint
din `../docs/training-plan.md`. Apoi check-in-ul personal la 12:45, care e o întrebare diferită și
rămâne separat de cifre.

## Regula împotriva abandonului

Zilele ratate **nu se recuperează**. Sar peste ele și continui de la data de azi. Singurul lucru care
se recuperează sunt intrările `#redo`, pentru că ele conțin exact ce n-a intrat încă.

O săptămână la 60% e o săptămână bună. Încercarea de a face 100% după o săptămână slabă e cel mai
sigur mod de a ajunge la 0% în săptămâna următoare.
