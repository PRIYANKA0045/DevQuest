export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  role: 'developer' | 'admin';
  title: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  streakDays: number;
  streakFreezeRemaining: number;
  longestStreak: number;
  totalActiveDays: number;
  completedMissionsCount: number;
  solvedChallengesCount: number;
  rank: number;
  avatar: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  joinedDate: string;
  preferredLanguage: string;
  theme: 'dark' | 'light';
  editorFontSize: number;
  stats: {
    hoursSpent: number;
    accuracy: number;
    challengesAttempted: number;
    codeReviewScoreAvg: number;
    languageBreakdown: { language: string; percentage: number; color: string }[];
    recentActivity: { id: string; action: string; title: string; timestamp: string; xp: number }[];
    contributionGrid: { date: string; count: number; level: number }[];
  };
  unlockedBadges: string[];
}

export interface Mission {
  id: string;
  worldId: string;
  title: string;
  clientName: string;
  companyName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  category: 'HTML/CSS' | 'JavaScript' | 'SQL' | 'DSA' | 'React' | 'Node' | 'MongoDB';
  type: 'web' | 'sql' | 'dsa';
  xpReward: number;
  summary: string;
  story: string;
  estimatedMinutes: number;
  requirements: string[];
  objectives: { id: string; description: string; completed?: boolean }[];
  starterHtml?: string;
  starterCss?: string;
  starterJs?: string;
  starterSql?: string;
  expectedSqlResult?: any[];
  starterCode?: {
    javascript: string;
    python: string;
    cpp: string;
    java: string;
  };
  testCases?: {
    input: string;
    expectedOutput: string;
    isSecret?: boolean;
  }[];
  hints: string[];
  completed?: boolean;
}

export interface World {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  totalMissions: number;
  completedMissions: number;
  requiredLevel: number;
  badgeName: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  xpReward: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  username: string;
  avatar: string;
  title: string;
  xp: number;
  streakDays: number;
  league: 'Grandmaster' | 'Diamond' | 'Platinum' | 'Gold' | 'Silver';
  badgesCount: number;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Beginner' | 'Streak' | 'Mastery' | 'Speed' | 'Special';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  xpReward: number;
  unlockedAt?: string;
  progressCurrent?: number;
  progressTarget?: number;
}

// Generate realistic 1-year contribution heatmap
function generateContributionGrid(): { date: string; count: number; level: number }[] {
  const grid = [];
  const now = new Date('2026-10-02');
  for (let i = 180; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    let count = 0;
    if (i < 16) {
      count = Math.floor(Math.random() * 6) + 2; // Active current streak
    } else if (Math.random() > 0.35) {
      count = Math.floor(Math.random() * 8);
    }
    const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4;
    grid.push({ date: dateStr, count, level });
  }
  return grid;
}

export const INITIAL_USER: UserProfile = {
  id: 'usr_alex_01',
  name: 'Alex Rivers',
  username: 'alexcode',
  email: 'alex.rivers@codequest.dev',
  role: 'developer',
  title: 'Full Stack Engineer',
  level: 4,
  xp: 3850,
  nextLevelXp: 5000,
  streakDays: 14,
  streakFreezeRemaining: 2,
  longestStreak: 28,
  totalActiveDays: 64,
  completedMissionsCount: 9,
  solvedChallengesCount: 32,
  rank: 8,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  bio: 'Passionate developer mastering modern web development, algorithms, and SQL architectures. Building fast, accessible apps.',
  githubUrl: 'https://github.com/alexrivers-dev',
  linkedinUrl: 'https://linkedin.com/in/alexrivers',
  joinedDate: 'July 2026',
  preferredLanguage: 'javascript',
  theme: 'dark',
  editorFontSize: 14,
  stats: {
    hoursSpent: 48.5,
    accuracy: 92.4,
    challengesAttempted: 35,
    codeReviewScoreAvg: 88,
    languageBreakdown: [
      { language: 'JavaScript / TypeScript', percentage: 40, color: '#f59e0b' },
      { language: 'HTML & CSS', percentage: 25, color: '#3b82f6' },
      { language: 'SQL & Databases', percentage: 20, color: '#10b981' },
      { language: 'Python & DSA', percentage: 15, color: '#8b5cf6' }
    ],
    recentActivity: [
      { id: 'act_1', action: 'Completed Mission', title: 'SQL Joins & Aggregation Master', timestamp: '2 hours ago', xp: 250 },
      { id: 'act_2', action: 'Daily Challenge', title: 'Palindrome Verification Algorithm', timestamp: 'Yesterday', xp: 120 },
      { id: 'act_3', action: 'Quiz Passed', title: 'Modern React 19 State & Effects', timestamp: '2 days ago', xp: 80 },
      { id: 'act_4', action: 'Badge Unlocked', title: 'Fortnight Streak (14 Days)', timestamp: '3 days ago', xp: 200 }
    ],
    contributionGrid: generateContributionGrid()
  },
  unlockedBadges: ['badge_first_mission', 'badge_streak_7', 'badge_streak_14', 'badge_sql_novice', 'badge_html_master']
};

