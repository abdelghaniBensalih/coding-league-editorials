# E. Game on the Blackboard

**Time Limit:** 2 seconds  
**Memory Limit:** 256 MB

## Problem Statement

Aymane and Doku are playing a game. There are **n** (**n is even**) integers written on a blackboard, represented by x₁, x₂, ..., xₙ. There is also a given integer **k** and an integer **score** that is initially 0. The game lasts for n/2 turns, in which the following events happen sequentially:

- **Aymane** selects an integer from the blackboard and erases it. Let's call Aymane's chosen integer **a**.
- **Doku** selects an integer from the blackboard and erases it. Let's call Doku's chosen integer **b**.
- If **a + b = k**, add 1 to score.

Aymane is playing to **minimize the score** while Doku is playing to **maximize the score**. Assuming both players use optimal strategies, what is the **score** after the game ends?

## Input

The first line contains an integer:

    t   (1 ≤ t ≤ 10⁴)

--- the number of test cases.

For each test case, the first line contains two integers **n** and **k**:

    2 ≤ n ≤ 2·10⁵,   1 ≤ k ≤ 2·10⁹,   n is even

The second line contains **n** integers:

    x₁, x₂, ..., xₙ   (1 ≤ xᵢ ≤ n)

--- the integers on the blackboard.

It is guaranteed that:

    sum of all n over all test cases ≤ 2·10⁵

## Output

For each test case, output the **score** if both players play optimally.

### Example

**Input:**

```
4
4 4
1 2 3 2
8 15
1 2 3 4 5 6 7 8
6 1
1 1 1 1 1 1
16 9
3 1 4 1 5 9 2 6 5 3 5 8 9 7 9 3
```

**Output:**

```
2
1
0
4
```

### Explanation

**Test Case 1:** n=4, k=4, arr=[1,2,3,2]

One way the game may go is as follows:
- Aymane selects 1 and Doku selects 3. The score increases as 1 + 3 = 4. Now the two integers remaining on the blackboard are 2 and 2.
- Aymane and Doku both select 2. The score increases as 2 + 2 = 4.
- The game ends. Final score = 2.

**Test Case 3:** n=6, k=1, arr=[1,1,1,1,1,1]

It is impossible for the sum of Aymane and Doku's selected integers to be 1 (minimum sum = 1+1 = 2), so the answer is 0.

**Note:** This is just an example of how the game may proceed for demonstration purposes. Aymane and Doku may play differently to achieve optimal strategies.

## Solutions

### Approach

This is a **game theory problem** where:
- Aymane wants to **minimize** the final score
- Doku wants to **maximize** the final score
- Both play optimally

#### Key Insight:

**Doku controls the game!** No matter what Aymane picks, Doku can respond optimally.

#### Doku's Strategy:
1. If Aymane picks a number that can be **paired** (has a complement to sum to k), Doku picks the **complement**.
2. If Aymane picks an **unpaired** number, Doku picks any other unpaired number.

#### Why This Works:

- The number of **unpaired** numbers is always **even** (since n is even)
- For every unpaired number Aymane takes, Doku has an unpaired number available
- Therefore, **the final score = total number of pairs in the input**

#### Algorithm:

1. **Count frequency** of each number using a hash map
2. For each unique number **x** from 1 to ⌊k/2⌋:
   - If **x = k - x** (special case when k is even and x = k/2):
     - Add `freq[x] / 2` pairs (need two of the same number)
   - Otherwise:
     - Add `min(freq[x], freq[k-x])` pairs
3. The total number of pairs is the answer

#### Example Walkthrough:

**n=4, k=4, arr=[1,2,3,2]**
- Frequency: {1:1, 2:2, 3:1}
- For x=1: complement=3, pairs += min(1,1) = 1
- For x=2: complement=2, pairs += 2/2 = 1
- **Total pairs = 2** 

**n=8, k=15, arr=[1,2,3,4,5,6,7,8]**
- For x=7: complement=8, pairs += min(1,1) = 1
- All other numbers have no complement
- **Total pairs = 1** 

### C++

```cpp
#include <bits/stdc++.h>
using namespace std;

void solve() {
    int n, k;
    cin >> n >> k;
    
    map<int, int> cnt;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        cnt[x]++;
    }
    
    int pairs = 0;
    
    for (int x = 1; x <= k / 2; x++) {
        int complement = k - x;
        
        if (x == complement) {

            pairs += cnt[x] / 2;
        } else {

            pairs += min(cnt[x], cnt[complement]);
        }
    }
    
    cout << pairs << "\n";
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int t;
    cin >> t;
    while (t--) solve();
    
    return 0;
}
```


### Java

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        
        while (t-- > 0) {
            solve(sc);
        }
    }
    
    static void solve(Scanner sc) {
        int n = sc.nextInt();
        int k = sc.nextInt();
        

        Map<Integer, Integer> cnt = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int x = sc.nextInt();
            cnt.put(x, cnt.getOrDefault(x, 0) + 1);
        }
        
        int pairs = 0;
        

        for (int x = 1; x <= k / 2; x++) {
            int complement = k - x;
            
            if (x == complement) {

                pairs += cnt.getOrDefault(x, 0) / 2;
            } else {

                pairs += Math.min(
                    cnt.getOrDefault(x, 0), 
                    cnt.getOrDefault(complement, 0)
                );
            }
        }
        
        System.out.println(pairs);
    }
}
```

### Time Complexity

The solution works as follows:

1. **Reading and counting frequencies**: O(n)
2. **Iterating through values 1 to k/2**: O(k/2) = O(k)
3. **Hash map operations**: O(1) average per operation

Therefore, the total complexity per test case is:

```
O(n + k)
```

In the worst case where k can be up to 2·10⁹, but since we only care about numbers from 1 to n (as xᵢ ≤ n), we can optimize by iterating only through existing numbers in the hash map, making it effectively **O(n)**.

**Space Complexity**: O(n) for the frequency map

- Efficient for the given constraints (n ≤ 2·10⁵)
- Works well even when sum of all n is at maximum



## Resources

- [Hash Map / Frequency Counting - Counting elements in array](https://youtu.be/shs0KM3wKv8)

- [Minimax strategy and optimal play](https://www.youtube.com/watch?v=SLgZhpDsrfc&pp=ygUhTWluaW1heCBzdHJhdGVneSBhbmQgb3B0aW1hbCBwbGF5)
