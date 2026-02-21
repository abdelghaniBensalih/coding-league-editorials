# C. Fair Division

**Time limit:** 2 second  
**Memory limit:** 256 megabytes

## Problem Statement

Zakaria and Mohamed received **n candies** from their parents.\
Each candy weighs either **1 gram** or **2 grams**.

They want to divide all candies **fairly**, meaning the **total weight**
of Zakaria's candies must equal the **total weight** of Mohamed's
candies.

Your task is to determine whether this fair division is possible.\
Note: **Candies cannot be broken into pieces.**

### Input

- An integer `t`\
  **(1 ≤ t ≤ 10⁴)** --- number of test cases.

Each test case consists of two lines:

1.  An integer `n`\
    **(1 ≤ n ≤ 100)** --- the number of candies.
2.  `n` integers: `a₁, a₂, …, aₙ`\
    Each candy weighs **1** or **2** grams.

It is guaranteed that the **sum of all n** across all test cases **does
not exceed 10⁵**.

### Output

- For each query, "YES" if found, "NO" otherwise

### Example

**Input:**

```
5
2
1 1
2
1 2
4
1 2 1 2
3
2 2 2
3
2 1 2
```

**Output:**

```
YES
NO
YES
NO
NO

```

## Solutions

### Approach

1. **Compute the total weight**
   `total = sum(candies)`

2. **If total is odd → impossible**
   Because you cannot split an odd number into two equal halves (_Candies cannot be broken into pieces._)

3. **If total is even → try to make `half = total / 2`**

4. To build `half`, we notice:

   - Each 2-gram candy contributes an even amount.
   - If `half` is **odd**, we **must** use at least one 1-gram candy.
   - If we have **no** 1-gram candy but `half` is odd → impossible.

**Hint rule**:

```
If total is odd → NO
Else if half is odd and there are no 1-gram candies → NO
Else → YES
```

### C++

```cpp
#include <iostream>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        int c1 = 0, c2 = 0, x;
        for (int i = 0; i < n; i++) {
            cin >> x;
            if (x == 1) c1++;
            else c2++;
        }

        int total = c1 + 2 * c2;

        if (total % 2 != 0) {
            cout << "NO\n";
            continue;
        }

        int half = total / 2;

        if (half % 2 == 1 && c1 == 0)
            cout << "NO\n";
        else
            cout << "YES\n";
    }
}
```

### Python

```python
t = int(input())

for _ in range(t):
    n = int(input())
    arr = list(map(int, input().split()))

    c1 = arr.count(1)
    c2 = arr.count(2)

    total = c1 + 2*c2

    if total % 2 == 1:
        print("NO")
        continue

    half = total // 2

    if half % 2 == 1 and c1 == 0:
        print("NO")
    else:
        print("YES")
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

            int c1 = 0, c2 = 0;
            for (int i = 0; i < n; i++) {
                int x = sc.nextInt();
                if (x == 1) c1++;
                else c2++;
            }

            int total = c1 + 2 * c2;

            if (total % 2 != 0) {
                System.out.println("NO");
                continue;
            }

            int half = total / 2;

            if (half % 2 == 1 && c1 == 0)
                System.out.println("NO");
            else
                System.out.println("YES");
        }
    }
}
```

### Time Complexity

- **Per test case:** O(n)
- **All test cases:** O(sum of n over all t)
- **Given:** sum of n over all test cases ≤ 10⁵
- **Total:** O(10⁵) → runs easily in 2 seconds.

## Resources

[Logic Behind Fair Division](https://youtu.be/e7WO1lwW36s?si=ORmeXIMSf5-lnKEs)