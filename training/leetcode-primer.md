# LeetCode primer — cele 12 pattern-uri din `curriculum.md`

**Ce e fișierul ăsta:** o fișă de recunoaștere. Înainte de fiecare zi de live coding, citești
intrarea pattern-ului de a doua zi — 10 minute. A doua zi rezolvi cele două probleme cu template-ul
la vedere pentru prima, ascuns pentru a doua.

**Regula care face diferența:** nu citești un pattern fără să rezolvi cel puțin o problemă în el în
aceeași ședință. Cititul nu e practică.

**Reflexul de dinainte de orice linie de cod, cu voce tare:**

- „La ce întrebare răspund?" — apartenență → `Set` · numărare → `Map` · poziții → indici · ordine → sortare sau heap
- Numește pattern-ul. Spune complexitatea țintă. Fă un dry-run pe exemplul din enunț. **Abia apoi** scrii cod.

**Track de recuperare (sâmbetele):** pattern-urile 1–5 au fost sărite. Sunt fundația și apar cel mai
des în interviuri reale. Câte unul pe sâmbătă: intrarea de mai jos + 2 probleme easy. Nu recuperezi
zile, recuperezi pattern-uri.

---

## 1. Arrays & Hashing

**Semnul:** „am mai văzut asta?", numeri apariții, ai nevoie de lookup O(1), „două lucruri care se
adună la target", dedupe.

**Model:** dai memorie ca să câștigi timp. Un hash map transformă „mai caut o dată prin array" (O(n))
în O(1). De obicei: un pass construiește harta, al doilea (sau același) o interoghează.

```ts
const seen = new Set<number>();
for (const x of nums) {
  if (seen.has(x)) return true;   // răspuns la re-vedere
  seen.add(x);
}
```

**Cost:** O(n) timp, O(n) spațiu.

**Probleme din curriculum:**
- **Contains Duplicate** — `Set`, return la prima re-vedere.
- **Valid Anagram** — freq map din `s`, scazi pe cele din `t`, verifici că toate ajung la 0. (Nu tăia caractere din string — stringurile sunt imutabile în JS.)
- **Two Sum** — `Map` valoare→index; pentru fiecare `x` cauți `target - x` deja în hartă.
- **Group Anagrams** — cheia = stringul sortat, sau tuple de 26 de counturi; grupezi în `Map<cheie, string[]>`.
- **Top K Frequent Elements** — freq map, apoi bucket sort după count (`buckets[count].push(num)`), nu un sort complet. O(n).
- **Product of Array Except Self** — prefix product stânga→dreapta într-un pass, suffix dreapta→stânga în al doilea. Fără împărțire.

**Bug-uri de ceas:** obiect literal în loc de `Map` și te lovești de chei din prototype; uiți că un
count a ajuns la 0; muți un string.

---

## 2. Two Pointers

**Semnul:** array sortat (sau poți să-l sortezi), cauți o pereche/triplet cu un target, verifici
palindrom, „in place" cu O(1) spațiu, partiționare.

**Model:** doi indici merg prin array; îl miști pe cel care poate îmbunătăți răspunsul.

```ts
let l = 0, r = nums.length - 1;
while (l < r) {
  const sum = nums[l] + nums[r];
  if (sum === target) return [l, r];
  if (sum < target) l++;          // am nevoie de mai mult → urc stânga
  else r--;
}
```

**Cost:** O(n) timp după O(n log n) de sortare, O(1) spațiu.

**Probleme din curriculum:**
- **Valid Palindrome** — sari peste ne-alfanumerice, compari spre interior, lowercase.
- **Two Sum II** (input sortat) — pointeri, nu `Map`.
- **3Sum** — sortezi, fixezi `i`, two-pointer pe rest; sari peste duplicate și la `i` și la `l`/`r`.
- **Container With Most Water** — aria = `min(h[l], h[r]) * (r - l)`; muți peretele mai scund.

**Bug-uri de ceas:** buclă infinită când uiți să miști un pointer; nu sari duplicatele în 3Sum;
`r` pornit greșit (trebuie `n - 1`).

---

## 3. Sliding Window

**Semnul:** subarray/substring **contiguu**, „cel mai lung / cel mai scurt / max / min astfel încât",
o constrângere pe fereastră (fără repetiții, cel mult k, sumă ≥ target).

