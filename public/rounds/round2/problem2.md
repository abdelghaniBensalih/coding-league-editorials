# B. Maximum Distance To Port

**Time Limit:** 1 seconds  
**Memory Limit:** 256 MB

## Problem Statement

There are n cities numbered from 1 to n, connected by m bidirectional roads, each exactly 1 kilometer long. The road network forms a connected simple graph.

Each city produces exactly one of k types of agricultural products, numbered from 1 to k. City 1 is the main port where all products must be delivered.

The government wants to estimate the worst-case transportation cost and time for exporting agricultural goods. For each product type, determine the longest among the shortest distances (in kilometers) from any city producing that product to the port city.

## Input

The first line contains three integers n, m, and k (number of cities, roads, and product types).

The second line contains n integers a₁, a₂, …, aₙ, where aᵢ is the product type produced by city i.

The following m lines each contain two integers uᵢ and vᵢ, representing a bidirectional road connecting cities uᵢ and vᵢ.

### Constraints

- 1 ≤ n ≤ 2×10⁵
- 0 ≤ m ≤ 2×10⁵
- 1 ≤ k ≤ n
- 1 ≤ aᵢ ≤ k
- 1 ≤ uᵢ, vᵢ ≤ n
- The graph is connected and simple (no self-loops or multiple edges)
- Every product type from 1 to k is produced by at least one city

## Output

Output k integers in a single line. The i-th integer should be the maximum shortest distance (in kilometers) from any city producing product i to the port city 1.

### Example

**Input:**
```
8 10 5
5 1 1 2 4 4 2 3
8 2
4 6
6 2
5 2
2 7
8 6
1 2
7 6
3 1
1 5
```

**Output:**
```
1 3 2 2 0
```

## Solutions

### Approach

Use BFS (Breadth-First Search) from city 1 (the port) to find the shortest distance to all other cities. Since all roads have equal length (1 km), BFS guarantees the shortest path. Then, for each product type, find the maximum distance among all cities producing that product.

### Logic

1. Build an adjacency list representation of the graph
2. Perform BFS from city 1 to compute shortest distances to all cities
3. For each city, update the maximum distance for its corresponding product type
4. Output the maximum distances for products 1 to k

## C++
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, m, k;
    cin >> n >> m >> k;
    
    vector<int> products(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> products[i];
    }
    
    vector<vector<int>> graph(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    vector<int> dist(n + 1, -1);
    queue<int> q;
    q.push(1);
    dist[1] = 0;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (int v : graph[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    vector<int> maxDist(k + 1, 0);
    for (int i = 1; i <= n; i++) {
        int product = products[i];
        maxDist[product] = max(maxDist[product], dist[i]);
    }

    for (int i = 1; i <= k; i++) {
        if (i > 1) cout << " ";
        cout << maxDist[i];
    }
    cout << "\n";
    
    return 0;
}
```

## Python
```python
from collections import deque

def solve():
    n, m, k = map(int, input().split())
    products = [0] + list(map(int, input().split()))
    
    graph = [[] for _ in range(n + 1)]
    for _ in range(m):
        u, v = map(int, input().split())
        graph[u].append(v)
        graph[v].append(u)

    dist = [-1] * (n + 1)
    dist[1] = 0
    queue = deque([1])
    
    while queue:
        u = queue.popleft()
        for v in graph[u]:
            if dist[v] == -1:
                dist[v] = dist[u] + 1
                queue.append(v)

    max_dist = [0] * (k + 1)
    for city in range(1, n + 1):
        product = products[city]
        max_dist[product] = max(max_dist[product], dist[city])
    
    print(' '.join(map(str, max_dist[1:k+1])))

solve()
```

## Java
```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        int n = sc.nextInt();
        int m = sc.nextInt();
        int k = sc.nextInt();
        
        int[] products = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            products[i] = sc.nextInt();
        }
        
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            graph.add(new ArrayList<>());
        }
        
        for (int i = 0; i < m; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            graph.get(u).add(v);
            graph.get(v).add(u);
        }
        

        int[] dist = new int[n + 1];
        Arrays.fill(dist, -1);
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(1);
        dist[1] = 0;
        
        while (!queue.isEmpty()) {
            int u = queue.poll();
            
            for (int v : graph.get(u)) {
                if (dist[v] == -1) {
                    dist[v] = dist[u] + 1;
                    queue.offer(v);
                }
            }
        }
        

        int[] maxDist = new int[k + 1];
        for (int i = 1; i <= n; i++) {
            int product = products[i];
            maxDist[product] = Math.max(maxDist[product], dist[i]);
        }
        

        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= k; i++) {
            if (i > 1) sb.append(" ");
            sb.append(maxDist[i]);
        }
        System.out.println(sb.toString());
        
        sc.close();
    }
}
```

## Time Complexity

- **BFS Traversal:** O(n + m) - visits each node and edge once
- **Finding Maximum Distances:** O(n) - single pass through all cities
- **Total:** O(n + m)
- **Space Complexity:** O(n + m) for storing the graph and distances

## Resources

- [BFS Algorithm Tutorial](https://en.wikipedia.org/wiki/Breadth-first_search)
- [Graph Traversal Techniques](https://cp-algorithms.com/graph/breadth-first-search.html)
