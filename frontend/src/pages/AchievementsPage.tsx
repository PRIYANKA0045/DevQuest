import React, { useState } from 'react';
import { Award, CheckCircle2, Lock, Flame, Zap, Shield, Trophy } from 'lucide-react';
import { UserAccount } from '../lib/authStore';

interface AchievementItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progressText?: string;
}

interface AchievementsPageProps {
  user?: UserAccount;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ user }) => {
  const [filter, setFilter] = useState<'All' | 'Unlocked' | 'Locked'>('All');

  const solved = user?.problemsSolved || 0;
  const streak = user?.streakDays || 0;
  const rank = user?.globalRank || 9999;
  const level = user?.level || 1;
  const hard = user?.hardSolved || 0;

  const achievementsList: AchievementItem[] = [
    {
      id: 'first-steps',
      title: 'First Steps',
      description: 'Solved your first problem',
      icon: '🎯',
      unlocked: solved >= 1,
      progressText: `${Math.min(1, solved)}/1 solved`
    },
    {
      id: 'problem-solver',
      title: 'Problem Solver',
      description: 'Solved 50 problems',
      icon: '💡',
      unlocked: solved >= 50,
      progressText: `${Math.min(50, solved)}/50 solved`
    },
    {
      id: 'century',
      title: 'Century',
      description: 'Solved 100 problems',
      icon: '🎖️',
      unlocked: solved >= 100,
      progressText: `${Math.min(100, solved)}/100 solved`
    },
    {
      id: 'streak-master',
      title: 'Streak Master',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      unlocked: streak >= 7,
      progressText: `${Math.min(7, streak)}/7 days`
    },
    {
      id: 'speed-coder',
      title: 'Speed Coder',
      description: 'Solved 5 problems',
      icon: '⚡',
      unlocked: solved >= 5,
      progressText: `${Math.min(5, solved)}/5 solved`
    },
    {
      id: 'top-100',
      title: 'Top 100',
      description: 'Reached Top 100 globally',
      icon: '🏆',
      unlocked: rank <= 100,
      progressText: `Current Rank: #${rank}`
    },
    {
      id: 'code-warrior',
      title: 'Code Warrior',
      description: 'Reach Level 20',
      icon: '🛡️',
      unlocked: level >= 20,
      progressText: `Level ${level}/20`
    },
    {
      id: 'night-owl',
      title: 'Night Owl',
      description: 'Solve challenges during night mode',
      icon: '🦉',
      unlocked: false,
      progressText: '0/1 night solved'
    },
    {
      id: 'perfectionist',
      title: 'Perfectionist',
      description: 'Solve 10 hard problems',
      icon: '✨',
      unlocked: hard >= 10,
      progressText: `${Math.min(10, hard)}/10 solved`
    }
  ];

  const unlockedCount = achievementsList.filter(a => a.unlocked).length;

  const filtered = achievementsList.filter(a => {
    if (filter === 'Unlocked') return a.unlocked;
    if (filter === 'Locked') return !a.unlocked;
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header matching Collage Screen 6 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-white mb-1">Achievements & Trophies</h2>
          <p className="text-xs text-slate-400">
            {user ? (
              <>Showing unlocked badges for <span className="text-purple-300 font-semibold">@{user.username}</span> ({unlockedCount} / {achievementsList.length} unlocked)</>
            ) : (
              'Earn trophies and showcase your coding mastery'
            )}
          </p>
        </div>
        
        {/* Tabs: All, Unlocked, Locked */}
        <div className="flex gap-2">
          {(['All', 'Unlocked', 'Locked'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                filter === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#151c2c] text-slate-400 hover:text-white border border-[#232f48]'
              }`}
            >
              {tab} {tab === 'Unlocked' ? `(${unlockedCount})` : tab === 'Locked' ? `(${achievementsList.length - unlockedCount})` : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Achievement Cards matching Collage Screen 6 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(item => (
          <div
            key={item.id}
            className={`bg-[#121724] border rounded-2xl p-4 flex items-center gap-4 transition shadow-lg ${
              item.unlocked
                ? 'border-purple-500/40 bg-gradient-to-br from-[#121724] to-[#1c1833]'
                : 'border-[#182030] opacity-50'
            }`}
          >
            {/* Emoji / Icon container */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
              item.unlocked ? 'bg-[#1b1733] border border-purple-500/40 shadow-sm shadow-purple-500/20' : 'bg-[#161d2d] border border-slate-700/60'
            }`}>
              {item.icon}
            </div>

            <div className="overflow-hidden flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white truncate">{item.title}</h3>
                {item.unlocked ? (
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Unlocked
                  </span>
                ) : (
                  <span className="text-[10px] font-medium text-slate-500 flex items-center gap-0.5">
                    <Lock className="w-2.5 h-2.5" /> Locked
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.description}</p>
              
              <div className="mt-2 text-[10px] font-mono text-purple-300">
                {item.progressText}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
