import React, { useState } from 'react';
import {
  Search,
  Shuffle,
  Trash2,
  HelpCircle,
  Video,
  Star,
  Check,
  ChevronDown,
  Layers,
  Zap,
  Server,
  Filter
} from 'lucide-react';

import { UserAccount } from '../lib/authStore';
import { DailyMissionWidget } from '../components/DailyMissionWidget';

interface CoursesPageProps {
  onSelectProblem: (problemId: string) => void;
  user: UserAccount;
  onNavigate?: (view: string) => void;
  onUpdateUser?: (user: UserAccount) => void;
}

export interface ProblemItem {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
  starred: boolean;
  acceptance: string;
}

export const PROBLEMS_LIST: ProblemItem[] = [
  {
    id: 'score-string',
    title: 'Score of a String',
    category: 'Strings',
    difficulty: 'Easy',
    completed: true,
    starred: false,
    acceptance: '92.4%'
  },
  {
    id: 'concatenation-array',
    title: 'Concatenation of Array',
    category: 'Arrays',
    difficulty: 'Easy',
    completed: true,
    starred: true,
    acceptance: '89.6%'
  },
  {
    id: 'kids-candies',
    title: 'Kids With the Greatest Number of Candies',
    category: 'Arrays',
    difficulty: 'Easy',
    completed: false,
    starred: false,
    acceptance: '87.1%'
  },
  {
    id: 'remove-duplicates',
    title: 'Remove Duplicates from Sorted Array',
    category: 'Two Pointers',
    difficulty: 'Easy',
    completed: true,
    starred: true,
    acceptance: '54.2%'
  },
  {
    id: 'best-time-stock',
    title: 'Best Time to Buy and Sell Stock',
    category: 'Sliding Window',
    difficulty: 'Easy',
    completed: false,
    starred: true,
    acceptance: '53.8%'
  },
  {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    category: 'Two Pointers',
    difficulty: 'Easy',
    completed: true,
    starred: false,
    acceptance: '46.1%'
  },
  {
    id: 'sql-filtering',
    title: 'SQL 101: Filter Customers with WHERE Clause',
    category: 'SQL Databases',
    difficulty: 'Easy',
    completed: true,
    starred: false,
    acceptance: '94.2%'
  },
  {
    id: 'two-sum',
    title: 'Two Sum (Hash Map Solution)',
    category: 'Hash Table',
    difficulty: 'Medium',
    completed: false,
    starred: true,
    acceptance: '50.1%'
  },
  {
    id: 'sql-joins',
    title: 'SQL Relational JOINs & Aggregations',
    category: 'SQL Databases',
    difficulty: 'Medium',
    completed: false,
    starred: true,
    acceptance: '64.3%'
  },
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    category: 'Two Pointers',
    difficulty: 'Hard',
    completed: false,
    starred: false,
    acceptance: '61.4%'
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    category: 'Stack',
    difficulty: 'Easy',
    completed: false,
    starred: true,
    acceptance: '40.8%'
  },
  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    category: 'Linked List',
    difficulty: 'Easy',
    completed: false,
    starred: false,
    acceptance: '63.2%'
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    category: 'Dynamic Programming',
    difficulty: 'Easy',
    completed: false,
    starred: false,
    acceptance: '52.7%'
  },
  {
    id: 'binary-search',
    title: 'Binary Search Algorithm',
    category: 'Binary Search',
    difficulty: 'Easy',
    completed: false,
    starred: true,
    acceptance: '56.9%'
  },
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    category: 'Hash Table',
    difficulty: 'Medium',
    completed: false,
    starred: true,
    acceptance: '67.4%'
  },
  {
    id: 'top-k-frequent',
    title: 'Top K Frequent Elements',
    category: 'Heap / Priority Queue',
    difficulty: 'Medium',
    completed: false,
    starred: false,
    acceptance: '63.8%'
  },
  {
    id: 'container-with-most-water',
    title: 'Container With Most Water',
    category: 'Two Pointers',
    difficulty: 'Medium',
    completed: false,
    starred: true,
    acceptance: '54.9%'
  },
  {
    id: 'longest-consecutive-sequence',
    title: 'Longest Consecutive Sequence',
    category: 'Hash Set',
    difficulty: 'Medium',
    completed: false,
    starred: false,
    acceptance: '47.5%'
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Singly Linked List',
    category: 'Linked List',
    difficulty: 'Easy',
    completed: false,
    starred: true,
    acceptance: '75.1%'
  },
  {
    id: 'defanging-ip',
    title: 'Defanging an IP Address',
    category: 'Strings',
    difficulty: 'Easy',
    completed: false,
    starred: false,
    acceptance: '89.2%'
  },
  {
    id: 'sql-monthly-revenue',
    title: 'SQL Analytics: Monthly Revenue & Growth Rate',
    category: 'SQL Databases',
    difficulty: 'Medium',
    completed: false,
    starred: true,
    acceptance: '58.6%'
  },
  {
    id: 'median-two-sorted-arrays',
    title: 'Median of Two Sorted Arrays',
    category: 'Binary Search',
    difficulty: 'Hard',
    completed: false,
    starred: false,
    acceptance: '38.4%'
  }
];

