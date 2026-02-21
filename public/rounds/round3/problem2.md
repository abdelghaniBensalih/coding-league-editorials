# B. Optimal String Propagation

**Time limit:**  1 second  
**Memory limit:**  256 megabytes
 

At the UCA station, a communication string **s** of length **n** (consisting of lowercase letters) must be modified so that **all characters become equal**.

Diya can control the system by choosing **exactly one operation** at the beginning and using **only that operation** for the entire process.

The available operations are:

- **Operation K:**  
  Choose an index **i** (1 ≤ i < n) and change `s[i]` to `s[i+1]`.

- **Operation D:**  
  Choose an index **i** (1 < i ≤ n) and change `s[i]` to `s[i-1]`.

It is **guaranteed** that this transformation is always possible.


## Input

- Integer **t** (1 ≤ t ≤ 10⁵) — number of test cases.  
For each test case:
- Integer **n** (2 ≤ n ≤ 10⁵).
- String **s** of length **n**.

The sum of **n** over all test cases does not exceed **10⁵**.


## Output

For each test case, print:

1. The selected operation (**K** or **D**).  
2. The minimum number of operations required.

If both operations require the same number of operations, print either one.


### Example

**Input:**

```
6
1 z
4 aaaa
3 aba
5 aaabb
5 bbaaa
6 abcdef

```

**Output:**

```
K
0
K
0
K
1
D
2
K
2
K
5

```

## Solutions

### Key Observation

Because only **one operation** is allowed for the entire process, the final string can only become:

1. **All equal to `s[0]`** using **Operation D** (propagate from left).
2. **All equal to `s[n-1]`** using **Operation K** (propagate from right).

No other final result is possible


### Approach
We only need to count how many characters are different from the chosen target:

- **Target `s[0]` → Operation D**
- **Target `s[n-1]` → Operation K**

### Algorithm

1. Count how many characters differ from `s[0]` → `cnt_left`
2. Count how many characters differ from `s[n-1]` → `cnt_right`
3. Compare:
   - If `cnt_left < cnt_right` → choose **D**, answer is `cnt_left`
   - Otherwise → choose **K**, answer is `cnt_right`

If both are equal, either operation is acceptable.



### C++ Solution

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int tc; 
    cin >> tc;

    while(tc--) {
        int n; 
        string s;
        cin >> n >> s;

        char left = s[0], right = s[n-1];
        int cnt_left = 0, cnt_right = 0;

        for (int i = 0; i < n; i++) {
            if (s[i] != left) cnt_left++;
            if (s[i] != right) cnt_right++;
        }

        if (cnt_left < cnt_right) {
            cout << "D\n" << cnt_left << "\n";
        } else {
            cout << "K\n" << cnt_right << "\n";
        }
    }
    return 0;
}
```


### Time Complexity

- **Time:** `O(N)` per test case  
- **Total Time:** `O(ΣN)` ≤ `10⁵`
- **Space:** `O(1)`

#### Notes

- **Operation D** → makes the whole string equal to `s[0]`.
- **Operation K** → makes the whole string equal to `s[n-1]`.
- If `s[0] == s[n-1]`, both strategies cost the same.

---

## Resources


