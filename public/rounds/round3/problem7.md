# G. The Stellar Energy Core

**Time limit:**  1 second  
**Memory limit:**  256 megabytes

The UCA Space Station has unearthed a mysterious alien artifact called the **"Stellar Energy Core."**  
This core is made of **N sequential crystal shards**, each emitting a fixed amount of **positive energy**.

To stabilize the teleporter, engineers must find **all contiguous segments** of these shards whose total
energy is **exactly equal** to a required energy value **X**.

Each shard has **strictly positive energy**, which is crucial for solving the problem efficiently.



## Input

- The first line contains two integers **N** and **X**  
  - `1 ≤ N ≤ 2 × 10⁵`  
  - `1 ≤ X ≤ 10¹⁸`
- The second line contains **N** positive integers  
  `A₁, A₂, ..., Aₙ` where `1 ≤ Aᵢ ≤ 10⁹`


## Output

Print **one integer** — the number of contiguous subarrays whose sum is **exactly X**.

### Example

**Input:**

```
5 7
2 4 1 2 7
```

**Output:**

```
3
```

## Solutions

### Key Insight 

Because **Aᵢ > 0** for every element:

- Expanding the window **always increases** the sum.
- Shrinking the window **always decreases** the sum.

This allows a **two-pointer sliding window** solution without prefix sums or hash maps.

---

### Why Sliding Window Works Perfectly

Let:

- `l` = left pointer  
- `r` = right pointer  
- `cur` = sum of `A[l..r]`

### Algorithm Steps

1. Expand window: move `r` and add `A[r]` to `cur`.
2. If `cur > X`, shrink window: move `l` and subtract `A[l]`.
3. If `cur == X`, we found one valid subarray.
4. Repeat until `r` reaches the end.

Each pointer moves **at most N times**, so the algorithm is linear.

---

### Correctness Proof (Intuition)

Because all numbers are positive:

- Increasing `r` → `cur` strictly increases  
- Increasing `l` → `cur` strictly decreases  

Therefore:

- No valid subarray can be skipped.
- No invalid subarray is double counted.

This monotonic behavior guarantees correctness.



### C++

```cpp
void solve() {
    ll n,x;
    cin>>n>>x;
    vector<ll> a(n);
    for(ll &v :a) 	cin>>v;
    ll cur=0,ans=0;
    for(int l=0,r=0;r<n;r++)
    {
    	cur+=a[r];
    	while(cur>x)
    		cur-=a[l++];
    	if(cur==x)
    		ans++;
    }
    cout<<ans;
}


```



### Time Complexity


| Type | Complexity |
|-----|-----------|
| Time | **O(N)** |
| Space | **O(1)** |

Works efficiently for `N ≤ 2 × 10⁵`.

## Resources


