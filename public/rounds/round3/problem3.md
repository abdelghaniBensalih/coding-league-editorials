# C.Zakaria's Book Collection 

**Time limit:**  1 second  
**Memory limit:**  256 megabytes

Zakaria is a passionate book collector who has carefully organized his entire collection on a long bookshelf.  
He arranged all the books in increasing order of their **page counts**, from the book with the fewest pages to the one with the most pages.

One day, his friend challenged him:

> **"I bet you can't find books whose total page count is exactly `k` pages!"**

Zakaria can choose:

- **Two different books**, **or**
- **The same book twice** (only if a book has exactly `k / 2` pages).

His goal is to determine **how many different ways** he can select books so that the total number of pages is exactly **`k`**.

Your task is to help Zakaria solve this challenge.


## Input

- The first line contains two integers **n** and **k** — the number of books and the target number of pages.
- The second line contains **n** integers  
  `a₁, a₂, ..., aₙ` — the page counts of the books (in any order).



## Output
Print a single integer : the number of valid ways to achieve exactly **k** pages.

### Example

**Input:**

```
5 150
70 120 30 75 50
```

**Output:**

```
2
```

## Solutions


Since the books are in random order, we first **sort** them.  
Then we use two pointers to efficiently find pairs whose sum equals **k**.

---

### Algorithm

1. Sort the array.
2. Initialize two pointers:
   - `i = 0` (left)
   - `j = n - 1` (right)
3. While `i ≤ j`:
   - If `books[i] + books[j] > k` → `j--`
   - If `books[i] + books[j] < k` → `i++`
   - Else → found valid pair:
     - `ans++`
     - `i++`, `j--`

**Why `i ≤ j` instead of `i < j`?**

When `i == j`, we are using the same book twice.  
If `2 * books[i] == k`, this is a valid solution.



### C++

```cpp
void solve() {
    int n, k;
    cin >> n >> k;
    vector<int> books(n);
    
    for(int i = 0; i < n; i++)
        cin >> books[i];

    sort(books.begin(), books.end());

    int i = 0, j = n - 1;
    int ans = 0;

    while(i <= j) {
        if(books[i] + books[j] > k)
            j--;
        else if(books[i] + books[j] < k)
            i++;
        else {
            ans++;
            i++;
            j--;
        }
    }

    cout << ans << endl;
}
```


### Time Complexity

- **Time Complexity:**  
  `O(n log n)` — due to sorting

- **Space Complexity:**  
  `O(n)` — for storing the input array


## Resources


