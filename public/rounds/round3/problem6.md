# F. Is Infinity a number

**Time limit:**  1 second  
**Memory limit:**  256 megabytes

You are given a string **s** of length **n**.

In one operation, you may choose any index `i`  
( `1 ≤ i ≤ n` ) and replace the character `s[i]` with **any character** (not necessarily lowercase).

Your goal is to transform the string so that **all characters become equal**.  
As soon as the string becomes uniform, you **must stop** performing operations.

We define:

- **x** → the **minimum** number of operations needed to make the string uniform.
- **y** → the **maximum** number of operations you can perform before the string becomes uniform  
  (you must stop the instant it becomes uniform).

Your task is to determine whether **x = y**.


## Input

- First line: integer **t** — number of test cases.
- For each test case:
  - First line: integer **n** — length of the string.
  - Second line: string **s** of length **n**.


## Output

- Print `"YES"` if `x = y`
- Print `"NO"` otherwise

### Example

**Input:**

```

```

**Output:**

```

```

## Solutions

### Key Observations

#### Case 1: String is already uniform  
All characters are equal.

- Minimum operations: `x = 0`
- Maximum operations: `y = 0`  
  (you must stop immediately)

Therefore:

```
x = y = 0 → YES
```

---

#### Case 2: String is not uniform

- At least one operation is required:
  ```
  x ≥ 1
  ```
- You can keep modifying characters in a way that avoids making the string uniform for as long as you want:
  ```
  y = ∞
  ```

Therefore:

```
x ≠ y → NO
```

---

### Final Conclusion

The answer is:

> **"YES" if and only if the entire string already consists of the same character.**  
> Otherwise, print **"NO"**.

---

### C++

```cpp

void solve() {
 int n;cin>>n;
 string s;cin>>s;
 for(int i=1;i<n;i++)
 {
  if(s[i]!=s[i-1])
  {
   cout<<"no";
   return;
  }
 }
 cout<<"yes";
}
int main()
 
 
 
{
	fast();
	int T=1;
	cin>>T;
	while(T--)
	{
		solve();
		cout<<endl;
	}
 
		
			
 
}

```



### Time Complexity

- **Time Complexity:** `O(n)` per test case
- **Total Time:** `O(total_length_of_strings)`
- **Space Complexity:** `O(1)`

## Resources