**Model:** o fereastră `[l, r]`. Crești `r`. Când fereastra încalcă constrângerea, micșorezi `l` până
redevine validă. Înregistrezi răspunsul la fiecare pas.

```ts
let l = 0, best = 0;
const count = new Map<string, number>();
for (let r = 0; r < s.length; r++) {
  count.set(s[r], (count.get(s[r]) ?? 0) + 1);
  while (/* fereastra e invalidă */ count.get(s[r])! > 1) {
    count.set(s[l], count.get(s[l])! - 1);
    l++;
  }
  best = Math.max(best, r - l + 1);
}
```

**Cost:** O(n) — fiecare element intră și iese o dată.

**Probleme din curriculum:**
- **Best Time to Buy and Sell Stock** — ține minimul de până acum, `profit = max(profit, price - min)`.
- **Longest Substring Without Repeating Characters** — `Map` cu ultimul index; sari `l` direct după el.
- **Longest Repeating Character Replacement** — fereastra e validă dacă `lungime - maxFreq <= k`.
- **Permutation in String** — fereastră de dimensiune fixă (`len(s1)`), compari două freq map-uri.
- **Minimum Window Substring** — `need` map + contor `formed`; contracți când fereastra e completă.
- **Sliding Window Maximum** — deque monoton descrescător de indici; capul e maximul ferestrei.

**Bug-uri de ceas:** recalculezi toată fereastra la fiecare pas (devine O(n·k)); confuzie fereastră
fixă vs variabilă; nu contracți corect.

---

## 4. Stack

**Semnul:** perechi / imbricare (paranteze, taguri), „cel mai recent lucru neînchis", evaluezi o
expresie, next greater / smaller element, undo.

**Model:** LIFO. Pui pe stivă când începi ceva, scoți când îl închizi. Vârful = ce „datorezi".

```ts
const st: string[] = [];
const pair: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
for (const c of s) {
  if (!(c in pair)) st.push(c);
  else if (st.pop() !== pair[c]) return false;
}
return st.length === 0;
```

**Cost:** O(n) timp, O(n) spațiu.

**Probleme din curriculum:**
- **Valid Parentheses** — map închis→deschis; la final stiva trebuie goală.
- **Min Stack** — pui `[val, minPânăAici]`, sau două stive paralele.
- **Evaluate Reverse Polish Notation** — pui numerele; la operator scoți două, aplici, pui rezultatul.
- **Generate Parentheses** — de fapt backtracking (pattern 10): recursie cu contoare `open`/`close`.

**Bug-uri de ceas:** `pop()` fără să verifici stiva goală; returnezi `true` cu stiva ne-goală la final.

---

## 5. Binary Search

**Semnul:** sortat (sau spațiul răspunsului e monoton), „cel mai mic / cel mai mare X astfel încât
condiția e adevărată", „găsește în O(log n)", rotated sorted array.

**Model:** ai un predicat da/nu care se schimbă o singură dată de-a lungul unui interval; cauți punctul
de schimbare.

```ts
let lo = 0, hi = nums.length - 1;
while (lo <= hi) {
  const mid = lo + ((hi - lo) >> 1);
  if (nums[mid] === target) return mid;
  if (nums[mid] < target) lo = mid + 1;
  else hi = mid - 1;
}
return -1;
```

**Cost:** O(log n) timp, O(1) spațiu.

**Probleme din curriculum:**
- **Binary Search** — cea literală; bate-ți în cap `<=` vs `<` și mișcarea `lo`/`hi`.
- **Search a 2D Matrix** — tratezi ca array 1D; `row = idx / cols`, `col = idx % cols`.
- **Koko Eating Bananas** — binary search **pe răspuns** (viteza de mâncat); `check(speed)` = încape în `h` ore?
- **Find Minimum in Rotated Sorted Array** — compari `mid` cu `hi` ca să alegi jumătatea sortată.

**Bug-uri de ceas:** buclă infinită când `lo`/`hi` nu se mișcă; jumătatea greșită la rotated;
`<=` vs `<` în condiția buclei.

---

## 6. Linked List

**Semnul:** „reverse", „detectează ciclu", „mijlocul", „al n-lea de la coadă", „merge două liste
sortate", „reorder", operații pe pointeri in place.

**Model:** ții doar câțiva pointeri (`prev`, `curr`, `next`). Un nod **dummy** înaintea capului
elimină cazul special „ce fac dacă se schimbă capul". Pointerii **fast/slow** găsesc mijlocul și
ciclurile.