export const CoursesPage: React.FC<CoursesPageProps> = ({
  onSelectProblem,
  user,
  onNavigate,
  onUpdateUser
}) => {
  const userSolvedSet = new Set(user?.solvedProblemIds || []);

  const [problems, setProblems] = useState<ProblemItem[]>(() =>
    PROBLEMS_LIST.map(p => ({
      ...p,
      completed: userSolvedSet.has(p.id)
    }))
  );
  const [search, setSearch] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('Core Skills');

  // Sync when user changes
  React.useEffect(() => {
    const set = new Set(user?.solvedProblemIds || []);
    setProblems(
      PROBLEMS_LIST.map(p => ({
        ...p,
        completed: set.has(p.id)
      }))
    );
  }, [user]);

  const toggleStarred = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProblems(prev =>
      prev.map(p => (p.id === id ? { ...p, starred: !p.starred } : p))
    );
  };

  const toggleCompleted = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProblems(prev =>
      prev.map(p => (p.id === id ? { ...p, completed: !p.completed } : p))
    );
  };

  const filtered = problems.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Course Cards matching Collage Screen 1 */}
      <div>
        <h2 className="text-sm font-bold text-white mb-3">Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Purple - Algorithms & Data Structures for Beginners */}
          <div className="bg-[#181329] border border-purple-900/40 rounded-2xl p-4 flex items-center gap-4 hover:border-purple-500/50 transition cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white leading-snug">
                Algorithms & Data Structures for Beginners
              </h3>
              <p className="text-[11px] text-purple-300/70 mt-1">45 modules • Foundations</p>
            </div>
          </div>

          {/* Card 2: Red - Advanced Algorithms */}
          <div className="bg-[#261419] border border-rose-900/40 rounded-2xl p-4 flex items-center gap-4 hover:border-rose-500/50 transition cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white leading-snug">
                Advanced Algorithms
              </h3>
              <p className="text-[11px] text-rose-300/70 mt-1">Dynamic Programming, Graphs</p>
            </div>
          </div>

          {/* Card 3: Blue - System Design Beginners */}
          <div className="bg-[#101b2e] border border-sky-900/40 rounded-2xl p-4 flex items-center gap-4 hover:border-sky-500/50 transition cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white leading-snug">
                System Design Beginners
              </h3>
              <p className="text-[11px] text-sky-300/70 mt-1">Scaling, Caching, Databases</p>
            </div>
          </div>

        </div>
      </div>

      {/* Daily Mission Widget: Time-Sensitive Coding Challenges */}
      <DailyMissionWidget
        user={user}
        onSelectProblem={onSelectProblem}
        onNavigate={onNavigate}
        onUpdateUser={onUpdateUser}
      />

      {/* Filter Tabs & Total Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveFilter('Core Skills')}
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
              activeFilter === 'Core Skills'
                ? 'bg-[#1e1b38] text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            Core Skills
          </button>

          <button className="px-3 py-1 rounded-full text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1 border border-[#1e2738] bg-[#121724]">
            LeetCode All <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dynamic Problems Solved Progress Bar */}
        {(() => {
          const totalProblems = PROBLEMS_LIST.length;
          const userSolvedCount = user.problemsSolved ?? (user.solvedProblemIds?.length || 0);
          const percent = Math.min(100, Math.round((userSolvedCount / Math.max(1, totalProblems)) * 100));
          return (
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono font-bold text-slate-300">
                {userSolvedCount} / {totalProblems} Solved
              </span>
              <div className="w-48 sm:w-64 h-2 rounded-full bg-[#182030] overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })()}
      </div>

      {/* Main Split: Stats Column (Left) + Problem List (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-2">
        
        {/* Left Column: Stats Card */}
        <div className="lg:col-span-1">
          {(() => {
            const totalEasy = PROBLEMS_LIST.filter(p => p.difficulty === 'Easy').length;
            const totalMedium = PROBLEMS_LIST.filter(p => p.difficulty === 'Medium').length;
            const totalHard = PROBLEMS_LIST.filter(p => p.difficulty === 'Hard').length;
            const easySolved = user.easySolved ?? 0;
            const mediumSolved = user.mediumSolved ?? 0;
            const hardSolved = user.hardSolved ?? 0;

            return (
              <div className="bg-[#121724] border border-[#1c2438] rounded-2xl p-5 shadow-lg space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Stats</h4>

                {/* Easy Bar */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                    <span className="text-emerald-400 font-semibold">Easy</span>
                    <span className="text-slate-300 font-mono text-[11px]">{easySolved} / {totalEasy}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#1c2438] overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.round((easySolved / Math.max(1, totalEasy)) * 100))}%` }}
                    />
                  </div>
                </div>

                {/* Medium Bar */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                    <span className="text-amber-400 font-semibold">Medium</span>
                    <span className="text-slate-300 font-mono text-[11px]">{mediumSolved} / {totalMedium}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#1c2438] overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.round((mediumSolved / Math.max(1, totalMedium)) * 100))}%` }}
                    />
                  </div>
                </div>

                {/* Hard Bar */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                    <span className="text-rose-500 font-semibold">Hard</span>
                    <span className="text-slate-300 font-mono text-[11px]">{hardSolved} / {totalHard}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#1c2438] overflow-hidden">
                    <div
                      className="h-full bg-rose-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.round((hardSolved / Math.max(1, totalHard)) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Right Column: Search + Tools + Problem Table */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Tools Bar matching Collage Screen 1 */}
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#121724] border border-[#1c2438] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSearch('')}
                className="p-1.5 rounded-lg bg-[#121724] border border-[#1c2438] text-slate-400 hover:text-white"
                title="Reset Filters"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  const rand = problems[Math.floor(Math.random() * problems.length)];
                  onSelectProblem(rand.id);
                }}
                className="p-1.5 rounded-lg bg-[#121724] border border-[#1c2438] text-slate-400 hover:text-white"
                title="Pick Random Problem"
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>
              <button
                className="p-1.5 rounded-lg bg-[#121724] border border-[#1c2438] text-slate-400 hover:text-white"
                title="Help"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Problem Table matching Collage Screen 1 */}
          <div className="bg-[#121724] border border-[#1c2438] rounded-2xl overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#1c2438] text-slate-400 font-semibold bg-[#0e121d]">
                <tr>
                  <th className="w-12 px-4 py-3">Status</th>
                  <th className="w-10 px-2 py-3">Star</th>
                  <th className="px-4 py-3">Problem</th>
                  <th className="px-4 py-3">Difficulty</th>
                  <th className="px-4 py-3 text-center">Solution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#182030] text-slate-200">
                {filtered.map(p => (
                  <tr
                    key={p.id}
                    onClick={() => onSelectProblem(p.id)}
                    className="hover:bg-[#182030]/60 transition cursor-pointer group"
                  >
                    {/* Status Checkbox */}
                    <td className="px-4 py-3">
                      <button
                        onClick={(e) => toggleCompleted(p.id, e)}
                        className={`w-4 h-4 rounded flex items-center justify-center transition border ${
                          p.completed
                            ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                            : 'border-slate-600 hover:border-slate-400 bg-transparent'
                        }`}
                      >
                        {p.completed && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>
                    </td>

                    {/* Star Icon */}
                    <td className="px-2 py-3">
                      <button
                        onClick={(e) => toggleStarred(p.id, e)}
                        className="text-slate-500 hover:text-amber-400 transition"
                      >
                        <Star className={`w-3.5 h-3.5 ${p.starred ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    </td>

                    {/* Problem Name */}
                    <td className="px-4 py-3 font-medium text-slate-100 group-hover:text-purple-300 transition">
                      {p.title}
                    </td>

                    {/* Difficulty Pill Badge */}
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        p.difficulty === 'Easy'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : p.difficulty === 'Medium'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {p.difficulty}
                      </span>
                    </td>

                    {/* Solution Video Icon */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProblem(p.id);
                        }}
                        className="text-slate-400 hover:text-purple-400 transition p-1"
                        title="Watch Solution"
                      >
                        <Video className="w-4 h-4 mx-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination at bottom: < 1 2 3 ... 10 > */}
            <div className="p-3 border-t border-[#1c2438] flex items-center justify-center gap-1.5 text-xs font-mono text-slate-400">
              <button className="px-2 py-1 rounded bg-[#182030] text-slate-300 hover:bg-slate-700">‹</button>
              <button className="px-2.5 py-1 rounded bg-purple-600 text-white font-bold">1</button>
              <button className="px-2.5 py-1 rounded hover:bg-[#182030] text-slate-300">2</button>
              <button className="px-2.5 py-1 rounded hover:bg-[#182030] text-slate-300">3</button>
              <span className="px-1 text-slate-600">...</span>
              <button className="px-2.5 py-1 rounded hover:bg-[#182030] text-slate-300">10</button>
              <button className="px-2 py-1 rounded bg-[#182030] text-slate-300 hover:bg-slate-700">›</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
