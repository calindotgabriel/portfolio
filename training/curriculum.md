# Curriculum zi cu zi — 48 de zile

**Ăsta e răspunsul la „ce fac azi".** Deschizi fișierul, cauți data de azi, faci ce scrie pe rând.
Zero decizii dimineața. Decizia dimineața e prima care se transformă în amânare.

Calendarul îți spune **când**. Fișierul ăsta îți spune **ce**. `journal.md` îți spune **ce ai făcut deja**.

## Cum se folosește

1. Dimineața la 10:00: cauți data de azi mai jos.
2. Faci cele trei blocuri de pe rând.
3. La 15:15, în blocul de aplicări, scrii o intrare `#log` în `journal.md`. **Asta e memoria.** Fără ea, peste
   trei săptămâni nu mai știi ce ai făcut și tot sistemul devine iar o senzație în loc de date.
4. Ce ratezi primește o intrare `#redo` în `journal.md`, cu datele +7 și +21 scrise în ea.

## Reguli care nu se schimbă de la o zi la alta

**Live coding:** TypeScript, editor fără Copilot. Cronometru: 25 min medium, 15 min easy. Când sună,
te oprești și citești soluția. Vorbești cu voce tare tot timpul. Prima ratare → o intrare `#redo`.

**Adâncime:** fiecare topic produce două artefacte — ~200 de cuvinte scrise în `training/depth/` și un
demo care rulează. Un topic ține 3 zile: ziua 1 citești și experimentezi, ziua 2 scrii fișa, ziua 3
faci demoul și îl explici cu voce tare.

**System design:** cadrul fix de 7 pași, 40 min la tablă cu voce tare, apoi compari cu referința și
scrii 3 lucruri ratate în `training/design/`. Fiecare prompt ține 2 ședințe: prima oarbă, a doua
după ce ai văzut referința.

**Sâmbăta:** doar redo. Fără material nou. Apoi checkpoint la 11:45.

## Când rămâi în urmă

Nu recuperezi. **Sari peste ziua pierdută și continui de la data de azi.** Curriculumul e o direcție,
nu un contract — iar încercarea de a recupera zilele ratate e cel mai sigur mod de a abandona în
săptămâna 3. Redo list-ul e singurul lucru care se recuperează, pentru că el conține exact ce n-a
intrat încă.

### Săptămâna 1

| Zi | Data | Live coding 10:00 | Adâncime 11:45 | System design 13:30 |
| ---: | --- | --- | --- | --- |
| 1 | Lu 10.08 | **arrays & hashing** — Contains Duplicate · Valid Anagram | 1. Event loop: faze, microtasks vs macrotasks | 1. Ingestie idempotentă de webhook-uri de plată |
| 2 | Ma 11.08 | **arrays & hashing** — Two Sum · Group Anagrams | 1. Event loop: faze, microtasks vs macrotasks | — |
| 3 | Mi 12.08 | **arrays & hashing** — Top K Frequent Elements · Product of Array Except Self | 1. Event loop: faze, microtasks vs macrotasks | 1. Ingestie idempotentă de webhook-uri de plată |
| 4 | Jo 13.08 | **two pointers** — Valid Palindrome · Two Sum II | 2. libuv threadpool vs worker_threads (story RWE) | — |
| 5 | Vi 14.08 | **two pointers** — 3Sum · Container With Most Water | 2. libuv threadpool vs worker_threads (story RWE) | 2. Pipeline de export cu retry, backoff, DLQ |
| 6 | **Sâ 15.08** | Doar redo list (scadente +7/+21) | — | — · *11:45 checkpoint* |

### Săptămâna 2