```ts
// reverse
let prev: Node | null = null, curr = head;
while (curr) {
  const next = curr.next;   // salvezi ÎNAINTE să suprascrii
  curr.next = prev;
  prev = curr;
  curr = next;
}
return prev;

// dummy head
const dummy = new Node(0); dummy.next = head;
// ... lucrezi pe dummy ...
return dummy.next;

// fast / slow
let slow = head, fast = head;
	while (fast && fast.next) { slow = slow.next!; fast = fast.next.next!; }
// slow e la mijloc
```

**Cost:** O(n) timp, O(1) spațiu.

**Probleme din curriculum:**
- **Reverse Linked List** — template-ul de mai sus.
- **Merge Two Sorted Lists** — dummy + `tail`; atașezi mereu nodul mai mic, avansezi.
- **Reorder List** — găsești mijlocul → reverse jumătatea a doua → împletești alternativ.
- **Remove Nth Node From End** — dummy + doi pointeri la distanță `n`; când primul iese, al doilea e înainte de țintă. Un pass.
- **Copy List With Random Pointer** — fie `Map<vechi, nou>` în două pass-uri, fie interleave copiilor (`A→A'→B→B'`) și separi.
- **Add Two Numbers** — `carry`, dummy, `while (l1 || l2 || carry)`.

**Bug-uri de ceas:** pierzi restul listei fiindcă ai scris `curr.next` înainte să salvezi `next`; nu
folosești dummy și crapi când se șterge capul; null deref pe `fast.next.next`.

---

## 7. Trees (DFS / BFS)

**Semnul:** ierarhie, „adâncime / înălțime", „path", „level order", „e echilibrat / identic /
subarbore", BST → aproape sortat.

**Model:** aproape orice problemă de arbore e o recursie unde (a) definești ce întoarce funcția pentru
un nod, date fiind răspunsurile copiilor, (b) ai încredere în recursie. BFS cu o coadă când întrebarea
e despre **niveluri**.

```ts
// DFS
function dfs(node: TreeNode | null): number {
  if (!node) return 0;
  const l = dfs(node.left);
  const r = dfs(node.right);
  return 1 + Math.max(l, r);          // combine
}

// BFS pe niveluri
const q: TreeNode[] = root ? [root] : [];
while (q.length) {
  const level: number[] = [];
  for (let i = q.length; i > 0; i--) {
    const node = q.shift()!;
    level.push(node.val);
    if (node.left) q.push(node.left);
    if (node.right) q.push(node.right);
  }
}
```

**Cost:** O(n) timp, O(h) spațiu pe stiva de recursie (`h` = înălțime).

**Probleme din curriculum:**
- **Invert Binary Tree** — swap `left`/`right`, recursie.
- **Maximum Depth** — `1 + max(l, r)`.
- **Diameter of Binary Tree** — funcția întoarce înălțimea; un global se updatează cu `l + r` la fiecare nod.
- **Balanced Binary Tree** — întorci înălțimea, sau `-1` santinelă când un subarbore e dezechilibrat.
- **Same Tree** — ambele null? ambele egale și recursie pe copii.
- **Subtree of Another Tree** — `isSameTree` testat la fiecare nod din arborele mare.
- **Lowest Common Ancestor of a BST** — cobori: ambele valori `<` nod → stânga; ambele `>` → dreapta; altfel nodul curent e răspunsul.
- **Binary Tree Level Order Traversal** — BFS-ul de mai sus.

**Bug-uri de ceas:** uiți cazul de bază null; folosești un global când ar trebui să treci valoarea
prin return; în Diameter confunzi „muchii vs noduri".

---

## 8. Tries

**Semnul:** multe stringuri, interogări pe prefix, autocomplete, „add and search word" cu wildcard,
căutare pe grilă cu un dicționar.

**Model:** un arbore unde fiecare muchie e un caracter; fiecare nod are un map de copii + un flag `end`.

```ts
class TrieNode {
  children = new Map<string, TrieNode>();
  end = false;
}
insert(word: string) {
  let node = this.root;
  for (const c of word) {
    if (!node.children.has(c)) node.children.set(c, new TrieNode());
    node = node.children.get(c)!;
  }
  node.end = true;
}
```

**Cost:** insert/search O(L) pentru un cuvânt de lungime L.

