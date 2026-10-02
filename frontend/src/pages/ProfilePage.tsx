import React from 'react';
import { Shield, Flame, Trophy, Award, CheckCircle2 } from 'lucide-react';
import { BitmojiAvatar } from '../components/BitmojiAvatar';
import { UserAccount } from '../lib/authStore';

interface ProfilePageProps {
  user: UserAccount;
  onNavigateToAchievements: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onNavigateToAchievements }) => {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h2 className="text-sm font-bold text-white mb-2">Profile</h2>

      {/* Top Header Card matching Collage Screen 5 with Cartoon Bitmoji Avatar */}
      <div className="bg-[#121724] border border-[#1c2438] rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            {/* Cartoon Bitmoji Avatar with green glowing border */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-r from-emerald-400 to-teal-400 shadow-lg shadow-emerald-500/20">
                <BitmojiAvatar
                  seed={user.avatarSeed || user.username}
                  alt={user.name}
                  className="w-full h-full border-2 border-[#121724]"
                />
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-xl font-bold text-white">@{user.username}</h1>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-400 mt-0.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>{user.title}</span>
              </div>
              <div className="text-xs font-mono font-bold text-purple-400 mt-1">
                {user.xp.toLocaleString()} XP
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {user.email}
              </div>
            </div>
          </div>

          {/* Quick Metrics: Problems Solved, Current Streak, Global Rank */}
          <div className="flex items-center gap-6 sm:gap-10 text-center">
            <div>
              <div className="text-[11px] text-slate-400">Problems Solved</div>
              <div className="text-2xl font-bold text-white font-mono mt-1">{user.problemsSolved}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Current Streak</div>
              <div className="text-2xl font-bold text-orange-400 font-mono mt-1">{user.streakDays} days</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Global Rank</div>
              <div className="text-2xl font-bold text-white font-mono mt-1">#{user.globalRank}</div>
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div>
          <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 mb-1.5">
            <span className="text-purple-300 font-bold">{user.xp.toLocaleString()} XP</span>
            <span>{user.nextLevelXp.toLocaleString()} XP</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#182030] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"
              style={{ width: `${Math.min(100, Math.round((user.xp / user.nextLevelXp) * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Middle Row: About (Left) + Badges (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* About */}
        <div className="bg-[#121724] border border-[#1c2438] rounded-2xl p-5 shadow-xl">
          <h4 className="text-xs font-bold text-white mb-2">About</h4>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Passionate developer exploring algorithms, relational SQL, and modern full-stack architectures on CodeQuest.
          </p>
        </div>

        {/* Badges Showcase with View All */}
        <div className="bg-[#121724] border border-[#1c2438] rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-white">Badges</h4>
            <button
              onClick={onNavigateToAchievements}
              className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
            >
              View all
            </button>
          </div>

          {(() => {
            const badges = [
              { id: 'first-steps', title: 'First Steps', icon: '🏆', unlocked: (user.problemsSolved || 0) >= 1 },
              { id: 'problem-solver', title: 'Problem Solver', icon: '🛡️', unlocked: (user.problemsSolved || 0) >= 50 },
              { id: 'streak-master', title: 'Streak Master', icon: '🔥', unlocked: (user.streakDays || 0) >= 7 },
              { id: 'speed-coder', title: 'Speed Coder', icon: '⚡', unlocked: (user.problemsSolved || 0) >= 5 }
            ];
            const unlockedList = badges.filter(b => b.unlocked);

            if (unlockedList.length === 0) {
              return (
                <div className="py-2 text-slate-500 text-xs">
                  <p className="text-slate-400 text-xs">0 / {badges.length} badges unlocked</p>
                  <p className="text-[11px] text-slate-500 mt-1">Solve your first problem to earn your first badge: 🏆 First Steps!</p>
                </div>
              );
            }

            return (
              <div className="flex items-center gap-3">
                {badges.map(b => (
                  <div
                    key={b.id}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm border transition ${
                      b.unlocked
                        ? 'bg-purple-600/20 border-purple-500/40'
                        : 'bg-[#182030] border-[#232f48] opacity-30 grayscale'
                    }`}
                    title={b.unlocked ? b.title : `${b.title} (Locked)`}
                  >
                    {b.icon}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

      </div>

      {/* Bottom Row: Languages (Left) + Recent Activity (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Languages Breakdown */}
        <div className="bg-[#121724] border border-[#1c2438] rounded-2xl p-5 shadow-xl space-y-3">
          <h4 className="text-xs font-bold text-white mb-1">Languages</h4>

          {(!user.languages || user.languages.length === 0) ? (
            <div className="py-6 text-center text-slate-500 text-xs">
              <p className="text-slate-400 font-medium">No language metrics recorded</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Solve coding problems in Python, JavaScript, C++, or SQL to build your language profile.
              </p>
            </div>
          ) : (
            user.languages.map((lang, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-[11px] text-slate-300 font-mono mb-1">
                  <span>{lang.name}</span>
                  <span>{lang.percent}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#182030] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${lang.percent}%`, backgroundColor: lang.color || '#a855f7' }}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-[#121724] border border-[#1c2438] rounded-2xl p-5 shadow-xl space-y-2.5">
          <h4 className="text-xs font-bold text-white mb-2">Recent Activity</h4>

          {(!user.problemsSolved && !user.quizzesCompleted && !user.streakDays) ? (
            <div className="py-6 text-center text-slate-500 text-xs">
              <p className="text-slate-400 font-medium">No activity recorded yet</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Start your first problem or daily mission to see your activity timeline appear here!
              </p>
            </div>
          ) : (
            <>
              {user.problemsSolved > 0 && (
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Solved {user.problemsSolved} coding challenges
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">Recent</span>
                </div>
              )}
              {user.quizzesCompleted > 0 && (
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    Completed {user.quizzesCompleted} technical quizzes ({user.quizScore}% score)
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">Recent</span>
                </div>
              )}
              {user.streakDays > 0 && (
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    Active streak: {user.streakDays} day{user.streakDays > 1 ? 's' : ''} 🔥
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">Active</span>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