| Zi | Data | Live coding 10:00 | Adâncime 11:45 | System design 13:30 |
| ---: | --- | --- | --- | --- |
| 7 | Lu 17.08 | **sliding window** — Best Time to Buy and Sell Stock · Longest Substring Without Repeating Characters | 2. libuv threadpool vs worker_threads (story RWE) | 2. Pipeline de export cu retry, backoff, DLQ |
| 8 | Ma 18.08 | **sliding window** — Longest Repeating Character Replacement · Permutation in String | 3. Stream backpressure | — |
| 9 | Mi 19.08 | **sliding window** — Minimum Window Substring · Sliding Window Maximum | 3. Stream backpressure | 3. Rate limiting per-tenant, distribuit |
| 10 | Jo 20.08 | **stack** — Valid Parentheses · Min Stack | 3. Stream backpressure | — |
| 11 | Vi 21.08 | **stack** — Evaluate Reverse Polish Notation · Generate Parentheses | 4. GC, memory leaks, heap snapshots | 3. Rate limiting per-tenant, distribuit |
| 12 | **Sâ 22.08** | Doar redo list (scadente +7/+21) | — | — · *11:45 checkpoint* |

### Săptămâna 3

| Zi | Data | Live coding 10:00 | Adâncime 11:45 | System design 13:30 |
| ---: | --- | --- | --- | --- |
| 13 | Lu 24.08 | **binary search** — Binary Search · Search a 2D Matrix | 4. GC, memory leaks, heap snapshots | 4. Audit log pentru platformă de custody |
| 14 | Ma 25.08 | **binary search** — Koko Eating Bananas · Find Minimum in Rotated Sorted Array | 4. GC, memory leaks, heap snapshots | — |
| 15 | Mi 26.08 | **linked list** — Reverse Linked List · Merge Two Sorted Lists | 5. Mongo explain(), index selection | 4. Audit log pentru platformă de custody |
| 16 | Jo 27.08 | **linked list** — Reorder List · Remove Nth Node From End of List | 5. Mongo explain(), index selection | — |
| 17 | Vi 28.08 | **linked list** — Copy List With Random Pointer · Add Two Numbers | 5. Mongo explain(), index selection | 5. Izolare multi-tenant |
| 18 | **Sâ 29.08** | Doar redo list (scadente +7/+21) | — | — · *11:45 checkpoint* |

### Săptămâna 4

| Zi | Data | Live coding 10:00 | Adâncime 11:45 | System design 13:30 |
| ---: | --- | --- | --- | --- |
| 19 | Lu 31.08 | **trees** — Invert Binary Tree · Maximum Depth of Binary Tree | 6. Tranzacții, isolation levels | 5. Izolare multi-tenant |
| 20 | Ma 01.09 | **trees** — Diameter of Binary Tree · Balanced Binary Tree | 6. Tranzacții, isolation levels | — |
| 21 | Mi 02.09 | **trees** — Same Tree · Subtree of Another Tree | 6. Tranzacții, isolation levels | 6. Search API read-heavy cu caching |
| 22 | Jo 03.09 | **trees** — Lowest Common Ancestor of a BST · Binary Tree Level Order Traversal | 7. GraphQL N+1 și DataLoader | — |
| 23 | Vi 04.09 | **tries** — Implement Trie (Prefix Tree) · Design Add and Search Words Data Structure | 7. GraphQL N+1 și DataLoader | 6. Search API read-heavy cu caching |
| 24 | **Sâ 05.09** | Doar redo list (scadente +7/+21) | — | — · *11:45 checkpoint* |

### Săptămâna 5

| Zi | Data | Live coding 10:00 | Adâncime 11:45 | System design 13:30 |
| ---: | --- | --- | --- | --- |
| 25 | Lu 07.09 | **heap** — Kth Largest Element in a Stream · Last Stone Weight | 7. GraphQL N+1 și DataLoader | 7. Job scheduler / delayed tasks |
| 26 | Ma 08.09 | **heap** — K Closest Points to Origin · Kth Largest Element in an Array | 8. Idempotency keys | — |
| 27 | Mi 09.09 | **backtracking** — Subsets · Combination Sum | 8. Idempotency keys | 7. Job scheduler / delayed tasks |
| 28 | Jo 10.09 | **backtracking** — Permutations · Subsets II | 8. Idempotency keys | — |
| 29 | Vi 11.09 | **backtracking** — Word Search · Letter Combinations of a Phone Number | 9. Retries, backoff, jitter, DLQ | 8. Upload și procesare fișiere la scară |
| 30 | **Sâ 12.09** | Doar redo list (scadente +7/+21) | — | — · *11:45 checkpoint* |