**Probleme din curriculum:**
- **Implement Trie (Prefix Tree)** — `insert`, `search` (cere `end`), `startsWith` (nu cere `end`).
- **Design Add and Search Words Data Structure** — la `.` recursie peste **toți** copiii nodului curent.

**Bug-uri de ceas:** nu marchezi `end`; tratezi `startsWith` ca `search`; recursia pentru `.` nu e
limitată la caracterele rămase.

---

## 9. Heap / Priority Queue

**Semnul:** „k cele mai mari / mici / apropiate", „top k", „mediana unui stream", „merge k liste
sortate", ai nevoie repetat de minimul/maximul curent.

**Model:** un heap îți dă min-ul (sau max-ul) în O(1) și se rebalansează în O(log n). Pentru „k cele
mai mari", ții un **min-heap de dimensiune k** — rădăcina e al k-lea cel mai mare, arunci orice e mai
mic.

```ts
// JS nu are heap în standard library. Într-un interviu spui asta cu voce tare
// și fie scrii o clasă mică de binary heap, fie folosești quickselect.
// Idiomul de reținut: min-heap de dimensiune k pentru „kth largest".
```

**Cost:** push/pop O(log k) dacă heap-ul are dimensiune k, în loc de O(log n).

**Probleme din curriculum:**
- **Kth Largest Element in a Stream** — min-heap de dimensiune k; `add` = push apoi pop dacă size > k.
- **Last Stone Weight** — max-heap, scoți două, împingi diferența.
- **K Closest Points to Origin** — max-heap de dimensiune k după distanță², sau quickselect.
- **Kth Largest Element in an Array** — min-heap de dimensiune k, sau quickselect O(n) în medie.

**Bug-uri de ceas:** min vs max heap greșit pentru task; heap de dimensiune k vs heap cu tot (log k vs
log n); uiți că JS n-are `PriorityQueue`.

---

## 10. Backtracking

**Semnul:** „toate subseturile / permutările / combinațiile", „generează fiecare … valid", constrângeri,
alegeri pe care le faci apoi le anulezi.

**Model:** un arbore de decizii. La fiecare nod alegi o opțiune, recursezi, apoi **anulezi** alegerea
(backtrack). Tai ramurile care nu pot duce la o soluție.

```ts
const res: number[][] = [];
function bt(start: number, path: number[]) {
  res.push([...path]);                 // copie, nu referință
  for (let i = start; i < nums.length; i++) {
    path.push(nums[i]);
    bt(i + 1, path);
    path.pop();                        // undo
  }
}
bt(0, []);
```

**Cost:** exponențial prin natură (2ⁿ subseturi, n! permutări) — dar prunarea contează.

**Probleme din curriculum:**
- **Subsets** — include / exclude fiecare element.
- **Combination Sum** — refolosire permisă → recursezi cu `i`, nu `i + 1`; prune când `remaining < 0`.
- **Permutations** — array `used[]`, iterezi peste toate elementele nefolosite.
- **Subsets II** — sortezi, sari `i > start && nums[i] === nums[i-1]`.
- **Word Search** — DFS pe grilă + `visited`, restaurezi la ieșire.
- **Letter Combinations of a Phone Number** — map cifră→litere, recursie per cifră.

**Bug-uri de ceas:** împingi o **referință** la `path` în loc de copie; nu anulezi starea (`visited`,
`path`); index `start` greșit → duplicate.

---

## 11. Graphs (BFS / DFS / topological sort)

**Semnul:** grilă de celule, „insule / regiuni", „drum minim în graf neponderat", „poți termina
cursurile" (detectare de ciclu / ordine topologică), componente conexe, clone.

**Model:** noduri + muchii. DFS sau BFS pentru explorare; marchezi `visited` **la intrare**. O grilă e
un graf implicit — vecinii sunt sus/jos/stânga/dreapta. „Course Schedule" = detectezi un ciclu într-un
graf orientat / produci o ordine topologică (Kahn: scoți repetat nodurile cu in-degree 0).

```ts
// flood fill pe grilă
function dfs(r: number, c: number) {
  if (r < 0 || c < 0 || r >= rows || c >= cols) return;
  if (grid[r][c] !== "1") return;
  grid[r][c] = "0";                    // marchezi
  dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
}

// topological sort (Kahn)
const q = nodes.filter(n => indeg[n] === 0);
const order: number[] = [];
while (q.length) {
  const n = q.shift()!;
  order.push(n);
  for (const m of adj[n]) if (--indeg[m] === 0) q.push(m);
}
const hasCycle = order.length < nodes.length;
```