export const WORLDS_DATA: World[] = [
  {
    id: 'html',
    title: 'HTML & Semantic Foundations',
    description: 'Learn modern semantic layouts, accessibility standards, SEO, and document architecture from absolute zero.',
    icon: 'FileCode2',
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
    totalMissions: 3,
    completedMissions: 2,
    requiredLevel: 1,
    badgeName: 'HTML Architect'
  },
  {
    id: 'css',
    title: 'CSS Masters & Responsive Grids',
    description: 'Master Flexbox, CSS Grid layouts, color systems, dark mode, animations, and fluid typography.',
    icon: 'Palette',
    color: 'from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-400',
    totalMissions: 3,
    completedMissions: 2,
    requiredLevel: 1,
    badgeName: 'CSS Artisan'
  },
  {
    id: 'sql',
    title: 'SQL & Relational Databases',
    description: 'Master relational queries: SELECT, WHERE filters, JOIN operations, GROUP BY, aggregations, and subqueries.',
    icon: 'Database',
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
    totalMissions: 3,
    completedMissions: 2,
    requiredLevel: 2,
    badgeName: 'Query Wizard'
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Solve core algorithmic challenges across multiple languages (JS, Python, C++, Java) with live test runners.',
    icon: 'Cpu',
    color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400',
    totalMissions: 4,
    completedMissions: 2,
    requiredLevel: 2,
    badgeName: 'Algorithm Ace'
  },
  {
    id: 'javascript',
    title: 'JavaScript & Asynchronous Logic',
    description: 'Harness closures, promises, event loops, DOM manipulation, and modern ESNext architecture.',
    icon: 'Zap',
    color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-400',
    totalMissions: 3,
    completedMissions: 1,
    requiredLevel: 3,
    badgeName: 'Async Ninja'
  },
  {
    id: 'react',
    title: 'React Ecosystem & Modern UI',
    description: 'Component architecture, custom hooks, reactive state, UI optimizations, and interactive state engines.',
    icon: 'Atom',
    color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400',
    totalMissions: 3,
    completedMissions: 1,
    requiredLevel: 4,
    badgeName: 'React Specialist'
  },
  {
    id: 'fullstack',
    title: 'Full Stack Express & MongoDB',
    description: 'Build production APIs, JWT authentication, database schemas, middleware pipelines, and cloud deploys.',
    icon: 'Server',
    color: 'from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-400',
    totalMissions: 3,
    completedMissions: 0,
    requiredLevel: 5,
    badgeName: 'Full Stack Master'
  }
];

