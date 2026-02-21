# E. Exams again!

**Time limit:**  1 second  
**Memory limit:**  256 megabytes

Ayoub is a student at UCA who constantly experiments with new studying strategies.  
No matter what method he uses, he **always forgets every lesson exactly after `k` days**.

If he studies a lesson on day `d`, then he forgets it on day:

```
d + k
```

After `n` days from the start of the semester, Ayoub has an important exam.  
This time, he only wants to revise the lessons that he has **already forgotten**.

Your task is to calculate how many lessons Ayoub has forgotten by **day `n`**.

## Input

- First line: integer **m** — number of days Ayoub studied.
- Second line: **m distinct integers** `d₁, d₂, …, dₘ` — the days Ayoub studied.
- Last line: two integers **n** and **k**  
  - `n` → exam day  
  - `k` → number of days after which Ayoub forgets a lesson.


## Output

Print a single integer — the number of lessons Ayoub has forgotten by day **n**.

### Example

**Input:**

```
n = 20, k = 5
Study days = [1, 4, 10, 13, 17]
```

**Output:**

```
limit = 20 - 5 = 15
```

## Solutions

A lesson studied on day `d` is forgotten on day:

```
d + k
```

It is forgotten by exam day `n` **if and only if**:

```
d + k ≤ n
→ d ≤ n - k
```

So the problem becomes:

> **Count how many values `dᵢ` satisfy `dᵢ ≤ n - k`**

---

### Algorithm

1. Read all study days.
2. Compute `limit = n - k`.
3. Count how many days `dᵢ` satisfy:
   ```
   dᵢ ≤ limit
   ```
4. Output the count.


### C++


```cpp
void solve() {
  int m;cin>>m;
  vector<ll>lessons(m);
  for(int i=0;i<m;++i) {
    cin>>lessons[i];
  }
  ll n,k;
  cin>>n>>k;
  ll ans=0;
  for(int i=0;i<m;++i)
  {
   if(lessons[i]<=n-k)
   {
    ans++;
   }
  }
  cout<<ans;
}
```



### Time Complexity

- **Time Complexity:** `O(m)`
- **Space Complexity:** `O(1)` (excluding input storage)



## Resources


