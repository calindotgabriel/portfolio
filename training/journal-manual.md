# Manual pentru `journal.md`

Referință. O citesc în prima săptămână, apoi rar. Aici stau exemplele; jurnalul rămâne doar jurnal.

Scopul: la 15:15, după o zi proastă, deschid fișierul ăsta, copiez blocul potrivit și scriu. Fără
să-mi amintesc formatul.

---

## Anatomia unei intrări

```
## 2026-08-10 · ziua 1 #log
```

| Bucată | Regulă |
| --- | --- |
| `##` | Mereu nivel 2. Intrările sunt frați, nu se cuibăresc. |
| `2026-08-10` | Data completă, `YYYY-MM-DD`. Se sortează și se caută corect. |
| `· ziua 1` | Doar la `#log`. Numărul zilei din `curriculum.md`. |
| `#log` | Tagul, ultimul. |
| titlu | Opțional, după tag, la `#redo` și `#problema`: `#redo Move Zeroes · two pointers` |

**Cel mai nou sus**, imediat sub linia `---`. Adaug, nu rescriu.

## Linia de cifre

Prima linie dintr-o intrare `#log`, între backticks:

```
`LC 1/2 · adâncime 1 fișă · design 1 · mock — · aplicări 4 · PM 0`
```

| Câmp | Ce înseamnă |
| --- | --- |
| `LC` | **rezolvate-în-timp / încercate**. Doar prima încercare, în cronometru, narând. |
| `adâncime` | numărul topicului + `citit` / `fișă` / `demo`, sau `—` |
| `design` | numărul promptului, sau `—` |
| `mock` | `coding` / `design` / `—` |
| `aplicări` | câte au plecat |
| `PM` | post-mortemuri scrise azi |

**E opțională.** O intrare cu text și fără cifre e tot o intrare validă. Dar dacă o pun, sâmbăta
citesc opt săptămâni dintr-o privire.

`LC 1/2` înseamnă: am încercat două, una a intrat în cronometru. Nu „am înțeles două".

---

# Tipurile de intrări

## `#log` — ziua

Una pe zi. 60 de secunde. Trei propoziții bat trei paragrafe.

### O zi bună

```md
## 2026-08-12 · ziua 3 #log

`LC 2/2 · adâncime 1 demo · design 1 · mock — · aplicări 4 · PM 0`

Ambele în cronometru, prima dată. Top K Frequent m-a dus întâi spre sortare, dar mi-am prins-o
singur că heap-ul e mai bun înainte să scriu ceva.

Demo-ul de event loop: am prezis greșit ordinea lui `setImmediate` față de `setTimeout(0)`. Merită
o notă separată.
```

### O zi proastă

Aceeași structură. Fără scuze, fără justificări.

```md
## 2026-08-07 · ziua 0 #log

`LC 0/1 · adâncime — · design — · mock — · aplicări 0 · PM 3`

Prima sesiune de live coding, Move Zeroes. A mers prost. Am fugit după ~10 minute — alt tab, apoi
altul. Am ajuns la hashmap pe o problemă care era clar de two pointers.

Descoperirea nu e hashmap-ul, e fuga. Când m-am simțit incompetent, am plecat.
```

### O zi ratată

**Asta e intrarea care se omite cel mai ușor, și cea mai importantă.** O zi fără intrare mă face să
cred peste o lună că săptămâna aia n-a existat. O zi cu zerouri e informație.

```md
## 2026-08-19 · ziua 9 #log

`LC 0/0 · adâncime — · design — · mock — · aplicări 0 · PM 0`

Nimic. Zi proastă.
```

Atât. Nu trebuie explicată.

---

## `#redo` — problemă de refăcut

O problemă pe care **nu am rezolvat-o în cronometru, din prima, narând**. Nu contează că am înțeles
soluția după — înțelegerea soluției altcuiva și producerea ei sub presiune sunt lucruri diferite.

Regula: se reface la **+7** și la **+21** de zile. Scriu ambele date în intrare.

### 1. Creată, după ratare

```md
## 2026-08-07 #redo Move Zeroes · two pointers

Ratată **07.08** → refac la **14.08** și la **28.08**.

Am mers pe hashmap. Hashmap răspunde la „am mai văzut asta?" — o întrebare de căutare. Problema era
despre poziții în același array. Semnalele ratate: *in-place*, *păstrează ordinea relativă*, *array*.
```

### 2. Rezolvată la +7 → păstrează slotul de +21

```md
## 2026-08-14 #redo Move Zeroes · +7 rezolvată

În timp, 9 min. Am văzut two pointers din enunț. Rămâne programată la **28.08**.
```

### 3. Ratată la +7 → resetez ambele date de la ziua de azi

```md
## 2026-08-14 #redo Move Zeroes · +7 RATATĂ · resetări: 1

Iar am ezitat la început. Resetez: refac la **21.08** și la **04.09**.
```

### 4. Rezolvată la +21 → se închide

