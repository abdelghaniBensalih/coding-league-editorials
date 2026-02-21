# A. The Research Team  

**Time limit:** 2 seconds  
**Memory limit:** 256 megabytes  

One day Abdelghani, a brilliant researcher, formed a team with his two colleagues to work on research proposals. The team has a simple decision-making rule: they will only pursue a research proposal if at least two team members are confident they can successfully complete it. Otherwise, the team won't work on that proposal.

The research institute has announced n
proposals that teams can apply for. For each proposal we know which team member is confident about completing it. Help Abdelghani's team find the number of proposals they will pursue


---

## Input

The first line contains a single integer **n** (1 ≤ n ≤ 1000) : the number of research proposals.  
Each of the next **n** lines contains three integers (0 or 1) representing whether each of the three team members is confident about the proposal.

---

## Output

Print one integer : the number of proposals the team will pursue.

---

### Example

**Input:**
```
3
1 1 0
1 1 1
1 0 0
```

**Output:**
```
2
```

---

## Solutions

### Approach

For every proposal:
1. Read the three confidence values.
2. Count how many of them are equal to **1**.
3. If the count is **at least 2**, the team will pursue this proposal, so we increase the answer.

Finally, output the total number of proposals accepted.

---

### C++

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int result = 0;
    
    for (int i = 0; i < n; i++) {
        int a, b, c;
        cin >> a >> b >> c;
        
        if (a + b + c >= 2) {
            result++;
        }
    }
    
    cout << result << endl;
    return 0;
}
```

---

### Python

```python
n = int(input())
result = 0

for _ in range(n):
    a, b, c = map(int, input().split())
    if a + b + c >= 2:
        result += 1

print(result)
```

---

### Java

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        int n = sc.nextInt();
        int result = 0;
        
        for (int i = 0; i < n; i++) {
            int a = sc.nextInt();
            int b = sc.nextInt();
            int c = sc.nextInt();
            
            if (a + b + c >= 2) {
                result++;
            }
        }
        
        System.out.println(result);
    }
}
```

---

### Time Complexity

**O(n)** — each proposal is processed once.

---

## Resources

- Simple counting logic  
- Input processing  
- Conditional checks  