export const SQL_MOCK_DATABASE = {
  customers: [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', city: 'San Francisco', total_spent: 1250 },
    { id: 2, name: 'Bob Jones', email: 'bob@example.com', city: 'New York', total_spent: 840 },
    { id: 3, name: 'Charlie Kim', email: 'charlie@example.com', city: 'San Francisco', total_spent: 2310 },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', city: 'Seattle', total_spent: 450 },
    { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', city: 'Austin', total_spent: 1780 },
    { id: 6, name: 'Fiona Gallagher', email: 'fiona@example.com', city: 'Chicago', total_spent: 920 }
  ],
  orders: [
    { id: 101, customer_id: 1, product: 'Mechanical Keyboard', amount: 150, status: 'delivered', order_date: '2026-08-12' },
    { id: 102, customer_id: 1, product: '4K Monitor', amount: 450, status: 'delivered', order_date: '2026-08-20' },
    { id: 103, customer_id: 2, product: 'Ergonomic Chair', amount: 320, status: 'processing', order_date: '2026-09-01' },
    { id: 104, customer_id: 3, product: 'MacBook Pro Stand', amount: 90, status: 'delivered', order_date: '2026-09-05' },
    { id: 105, customer_id: 3, product: 'USB-C Docking Station', amount: 220, status: 'delivered', order_date: '2026-09-12' },
    { id: 106, customer_id: 3, product: 'Noise Cancelling Headphones', amount: 350, status: 'shipped', order_date: '2026-09-18' },
    { id: 107, customer_id: 5, product: 'Ultrawide Display', amount: 799, status: 'delivered', order_date: '2026-09-22' },
    { id: 108, customer_id: 5, product: 'Wireless Mouse', amount: 80, status: 'delivered', order_date: '2026-09-25' }
  ]
};

export const MISSIONS_DATA: Mission[] = [
  // 1. Beginner HTML Question
  {
    id: 'html_0',
    worldId: 'html',
    title: 'Absolute Beginner: Page Title & Welcome Heading',
    clientName: 'Sarah Jenkins',
    companyName: 'FreshStart Coding Co.',
    difficulty: 'Beginner',
    category: 'HTML/CSS',
    type: 'web',
    xpReward: 100,
    summary: 'Write your very first HTML page with an h1 heading and paragraph text.',
    story: 'FreshStart is creating an introduction module for people who have never written a line of HTML before. Help them build a clean first page!',
    estimatedMinutes: 5,
    requirements: [
      'Include a main <h1> heading with the text "Hello, CodeQuest!"',
      'Add a paragraph <p> welcoming learners to the platform',
      'Create a link <a> pointing to https://codequest.dev with text "Get Started"'
    ],
    objectives: [
      { id: 'obj1', description: 'Add <h1>Hello, CodeQuest!</h1>' },
      { id: 'obj2', description: 'Add a welcome paragraph <p>' },
      { id: 'obj3', description: 'Include an <a> link with href="https://codequest.dev"' }
    ],
    starterHtml: `<div class="p-8 font-sans">
  <!-- Write your H1 heading, paragraph and link below -->
  <h1>Hello, CodeQuest!</h1>
  <p class="text-slate-600">Welcome to your coding adventure.</p>
  <a href="https://codequest.dev" class="text-indigo-600 underline">Get Started</a>
</div>`,
    starterCss: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #f8fafc;
  color: #0f172a;
}`,
    starterJs: `console.log("Welcome to CodeQuest!");`,
    hints: [
      'An <h1> tag is written as <h1>Heading Text</h1>',
      'An anchor tag requires an href attribute: <a href="url">Link Text</a>'
    ],
    completed: true
  },

  // 2. Beginner CSS Question
  {
    id: 'css_0',
    worldId: 'css',
    title: 'Absolute Beginner: Text Colors & Button Styling',
    clientName: 'David Lee',
    companyName: 'Chroma Design Studio',
    difficulty: 'Beginner',
    category: 'HTML/CSS',
    type: 'web',
    xpReward: 120,
    summary: 'Style paragraph text colors and add a vibrant, rounded call-to-action button.',
    story: 'Chroma Design wants a vibrant landing card. Style the text and create a sleek button with hover transitions.',
    estimatedMinutes: 10,
    requirements: [
      'Style the headline text with a vivid indigo color (#4f46e5)',
      'Style the primary button with background color, padding, and rounded corners',
      'Add a smooth hover effect on the button'
    ],
    objectives: [
      { id: 'obj1', description: 'Apply color: #4f46e5 to .card-title' },
      { id: 'obj2', description: 'Add border-radius and background-color to .btn-primary' },
      { id: 'obj3', description: 'Include :hover state with transition' }
    ],
    starterHtml: `<div class="card">
  <h2 class="card-title">Launch Your Career</h2>
  <p class="card-desc">Master full-stack software development with interactive coding missions.</p>
  <button class="btn-primary">Explore Quests</button>
</div>`,
    starterCss: `.card {
  max-width: 420px;
  margin: 40px auto;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: sans-serif;
}

.card-title {
  color: #4f46e5;
  font-size: 24px;
  margin-bottom: 8px;
}

.card-desc {
  color: #64748b;
  font-size: 15px;
  margin-bottom: 24px;
}

.btn-primary {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: #4338ca;
  transform: translateY(-2px);
}`,
    starterJs: ``,
    hints: [
      'Use border-radius: 8px for soft rounded corners.',
      'Use transition: all 0.2s ease for smooth button animations.'
    ],
    completed: true
  },

  // 3. Beginner SQL Question
  {
    id: 'sql_0',
    worldId: 'sql',
    title: 'SQL 101: Basic Query & City Filtering',
    clientName: 'Maria Santos',
    companyName: 'DataPulse Analytics',
    difficulty: 'Beginner',
    category: 'SQL',
    type: 'sql',
    xpReward: 150,
    summary: 'Write a basic SQL SELECT statement to retrieve all customers from San Francisco.',
    story: 'DataPulse needs an immediate list of San Francisco customers to invite them to a local tech meetup. Write the query!',
    estimatedMinutes: 8,
    requirements: [
      'Select customer name, email, and city from the customers table',
      'Filter only records where city equals "San Francisco"',
      'Order results alphabetically by name'
    ],
    objectives: [
      { id: 'obj1', description: 'SELECT name, email, city FROM customers' },
      { id: 'obj2', description: 'WHERE city = "San Francisco"' },
      { id: 'obj3', description: 'ORDER BY name ASC' }
    ],
    starterSql: `-- Write your SQL query here:
SELECT name, email, city 
FROM customers 
WHERE city = 'San Francisco' 
ORDER BY name ASC;`,
    expectedSqlResult: [
      { name: 'Alice Smith', email: 'alice@example.com', city: 'San Francisco' },
      { name: 'Charlie Kim', email: 'charlie@example.com', city: 'San Francisco' }
    ],
    hints: [
      'The WHERE clause filters rows: WHERE city = "San Francisco"',
      'Use ORDER BY column_name ASC for alphabetical order'
    ],
    completed: true
  },

  // 4. Intermediate SQL Question (Joins & Grouping)
  {
    id: 'sql_1',
    worldId: 'sql',
    title: 'SQL Master: Customer Orders & Total Spending (JOIN)',
    clientName: 'Marcus Vance',
    companyName: 'OmniStore E-Commerce',
    difficulty: 'Intermediate',
    category: 'SQL',
    type: 'sql',
    xpReward: 250,
    summary: 'Join the customers and orders tables to compute the count of orders and sum of amount per customer.',
    story: 'OmniStore management needs an aggregated report showing each customer, how many orders they placed, and their total order sum.',
    estimatedMinutes: 15,
    requirements: [
      'Join customers and orders tables on customers.id = orders.customer_id',
      'Compute COUNT(orders.id) as order_count',
      'Compute SUM(orders.amount) as total_amount',
      'Group results by customer name',
      'Order by total_amount descending'
    ],
    objectives: [
      { id: 'obj1', description: 'Perform INNER JOIN between customers and orders' },
      { id: 'obj2', description: 'Use aggregate functions COUNT and SUM' },
      { id: 'obj3', description: 'GROUP BY c.name' },
      { id: 'obj4', description: 'ORDER BY total_amount DESC' }
    ],
    starterSql: `-- Connect customers and orders with a JOIN
SELECT 
  c.name, 
  COUNT(o.id) AS order_count, 
  SUM(o.amount) AS total_amount
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.name
ORDER BY total_amount DESC;`,
    expectedSqlResult: [
      { name: 'Ethan Hunt', order_count: 2, total_amount: 879 },
      { name: 'Charlie Kim', order_count: 3, total_amount: 660 },
      { name: 'Alice Smith', order_count: 2, total_amount: 600 },
      { name: 'Bob Jones', order_count: 1, total_amount: 320 }
    ],
    hints: [
      'Table aliases like `customers c` make queries concise.',
      'Remember to use GROUP BY on the customer name!'
    ],
    completed: true
  },

  // 5. Beginner DSA Question: Palindrome Checker
  {
    id: 'dsa_0',
    worldId: 'dsa',
    title: 'DSA: Valid Palindrome Checker',
    clientName: 'Dr. Aris Thorne',
    companyName: 'Algorithmic Labs',
    difficulty: 'Beginner',
    category: 'DSA',
    type: 'dsa',
    xpReward: 150,
    summary: 'Determine whether a given string is a palindrome, ignoring non-alphanumeric characters and case.',
    story: 'Clean text analysis starts with string manipulation. Build a robust palindrome detector in your language of choice.',
    estimatedMinutes: 12,
    requirements: [
      'Input: string `s`',
      'Ignore casing (convert to lower-case)',
      'Ignore spaces and punctuation (retain alphanumeric characters only)',
      'Return true if the string reads the same forwards and backwards, else false'
    ],
    objectives: [
      { id: 'obj1', description: 'Sanitize string to lowercase alphanumeric characters' },
      { id: 'obj2', description: 'Check two-pointer or reverse equality' },
      { id: 'obj3', description: 'Pass all test cases' }
    ],
    starterCode: {
      javascript: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}

// Test cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome("Was it a car or a cat I saw?")); // true`,
      python: `def is_palindrome(s: str) -> bool:
    clean = "".join(ch.lower() for ch in s if ch.isalnum())
    return clean == clean[::-1]

print(is_palindrome("A man, a plan, a canal: Panama")) # True
print(is_palindrome("race a car")) # False`,
      cpp: `#include <iostream>
#include <string>
#include <cctype>

bool isPalindrome(const std::string& s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        if (tolower(s[left]) != tolower(s[right])) return false;
        left++;
        right--;
    }
    return true;
}`,
      java: `public class Solution {
    public static boolean isPalindrome(String s) {
        String clean = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        int left = 0, right = clean.length() - 1;
        while (left < right) {
            if (clean.charAt(left) != clean.charAt(right)) return false;
            left++;
            right--;
        }
        return true;
    }
}`
    },
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expectedOutput: 'true' },
      { input: '"race a car"', expectedOutput: 'false' },
      { input: '"Was it a car or a cat I saw?"', expectedOutput: 'true' },
      { input: '"0P"', expectedOutput: 'false', isSecret: true }
    ],
    hints: [
      'Two-pointer approach gives O(n) time and O(1) space!',
      'Regular expression /[^a-z0-9]/gi removes symbols easily.'
    ],
    completed: true
  },

  // 6. Classic DSA Question: Two Sum
  {
    id: 'dsa_1',
    worldId: 'dsa',
    title: 'DSA Classic: Two Sum (Hash Map Solution)',
    clientName: 'Elena Rostova',
    companyName: 'Fintech Core',
    difficulty: 'Intermediate',
    category: 'DSA',
    type: 'dsa',
    xpReward: 200,
    summary: 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.',
    story: 'Fintech Core matches matching buy and sell orders. Solve the fundamental two sum problem with O(n) time complexity using a hash map.',
    estimatedMinutes: 15,
    requirements: [
      'Input: array of numbers `nums`, number `target`',
      'Return the pair of indices `[i, j]` such that `nums[i] + nums[j] === target`',
      'Optimize for O(n) runtime using a hash table / Map'
    ],
    objectives: [
      { id: 'obj1', description: 'Iterate over array and check complement in map' },
      { id: 'obj2', description: 'Store visited elements with their index' },
      { id: 'obj3', description: 'Pass all test cases' }
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6)); // [1, 2]`,
      python: `def two_sum(nums: list[int], target: int) -> list[int]:
    lookup = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in lookup:
            return [lookup[diff], i]
        lookup[num] = i
    return []

print(two_sum([2, 7, 11, 15], 9)) # [0, 1]`,
      cpp: `#include <vector>
#include <unordered_map>

std::vector<int> twoSum(std::vector<int>& nums, int target) {
    std::unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); ++i) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}`,
      java: `import java.util.HashMap;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}`
    },
    testCases: [
      { input: 'nums = [2, 7, 11, 15], target = 9', expectedOutput: '[0, 1]' },
      { input: 'nums = [3, 2, 4], target = 6', expectedOutput: '[1, 2]' },
      { input: 'nums = [3, 3], target = 6', expectedOutput: '[0, 1]' }
    ],
    hints: [
      'A hash map allows instant O(1) lookups for the target complement.',
      'Check if the complement exists before adding the current number to the map.'
    ],
    completed: true
  },

  // 7. Full-Stack / React Question
  {
    id: 'react_1',
    worldId: 'react',
    title: 'Interactive Filterable Product Showcase',
    clientName: 'Chloe Bennett',
    companyName: 'Luxe Goods Co.',
    difficulty: 'Intermediate',
    category: 'React',
    type: 'web',
    xpReward: 300,
    summary: 'Build a dynamic React product catalog with category filter pills, price sorting, and live search.',
    story: 'Luxe Goods is modernizing their flagship digital catalog. They need instant filtering without page reloads.',
    estimatedMinutes: 20,
    requirements: [
      'Filter buttons for categories: All, Audio, Wearables, Accessories',
      'Real-time search bar that filters products by title',
      'Price sort dropdown (Low to High, High to Low)',
      'Empty state card if no products match the criteria'
    ],
    objectives: [
      { id: 'obj1', description: 'Create search input and category pills' },
      { id: 'obj2', description: 'Filter and sort array dynamically' },
      { id: 'obj3', description: 'Render card grid with badges and pricing' }
    ],
    starterHtml: `<div id="app" class="p-6 max-w-4xl mx-auto">
  <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
    <h1 class="text-2xl font-bold text-slate-800">Luxe Gear Catalog</h1>
    <input id="searchInput" type="text" placeholder="Search gear..." class="px-4 py-2 border rounded-lg w-full md:w-64 focus:ring-2 focus:ring-indigo-500 outline-none">
  </div>
  
  <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
    <button class="filter-pill active px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-600 text-white" data-category="all">All</button>
    <button class="filter-pill px-4 py-1.5 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200" data-category="audio">Audio</button>
    <button class="filter-pill px-4 py-1.5 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200" data-category="wearables">Wearables</button>
    <button class="filter-pill px-4 py-1.5 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200" data-category="accessories">Accessories</button>
  </div>

  <div id="productGrid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <!-- Products rendered dynamically by JS -->
  </div>
</div>`,
    starterCss: `.filter-pill.active {
  background-color: #4f46e5;
  color: white;
}
.product-card {
  transition: transform 0.2s, box-shadow 0.2s;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.1);
}`,
    starterJs: `const products = [
  { id: 1, title: 'Wireless Pro Headphones', category: 'audio', price: 299, image: '🎧' },
  { id: 2, title: 'Titanium Smart Watch', category: 'wearables', price: 449, image: '⌚' },
  { id: 3, title: 'Leather Laptop Sleeve', category: 'accessories', price: 89, image: '💼' },
  { id: 4, title: 'Studio Soundbar', category: 'audio', price: 349, image: '🔊' },
  { id: 5, title: 'Fitness Pulse Band', category: 'wearables', price: 129, image: '🏃' },
  { id: 6, title: 'Braided Cable Hub', category: 'accessories', price: 45, image: '🔌' }
];

function render(items) {
  const grid = document.getElementById('productGrid');
  if (items.length === 0) {
    grid.innerHTML = '<div class="col-span-full py-12 text-center text-slate-400">No gear found matching your search.</div>';
    return;
  }
  grid.innerHTML = items.map(p => \`
    <div class="product-card bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
      <div class="text-4xl mb-4 bg-slate-50 p-4 rounded-xl text-center">\${p.image}</div>
      <div>
        <span class="text-xs font-semibold uppercase text-indigo-500 tracking-wider">\${p.category}</span>
        <h3 class="font-bold text-slate-900 mt-1">\${p.title}</h3>
      </div>
      <div class="flex justify-between items-center mt-4 pt-3 border-t border-slate-100">
        <span class="text-lg font-bold text-slate-900">$\${p.price}</span>
        <button class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100">Add</button>
      </div>
    </div>
  \`).join('');
}

let activeCat = 'all';
let searchQuery = '';

function applyFilter() {
  const filtered = products.filter(p => {
    const matchCat = activeCat === 'all' || p.category === activeCat;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });
  render(filtered);
}

document.querySelectorAll('.filter-pill').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active', 'bg-indigo-600', 'text-white'));
    b = e.target;
    b.classList.add('active', 'bg-indigo-600', 'text-white');
    activeCat = b.dataset.category;
    applyFilter();
  });
});

document.getElementById('searchInput').addEventListener('input', (e) => {
  searchQuery = e.target.value;
  applyFilter();
});

render(products);`,
    hints: [
      'Store search query and selected category in variables and filter both in one pass.',
      'Use .toLowerCase().includes() for flexible case-insensitive search matching.'
    ],
    completed: false
  }
];

