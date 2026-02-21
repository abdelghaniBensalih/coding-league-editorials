# D. Abdelghani and the Cafes

**Time Limit:** 2 seconds  
**Memory Limit:** 256 MB

## Problem Statement

Abdelghani likes to rest after a hard work, so you may often meet him in some cafe nearby. As all programmers do, he loves his favorite drink, which can be bought in **n** different cafes in the city. It's known that the price of one cup of the drink in cafe **i** is equal to **xᵢ** coins.

Abdelghani plans to buy his favorite drink for **q** consecutive days. He knows that on the **i-th day** he will be able to spend **mᵢ** coins.

Now, for each day, he wants to know in **how many different cafes** he can buy a cup of the drink.

## Input

The first line contains a single integer:

```txt
n
```

the number of cofes.

The second line contains **n integers**:

```txt
x₁, x₂, ..., xₙ
```

- prices of the drink in each cafe.

The third ligne contains a single integer:

```txt
q
```

- the number of days.

Then follow **q lines**, each containing one integer:

```txt
mᵢ
```

- how many coins Abdelghani has on day **i**.

### Constraints

- 1 ≤ n ≤ 100000
- 1 ≤ xᵢ ≤ 100000
- 1 ≤ q ≤ 100000
- 1 ≤ mᵢ ≤ 10⁹

## Output

Print **q integers**.
The **i-th** integer should be the number of cafes where Abdelghani can buy a cup of the drink on the **i-th day**.

### Example

**Input:**

```txt
5
3 10 8 6 11
4
1
10
3
11
```

**Output:**

```txt
0
4
1
5
```

## Solutions

### Approach

We need to answer **q queries**, and each query asks:

How many cafe prices are **≤ mᵢ** ?

To do this efficiently:

1. **Sort** the array of cafe prices.
2. For each day’s money **mᵢ**, use **binary search** to find how many prices are ≤ mᵢ.

Because:

- Sorting takes **O(n log n)**
- Each query takes **O(log n)**
- Total complexity fits easily in time limits.

### Logic

If the prices array after sorting is:

```txt
[3, 6, 8, 10, 11]
```

And Abdelghani has `m = 10` coins, we find the **last position where price ≤ 10**, which gives `4` cafes.

## C++

```cpp
#include <iostream>
#include <algorithm> // for sort
using namespace std;

int main() {
    int n;
    cin >> n;

    int prices[n];
    for (int i = 0; i < n; i++) {
        cin >> prices[i];
    }

    sort(prices, prices + n); // sort the prices

    int q;
    cin >> q;

    while (q--) {
        long long m;
        cin >> m;

        // Manual binary search to count number of cafes <= m
        int left = 0, right = n;
        while (left < right) {
            int mid = (left + right) / 2;
            if (prices[mid] <= m)
                left = mid + 1;
            else
                right = mid;
        }

        cout << left << endl; // number of prices <= m
    }

    return 0;
}
```

## Python

```python
n = int(input())
prices = list(map(int, input().split()))
prices.sort()

q = int(input())

for _ in range(q):
    m = int(input())

    left = 0
    right = n

    # Manual binary search
    while left < right:
        mid = (left + right) // 2

        if prices[mid] <= m:
            left = mid + 1
        else:
            right = mid

    print(left)   # number of prices <= m
```

## Java

```java
import java.util.*;

public class Main {

    
    static int upperBound(int[] arr, int target) {
        int left = 0, right = arr.length;

        while (left < right) {
            int mid = (left + right) / 2;

            if (arr[mid] <= target)
                left = mid + 1;
            else
                right = mid;
        }

        return left;  // number of elements <= target
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] prices = new int[n];

        for (int i = 0; i < n; i++) {
            prices[i] = sc.nextInt();
        }


        Arrays.sort(prices);

        int q = sc.nextInt();

        while (q-- > 0) {
            int m = sc.nextInt();

            int count = upperBound(prices, m);
            System.out.println(count);
        }
    }
}
```

## Time Complexity

- Sorting: **O(n log n)**
- Each query: **O(log n)**
- Total: **O((n + q) log n)**

## Resources

- [Linear search vs Binary search](https://youtu.be/sSYQ1H9-Vks?si=i27f5oe4CqvIrmLL)
- [Lower bound & upper bound binary search in Python](https://youtu.be/6-15eccc6ek?si=9dx_7-htbs7_5ye6)