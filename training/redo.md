# Redo list — repetiție spațiată

Orice problemă pe care **nu ai rezolvat-o în cronometru, din prima, narând** intră aici. Nu contează
că ai înțeles soluția după. Înțelegerea soluției altcuiva și producerea ei sub presiune sunt lucruri
diferite — iar al doilea e cel care se testează în interviu.

## Regula

O problemă ratată se reface la **+7 zile** și la **+21 de zile** de la data ratării.

- Dacă la +7 o rezolvi în timp → rămâne programată la +21.
- Dacă la +7 o ratezi din nou → se resetează, +7 și +21 de la data nouă.
- Dacă la +21 o rezolvi în timp → **iese din listă**, o muți la Închise.
- O problemă care ajunge la a treia resetare nu e o problemă de repetiție, e un gol de fundament.
  Mut-o în lista de goluri de mai jos și tratează categoria, nu problema.

Sâmbăta e rezervată exclusiv pentru redo. Dacă lista e goală sâmbăta, faci probleme noi din categoria
săptămânii — dar asta se întâmplă rar și e un semn bun.

## Listele

**Goluri de fundament** sunt categorii, nu probleme. Acolo ajunge automat orice a fost resetat de trei
ori. Se tratează citind teoria categoriei, nu făcând mai multe repetări.

> Tabelele de mai jos sunt **generate** din `training/tracker.db` de `npm run track:export`.
> Nu le edita de mână — se pierd la următorul export. Adaugi și marchezi rezultate prin UI:
> `npm run track`. Textul din afara markerelor rămâne neatins.

<!-- BEGIN:TABLE -->
### Active

| Problemă | Categorie | Ratată | Scadent +7 | Scadent +21 | Rezultat +7 | Rezultat +21 |
| --- | --- | --- | --- | --- | --- | --- |
| Move Zeroes | two pointers | 2026-08-07 | 2026-08-14 | 2026-08-28 |  |  |

### Goluri de fundament

| Gol | De unde a venit | Data | Resetări | Închis |
| --- | --- | --- | ---: | --- |
|  |  |  |  | |

### Închise

| Problemă | Categorie | Ratată prima dată | Închisă |
| --- | --- | --- | --- |
|  |  |  | |
<!-- END:TABLE -->

---

**De ce +7 și +21:** intervale crescătoare produc retenție mult mai bună decât repetarea deasă. O
problemă refăcută mâine se rezolvă din memoria de scurtă durată și nu dovedește nimic. Una refăcută
peste trei săptămâni se rezolvă din înțelegere.

**Ce NU e redo list-ul:** o listă de rușine. E lista lucrurilor care încă nu s-au automatizat. Dacă
la sfârșitul celor 8 săptămâni are 15 intrări închise, alea sunt 15 lucruri pe care le poți face sub
presiune și pe care în august nu le puteai.