export const ACHIEVEMENTS_DATA: AchievementBadge[] = [
  {
    id: 'badge_first_mission',
    title: 'First Step to Greatness',
    description: 'Complete your first coding mission on CodeQuest.',
    icon: 'Flag',
    category: 'Beginner',
    rarity: 'Common',
    xpReward: 100,
    unlockedAt: '2026-08-01',
    progressCurrent: 1,
    progressTarget: 1
  },
  {
    id: 'badge_streak_7',
    title: 'Weekly Warrior',
    description: 'Maintain a continuous 7-day coding streak.',
    icon: 'Flame',
    category: 'Streak',
    rarity: 'Rare',
    xpReward: 250,
    unlockedAt: '2026-08-08',
    progressCurrent: 7,
    progressTarget: 7
  },
  {
    id: 'badge_streak_14',
    title: 'Fortnight Fortress',
    description: 'Maintain an unbroken 14-day coding streak.',
    icon: 'Shield',
    category: 'Streak',
    rarity: 'Epic',
    xpReward: 500,
    unlockedAt: '2026-08-15',
    progressCurrent: 14,
    progressTarget: 14
  },
  {
    id: 'badge_streak_30',
    title: 'Monthly Titan',
    description: 'Reach a legendary 30-day streak.',
    icon: 'Zap',
    category: 'Streak',
    rarity: 'Legendary',
    xpReward: 1000,
    progressCurrent: 14,
    progressTarget: 30
  },
  {
    id: 'badge_sql_novice',
    title: 'Data Navigator',
    description: 'Solve your first 3 relational SQL queries with JOINs.',
    icon: 'Database',
    category: 'Mastery',
    rarity: 'Rare',
    xpReward: 300,
    unlockedAt: '2026-09-02',
    progressCurrent: 3,
    progressTarget: 3
  },
  {
    id: 'badge_html_master',
    title: 'Semantic Architect',
    description: 'Build 5 semantic HTML layouts with zero accessibility flaws.',
    icon: 'FileCode2',
    category: 'Mastery',
    rarity: 'Rare',
    xpReward: 300,
    unlockedAt: '2026-09-14',
    progressCurrent: 5,
    progressTarget: 5
  },
  {
    id: 'badge_dsa_ace',
    title: 'Algorithm Vanguard',
    description: 'Solve 10 algorithm challenges with optimal time complexity.',
    icon: 'Cpu',
    category: 'Mastery',
    rarity: 'Epic',
    xpReward: 600,
    progressCurrent: 6,
    progressTarget: 10
  },
  {
    id: 'badge_speed_demon',
    title: 'Lightning Coder',
    description: 'Complete a challenge in under 3 minutes with 100% test pass rate.',
    icon: 'Timer',
    category: 'Speed',
    rarity: 'Legendary',
    xpReward: 750,
    progressCurrent: 0,
    progressTarget: 1
  }
];

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { rank: 1, userId: 'usr_siddharth', name: 'Siddharth Rao', username: 'siddharth_dev', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', title: 'Principal Architect', xp: 12450, streakDays: 45, league: 'Grandmaster', badgesCount: 22 },
  { rank: 2, userId: 'usr_maya', name: 'Maya Lin', username: 'mayacodes', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', title: 'Senior Full Stack', xp: 10890, streakDays: 38, league: 'Grandmaster', badgesCount: 19 },
  { rank: 3, userId: 'usr_carlos', name: 'Carlos Mendez', username: 'carlos_m', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80', title: 'Systems Engineer', xp: 9420, streakDays: 32, league: 'Diamond', badgesCount: 17 },
  { rank: 4, userId: 'usr_aisha', name: 'Aisha Patel', username: 'aisha_p', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80', title: 'React Core Specialist', xp: 8150, streakDays: 26, league: 'Diamond', badgesCount: 15 },
  { rank: 5, userId: 'usr_liam', name: 'Liam O’Connor', username: 'liam_dev', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', title: 'Backend Lead', xp: 7600, streakDays: 21, league: 'Diamond', badgesCount: 14 },
  { rank: 6, userId: 'usr_kenji', name: 'Kenji Sato', username: 'kenji_s', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', title: 'Data Engineer', xp: 6200, streakDays: 18, league: 'Platinum', badgesCount: 12 },
  { rank: 7, userId: 'usr_zoe', name: 'Zoe Kravitz', username: 'zoe_k', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80', title: 'UI/UX Developer', xp: 4950, streakDays: 16, league: 'Platinum', badgesCount: 10 },
  { rank: 8, userId: 'usr_alex_01', name: 'Alex Rivers (You)', username: 'alexcode', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', title: 'Full Stack Engineer', xp: 3850, streakDays: 14, league: 'Platinum', badgesCount: 9 },
  { rank: 9, userId: 'usr_lucas', name: 'Lucas Silva', username: 'lucas_s', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80', title: 'Junior Dev', xp: 3100, streakDays: 10, league: 'Gold', badgesCount: 7 },
  { rank: 10, userId: 'usr_charlotte', name: 'Charlotte Dubois', username: 'charlotte_d', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', title: 'Frontend Enthusiast', xp: 2800, streakDays: 8, league: 'Gold', badgesCount: 6 }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'quiz_html_1',
    category: 'HTML & Accessibility',
    difficulty: 'Beginner',
    question: 'Which HTML5 element represents self-contained content that could be independently distributable or reusable?',
    options: ['<section>', '<article>', '<aside>', '<div>'],
    correctIndex: 1,
    explanation: '<article> represents an independent, self-contained piece of content such as a blog post, news story, or forum post.',
    xpReward: 50
  },
  {
    id: 'quiz_css_1',
    category: 'CSS & Layouts',
    difficulty: 'Beginner',
    question: 'In modern CSS Flexbox, which property aligns flex items along the cross axis?',
    options: ['justify-content', 'align-items', 'flex-direction', 'align-content'],
    correctIndex: 1,
    explanation: '`align-items` governs alignment along the cross axis (vertically by default in a row-based flex container).',
    xpReward: 50
  },
  {
    id: 'quiz_sql_1',
    category: 'SQL Databases',
    difficulty: 'Beginner',
    question: 'Which SQL clause is used to eliminate duplicate rows from the query output?',
    options: ['UNIQUE', 'DISTINCT', 'DIFFERENT', 'GROUP BY ONLY'],
    correctIndex: 1,
    explanation: '`SELECT DISTINCT` returns only unique values, filtering out duplicate occurrences.',
    xpReward: 60
  },
  {
    id: 'quiz_sql_2',
    category: 'SQL Databases',
    difficulty: 'Intermediate',
    question: 'What is the main difference between WHERE and HAVING in SQL?',
    options: [
      'WHERE is for strings, HAVING is for numbers',
      'WHERE filters rows before aggregation, while HAVING filters groups after aggregation',
      'HAVING can only be used with subqueries',
      'There is no difference; they are aliases'
    ],
    correctIndex: 1,
    explanation: '`WHERE` filters individual records before any `GROUP BY` aggregation, whereas `HAVING` filters aggregated values created by `GROUP BY`.',
    xpReward: 80
  },
  {
    id: 'quiz_dsa_1',
    category: 'DSA & Algorithms',
    difficulty: 'Intermediate',
    question: 'What is the average time complexity of searching for an element in a Hash Map / Hash Table?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
    correctIndex: 2,
    explanation: 'Hash maps provide constant average time O(1) for lookup, insertion, and deletion via hash bucket indexing.',
    xpReward: 75
  },
  {
    id: 'quiz_js_1',
    category: 'JavaScript Core',
    difficulty: 'Intermediate',
    question: 'What will `typeof NaN` evaluate to in JavaScript?',
    options: ['"undefined"', '"number"', '"NaN"', '"null"'],
    correctIndex: 1,
    explanation: 'In JavaScript specifications (IEEE 754), NaN stands for "Not-a-Number", but its primitive type is indeed "number".',
    xpReward: 60
  }
];
