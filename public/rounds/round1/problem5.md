# E. Abdelghni and the String

**Time Limit:** 2 seconds  
**Memory Limit:** 256 MB

## Problem Statement

After solving many competitive programming problems, **Abdelghni**
decided to take a break and play with a string `s` consisting of
lowercase English letters.

He came up with a fun challenge:

> **"If I remove two consecutive characters from this string, how many
> "_different_" resulting strings can I get?"**

## Input

The first line contains a single integer:

    t   (1 ≤ t ≤ 10⁴)

--- the number of test cases.

Each test case consists of:

1- An integer

        n   (3 ≤ n ≤ 2·10⁵)

2- A string `s` of length `n` consisting of lowercase English letters.

It is guaranteed that:

    sum of all n over all test cases ≤ 2·10⁵

## Output

For each test case, print:

- A single integer ---\
  the number of **distinct** strings obtainable by deleting **two
  consecutive characters** from `s`.

### Example

**Input:**

```
7
6
aaabcc
10
aaaaaaaaaa
6
abcdef
7
abacaba
6
cccfff
4
abba
5
ababa
```

**Output:**

```
4
1
5
3
3
3
1
```

## Solutions

### Approach

The key idea is:
Removing characters at positions `i` and `i+1` gives a new string:

```
s[0..i-1] + s[i+2..n-1]
```

Two removals produce the **same string** **only when**:

```
s[i-1] == s[i+1]
```

So instead of generating strings, we just count how many removals give **unique results**.

- There are initially `n - 1` possible removals.
- For every index `i` from `1` to `n-2`:

  If removing at `i` and removing at `i-1` create the same string → **duplicate**, reduce the count.

#### Why this works?

Removing characters at `i` and `i+1` only affects the neighbors around them.
Two removals are identical **exactly when the two sides match** → `s[i-1] == s[i+1]`.

### C++

```cpp
#include <bits/stdc++.h>
using namespace std;

void solve() {
    int n;
    cin >> n;
    string s;
    cin >> s;

    int res = n - 1;

    for (int i = 1; i + 1 < n; i++) {
        if (s[i - 1] == s[i + 1]) {
            res--;
        }
    }

    cout << res << "\n";
}

int main() {
    int t;
    cin >> t;
    while (t--) solve();
}
```

### Python

```python
t = int(input())

for _ in range(t):
    n = int(input())
    s = input().strip()

    res = n - 1

    for i in range(1, n - 1):
        if s[i - 1] == s[i + 1]:
            res -= 1

    print(res)
```

### Java

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();

        while (t-- > 0) {
            int n = sc.nextInt();
            String s = sc.next();

            int res = n - 1;

            for (int i = 1; i + 1 < n; i++) {
                if (s.charAt(i - 1) == s.charAt(i + 1)) {
                    res--;
                }
            }

            System.out.println(res);
        }
    }
}
```

### Time Complexity

The optimized solution only checks, for each index `i`, whether deleting characters at positions `i` and `i+1` produces the _same result_ as deleting at `i-1` and `i`.
This requires **one single pass** through the string, and each check (`s[i-1] == s[i+1]`) takes constant time.

Therefore, the total complexity is:

```
O(n)
```

- No heavy memory usage
- Works for total n ≤ 2·10⁵

## Resources
- [YouTube – Video Explanation of Deleting Two Consecutive Letters Problem](https://youtu.be/ZLwj02vK_qI?si=qcuckxcjQYNpG216)
