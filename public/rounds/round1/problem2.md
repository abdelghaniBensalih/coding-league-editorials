# B. Abla and the Triple Coders

**Time limit:** 1 second  
**Memory limit:** 256 megabytes

## Problem Statement


Abla is one of the organizers of the annual **Coding League
Competition**. Being curious about the programming skills of the
participants, she conducted a small survey before the competition
started.

According to Abla's survey:

-   **a** participants know **C**
-   **b** participants know **Python**
-   **c** participants know **Java**
-   **x** participants know **both C and Python**
-   **y** participants know **both Python and Java**
-   **z** participants know **both C and Java**

Abla is especially interested in the **triple coders** --- participants
who know **all three programming languages**.


## Input

A single line containing **seven integers**:

    n a b c x y z

Where:

-   `1 ≤ n ≤ 100`
-   `0 ≤ a, b, c, x, y, z ≤ n`
-   The input is guaranteed to be consistent.

## Output
Print a single integer --- the **number of participants who know all
three programming languages**.

### Example

**Input:**

```
10 4 5 6 3 4 5
```

**Output:**

```
7
```

## Solutions



### Approach

Imagine three circles for the three languages (C, Python, Java).

* a, b, c count everyone in each circle.

* x, y, z count the people who know **two** languages (for example, x = C + Python).  
But people who know **all three** languages are also inside x, y, and z.  
So each person who knows all three is counted **three times** when we add x + y + z.

To find the real number of people who know all three languages (we call this number **T**), we need to fix this extra counting.  
We can do it with a simple formula when we also know **N** (the total number of people in the survey).

Formula (when total participants N is known)  
If N is the total number of people surveyed, the number T of participants who know all three languages is:  
**T = N - (a + b + c) + (x + y + z)**



### C++
```cpp

 #include<iostream>
 #include<bits/stdc++.h>
 #include <algorithm>
 #include<stdlib.h>
 using namespace std;
 void fast()
 {
 	ios_base::sync_with_stdio(0);
 	cin.tie(0);
 	cin.tie(0);
 }
 void solve() {
     int n, a, b, c, x, y, z;
     cin >> n >> a >> b >> c >> x >> y >> z;
 
     int t = n-a-b-c+x+y+z;
     cout << t;
 
 }
 int main()

 
 
 {
	 fast();
	 int T=1;
	 //cin>>T;
	 while(T--)
	 {
	 	solve();
	 	cout<<endl;
	 }
 
		
			
 
 }


```

### Python

```python

a, b, c, x, y, z = map(int, input().split())
triple = n - a - b - c + x + y + z
print(triple)
```

### Java

```java

import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        long a = sc.nextLong();
        long b = sc.nextLong();
        long c = sc.nextLong();
        long x = sc.nextLong();
        long y = sc.nextLong();
        long z = sc.nextLong();

        long triple = x + y + z - (a + b + c - (a + b + c - (x + y + z)));

        System.out.println(triple);
    }
}

```

### Time Complexity

All operations are **O(1)**.

## Resources

[Inclusion-Exclusion Example: Video](https://youtu.be/51-b2mgZVNY?si=k4zOB8WPsRnLcZ78).

[Set Theory. Inclusion-exclusion Principle.](https://youtu.be/UMQ_xVsI-2s?si=YRLaL1byZqOtH1Sh).

