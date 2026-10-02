import React from 'react';
import { PageRoute } from '../types';
import { Sparkles, Terminal, Code2, Database, Cpu, Award, Zap, ArrowRight, CheckCircle2, Flame, Users, BookOpen } from 'lucide-react';

interface IndexPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const IndexPage: React.FC<IndexPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 sm:px-12 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.25),rgba(255,255,255,0))]" />
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen Developer Learning & Practice Arena
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
            Master Code Through <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Real Missions & Live Arenas
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            From absolute zero (HTML tags & text colors) to full-stack architectures, relational SQL JOINs, 
            and multi-language DSA algorithms. Level up your career with gamified XP, daily streaks, and real-time AI code reviews.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('dashboard.html')}
              className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 hover:scale-105 transition-all cursor-pointer"
            >
              Enter Dashboard <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('practice.html')}
              className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-emerald-400" /> Browse Practice Arena
            </button>
            <button
              onClick={() => onNavigate('roadmap.html')}
              className="px-6 py-3.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-500/40 font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-purple-400" /> View Roadmap
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto pt-10 border-t border-slate-800/60">
            <div>
              <div className="text-3xl font-black text-white">15+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Full Curriculum Modules</div>
            </div>
            <div>
              <div className="text-3xl font-black text-amber-400">4 Languages</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">JS, Python, C++, Java</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-400">Live SQL</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Real Table Query Engine</div>
            </div>
            <div>
              <div className="text-3xl font-black text-indigo-400">DevBuddy</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Gemini AI Senior Mentor</div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Tracks Showcase */}
      <section className="py-16 px-6 sm:px-12 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Structured Tracks for Every Stage</h2>
          <p className="text-slate-400">Progressive difficulty designed for beginners, computer science students, and career switchers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Track 1 */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl hover:border-amber-500/50 transition group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Beginner Friendly</span>
              <h3 className="text-xl font-bold text-white mt-3 mb-2">HTML, CSS & Web Fundamentals</h3>
              <p className="text-sm text-slate-400 mb-4">Start from zero: HTML tags, color theory, buttons, Flexbox, responsive grid systems, and semantic structures.</p>
            </div>
            <button
              onClick={() => onNavigate('challenge.html')}
              className="text-amber-400 hover:text-amber-300 text-sm font-semibold flex items-center gap-1.5 mt-2"
            >
              Try HTML/CSS Challenge <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Track 2 */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/50 transition group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition">
                <Database className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Databases & Analytics</span>
              <h3 className="text-xl font-bold text-white mt-3 mb-2">Relational SQL & Query Engine</h3>
              <p className="text-sm text-slate-400 mb-4">Execute live SQL queries on real database tables. Learn SELECT, WHERE filters, multi-table JOINs, and GROUP BY aggregations.</p>
            </div>
            <button
              onClick={() => onNavigate('practice.html')}
              className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold flex items-center gap-1.5 mt-2"
            >
              Run SQL Queries <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Track 3 */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl hover:border-purple-500/50 transition group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">Algorithms & Prep</span>
              <h3 className="text-xl font-bold text-white mt-3 mb-2">DSA & Multi-Language Arena</h3>
              <p className="text-sm text-slate-400 mb-4">Solve interview algorithms in JavaScript, Python, C++, or Java. Instant test suites, benchmarks, and Big-O analysis.</p>
            </div>
            <button
              onClick={() => onNavigate('practice.html')}
              className="text-purple-400 hover:text-purple-300 text-sm font-semibold flex items-center gap-1.5 mt-2"
            >
              Solve DSA Problems <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Gamification Highlights */}
      <section className="bg-slate-900/40 border-y border-slate-800/80 py-16 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Built-In Dopamine & Retention</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-6">
                Stay Consistent with Daily Streaks & Leaderboard Glory
              </h2>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 mt-1">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Daily Streak Engine & Heatmap</h4>
                    <p className="text-sm text-slate-400">Track daily coding momentum with a GitHub-style 365-day grid, streak freeze protections, and milestone rewards.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 mt-1">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Global & League Leaderboard</h4>
                    <p className="text-sm text-slate-400">Compete with fellow developers across Grandmaster, Diamond, and Gold tiers. Earn badges for your public portfolio.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-1">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">DevBuddy AI Code Reviewer</h4>
                    <p className="text-sm text-slate-400">Get senior-level code reviews instantly. Spot security flaws, accessibility issues, and performance optimizations.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => onNavigate('streak.html')}
                  className="px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-medium text-sm flex items-center gap-2 cursor-pointer"
                >
                  <Flame className="w-4 h-4" /> Check Streak Tracker
                </button>
                <button
                  onClick={() => onNavigate('leaderboard.html')}
                  className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm flex items-center gap-2 cursor-pointer"
                >
                  <Users className="w-4 h-4" /> View Leaderboard
                </button>
              </div>
            </div>

            {/* Interactive Preview Card */}
            <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 ml-2">codequest_playground.sql</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">LIVE EVALUATION</span>
              </div>
              <pre className="font-mono text-xs text-indigo-300 bg-slate-950 p-4 rounded-xl overflow-x-auto mb-4 border border-slate-800/80">
{`SELECT 
  c.name, 
  COUNT(o.id) AS total_orders, 
  SUM(o.amount) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.name
ORDER BY total_spent DESC;`}
              </pre>
              <div className="bg-emerald-950/30 border border-emerald-500/30 p-3 rounded-xl flex items-center justify-between text-xs">
                <span className="text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> 4 rows matched in 3.42ms
                </span>
                <span className="text-amber-400 font-semibold">+250 XP Awarded</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-10 px-6 sm:px-12 border-t border-slate-800 text-center text-slate-400 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs">CQ</div>
            CodeQuest Platform
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-slate-400">
            <button onClick={() => onNavigate('dashboard.html')} className="hover:text-white">Dashboard</button>
            <button onClick={() => onNavigate('practice.html')} className="hover:text-white">Practice Hub</button>
            <button onClick={() => onNavigate('roadmap.html')} className="hover:text-white">Roadmap</button>
            <button onClick={() => onNavigate('quizzes.html')} className="hover:text-white">Quizzes</button>
            <button onClick={() => onNavigate('stats.html')} className="hover:text-white">Stats</button>
            <button onClick={() => onNavigate('admin.html')} className="hover:text-white">Admin</button>
          </div>
          <div className="text-xs text-slate-400">
            Empowering modern software engineers worldwide.
          </div>
        </div>
      </footer>
    </div>
  );
};