**Cost:** O(V + E).

**Probleme din curriculum:**
- **Number of Islands** — flood fill, numeri de câte ori pornești.
- **Clone Graph** — `Map` original→clonă, DFS.
- **Max Area of Island** — DFS care întoarce aria.
- **Pacific Atlantic Water Flow** — BFS dinspre marginile fiecărui ocean spre interior, intersectezi mulțimile.
- **Rotting Oranges** — BFS multi-sursă, numeri minutele.
- **Course Schedule I / II** — topological sort / detectare de ciclu.
- **Number of Connected Components** — union-find sau DFS cu contor.
- **Surrounded Regions** — marchezi `O`-urile lipite de margine ca sigure, întorci restul.
- **Word Ladder** — BFS peste cuvinte care diferă printr-o literă.

**Bug-uri de ceas:** marchezi `visited` la scoaterea din coadă, nu la adăugare (→ duplicate în coadă,
TLE); nu tratezi graful deconectat; muți input-ul când n-ar trebui.

---

## 12. 1-D Dynamic Programming

**Semnul:** „în câte moduri", „cost minim / maxim ca să ajungi la", „poți forma / partiționa",
subprobleme care se suprapun, răspunsul la `i` depinde de câteva răspunsuri anterioare.

**Model:** definești `dp[i]` **în cuvinte** întâi („banii maximi jefuind casele 0..i"). Găsești
recurența (`dp[i] = f(dp[i-1], dp[i-2], …)`). Pui cazurile de bază. Apoi e o buclă. De obicei ai nevoie
doar de ultimele 1–2 valori → O(1) spațiu.

```ts
// House Robber
let prev2 = 0, prev1 = 0;
for (const n of nums) {
  const cur = Math.max(prev1, prev2 + n);
  prev2 = prev1;
  prev1 = cur;
}
return prev1;
```

**Cost:** O(n) timp, O(1) spațiu cu rolling variables.

**Probleme din curriculum:**
- **Climbing Stairs** — `dp[i] = dp[i-1] + dp[i-2]` (Fibonacci).
- **Min Cost Climbing Stairs** — `dp[i] = cost[i] + min(dp[i-1], dp[i-2])`.
- **House Robber** — `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`.
- **House Robber II** — circular → `max(rob(0..n-2), rob(1..n-1))`.
- **Longest Palindromic Substring** — expandezi în jurul fiecărui centru (2n-1 centre).
- **Palindromic Substrings** — aceeași expandare, numeri.
- **Decode Ways** — `dp[i]` din citirea de 1 cifră și de 2 cifre; atenție la `'0'`.
- **Coin Change** — `dp[a] = min peste monede din dp[a - coin] + 1`; unbounded.
- **Maximum Product Subarray** — ții `maxHere` și `minHere` (semnul se schimbă la înmulțire cu negativ).
- **Word Break** — `dp[i]` adevărat dacă există `j`: `dp[j] && s[j..i] ∈ dict`.

**Bug-uri de ceas:** cazuri de bază greșite; definești `dp[i]` vag și recurența nu se poate demonstra;
uiți edge case-urile cu `'0'` la Decode Ways; nu ții min-ul la Max Product.

---

## Checklist universal înainte de a scrie cod

1. Reformulezi enunțul cu cuvintele tale. Ceri clarificări (input gol? duplicate? negative?).
2. Numești pattern-ul cu voce tare. Dacă nu-l vezi, spui la ce seamănă.
3. Spui complexitatea țintă — `O(n)`? `O(n log n)`? `O(log n)`?
4. Dry-run pe exemplul din enunț, pe hârtie.
5. Scrii. Vorbești tot timpul.
6. Când sună cronometrul (25 min medium / 15 min easy) te oprești și citești soluția. Prima ratare → `#redo` în `journal.md` cu datele +7 și +21.

## Legături

- Ce fac azi: `curriculum.md`
- Ce am făcut: `journal.md` (tag `#redo` pentru track-ul de recuperare)
- Sursă de probleme: NeetCode 150 / Blind 75 — categoriile de aici sunt în ordinea listei NeetCode.
