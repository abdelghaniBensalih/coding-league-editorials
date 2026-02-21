# D. Connecting the Campus Cores

**Time limit:**  1 second  
**Memory limit:**  256 megabytes

After qualifying all rounds of the **UCA Coding League**, Kartik arrives at the UCA campus.  
The campus consists of **n cores** (buildings). Some cores are already connected by **bridges**.  
Apart from bridges, every core can be accessed by road, but Kartik wants to travel **using bridges only**.

Your task is to find the **minimum number of new bridges** required so that **every core is reachable from every other core using bridges only**.



## Input


- The first line contains two integers **n** and **m** — the number of cores and the number of bridges.
- The next **m** lines contain two integers **a** and **b**, representing a bridge between core **a** and core **b**.

## Output
Print a single integer — the **minimum number of new bridges required**.


### Example

**Input:**


```
5 3
1 2
3 4
4 5
```

**Output:**

```
1

```

## Solutions

We model the campus as an **undirected graph**:

- Each **core** → node  
- Each **bridge** → edge  

The goal is to make the graph **connected** using the minimum number of additional edges.

---

### Key Observation

If the graph has **k connected components**, we need exactly:

```
k - 1 bridges
```

to connect them into one connected component.

---

### Algorithm

1. Create an adjacency list.
2. Use a **visited** array.
3. For each unvisited node, perform **DFS** and increase the component count.
4. Output:  
   `number_of_components - 1`

---

### Correctness Proof

Each DFS discovers exactly one connected component.  
To connect `k` isolated components, at least `k-1` edges are necessary and sufficient.  
Thus, the algorithm outputs the minimum required bridges.

---


### C++

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
vector<int> adj[MAXN];
bool visited[MAXN];

void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v])
            dfs(v);
    }
}

int main() {
    int n, m;
    cin >> n >> m;

    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    int components = 0;
    for (int i = 1; i <= n; i++) {
        if (!visited[i]) {
            dfs(i);
            components++;
        }
    }

    cout << components - 1 << endl;
    return 0;
}
```



### Time Complexity

- **Time Complexity:** `O(n + m)`
- **Space Complexity:** `O(n + m)`

## Resources


