import React from 'react';
import { BarChart2, TrendingUp, Clock, CheckCircle2, Shield } from 'lucide-react';
import { UserAccount } from '../lib/authStore';

interface StatsPageProps {
  user: UserAccount;
}

export const StatsPage: React.FC<StatsPageProps> = ({ user }) => {
  const languages = user.languages || [];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-sm font-bold text-white mb-0.5">Stats & Analytics</h2>
        <p className="text-xs text-slate-400">
          Personalized performance breakdown for <span className="text-purple-300 font-semibold">@{user.username}</span>.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#121724] border border-[#1c2438] rounded-2xl p-5 shadow-xl">
          <div className="text-xs text-slate-400 font-medium">Problems Solved</div>
          <div className="text-3xl font-bold text-white font-mono mt-2">{user.problemsSolved}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            {user.easySolved} Easy • {user.mediumSolved} Medium • {user.hardSolved} Hard
          </div>
        </div>

        <div className="bg-[#121724] border border-[#1c2438] rounded-2xl p-5 shadow-xl">
          <div className="text-xs text-slate-400 font-medium">Solution Accuracy</div>
          <div className="text-3xl font-bold text-emerald-400 font-mono mt-2">
            {user.problemsSolved > 0 ? `${user.accuracy}%` : '0.0%'}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {user.problemsSolved > 0 ? 'First-try test pass rate' : 'No submissions recorded yet'}
          </div>
        </div>

        <div className="bg-[#121724] border border-[#1c2438] rounded-2xl p-5 shadow-xl">
          <div className="text-xs text-slate-400 font-medium">Current Streak</div>
          <div className="text-3xl font-bold text-orange-400 font-mono mt-2">{user.streakDays} days</div>
          <div className="text-[11px] text-slate-500 mt-1">Longest: {user.longestStreak || 0} days</div>
        </div>

        <div className="bg-[#121724] border border-[#1c2438] rounded-2xl p-5 shadow-xl">
          <div className="text-xs text-slate-400 font-medium">Total Experience</div>
          <div className="text-3xl font-bold text-purple-400 font-mono mt-2">{user.xp.toLocaleString()} XP</div>
          <div className="text-[11px] text-slate-500 mt-1">Global Rank: #{user.globalRank}</div>
        </div>
      </div>

      {/* Languages Breakdown */}
      <div className="bg-[#121724] border border-[#1c2438] rounded-2xl p-6 shadow-xl space-y-4">
        <h4 className="text-xs font-bold text-white">Language Proficiency</h4>

        {languages.length === 0 ? (
          <div className="py-6 text-center text-slate-500 text-xs">
            <p className="text-slate-400 font-medium">No language metrics recorded yet</p>
            <p className="text-[11px] text-slate-500 mt-1">
              Solve coding challenges in Python, JavaScript, C++, or SQL to populate your language proficiency.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {languages.map((lang, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs text-slate-300 font-mono mb-1">
                  <span>{lang.name}</span>
                  <span>{lang.percent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#182030] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${lang.percent}%`, backgroundColor: lang.color || '#a855f7' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
