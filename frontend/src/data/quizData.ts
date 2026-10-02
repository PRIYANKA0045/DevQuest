export type QuestionType =
  | 'single-choice'
  | 'multiple-select'
  | 'code-output'
  | 'bug-spotting'
  | 'fill-blank'
  | 'true-false';

export type QuizCategory =
  | 'Algorithms & DSA'
  | 'Frontend & React'
  | 'Backend & APIs'
  | 'SQL & Databases'
  | 'System Design';

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  type: QuestionType;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  codeSnippet?: string;
  codeLanguage?: string;
  options: string[];
  // For single-choice, code-output, bug-spotting, fill-blank, true-false: index of correct option
  // For multiple-select: array of indices of correct options
  correct: number | number[];
  hint: string;
  explanation: string;
  xpReward: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 1. Algorithms - Single Choice
  {
    id: 'algo-1',
    category: 'Algorithms & DSA',
    type: 'single-choice',
    difficulty: 'Easy',
    question: 'What is the average time complexity of searching an element in a Hash Map?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
    correct: 2,
    hint: 'Think about direct address table indexing via a hash calculation.',
    explanation: 'Hash maps provide O(1) average constant lookup time via hashing function indexing. In the worst-case (with many hash collisions), it can degrade to O(n) or O(log n) if balanced trees are used for buckets.',
    xpReward: 50
  },
  // 2. Algorithms - Code Output
  {
    id: 'algo-2',
    category: 'Algorithms & DSA',
    type: 'code-output',
    difficulty: 'Medium',
    question: 'What will be the output of this Python recursive function when called with count_nodes(4)?',
    codeSnippet: `def count_nodes(n):
    if n <= 1:
        return 1
    return count_nodes(n - 1) + count_nodes(n - 2)

print(count_nodes(4))`,
    codeLanguage: 'python',
    options: ['3', '5', '8', '4'],
    correct: 1,
    hint: 'Trace the Fibonacci-like recurrence: count_nodes(2)=2, count_nodes(3)=3, count_nodes(4)=5.',
    explanation: 'Tracing: count_nodes(0)=1, count_nodes(1)=1, count_nodes(2) = 1+1 = 2, count_nodes(3) = 2+1 = 3, count_nodes(4) = 3+2 = 5.',
    xpReward: 75
  },
  // 3. Algorithms - Multiple Select
  {
    id: 'algo-3',
    category: 'Algorithms & DSA',
    type: 'multiple-select',
    difficulty: 'Medium',
    question: 'Which of the following data structures are NON-LINEAR? (Select all that apply)',
    options: ['Binary Search Tree', 'Singly Linked List', 'Trie (Prefix Tree)', 'Graph', 'Array'],
    correct: [0, 2, 3],
    hint: 'Linear structures have elements arranged sequentially where each element is attached to its previous and next adjacent elements.',
    explanation: 'Binary Search Trees, Tries, and Graphs are non-linear data structures because elements are arranged hierarchically or interconnectedly. Arrays and Linked Lists are linear.',
    xpReward: 80
  },
  // 4. Algorithms - Bug Spotting
  {
    id: 'algo-4',
    category: 'Algorithms & DSA',
    type: 'bug-spotting',
    difficulty: 'Hard',
    question: 'Which line contains the potential integer overflow bug in this Binary Search implementation?',
    codeSnippet: `1: int binarySearch(int[] nums, int target) {
2:     int left = 0, right = nums.length - 1;
3:     while (left <= right) {
4:         int mid = (left + right) / 2;
5:         if (nums[mid] == target) return mid;
6:         else if (nums[mid] < target) left = mid + 1;
7:         else right = mid - 1;
8:     }
9:     return -1;
10: }`,
    codeLanguage: 'java',
    options: [
      'Line 2: right = nums.length - 1',
      'Line 4: int mid = (left + right) / 2',
      'Line 6: left = mid + 1',
      'Line 7: right = mid - 1'
    ],
    correct: 1,
    hint: 'What happens when left + right exceeds Integer.MAX_VALUE?',
    explanation: 'Line 4 can overflow in languages like C++, Java, and Go when left + right exceeds 2^31 - 1, producing a negative number. The canonical fix is: mid = left + (right - left) / 2.',
    xpReward: 100
  },
  // 5. Frontend - Code Output
  {
    id: 'front-1',
    category: 'Frontend & React',
    type: 'code-output',
    difficulty: 'Medium',
    question: 'What gets logged to the console in JavaScript event loop execution order?',
    codeSnippet: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');`,
    codeLanguage: 'javascript',
    options: ['1, 2, 3, 4', '1, 4, 2, 3', '1, 4, 3, 2', '1, 3, 4, 2'],
    correct: 2,
    hint: 'Synchronous code runs first, then microtasks (Promises), then macrotasks (setTimeout).',
    explanation: 'Synchronous script logs "1" then "4". The microtask queue processes Promise callbacks before the next macrotask, logging "3". Finally, the macrotask setTimeout callback runs, logging "2". Order: 1, 4, 3, 2.',
    xpReward: 75
  },
  // 6. Frontend - Multiple Select
  {
    id: 'front-2',
    category: 'Frontend & React',
    type: 'multiple-select',
    difficulty: 'Easy',
    question: 'Which of the following are native Built-in React Hooks? (Select all that apply)',
    options: ['useState', 'useQuery', 'useEffect', 'useHistory', 'useMemo'],
    correct: [0, 2, 4],
    hint: 'useQuery is from TanStack Query, and useHistory is from React Router v5.',
    explanation: 'useState, useEffect, and useMemo are built directly into the official React package. useQuery is third-party (React Query), and useHistory is from React Router.',
    xpReward: 60
  },
  // 7. Frontend - Bug Spotting
  {
    id: 'front-3',
    category: 'Frontend & React',
    type: 'bug-spotting',
    difficulty: 'Medium',
    question: 'What is the root cause of the infinite re-render loop in this React component?',
    codeSnippet: `function UserDashboard({ userId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/user/' + userId)
      .then(res => res.json())
      .then(d => setData(d));
  });

  return <div>{data ? data.name : 'Loading...'}</div>;
}`,
    codeLanguage: 'jsx',
    options: [
      'setData cannot be called inside a Promise callback',
      'Missing dependency array in useEffect causes it to run on every state change',
      'userId cannot be passed as a prop into useEffect',
      'The component needs to wrap the return in React.Fragment'
    ],
    correct: 1,
    hint: 'Look at the second argument to useEffect.',
    explanation: 'When useEffect has no dependency array (not even []), it runs after EVERY render. Calling setData causes a re-render, which runs useEffect again, triggering an infinite loop. Fix: add [userId] as the dependency array.',
    xpReward: 80
  },
  // 8. SQL & Databases - Fill in the blank
  {
    id: 'sql-1',
    category: 'SQL & Databases',
    type: 'fill-blank',
    difficulty: 'Easy',
    question: 'Fill in the blank to return customers whose total order spend exceeds $500:',
    codeSnippet: `SELECT customer_id, SUM(amount) AS total_spent
FROM orders
GROUP BY customer_id
__________ SUM(amount) > 500;`,
    codeLanguage: 'sql',
    options: ['WHERE', 'HAVING', 'FILTER BY', 'QUALIFY'],
    correct: 1,
    hint: 'Which clause is specifically used to filter groups created by aggregate functions?',
    explanation: 'HAVING is applied after GROUP BY aggregation to filter grouped result sets based on aggregate conditions like SUM(amount) > 500. WHERE filters rows before aggregation.',
    xpReward: 60
  },
  // 9. SQL & Databases - Single Choice
  {
    id: 'sql-2',
    category: 'SQL & Databases',
    type: 'single-choice',
    difficulty: 'Medium',
    question: 'In relational databases, what does the "I" stand for in the ACID transaction guarantees?',
    options: ['Integrity', 'Isolation', 'Idempotence', 'Inheritance'],
    correct: 1,
    hint: 'Ensures concurrent transactions execute without interfering with one another.',
    explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability. Isolation ensures that concurrent execution of transactions leaves the database in the same state as if they were executed sequentially.',
    xpReward: 60
  },
  // 10. SQL & Databases - Multiple Select
  {
    id: 'sql-3',
    category: 'SQL & Databases',
    type: 'multiple-select',
    difficulty: 'Hard',
    question: 'Which of the following SQL JOIN types will preserve rows from the LEFT table even if there is no match in the right table? (Select all that apply)',
    options: ['INNER JOIN', 'LEFT JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'RIGHT JOIN'],
    correct: [1, 2],
    hint: 'Both LEFT JOIN and FULL OUTER JOIN guarantee that non-matching left rows appear with NULLs for right table columns.',
    explanation: 'LEFT JOIN returns all records from the left table, plus matched records from the right table. FULL OUTER JOIN returns all records from both tables. INNER JOIN only returns matching records.',
    xpReward: 85
  },
  // 11. Backend & APIs - Single Choice
  {
    id: 'back-1',
    category: 'Backend & APIs',
    type: 'single-choice',
    difficulty: 'Easy',
    question: 'Which HTTP status code signifies that a client request is unauthorized because valid authentication credentials are missing?',
    options: ['400 Bad Request', '401 Unauthorized', '403 Forbidden', '404 Not Found'],
    correct: 1,
    hint: '401 means unauthenticated (who are you?), while 403 means authenticated but not permitted (you cannot do this).',
    explanation: '401 Unauthorized specifically indicates that the request lacks valid authentication credentials. 403 Forbidden indicates the server understands the identity but refuses to authorize the operation.',
    xpReward: 50
  },
  // 12. Backend & APIs - Multiple Select
  {
    id: 'back-2',
    category: 'Backend & APIs',
    type: 'multiple-select',
    difficulty: 'Medium',
    question: 'Which of the following HTTP methods are defined as IDEMPOTENT by RFC specifications? (Select all that apply)',
    options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    correct: [0, 2, 3],
    hint: 'An idempotent method produces the same server state whether executed once or 10 times consecutively.',
    explanation: 'GET, PUT, and DELETE are idempotent. Making multiple identical PUT or DELETE requests results in the same state as making one. POST and PATCH are not guaranteed to be idempotent because repeated calls may create duplicate entities or append data.',
    xpReward: 80
  },
  // 13. Backend & APIs - True/False
  {
    id: 'back-3',
    category: 'Backend & APIs',
    type: 'true-false',
    difficulty: 'Easy',
    question: 'Node.js runs JavaScript on a single thread event loop and cannot execute any background asynchronous I/O concurrently.',
    options: ['True', 'False'],
    correct: 1,
    hint: 'Think about libuv and worker thread pools handling file system and network calls.',
    explanation: 'False. While JavaScript execution itself runs on a single main thread, Node.js delegates asynchronous I/O (file ops, DNS lookups, compression) to libuv worker thread pools and the operating system kernel.',
    xpReward: 50
  },
  // 14. System Design - Single Choice
  {
    id: 'sys-1',
    category: 'System Design',
    type: 'single-choice',
    difficulty: 'Medium',
    question: 'In distributed systems, which strategy ensures that requests with the same user ID are routed to the same cache or database shard while minimizing re-sharding when nodes are added or removed?',
    options: ['Round Robin', 'Consistent Hashing', 'Least Connection', 'Random Weighted'],
    correct: 1,
    hint: 'Organizes nodes in a virtual hash ring.',
    explanation: 'Consistent Hashing maps both data keys and server nodes onto a circular ring (0 to 2^32-1). When a server node is added or removed, only K/N keys need to be remapped on average, drastically minimizing cache misses.',
    xpReward: 85
  },
  // 15. System Design - Multiple Select
  {
    id: 'sys-2',
    category: 'System Design',
    type: 'multiple-select',
    difficulty: 'Hard',
    question: 'According to the CAP Theorem, which combinations of guarantees can a distributed data store provide simultaneously during a network partition (P)? (Select all that apply)',
    options: [
      'Consistency & Availability without Partition Tolerance (CA)',
      'Consistency & Partition Tolerance (CP)',
      'Availability & Partition Tolerance (AP)',
      'Consistency, Availability, and Partition Tolerance simultaneously (CAP)'
    ],
    correct: [1, 2],
    hint: 'Network partitions are inevitable in real networks, so the system must choose between Consistency or Availability.',
    explanation: 'When a network partition (P) occurs, a distributed system must choose either CP (preserving consistency by rejecting requests if data cannot be synchronized) or AP (preserving availability by returning stale data from isolated nodes). All three (CAP) cannot be achieved simultaneously in presence of a partition.',
    xpReward: 95
  },
  // 16. Algorithms - True / False
  {
    id: 'algo-5',
    category: 'Algorithms & DSA',
    type: 'true-false',
    difficulty: 'Easy',
    question: 'A Stack follows the FIFO (First In, First Out) ordering principle.',
    options: ['True', 'False'],
    correct: 1,
    hint: 'Think about a stack of plates—the last plate put on top is the first one removed.',
    explanation: 'False. A Stack follows LIFO (Last In, First Out). A Queue follows FIFO (First In, First Out).',
    xpReward: 40
  },
  // 17. Frontend - Single Choice
  {
    id: 'front-4',
    category: 'Frontend & React',
    type: 'single-choice',
    difficulty: 'Medium',
    question: 'What is the purpose of the CSS property "box-sizing: border-box"?',
    options: [
      'Includes margins inside the element width calculation',
      'Includes padding and border within the element total width and height',
      'Draws an outer shadow around the border',
      'Prevents elements from overflowing flex containers'
    ],
    correct: 1,
    hint: 'In the standard W3C model, padding and border are added ON TOP of the specified width.',
    explanation: 'With box-sizing: border-box, the width and height properties include content, padding, and border. This makes responsive UI layout calculation predictable and prevents unexpected overflowing.',
    xpReward: 50
  },
  // 18. SQL & Databases - Code Output
  {
    id: 'sql-4',
    category: 'SQL & Databases',
    type: 'code-output',
    difficulty: 'Hard',
    question: 'Given the query below with NULL values, how many rows will be returned?',
    codeSnippet: `-- Table: employees
-- id | name    | manager_id
--  1 | Alice   | NULL
--  2 | Bob     | 1
--  3 | Charlie | NULL

SELECT COUNT(*) FROM employees WHERE manager_id != 1;`,
    codeLanguage: 'sql',
    options: ['0', '1', '2', '3'],
    correct: 0,
    hint: 'In Three-Valued Logic (3VL) SQL, comparing NULL with any value (e.g. NULL != 1) evaluates to UNKNOWN, not TRUE.',
    explanation: 'In SQL: (NULL != 1) evaluates to UNKNOWN (falsy in WHERE). Only rows where the predicate evaluates to TRUE are included. For Bob, (1 != 1) is FALSE. For Alice & Charlie, (NULL != 1) is UNKNOWN. Thus 0 rows match! To include them, you would need: manager_id != 1 OR manager_id IS NULL.',
    xpReward: 90
  },
  // 19. Algorithms - Cycle Detection (Single Choice)
  {
    id: 'algo-6',
    category: 'Algorithms & DSA',
    type: 'single-choice',
    difficulty: 'Medium',
    question: "Which algorithmic technique allows detecting a cycle in a linked list in O(n) time and O(1) auxiliary space?",
    options: [
      "Floyd's Tortoise and Hare (Two Pointers)",
      'Breadth-First Search with Visited Set',
      'Binary Search on Pointer Addresses',
      "Dijkstra's Shortest Path Algorithm"
    ],
    correct: 0,
    hint: 'Uses a slow pointer moving 1 step and a fast pointer moving 2 steps simultaneously.',
    explanation: "Floyd's Cycle-Finding Algorithm (Tortoise and Hare) advances slow pointer by 1 and fast pointer by 2. If a cycle exists, they must eventually intersect, requiring only two pointer variables (O(1) auxiliary memory).",
    xpReward: 70
  },
  // 20. Algorithms - Code Output (Dynamic Programming)
  {
    id: 'algo-7',
    category: 'Algorithms & DSA',
    type: 'code-output',
    difficulty: 'Medium',
    question: 'What is the output of this DP memoized climbing stairs solution for n = 5?',
    codeSnippet: `def climb_ways(n, memo={}):
    if n in memo: return memo[n]
    if n <= 2: return n
    memo[n] = climb_ways(n - 1, memo) + climb_ways(n - 2, memo)
    return memo[n]

print(climb_ways(5))`,
    codeLanguage: 'python',
    options: ['5', '8', '13', '21'],
    correct: 1,
    hint: 'Ways for 1: 1, for 2: 2, for 3: 3, for 4: 5, for 5: 8.',
    explanation: 'The number of distinct ways to climb n stairs taking 1 or 2 steps matches the Fibonacci sequence: climb(1)=1, climb(2)=2, climb(3)=3, climb(4)=5, climb(5)=8.',
    xpReward: 75
  },
  // 21. Algorithms - Multiple Select (Tree Traversals)
  {
    id: 'algo-8',
    category: 'Algorithms & DSA',
    type: 'multiple-select',
    difficulty: 'Easy',
    question: 'Which of the following traversals visit the Left Subtree before the Right Subtree in a Binary Tree? (Select all that apply)',
    options: ['In-order Traversal', 'Pre-order Traversal', 'Post-order Traversal', 'Reverse Level-order Traversal'],
    correct: [0, 1, 2],
    hint: 'In-order is L-N-R, Pre-order is N-L-R, Post-order is L-R-N.',
    explanation: 'Standard In-order (Left, Node, Right), Pre-order (Node, Left, Right), and Post-order (Left, Right, Node) all process the left child/subtree before the right child.',
    xpReward: 60
  },
  // 22. Algorithms - Bug Spotting
  {
    id: 'algo-9',
    category: 'Algorithms & DSA',
    type: 'bug-spotting',
    difficulty: 'Hard',
    question: 'What bug prevents this Two-Pointer Palindrome check from correctly handling mixed cases or spaces?',
    codeSnippet: `function isPalindrome(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
    codeLanguage: 'javascript',
    options: [
      'The while loop condition should be left <= right',
      'Missing alphanumeric character sanitization and lowercasing conversion',
      'right pointer should initialize to s.length instead of s.length - 1',
      'left and right cannot be compared directly using strict inequality'
    ],
    correct: 1,
    hint: 'Palindromes like "A man, a plan, a canal: Panama" require stripping non-alphanumeric chars and ignoring case.',
    explanation: 'The code assumes clean input. Real palindrome validation requires skipping whitespace and punctuation and converting characters to uniform lowercase (e.g. s = s.toLowerCase().replace(/[^a-z0-9]/g, "")).',
    xpReward: 85
  },
  // 23. Frontend - Code Output (Closures & Hoisting)
  {
    id: 'front-5',
    category: 'Frontend & React',
    type: 'code-output',
    difficulty: 'Medium',
    question: 'What is logged when the following JavaScript code executes?',
    codeSnippet: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 10);
}`,
    codeLanguage: 'javascript',
    options: ['0 1 2', '3 3 3', 'undefined undefined undefined', '0 0 0'],
    correct: 1,
    hint: 'var is function-scoped (or globally scoped), not block-scoped like let.',
    explanation: 'Because "var" is function-scoped, a single shared binding of "i" exists. By the time the setTimeout callbacks execute after 10ms, the loop has completed and "i" has reached 3. Replacing "var" with "let" creates a new binding for each iteration, which would log 0, 1, 2.',
    xpReward: 70
  },
  // 24. Frontend - Single Choice (React reconciliation)
  {
    id: 'front-6',
    category: 'Frontend & React',
    type: 'single-choice',
    difficulty: 'Easy',
    question: 'Why should you NOT use array indices as "key" props when rendering dynamic lists in React?',
    options: [
      'React will throw a runtime fatal TypeError in production mode',
      'Indices can break component state and animations when items are reordered, inserted, or removed',
      'Array indices are not valid strings or numbers according to JSX specs',
      'It causes React to fetch new data from the server'
    ],
    correct: 1,
    hint: 'Think about what happens to item keys when an item is prepended at index 0.',
    explanation: 'Using array indices as keys confuses React Diffing when list items are reordered or deleted. Uncontrolled component states (like form inputs) will stay associated with the old index rather than the item data.',
    xpReward: 55
  },
  // 25. Frontend - Multiple Select (CSS Layout)
  {
    id: 'front-7',
    category: 'Frontend & React',
    type: 'multiple-select',
    difficulty: 'Medium',
    question: 'Which of the following CSS properties are valid Flexbox container properties? (Select all that apply)',
    options: ['justify-content', 'align-items', 'grid-template-columns', 'flex-direction', 'place-self'],
    correct: [0, 1, 3],
    hint: 'grid-template-columns belongs to CSS Grid, and place-self is a Grid/Flex item alignment shorthand.',
    explanation: 'justify-content, align-items, and flex-direction are standard flex container properties. grid-template-columns belongs to CSS Grid layout.',
    xpReward: 65
  },
  // 26. Frontend - Bug Spotting (React useMemo)
  {
    id: 'front-8',
    category: 'Frontend & React',
    type: 'bug-spotting',
    difficulty: 'Hard',
    question: 'What is wrong with this useMemo optimization in a React component?',
    codeSnippet: `function SearchResults({ query, items }) {
  const filtered = useMemo(() => {
    return items.filter(item => item.name.includes(query));
  }, []);

  return <ul>{filtered.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}`,
    codeLanguage: 'jsx',
    options: [
      'useMemo cannot return an array',
      'Missing "query" and "items" in dependency array causes stale results when search input changes',
      'useMemo should be replaced with useEffect and a local state variable',
      'Items cannot be filtered inside functional components'
    ],
    correct: 1,
    hint: 'Look at the second parameter of useMemo: [].',
    explanation: 'The empty dependency array [] tells React to only calculate the filtered list ONCE on initial mount. As the user types into "query" or "items" update, the component will return stale memoized results. Dependencies should be [query, items].',
    xpReward: 90
  },
  // 27. Backend - Single Choice (JWT)
  {
    id: 'back-4',
    category: 'Backend & APIs',
    type: 'single-choice',
    difficulty: 'Medium',
    question: 'Which part of a JSON Web Token (JWT) is digitally signed to prevent tampering by unauthorized clients?',
    options: [
      'Only the Payload claims',
      'The Header and the Payload encoded together',
      'Only the expiration (exp) timestamp',
      'The Secret Key itself'
    ],
    correct: 1,
    hint: 'Signature = HMACSHA256(base64Url(header) + "." + base64Url(payload), secret).',
    explanation: 'A JWT signature is created by hashing the base64-encoded Header and Payload together with a cryptographic secret or private key. Any client-side modification of header or payload invalidates the signature.',
    xpReward: 65
  },
  // 28. Backend - Multiple Select (REST API)
  {
    id: 'back-5',
    category: 'Backend & APIs',
    type: 'multiple-select',
    difficulty: 'Easy',
    question: 'Which HTTP response status codes represent successful operations (2xx)? (Select all that apply)',
    options: ['200 OK', '201 Created', '204 No Content', '304 Not Modified', '409 Conflict'],
    correct: [0, 1, 2],
    hint: '304 is Redirection/Caching, and 409 is a Client Error.',
    explanation: '200 OK, 201 Created (often after POST), and 204 No Content (often after DELETE) are valid 2xx Success codes. 304 is Redirection/Cache, and 409 is a Client Conflict error.',
    xpReward: 50
  },
  // 29. Backend - Code Output (Express Middleware)
  {
    id: 'back-6',
    category: 'Backend & APIs',
    type: 'code-output',
    difficulty: 'Hard',
    question: 'What is the console output order when a GET request hits this Express application?',
    codeSnippet: `app.use((req, res, next) => {
  console.log('Middleware A Start');
  next();
  console.log('Middleware A End');
});

app.get('/test', (req, res) => {
  console.log('Handler Route');
  res.send('Done');
});`,
    codeLanguage: 'javascript',
    options: [
      'Middleware A Start -> Handler Route -> Middleware A End',
      'Middleware A Start -> Middleware A End -> Handler Route',
      'Handler Route -> Middleware A Start -> Middleware A End',
      'Middleware A Start -> Handler Route'
    ],
    correct: 0,
    hint: 'next() calls the downstream middleware synchronously before resuming execution of the current function.',
    explanation: 'Middleware functions execute synchronously like a call stack. "Middleware A Start" logs, then next() triggers the route handler ("Handler Route"), and when that returns, the stack unwinds and logs "Middleware A End".',
    xpReward: 85
  },
  // 30. Backend - True / False (CORS)
  {
    id: 'back-7',
    category: 'Backend & APIs',
    type: 'true-false',
    difficulty: 'Easy',
    question: 'CORS (Cross-Origin Resource Sharing) is enforced by the web browser, not by backend server operating systems.',
    options: ['True', 'False'],
    correct: 0,
    hint: 'Direct API requests made via curl or Postman do not trigger CORS restrictions.',
    explanation: 'True. CORS is a browser security mechanism that blocks web applications from making cross-origin requests unless the receiving server sends appropriate Access-Control-Allow-Origin headers.',
    xpReward: 50
  },
  // 31. SQL - Single Choice (Indexes)
  {
    id: 'sql-5',
    category: 'SQL & Databases',
    type: 'single-choice',
    difficulty: 'Medium',
    question: 'Which index data structure is the default in PostgreSQL and MySQL InnoDB because it excels at range queries (e.g. BETWEEN, <, >)?',
    options: ['Hash Index', 'B-Tree (Balanced Tree)', 'GIN (Generalized Inverted Index)', 'Bitmap Index'],
    correct: 1,
    hint: 'Keeps sorted keys in leaf nodes connected by a linked list.',
    explanation: 'B-Trees maintain keys in sorted order with linked leaf pages, making them optimal for both exact matches (O(log n)) and range scans (BETWEEN x AND y). Hash indexes only support exact equality checks (=).',
    xpReward: 70
  },
  // 32. SQL - Code Output (Window Functions)
  {
    id: 'sql-6',
    category: 'SQL & Databases',
    type: 'code-output',
    difficulty: 'Hard',
    question: 'What ranks will DENSE_RANK() produce for salaries [90k, 80k, 80k, 70k] ordered DESC?',
    codeSnippet: `SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rank
FROM salaries;`,
    codeLanguage: 'sql',
    options: [
      '1, 2, 2, 4 (skips 3)',
      '1, 2, 2, 3 (no gaps)',
      '1, 2, 3, 4 (distinct values)',
      '1, 1, 2, 3'
    ],
    correct: 1,
    hint: 'RANK() leaves gaps after ties (1, 2, 2, 4), while DENSE_RANK() never leaves gaps.',
    explanation: 'DENSE_RANK() assigns consecutive integers without gaps after duplicate rank ties: 90k gets 1, both 80k rows get 2, and 70k gets 3. Standard RANK() would assign 1, 2, 2, 4.',
    xpReward: 85
  },
  // 33. SQL - Fill in the blank (Transactions)
  {
    id: 'sql-7',
    category: 'SQL & Databases',
    type: 'fill-blank',
    difficulty: 'Easy',
    question: 'Complete the statement to undo changes made within an uncommitted SQL transaction:',
    codeSnippet: `BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- An unexpected error occurs:
__________;`,
    codeLanguage: 'sql',
    options: ['ROLLBACK', 'REVERT', 'DISCARD', 'UNDO'],
    correct: 0,
    hint: 'The counterpart to COMMIT.',
    explanation: 'ROLLBACK cancels all data modifications made within the current database transaction and returns the data to its previous consistent state.',
    xpReward: 50
  },
  // 34. SQL - Multiple Select (Normalization)
  {
    id: 'sql-8',
    category: 'SQL & Databases',
    type: 'multiple-select',
    difficulty: 'Hard',
    question: 'Which of the following are primary benefits of Database Normalization (3NF)? (Select all that apply)',
    options: [
      'Minimizing data redundancy and duplicate storage',
      'Preventing insertion, update, and deletion anomalies',
      'Eliminating the need for SQL JOIN operations completely',
      'Enforcing referential data integrity across tables'
    ],
    correct: [0, 1, 3],
    hint: 'Normalization usually INCREASES the need for JOINs across divided tables.',
    explanation: 'Normalization reduces data duplication and eliminates anomalies by organizing data across related tables with foreign keys. However, it requires JOINs to reconstruct combined records.',
    xpReward: 80
  },
  // 35. System Design - Single Choice (Cache Invalidation)
  {
    id: 'sys-3',
    category: 'System Design',
    type: 'single-choice',
    difficulty: 'Medium',
    question: 'Which caching strategy writes data directly to both the cache and the primary database simultaneously before acknowledging success to the client?',
    options: ['Cache-Aside (Lazy Loading)', 'Write-Through', 'Write-Back (Write-Behind)', 'Refresh-Ahead'],
    correct: 1,
    hint: 'Guarantees that the cache is always fresh and in sync, at the cost of higher write latency.',
    explanation: 'In Write-Through caching, the application writes data to the cache, and the cache immediately writes through to the database synchronously. Write-Back writes to DB asynchronously later.',
    xpReward: 75
  },
  // 36. System Design - Multiple Select (Resilience)
  {
    id: 'sys-4',
    category: 'System Design',
    type: 'multiple-select',
    difficulty: 'Hard',
    question: 'Which architectural design patterns help prevent cascading failures across distributed microservices? (Select all that apply)',
    options: ['Circuit Breaker Pattern', 'Bulkhead Isolation', 'Exponential Backoff with Jitter', 'Monolithic Monorepo'],
    correct: [0, 1, 2],
    hint: 'Monolithic architecture is not a distributed microservice resilience pattern.',
    explanation: 'Circuit Breaker prevents repeated calls to failing services. Bulkhead isolates thread/connection pools so one failing service cannot consume all resources. Exponential Backoff with Jitter prevents retry storms on overloaded systems.',
    xpReward: 95
  },
  // 37. System Design - True / False (Load Balancing)
  {
    id: 'sys-5',
    category: 'System Design',
    type: 'true-false',
    difficulty: 'Easy',
    question: 'A Layer 7 Load Balancer operates at the Application Layer and can route traffic based on HTTP cookies, headers, and URL paths.',
    options: ['True', 'False'],
    correct: 0,
    hint: 'Layer 4 routes on TCP/UDP IP and Port, Layer 7 inspects application HTTP content.',
    explanation: 'True. Layer 7 load balancers (like Nginx, AWS ALB) terminate the connection and inspect the HTTP/HTTPS request, routing based on request path, headers, or cookies.',
    xpReward: 50
  },
  // 38. Frontend - Fill in the blank (TypeScript)
  {
    id: 'front-10',
    category: 'Frontend & React',
    type: 'fill-blank',
    difficulty: 'Medium',
    question: 'Fill in the blank with the TypeScript utility type that constructs a type with all properties of T set to optional:',
    codeSnippet: `interface User {
  id: string;
  name: string;
}

type DraftUser = __________<User>; // { id?: string; name?: string; }`,
    codeLanguage: 'typescript',
    options: ['Partial', 'Optional', 'Nullable', 'Record'],
    correct: 0,
    hint: 'Built-in utility type that wraps each key in "?".',
    explanation: 'Partial<T> makes all properties in type T optional by adding the "?" modifier to each property.',
    xpReward: 60
  },
  // 39. Algorithms - Single Choice (Sorting)
  {
    id: 'algo-11',
    category: 'Algorithms & DSA',
    type: 'single-choice',
    difficulty: 'Easy',
    question: 'What is the best-case time complexity of standard Bubble Sort or Insertion Sort when the input array is already completely sorted?',
    options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(1)'],
    correct: 2,
    hint: 'A single linear scan verifies no swaps are needed.',
    explanation: 'When an array is already sorted, an optimized Bubble Sort (with early exit flag) and Insertion Sort verify ordering in a single O(n) linear pass.',
    xpReward: 50
  },
  // 40. SQL - True / False (Transactions)
  {
    id: 'sql-9',
    category: 'SQL & Databases',
    type: 'true-false',
    difficulty: 'Medium',
    question: 'Under the "Read Committed" isolation level, Phantom Reads are completely prevented.',
    options: ['True', 'False'],
    correct: 1,
    hint: 'Phantom reads are only prevented in Serializable (or Repeatable Read in some engines).',
    explanation: 'False. Read Committed only prevents Dirty Reads. It does not prevent Non-Repeatable Reads or Phantom Reads (where new rows inserted by concurrent transactions appear in subsequent queries within the same transaction).',
    xpReward: 65
  }
];
