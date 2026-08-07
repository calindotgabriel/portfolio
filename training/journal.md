# Jurnal

Scriu aici tot. Cel mai nou sus. Adaug, nu rescriu.

**Taguri:** `#log` ziua · `#redo` problemă de refăcut · `#problema` enunț din interviu real ·
`#nota` orice altceva.

Post-mortemurile de la interviuri și mock-uri stau separat, câte un fișier în `../sales/interviews/`.
Aici le menționez cu o linie și un link.

**Redo:** o problemă ratată se reface la **+7** și **+21** de zile. Scriu ambele date în intrare.
Ratată din nou → resetez de la data nouă. A treia resetare nu mai e problemă de repetiție, e gol de
fundament: tratez categoria, nu problema.

**O zi ratată primește totuși intrare, cu 0.** Golurile din jurnal sunt informație; rândurile lipsă
mă fac să cred peste o lună că săptămâna aia n-a existat.

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