### Săptămâna 6

| Zi | Data | Live coding 10:00 | Adâncime 11:45 | System design 13:30 |
| ---: | --- | --- | --- | --- |
| 31 | Lu 14.09 | **graphs** — Number of Islands · Clone Graph | 9. Retries, backoff, jitter, DLQ | 8. Upload și procesare fișiere la scară |
| 32 | Ma 15.09 | **graphs** — Max Area of Island · Pacific Atlantic Water Flow | 9. Retries, backoff, jitter, DLQ | — |
| 33 | Mi 16.09 | **graphs** — Rotting Oranges · Course Schedule | 10. Service-to-service auth (story Bitpanda) | 9. Notification fan-out cu garanții |
| 34 | Jo 17.09 | **graphs** — Course Schedule II · Number of Connected Components | 10. Service-to-service auth (story Bitpanda) | — |
| 35 | Vi 18.09 | **graphs** — Surrounded Regions · Word Ladder | 10. Service-to-service auth (story Bitpanda) | 9. Notification fan-out cu garanții |
| 36 | **Sâ 19.09** | Doar redo list (scadente +7/+21) | — | — · *11:45 checkpoint* |

### Săptămâna 7

| Zi | Data | Live coding 10:00 | Adâncime 11:45 | System design 13:30 |
| ---: | --- | --- | --- | --- |
| 37 | Lu 21.09 | **1-D DP** — Climbing Stairs · Min Cost Climbing Stairs | 11. Fastify vs NestJS | 10. Migrare de pe legacy cu zero downtime |
| 38 | Ma 22.09 | **1-D DP** — House Robber · House Robber II | 11. Fastify vs NestJS | — |
| 39 | Mi 23.09 | **1-D DP** — Longest Palindromic Substring · Palindromic Substrings | 11. Fastify vs NestJS | 10. Migrare de pe legacy cu zero downtime |
| 40 | Jo 24.09 | **1-D DP** — Decode Ways · Coin Change | 12. Clustering, graceful shutdown | — |
| 41 | Vi 25.09 | **1-D DP** — Maximum Product Subarray · Word Break | 12. Clustering, graceful shutdown | 10. Migrare de pe legacy cu zero downtime |
| 42 | **Sâ 26.09** | Doar redo list (scadente +7/+21) | — | — · *11:45 checkpoint* |

### Săptămâna 8

| Zi | Data | Live coding 10:00 | Adâncime 11:45 | System design 13:30 |
| ---: | --- | --- | --- | --- |
| 43 | Lu 28.09 | Doar redo list — fără material nou | Recapitulare — reciteșe cele 12 fișe | Reia cele 3 prompturi cu cel mai slab scor |
| 44 | Ma 29.09 | Doar redo list — fără material nou | Recapitulare — reciteșe cele 12 fișe | — |
| 45 | Mi 30.09 | Doar redo list — fără material nou | Recapitulare — reciteșe cele 12 fișe | Reia cele 3 prompturi cu cel mai slab scor |
| 46 | Jo 01.10 | Doar redo list — fără material nou | Recapitulare — reciteșe cele 12 fișe | — |
| 47 | Vi 02.10 | Doar redo list — fără material nou | Recapitulare — reciteșe cele 12 fișe | Reia cele 3 prompturi cu cel mai slab scor |
| 48 | **Sâ 03.10** | Doar redo list (scadente +7/+21) | — | — · *11:45 checkpoint* |

---

## Surse

- Live coding: NeetCode 150 / Blind 75 — categoriile de mai sus sunt în ordinea listei NeetCode.
- Adâncime: lista completă de topicuri și demo-uri e în `../docs/training-plan.md`, Block 3.
- System design: Alex Xu Vol. 1 · ByteByteGo · DDIA cap. 1–9. Cadrul de 7 pași e în
  `../docs/training-plan.md`, Block 2.

## Ce NU e aici

Mock-urile (marți și joi, 16:30) nu au curriculum — depind de ce îți pică la partener sau la
platformă. Singura regulă: alternezi coding și system design, și fiecare mock primește post-mortem în
`../sales/interviews/`, exact ca un interviu real.
