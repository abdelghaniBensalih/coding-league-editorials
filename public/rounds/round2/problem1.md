# A. Football
**Time Limit:** 2 seconds  
**Memory Limit:** 256 MB

## Problem Statement
You are given a string representing positions of football players from two teams. The string consists of '0's and '1's, where '0' represents players from one team and '1' represents players from the other team. A situation is considered dangerous if there are at least 7 consecutive players from the same team. Determine if the given situation is dangerous.

## Input
A single non-empty string consisting of characters '0' and '1'.

### Constraints
- 1 ≤ string length ≤ 100
- At least one player from each team is present

## Output
Print "YES" if the situation is dangerous. Otherwise, print "NO".

### Example
**Input:**
```
001001
```
**Output:**
```
NO
```

**Input:**
```
1000000001
```
**Output:**
```
YES
```

## Solutions

### Approach
Iterate through the string and count consecutive identical characters. If at any point the count reaches 7 or more, the situation is dangerous.

### Logic
We iterate through the string starting from the second character. For each character, we check if it matches the previous character. If it does, we increment a counter. If the counter reaches 7, we immediately output "YES" and terminate. If the current character differs from the previous one, we reset the counter to 1. If we finish iterating without finding 7 consecutive identical characters, we output "NO".

## C++
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    
    int count = 1;
    for (int i = 1; i < s.length(); i++) {
        if (s[i] == s[i-1]) {
            count++;
            if (count >= 7) {
                cout << "YES" << endl;
                return 0;
            }
        } else {
            count = 1;
        }
    }
    
    cout << "NO" << endl;
    return 0;
}
```

## Python
```python
s = input()

count = 1
for i in range(1, len(s)):
    if s[i] == s[i-1]:
        count += 1
        if count >= 7:
            print("YES")
            exit()
    else:
        count = 1

print("NO")
```

## Java
```java
import java.util.Scanner;

public class Football {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        
        int count = 1;
        for (int i = 1; i < s.length(); i++) {
            if (s.charAt(i) == s.charAt(i-1)) {
                count++;
                if (count >= 7) {
                    System.out.println("YES");
                    sc.close();
                    return;
                }
            } else {
                count = 1;
            }
        }
        
        System.out.println("NO");
        sc.close();
    }
}
```

## Time Complexity
**O(n)** where n is the length of the string. The substring search takes linear time.

## Resources
