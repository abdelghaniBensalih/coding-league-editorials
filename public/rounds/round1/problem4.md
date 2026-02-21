# D. The Prime Secret

**Time Limit:** 2 seconds  
**Memory Limit:** 256 MB

## Problem Statement

Bahae, the energetic president of the CS Club in ENSA MARRAKECH, loves numbers—especially those that can’t be divided by anyone else’s opinion (or number)!

One day, while preparing coding challenges for the upcoming Coding League, Bahae stumbled upon a mysterious integer `n`. Rumor has it that this number holds a secret: it is either **prime**, standing proudly on its own, or **composite**, easily influenced by others.

Your mission, should you accept it, is to help Bahae determine whether the number `n` is prime or not.

## Input

A single integer `n` `(2 ≤ n ≤ 2 × 10^12)`.

## Output

Print `"YES"` (`"yes"`) if `n` is a prime number; otherwise, print `"NO"` (`"no"`).

### Example

**Input:**

```
7
```

**Output:**

```
YES
```

## Solutions

### Approach

#### **Key Idea**

We only check numbers up to √n and skip obvious non-primes (even numbers and multiples of 3).
This makes the algorithm **fast enough** for n ≤ 2 × 10¹².

1- **Small cases**:

- If `n = 2` or `n = 3` → prime → print `"YES"`
- If `n` is divisible by 2 or 3 → not prime → print `"NO"`

2- **Check divisors up to √n**:

- **Important fact:** If a number is not prime, it has at least **one divisor ≤ √n**.
- Instead of checking all numbers up to `n`, we only check numbers from 5 up to √n.

3- **Optimize further**:

- All primes > 3 are of the form `6k ± 1` (5, 7, 11, 13, 17, 19…).
- So we check numbers: `i` and `i+2` in steps of 6.
- If any divides `n` → not prime.
- If none divides → prime.

**Example**

- n = 49 → √49 = 7
  Check divisors: 2, 3, 5, 7 → 7 divides 49 → not prime → `"NO"`

- n = 47 → √47 ≈ 6.8
  Check divisors: 2, 3, 5 → none divides 47 → prime → `"YES"`

### C++

```cpp
#include <iostream>
#include <cmath>
using namespace std;

bool isPrime(long long n) {
    if (n < 2) return false;
    if (n == 2 || n == 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;

    long long limit = sqrt(n);
    for (long long i = 5; i <= limit; i += 6)
        if (n % i == 0 || n % (i + 2) == 0)
            return false;

    return true;
}

int main() {
    long long n;
    cin >> n;
    cout << (isPrime(n) ? "YES" : "NO") << "\n";
}
```

### Python

```python
import math

def isPrime(n):
    if n < 2: return False
    if n in (2,3): return True
    if n % 2 == 0 or n % 3 == 0: return False

    limit = int(math.isqrt(n))
    i = 5
    while i <= limit:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

n = int(input())
print("YES" if isPrime(n) else "NO")
```

### Java

```java
import java.util.*;
public class Main {
    static boolean isPrime(long n) {
        if (n < 2) return false;
        if (n == 2 || n == 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;

        long limit = (long) Math.sqrt(n);
        for (long i = 5; i <= limit; i += 6)
            if (n % i == 0 || n % (i + 2) == 0) return false;
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong();
        System.out.println(isPrime(n) ? "YES" : "NO");
    }
}
```

### Time Complexity

- **O(√n)** → fast enough for n ≤ 2 × 10¹²

## Resources

- [GeeksForGeeks – Primality Test](https://www.geeksforgeeks.org/java/java-prime-number-program/)
- Basic Number Theory (6k ± 1 pattern)
