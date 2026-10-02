import React, { useState, useEffect } from 'react';
import {
  Star,
  Share2,
  Copy,
  Settings,
  ChevronDown,
  Play,
  CheckCircle2,
  Check,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  FileCode,
  CheckSquare
} from 'lucide-react';

interface ChallengePageProps {
  problemId?: string;
  onNavigateBack: () => void;
}

interface ProblemDetail {
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  example1: { input: string; output: string; explanation?: string };
  example2: { input: string; output: string };
  starterCode: { [lang: string]: string };
}

const PROBLEM_CATALOG: { [id: string]: ProblemDetail } = {
  'concatenation-array': {
    title: 'Concatenation of Array',
    category: 'Arrays',
    difficulty: 'Easy',
    description: 'Given an integer array nums of length n, create an array ans of length 2n where ans[i] == nums[i] and ans[i + n] == nums[i] for 0 <= i < n (0-indexed). Return the array ans.',
    example1: { input: 'nums = [1, 2, 1]', output: '[1, 2, 1, 1, 2, 1]', explanation: 'ans is formed as [nums[0], nums[1], nums[2], nums[0], nums[1], nums[2]].' },
    example2: { input: 'nums = [1, 3, 2, 1]', output: '[1, 3, 2, 1, 1, 3, 2, 1]' },
    starterCode: {
      Python3: `class Solution:
    def getConcatenation(self, nums: list[int]) -> list[int]:
        return nums + nums`,
      JavaScript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getConcatenation = function(nums) {
    return [...nums, ...nums];
};`,
      'C++': `class Solution {
public:
    vector<int> getConcatenation(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(2 * n);
        for (int i = 0; i < n; ++i) ans[i] = ans[i + n] = nums[i];
        return ans;
    }
};`,
      SQL: `-- Return concatenated records query`
    }
  },
  'score-string': {
    title: 'Score of a String',
    category: 'Strings',
    difficulty: 'Easy',
    description: 'You are given a string s. The score of a string is defined as the sum of the absolute difference between the ASCII values of adjacent characters. Return the score of s.',
    example1: { input: 's = "hello"', output: '13', explanation: '|104 - 101| + |101 - 108| + |108 - 108| + |108 - 111| = 3 + 7 + 0 + 3 = 13.' },
    example2: { input: 's = "zaz"', output: '50' },
    starterCode: {
      Python3: `class Solution:
    def scoreOfString(self, s: str) -> int:
        return sum(abs(ord(s[i]) - ord(s[i + 1])) for i in range(len(s) - 1))`,
      JavaScript: `var scoreOfString = function(s) {
    let score = 0;
    for (let i = 0; i < s.length - 1; i++) {
        score += Math.abs(s.charCodeAt(i) - s.charCodeAt(i + 1));
    }
    return score;
};`,
      'C++': `class Solution {
public:
    int scoreOfString(string s) {
        int score = 0;
        for (int i = 0; i < s.size() - 1; ++i) score += abs(s[i] - s[i+1]);
        return score;
    }
};`
    }
  },
  'valid-parentheses': {
    title: 'Valid Parentheses',
    category: 'Stack',
    difficulty: 'Easy',
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Open brackets must be closed by the same type of brackets in the correct order.",
    example1: { input: 's = "()"', output: 'true' },
    example2: { input: 's = "()[]{}"', output: 'true' },
    starterCode: {
      Python3: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        for char in s:
            if char in mapping:
                top = stack.pop() if stack else '#'
                if mapping[char] != top: return False
            else:
                stack.append(char)
        return not stack`,
      JavaScript: `var isValid = function(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (let char of s) {
        if (map[char]) {
            if (stack.pop() !== map[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
};`
    }
  },
  'two-sum': {
    title: 'Two Sum (Hash Map Solution)',
    category: 'Hash Table',
    difficulty: 'Medium',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input has exactly one solution.',
    example1: { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
    example2: { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]' },
    starterCode: {
      Python3: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            diff = target - num
            if diff in seen:
                return [seen[diff], i]
            seen[num] = i
        return []`,
      JavaScript: `var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) return [map.get(diff), i];
        map.set(nums[i], i);
    }
    return [];
};`
    }
  },
  'sql-filtering': {
    title: 'SQL 101: Filter Customers with WHERE Clause',
    category: 'SQL Databases',
    difficulty: 'Easy',
    description: "Write an SQL query to retrieve the name, email, and city of all customers who reside in 'San Francisco'. Order results alphabetically by name.",
    example1: { input: "customers table with 50 rows", output: "5 rows matching city = 'San Francisco'" },
    example2: { input: "empty table", output: "0 rows" },
    starterCode: {
      SQL: `-- Write your SQL solution below
SELECT 
    name, 
    email, 
    city 
FROM customers 
WHERE city = 'San Francisco' 
ORDER BY name ASC;`
    }
  }
};

export const ChallengePage: React.FC<ChallengePageProps> = ({
  problemId = 'concatenation-array',
  onNavigateBack
}) => {
  const problem = PROBLEM_CATALOG[problemId] || {
    title: problemId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    category: 'Algorithms',
    difficulty: 'Medium' as const,
    description: `Solve the ${problemId} algorithmic challenge by implementing an efficient solution that satisfies all constraints and edge cases.`,
    example1: { input: 'Input sample 1', output: 'Output sample 1' },
    example2: { input: 'Input sample 2', output: 'Output sample 2' },
    starterCode: {
      Python3: `# Implement your solution here\nclass Solution:\n    def solve(self, data):\n        pass`,
      JavaScript: `// Implement your solution here\nfunction solve(data) {\n    return data;\n}`
    }
  };

  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    problem.category.includes('SQL') ? 'SQL' : 'Python3'
  );

  const [code, setCode] = useState<string>(
    problem.starterCode[selectedLanguage] || problem.starterCode['Python3'] || '// Code here'
  );

  useEffect(() => {
    const lang = problem.category.includes('SQL') ? 'SQL' : 'Python3';
    setSelectedLanguage(lang);
    setCode(problem.starterCode[lang] || problem.starterCode['Python3'] || '// Code here');
  }, [problemId]);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<any | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isStarred, setIsStarred] = useState<boolean>(true);
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    if (problem.starterCode[lang]) {
      setCode(problem.starterCode[lang]);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setTestResult({
        status: 'Accepted',
        runtime: '42 ms',
        memory: '17.4 MB',
        testCase: {
          input: problem.example1.input,
          output: problem.example1.output,
          expected: problem.example1.output
        }
      });
      setIsRunning(false);
    }, 600);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsSubmitted(true);
      setTestResult({
        status: 'Success: 100% Passed',
        runtime: '38 ms (Beats 94.2% of users)',
        memory: '16.8 MB (Beats 89.1% of users)',
        testCase: {
          input: problem.example1.input,
          output: problem.example1.output,
          expected: problem.example1.output
        }
      });
      setIsRunning(false);
    }, 900);
  };

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col bg-[#0b0e14]">
      {/* Top Breadcrumb Bar matching Collage Screen 4 */}
      <div className="h-10 border-b border-[#1c2438] bg-[#0d111a] px-4 flex items-center justify-between text-xs shrink-0 select-none">
        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateBack}
            className="text-slate-400 hover:text-white flex items-center gap-1 font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Practice</span>
          </button>
          <span className="text-slate-600">&gt;</span>
          <span className="text-slate-400">{problem.category}</span>
          <span className="text-slate-600">&gt;</span>
          <span
            className={`font-semibold ${
              problem.difficulty === 'Easy'
                ? 'text-emerald-400'
                : problem.difficulty === 'Medium'
                ? 'text-amber-400'
                : 'text-rose-400'
            }`}
          >
            {problem.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsStarred(!isStarred)}
            className="p-1 rounded text-slate-400 hover:text-amber-400 transition cursor-pointer"
          >
            <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
          <button
            onClick={handleCopyCode}
            className="p-1 rounded text-slate-400 hover:text-white transition cursor-pointer"
            title="Copy code"
          >
            {copyFeedback ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Problem Description + Right Code Editor */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Pane: Problem Description */}
        <div className="w-1/2 border-r border-[#1c2438] bg-[#0d111a] p-6 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-bold text-white">{problem.title}</h1>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  problem.difficulty === 'Easy'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : problem.difficulty === 'Medium'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}
              >
                {problem.difficulty}
              </span>
            </div>

            <div>
              <h3 className="text-xs font-bold text-white mb-2">Problem Description</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {problem.description}
              </p>
            </div>

            {/* Example 1 */}
            <div className="bg-[#121724] border border-[#1c2438] rounded-xl p-3.5 space-y-1 font-mono text-xs">
              <span className="text-slate-300 font-bold block mb-1">Example 1:</span>
              <div className="text-slate-300"><span className="text-slate-500 font-sans">Input:</span> {problem.example1.input}</div>
              <div className="text-slate-300"><span className="text-slate-500 font-sans">Output:</span> {problem.example1.output}</div>
              {problem.example1.explanation && (
                <div className="text-slate-400 text-[11px] font-sans pt-1">
                  <span className="font-semibold text-slate-300">Explanation:</span> {problem.example1.explanation}
                </div>
              )}
            </div>

            {/* Example 2 */}
            <div className="bg-[#121724] border border-[#1c2438] rounded-xl p-3.5 space-y-1 font-mono text-xs">
              <span className="text-slate-300 font-bold block mb-1">Example 2:</span>
              <div className="text-slate-300"><span className="text-slate-500 font-sans">Input:</span> {problem.example2.input}</div>
              <div className="text-slate-300"><span className="text-slate-500 font-sans">Output:</span> {problem.example2.output}</div>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="pt-6 border-t border-[#1c2438] flex items-center justify-between text-xs text-slate-400">
            <div>
              <div className="font-bold text-white font-mono">1.2M</div>
              <div className="text-[10px] text-slate-500">Accepted</div>
            </div>
            <div>
              <div className="font-bold text-white font-mono">2.4M</div>
              <div className="text-[10px] text-slate-500">Submissions</div>
            </div>
            <div>
              <div className="font-bold text-emerald-400 font-mono">89.6%</div>
              <div className="text-[10px] text-slate-500">Acceptance Rate</div>
            </div>
          </div>
        </div>

        {/* Right Pane: Code Editor + Runner */}
        <div className="w-1/2 flex flex-col bg-[#0b0e14]">
          
          {/* Editor Header: Language selector */}
          <div className="h-10 border-b border-[#1c2438] bg-[#0e121d] px-4 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-2">
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-[#151c2c] border border-[#232f48] rounded px-2 py-1 text-slate-200 text-xs font-mono focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="Python3">Python3</option>
                <option value="JavaScript">JavaScript</option>
                <option value="C++">C++</option>
                <option value="SQL">SQL</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="text-slate-400 hover:text-white text-xs flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copyFeedback ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Code Textarea with IDE Styling */}
          <div className="flex-1 relative font-mono text-xs p-4 bg-[#080b12] text-emerald-300 overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full bg-transparent resize-none border-none outline-none font-mono text-xs leading-relaxed text-emerald-300 selection:bg-purple-900/60"
            />
          </div>

          {/* Bottom Execution Tray: Run, Submit & Test Results */}
          <div className="border-t border-[#1c2438] bg-[#0d111a] p-4 space-y-3 shrink-0">
            {testResult && (
              <div className="bg-[#121724] border border-emerald-500/30 rounded-xl p-3 space-y-1.5 font-mono text-xs animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> {testResult.status}
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    Runtime: <strong className="text-white">{testResult.runtime}</strong>
                  </span>
                </div>
                <div className="text-slate-300 text-[11px]">
                  Input: <span className="text-slate-400">{testResult.testCase.input}</span>
                </div>
                <div className="text-slate-300 text-[11px]">
                  Output: <span className="text-emerald-300">{testResult.testCase.output}</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                Press Ctrl+Enter or click Run
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="px-4 py-1.5 rounded-xl bg-[#182030] hover:bg-[#202c42] border border-[#232f48] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
                  <span>Run Code</span>
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={isRunning}
                  className="px-5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-purple-600/30 disabled:opacity-50"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Submit Solution</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
