# Jurnal de antrenament — memoria sistemului

**Adaugi un rând la sfârșitul zilei, în blocul de 15:15. Niciodată nu ștergi și nu rescrii.**

Ăsta e singurul loc din tot sistemul care știe ce s-a întâmplat efectiv. Curriculumul spune ce ar
trebui să faci, calendarul spune când — fișierul ăsta e singurul care spune ce ai făcut. Fără el,
peste trei săptămâni „cum merge" redevine o senzație în loc de o cifră, iar senzația într-o perioadă
grea minte constant în jos.

## Cum se completează

Un rând pe zi. 60 de secunde. Dacă o zi a fost ratată, **scrii rândul oricum cu 0** — golurile din
jurnal sunt informație, iar rândurile lipsă te fac să crezi mai târziu că săptămâna aia n-a existat.

- **LC**: `rezolvate-în-timp / încercate`. Doar prima încercare, narând, în cronometru.
- **Adâncime**: numărul topicului + `fișă` / `demo` / `—`
- **Design**: numărul promptului, sau `—`
- **Mock**: `coding` / `design` / `—`
- **Aplicări**: câte au plecat
- **PM**: post-mortems scrise azi (interviuri reale + mock-uri)
- **Notă**: o propoziție. Ce s-a rupt, sau ce a mers neașteptat de bine. Nu mai mult.

## Jurnal

> Tabelul de mai jos e **generat** din `training/tracker.db` de `npm run track:export`.
> Nu-l edita de mână — se pierde la următorul export. Scrii prin UI: `npm run track`.
> Textul din afara markerelor rămâne neatins.

<!-- BEGIN:TABLE -->
| Data | Zi | LC | Adâncime | Design | Mock | Aplicări | PM | Notă |
| --- | ---: | --- | --- | --- | --- | ---: | ---: | --- |
| 07.08 | 0 | 0/1 | — | — | — | 0 | 0 | Am fugit după ~10 min. Hashmap pe o problemă de two pointers. |
<!-- END:TABLE -->

Exemplu de rând completat:

`| 10.08 | 1 | 1/2 | 1 fișă | 1 | — | 4 | 0 | Am blocat 12 min pe Valid Anagram fără să spun nimic cu voce tare |`

## Ce se citește din jurnal sâmbăta

La checkpoint-ul de la 11:45 aduni coloanele săptămânii și le treci în `../docs/training-plan.md` și
în fișierul din `../sales/weekly/`. Ce cauți, în ordine:

1. **Coloana LC, partea din stânga.** Rezolvate-în-timp e singura cifră care contează. Dacă e plată
   două săptămâni la rând, problema e narația sau fundamentele — adaugi mock-uri, tai probleme noi.
2. **Coloana PM vs numărul de interviuri.** Trebuie să fie egale. Dacă nu, oprești tot și repari asta.
3. **Coloana Mock.** Zero într-o săptămână = prima acțiune de luni.
4. **Coloana Notă.** Aici apare tiparul. Dacă aceeași propoziție se repetă de trei ori, aia nu e o
   observație, e diagnosticul tău.
