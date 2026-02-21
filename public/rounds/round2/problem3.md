# C. Salma and Abla

**Time Limit:** 2 seconds  
**Memory Limit:** 512 MB

## Problem Statement

Salma and Abla have a bag with **n** cards, with the integer **vᵢ** written on the i-th card. They play the following game: first, each player chooses an integer (let's denote the integer chosen by Salma as **s**, and the integer chosen by Abla as **a**). After that, they start drawing cards from the bag in any order until the bag is empty.

For each card, the point goes to the one whose chosen integer is closer to the integer on the card; **in case of a tie, Salma gets the point**.

For example, if **s = 10**, **a = 30**, then:
- For cards with integers 10, 1, 7, 18, 20, and many others, Salma gets the points (note that she will get a point for the card 20 since |20-10| = |20-30| = 10, which is a tie);
- For cards with integers 59, 25, 30, 21, and many others, Abla gets the points.

Abla has managed to find out in advance which integer Salma will choose. Help her choose her integer in such a way as to maximize the number of points she receives.

## Input

The first line contains a single integer **t** (1 ≤ t ≤ 10⁴) — the number of test cases.

Each test case consists of two lines:
- The first line contains two integers **n** and **s** (1 ≤ n ≤ 3×10⁵; 1 ≤ s ≤ 10⁹) — the number of cards in the bag and the number chosen by Salma, respectively.
- The second line contains n integers **v₁, v₂, ..., vₙ** (1 ≤ v₁ ≤ v₂ ≤ ... ≤ vₙ ≤ 10⁹).

### Constraints

- 1 ≤ t ≤ 10⁴
- 1 ≤ n ≤ 3×10⁵
- 1 ≤ s ≤ 10⁹
- 0 ≤ a ≤ 2×10⁹
- 1 ≤ v₁ ≤ v₂ ≤ ... ≤ vₙ ≤ 10⁹
- The sum of n across all test cases does not exceed 3×10⁵

## Output

For each test case, output a single integer **a** (0 ≤ a ≤ 2×10⁹) that Abla should choose to maximize the number of points she receives. If there are multiple such numbers, you may output any of them.

### Example

**Input:**
```
3
7 21
10 20 30 40 50 60 70
6 500
200 200 300 500 600 600
2 7
7 7
```

**Output:**
```
35
333
1337
```

## Solutions

### Approach

**Optimal Greedy Strategy:**

The key observation is that Abla should position herself to capture the majority of cards. We can determine this by counting:
- **l** = number of cards with value < s
- **r** = number of cards with value > s
- Cards equal to s always go to Salma (tie-breaking rule)

**Decision Rule:**
- If **l > r**: Choose **a = s - 1** (move slightly left to capture the left majority)
- If **l ≤ r**: Choose **a = s + 1** (move slightly right to capture the right majority)

**Why this works:**
By choosing a value just 1 unit away from s, Abla positions herself optimally to win cards on the majority side while minimizing losses on the minority side.

### Logic

**Example 1:** Cards = [10, 20, 30, 40, 50, 60, 70], s = 21
- l = 2 (cards 10, 20 are < 21)
- r = 5 (cards 30, 40, 50, 60, 70 are > 21)
- Since l < r, choose a = 21 + 1 = 22
- Actually, any value slightly greater than 21 works (like 35 in the expected output)

**Example 2:** Cards = [200, 200, 300, 500, 600, 600], s = 500
- l = 3 (cards 200, 200, 300 are < 500)
- r = 2 (cards 600, 600 are > 500)
- Since l > r, choose a = 500 - 1 = 499
- Any value slightly less than 500 works (like 333 in the expected output)

**Example 3:** Cards = [7, 7], s = 7
- l = 0, r = 0
- All cards equal s, so Salma wins all (ties)
- Abla gets 0 points no matter what (any output works, like 1337)

## C++
```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t;
    cin >> t;
    
    while (t--) {
        int n, s;
        cin >> n >> s;
        
        vector<int> v(n);
        int l = 0, r = 0;
        
        for (int i = 0; i < n; ++i) {
            cin >> v[i];
            if (v[i] < s) ++l;
            if (v[i] > s) ++r;
        }
        
        cout << (l > r ? s - 1 : s + 1) << "\n";
    }
    
    return 0;
}
```

## Python
```python
def solve():
    t = int(input())
    
    for _ in range(t):
        n, s = map(int, input().split())
        cards = list(map(int, input().split()))
        
        l = sum(1 for v in cards if v < s)
        r = sum(1 for v in cards if v > s)
        
        print(s - 1 if l > r else s + 1)

solve()
```

## Java
```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        
        while (t-- > 0) {
            int n = sc.nextInt();
            int s = sc.nextInt();
            
            int l = 0, r = 0;
            
            for (int i = 0; i < n; i++) {
                int v = sc.nextInt();
                if (v < s) l++;
                if (v > s) r++;
            }
            
            System.out.println(l > r ? s - 1 : s + 1);
        }
        
        sc.close();
    }
}
```

## Time Complexity

- **Single pass through cards:** O(n) — counting cards less than and greater than s
- **Total per test case:** O(n)
- **Space Complexity:** O(n) for storing the cards (can be optimized to O(1) by not storing)

**This is the optimal solution** with linear time complexity, much faster than the O(n²) candidate testing approach.

## Mathematical Proof

**Claim:** Choosing a = s ± 1 is optimal when we want to maximize points on the majority side.

**Proof:**
- For a card v < s: Abla wins if |v - a| < |v - s|
  - If a < s: Distance to a is minimized when a is close to s (but still left of the cards)
  - Choosing a = s - 1 captures all cards where v > (a + s)/2 = (2s - 1)/2
  
- For a card v > s: Abla wins if |v - a| < |v - s|
  - If a > s: Distance to a is minimized when a is close to s (but still right of the cards)
  - Choosing a = s + 1 captures all cards where v < (a + s)/2 = (2s + 1)/2

By staying just 1 unit away from s, we maximize our capture on the majority side.

## Resources

- [Greedy Algorithms](https://cp-algorithms.com/greedy/)
- [Counting and Mathematical Optimization](https://codeforces.com/blog/entry/47821)
