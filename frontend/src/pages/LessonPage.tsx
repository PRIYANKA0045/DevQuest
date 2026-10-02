import React, { useState } from 'react';
import { PageRoute } from '../types';
import { BookOpen, CheckCircle2, ArrowRight, Play, Sparkles, Code2, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

interface LessonPageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectMission?: (missionId: string) => void;
}

interface LessonChapter {
  id: string;
  title: string;
  category: string;
  readTime: string;
  content: string;
  codeSnippet: string;
  runResult: string;
  quiz: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

const LESSONS: LessonChapter[] = [
  {
    id: 'lesson-1',
    title: 'HTML5 Semantic Layout & Accessibility',
    category: 'HTML & CSS Basics',
    readTime: '6 min read',
    content: `Semantic HTML provides meaning to web pages rather than just styling.
Screen readers, search engines, and browser crawlers rely heavily on semantic elements like <header>, <nav>, <main>, <article>, and <footer>.

Before HTML5, developers relied almost entirely on generic <div> and <span> tags with arbitrary class names. This created tag soup and made accessibility (a11y) extremely difficult to maintain.

Using semantic elements directly communicates the structural hierarchy to assistive technologies.`,
    codeSnippet: `<header class="bg-indigo-600 text-white p-4">
  <h1>CodeQuest Developer Portal</h1>
</header>
<main class="p-6">
  <article class="bg-white p-4 rounded shadow">
    <h2>Why Semantics Matter</h2>
    <p>Semantic tags improve accessibility and SEO rankings.</p>
  </article>
</main>`,
    runResult: 'Rendered Clean Semantic Document with high accessibility score (100% Lighthouse rating).',
    quiz: {
      question: 'Which element is most semantically appropriate for an independent blog post?',
      options: ['<div>', '<article>', '<aside>', '<section>'],
      correct: 1,
      explanation: '<article> is specifically designed for self-contained, syndicate-able content.'
    }
  },
  {
    id: 'lesson-2',
    title: 'Relational Database Fundamentals & SQL JOINs',
    category: 'SQL & Databases',
    readTime: '8 min read',
    content: `Relational databases organize information into structured tables with strict columns and rows.
The true power of relational databases lies in primary and foreign keys connecting multiple tables.

When you want to connect a 'customers' table to an 'orders' table, you use the SQL JOIN operator:
- INNER JOIN returns rows that have matching values in both tables.
- LEFT JOIN returns all rows from the left table, and matched rows from the right table.`,
    codeSnippet: `SELECT 
  customers.name, 
  orders.product, 
  orders.amount 
FROM customers 
INNER JOIN orders 
  ON customers.id = orders.customer_id;`,
    runResult: 'Matched 8 customer purchases across 2 tables in 2.1ms execution time.',
    quiz: {
      question: 'What happens if a customer has zero orders in an INNER JOIN?',
      options: [
        'The customer appears with NULL orders',
        'The customer is excluded from the query results',
        'An SQL syntax error is thrown',
        'The database crashes'
      ],
      correct: 1,
      explanation: 'INNER JOIN excludes any record that does not have a corresponding match in both tables.'
    }
  },
  {
    id: 'lesson-3',
    title: 'Solving Problems in O(n) with Hash Maps',
    category: 'DSA & Algorithms',
    readTime: '10 min read',
    content: `When solving algorithmic problems, comparing every element with every other element results in a brute force O(n²) time complexity.

By introducing a Hash Table or Hash Map, you trade a small amount of extra space (O(n) auxiliary memory) to achieve lightning-fast O(1) average constant-time lookups.

This paradigm is the cornerstone of classic interview challenges like Two Sum, Group Anagrams, and First Unique Character.`,
    codeSnippet: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    runResult: 'Execution completed in O(n) linear time with 1 single array pass.',
    quiz: {
      question: 'What is the average time complexity to lookup a key in a Hash Map?',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
      correct: 2,
      explanation: 'Hash maps use hash functions to index memory buckets directly in O(1) average time.'
    }
  }
];

export const LessonPage: React.FC<LessonPageProps> = ({ onNavigate, onSelectMission }) => {
  const [currentLessonIdx, setCurrentLessonIdx] = useState<number>(0);
  const [hasRunCode, setHasRunCode] = useState<boolean>(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  const lesson = LESSONS[currentLessonIdx];

  const handleNextLesson = () => {
    if (currentLessonIdx < LESSONS.length - 1) {
      setCurrentLessonIdx(prev => prev + 1);
      setHasRunCode(false);
      setSelectedQuizAnswer(null);
      setIsQuizSubmitted(false);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIdx > 0) {
      setCurrentLessonIdx(prev => prev - 1);
      setHasRunCode(false);
      setSelectedQuizAnswer(null);
      setIsQuizSubmitted(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Lesson Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" /> Interactive Guided Tutorial
          </div>
          <h1 className="text-3xl font-extrabold text-white">{lesson.title}</h1>
          <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 font-semibold">{lesson.category}</span>
            <span>•</span>
            <span>{lesson.readTime}</span>
            <span>•</span>
            <span>Lesson {currentLessonIdx + 1} of {LESSONS.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevLesson}
            disabled={currentLessonIdx === 0}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 text-slate-300 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextLesson}
            disabled={currentLessonIdx === LESSONS.length - 1}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 text-slate-300 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lesson Core Text */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <h2 className="text-lg font-bold text-white mb-4">Conceptual Breakdown</h2>
        <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-4">
          {lesson.content}
        </div>

        {/* Interactive Code Playground in Lesson */}
        <div className="mt-8 border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
          <div className="h-10 bg-slate-900 px-4 flex items-center justify-between text-xs border-b border-slate-800">
            <span className="font-mono text-slate-400 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-400" /> Interactive Code Example
            </span>
            <button
              onClick={() => setHasRunCode(true)}
              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" /> Try It
            </button>
          </div>

          <pre className="p-4 font-mono text-xs text-indigo-200 overflow-x-auto leading-relaxed">
            {lesson.codeSnippet}
          </pre>

          {hasRunCode && (
            <div className="p-3 bg-emerald-950/40 border-t border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Result: {lesson.runResult}</span>
            </div>
          )}
        </div>

        {/* Mini Knowledge Check Quiz */}
        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" /> Knowledge Checkpoint
          </div>
          <h3 className="text-base font-bold text-white mb-4">{lesson.quiz.question}</h3>

          <div className="space-y-2.5">
            {lesson.quiz.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelectedQuizAnswer(i)}
                className={`w-full text-left p-3.5 rounded-xl text-xs font-medium border transition cursor-pointer flex items-center justify-between ${
                  selectedQuizAnswer === i
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{opt}</span>
                {selectedQuizAnswer === i && <span className="w-2 h-2 rounded-full bg-indigo-400" />}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => setIsQuizSubmitted(true)}
              disabled={selectedQuizAnswer === null}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold disabled:opacity-40 cursor-pointer"
            >
              Check Answer
            </button>

            {isQuizSubmitted && (
              <div className={`text-xs font-medium ${
                selectedQuizAnswer === lesson.quiz.correct ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {selectedQuizAnswer === lesson.quiz.correct
                  ? `✓ Correct! ${lesson.quiz.explanation}`
                  : `✕ Incorrect. ${lesson.quiz.explanation}`}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => onNavigate('practice.html')}
          className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
        >
          Browse Practice Arena
        </button>

        <button
          onClick={() => onNavigate('challenge.html')}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
        >
          <span>Apply in Live Challenge</span> <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
