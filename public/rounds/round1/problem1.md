# A. Salma's Secret Message

**Time limit:** 1 second  
**Memory limit:** 256 megabytes

Salma loves sending secret messages to her friends. She discovered that words with an even number of letters are considered "lucky words" that carry hidden clues. Salma wrote down a message and now wants to know how many lucky words are in it.

Can you help Salma count them?

## Input

The input contains a single line with Salma's message — a string `S` consisting of words separated by a single space.

- Each word contains only lowercase or uppercase English letters.
- The total length of `S` does not exceed 1000 characters.

## Output

Print a single integer — the number of words in the message that have an even number of letters.

### Example

**Input:**

```
Salma loves solving fun problems
```

**Output:**

```
1
```

## Solutions



### Approach
Split the string by spaces to extract the words.

For each word:

* Check if its length is even (i.e., length % 2 == 0)

* If yes :  increase the counter.

### C++

```cpp
#include <bits/stdc++.h>
 using namespace std;

 int main() {
     string line;
     getline(cin, line);

     stringstream ss(line);
     string word;
     int ans = 0;

     while (ss >> word) {
         if (word.length() % 2 == 0) {
             ans++;
         }
     }

     cout << ans << endl;
     return 0;
 }


```

### Python

```python 
words= input().strip()
 words=words.split()
 ans=0
 for word in words:
	 if len(word)%2==0:
		 ans=ans+1
 print(ans)
```

### Java

```java
import java.util.*;

 public class Main {
     public static void main(String[] args) {
         Scanner sc = new Scanner(System.in);
         String line = sc.nextLine().trim();
         String[] words = line.split("\\s+");

         int ans = 0;
         for (String word : words) {
             if (word.length() % 2 == 0) {
                 ans++;
             }
         }

         System.out.println(ans);
     }
 }

```

### Time Complexity

**O(n)**, where n is the number of characters in the String.

## Resources