```md
## 2026-08-28 #redo Move Zeroes · +21 rezolvată · ÎNCHISĂ

În timp, 6 min, narând continuu. Iese din listă.
```

### 5. A treia resetare → nu mai e problemă de repetiție

Trei resetări înseamnă că nu lipsește problema, lipsește categoria. Tratez categoria, nu problema.

```md
## 2026-09-02 #redo Course Schedule · resetări: 3 → GOL DE FUNDAMENT

A treia oară. Nu e problema, e categoria: nu am înțeles topological sort, doar l-am memorat.

Opresc repetițiile. Citesc teoria, fac trei probleme de graf din aceeași familie, apoi reiau.
```

### Cum știu ce e scadent

```sh
grep -n "14.08" training/journal.md
```

Sau vizual: intrările `#redo` au datele îngroșate, se văd la scroll.

---

## `#problema` — enunț dintr-un interviu real

Cele mai valoroase din tot sistemul. Sunt singurele probleme despre care am dovadă că piața asta chiar
mi le cere. Un enunț de la un interviu la care am picat bate zece probleme luate la întâmplare
dintr-o listă.

```md
## 2026-08-09 #problema Rate limiter per user

- **Unde:** <firmă> · ~mijlocul lui iulie · live coding, 45 min
- **Enunț:** „Implementează un rate limiter care permite N cereri pe minut per user. Ce se întâmplă
  când ai mai multe instanțe de server?"
- **Categorie:** system design / practic
- **Ce am făcut atunci:** am scris un contor în Map, per user. Când m-a întrebat de mai multe
  instanțe m-am blocat complet — știam că răspunsul e Redis dar n-am putut articula de ce.
- **Ce a zis intervievatorul:** m-a întrebat de două ori „ce se întâmplă la miezul nopții?" — nu am
  priceput că întreba de fixed window vs sliding window.
- **Status:** neîncercat
```

Statusul se schimbă în loc, pe măsură ce o reiau: `neîncercat` → `ratat` → `rezolvat în timp`.

**Câmpul `Categorie` e cel care contează sâmbăta.** Dacă trei din cinci cad în același loc, ăla e
planul meu real de antrenament, nu curriculumul. Dacă nu știu unde s-o pun, scriu `nu știu încă` — iar
dacă am multe așa, înseamnă că nu recunosc tiparul problemei când o văd, ceea ce e în sine un
diagnostic.

O întrebare repetată de intervievator înseamnă aproape sigur că primul răspuns a ratat. Merită notată
mereu.

---

## `#nota` — orice altceva

Ce nu e nici zi, nici problemă. Scurt.

```md
## 2026-08-13 #nota Răspuns de la Accesa

Recrutor, mail, cere disponibilitate pentru screening săptămâna viitoare. Primul răspuns din piața
locală în 3 zile de când am deschis Clujul.
```

```md
## 2026-08-18 #nota Am zis primul un număr

La discuția cu <firmă> am zis 22k RON înainte să întrebe ei. Regula era invers. Data viitoare
întorc întrebarea.
```

```md
## 2026-08-21 #nota Mock mutat

Am mutat mock-ul de joi pe vineri. Al doilea amânat la rând — semnal, nu accident.
```

Aici intră și deciziile care schimbă planul, ca să existe o urmă a lor.

---

# Ce NU fac

- **Nu rescriu și nu șterg intrări vechi.** Chiar dacă mă fac să arăt prost. Ele sunt datele.
- **Nu sar peste o zi proastă.** Scriu zerourile.
- **Nu scriu eseuri.** Trei propoziții. Intrările lungi încetează să mai fie scrise pe la ziua 12.
- **Nu inventez al cincilea tag.** Patru ajung. Fiecare tag nou e o decizie în plus la 15:15.
- **Nu pun post-mortemuri aici.** Alea stau câte un fișier per interviu în `../sales/interviews/`.
  În jurnal doar le menționez cu o linie.

---

# Cum găsesc lucruri mai târziu

Avantajul unui fișier plat e că se poate căuta.

Comenzile ancorează pe `^## ` ca să prindă intrările, nu legenda tagurilor din antet.

```sh
# tot ce e de refăcut
grep -n "^## .*#redo" training/journal.md

# ce e scadent pe 14 august
grep -n "14.08" training/journal.md

# toate enunțurile din interviuri reale
grep -n "^## .*#problema" training/journal.md

# coloana LC pe toate cele 8 săptămâni, într-o listă
grep -o "LC [0-9]*/[0-9]*" training/journal.md

# zilele în care am scris ceva despre blocaj
grep -in "blocat\|fugit\|tăcut" training/journal.md

# câte zile am scris până acum
grep -c "^## .*#log" training/journal.md
```

Ultima e cea care găsește tiparul. Dacă aceeași propoziție apare de trei ori, nu mai e o observație —
e diagnosticul.

---

# Sâmbăta

Cele patru întrebări sunt scrise la finalul lui `journal.md`, secțiunea *Ce citesc de aici sâmbăta*.
Nu le duplic aici ca să nu ajungă să difere.
