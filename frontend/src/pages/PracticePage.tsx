import React, { useState } from 'react';
import { Mission, PageRoute } from '../types';
import { Search, Filter, Play, CheckCircle2, Clock, Zap, Database, Code2, Cpu, FileCode2, Terminal, ArrowRight } from 'lucide-react';

interface PracticePageProps {
  missions: Mission[];
  onNavigate: (page: PageRoute) => void;
  onSelectMission: (missionId: string) => void;
}

export const PracticePage: React.FC<PracticePageProps> = ({
  missions,
  onNavigate,
  onSelectMission
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Solved' | 'Unsolved'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'HTML/CSS', 'SQL', 'DSA', 'React'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredMissions = missions.filter(m => {
    const matchCategory = selectedCategory === 'All' || m.category === selectedCategory;
    const matchDifficulty = selectedDifficulty === 'All' || m.difficulty === selectedDifficulty;
    const matchStatus =
      statusFilter === 'All' ? true :
      statusFilter === 'Solved' ? m.completed :
      !m.completed;
    const matchSearch =
      searchQuery.trim() === '' ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchDifficulty && matchStatus && matchSearch;
  });

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Terminal className="w-4 h-4" /> Practice Arena & Question Bank
          </div>
          <h1 className="text-3xl font-extrabold text-white">Developer Practice Challenges</h1>
          <p className="text-sm text-slate-400 mt-1">
            Explore questions ranging from absolute beginner styling to production SQL queries and multi-language DSA algorithms.
          </p>
        </div>

        {/* Global Summary Badge */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl w-fit">
          <div className="text-xs">
            <span className="text-slate-400">Total Solved: </span>
            <span className="text-emerald-400 font-bold font-mono">
              {missions.filter(m => m.completed).length} / {missions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. 'hello world', 'SELECT', 'two sum', 'palindrome')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'All' ? 'All Tracks' : cat}
            </button>
          ))}
        </div>

        {/* Difficulty Dropdown & Status Filter */}
        <div className="flex items-center gap-2">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
          >
            {difficulties.map(d => (
              <option key={d} value={d}>{d === 'All' ? 'All Difficulties' : d}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Status</option>
            <option value="Solved">Solved Only</option>
            <option value="Unsolved">Unsolved Only</option>
          </select>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMissions.map(m => {
          const isWeb = m.type === 'web';
          const isSql = m.type === 'sql';
          const isDsa = m.type === 'dsa';

          return (
            <div
              key={m.id}
              className={`bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between hover:scale-[1.01] transition-all shadow-lg ${
                m.completed ? 'border-emerald-500/30' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Card Top Meta */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    {isWeb && <Code2 className="w-4 h-4 text-amber-400" />}
                    {isSql && <Database className="w-4 h-4 text-emerald-400" />}
                    {isDsa && <Cpu className="w-4 h-4 text-purple-400" />}
                    <span className="text-xs font-semibold text-slate-300">{m.category}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      m.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      m.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {m.difficulty}
                    </span>

                    {m.completed && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Solved
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-white text-base mb-1.5 leading-snug">{m.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">{m.summary}</p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> ~{m.estimatedMinutes}m</span>
                  <span className="flex items-center gap-1 text-amber-400 font-semibold"><Zap className="w-3.5 h-3.5" /> +{m.xpReward} XP</span>
                </div>

                <button
                  onClick={() => {
                    onSelectMission(m.id);
                    onNavigate('challenge.html');
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    m.completed
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{m.completed ? 'Review' : 'Solve'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMissions.length === 0 && (
        <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
          <Terminal className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h4 className="text-base font-bold text-white">No challenges match your filters</h4>
          <p className="text-xs text-slate-400 mt-1">Try resetting the category or difficulty filters.</p>
        </div>
      )}
    </div>
  );
};
