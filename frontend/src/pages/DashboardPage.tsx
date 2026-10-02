import React from 'react';
import { UserProfile, World, Mission, PageRoute } from '../types';
import { Flame, Trophy, Award, Zap, ArrowRight, Play, CheckCircle2, Clock, Terminal, Database, Code2, Sparkles, BookOpen } from 'lucide-react';

interface DashboardPageProps {
  user: UserProfile;
  worlds: World[];
  missions: Mission[];
  onNavigate: (page: PageRoute) => void;
  onSelectMission: (missionId: string) => void;
  onClaimDailyStreak: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  worlds,
  missions,
  onNavigate,
  onSelectMission,
  onClaimDailyStreak
}) => {
  const currentMission = missions.find(m => !m.completed) || missions[0];
  const completedCount = missions.filter(m => m.completed).length;
  const progressPercent = Math.round((user.xp / user.nextLevelXp) * 100);

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Welcome & XP Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Level {user.level} {user.title}
                </span>
                <span className="text-xs text-slate-400 font-mono">Rank #{user.rank} Global</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Welcome back, {user.name} 👋
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Keep your coding momentum strong. Solve today's quest to extend your streak!
              </p>
            </div>
          </div>

          {/* Streak & XP Quick Action */}
          <div className="flex items-center gap-4">
            <div
              onClick={() => onNavigate('streak.html')}
              className="px-4 py-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center gap-3 cursor-pointer hover:bg-orange-500/20 transition"
              title="Click to view full streak calendar"
            >
              <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
                <Flame className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <div className="text-xl font-bold text-orange-400 leading-tight">{user.streakDays} Days</div>
                <div className="text-[11px] text-orange-300 font-medium">Daily Streak 🔥</div>
              </div>
            </div>

            <button
              onClick={onClaimDailyStreak}
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:scale-105 transition cursor-pointer"
            >
              Check In (+50 XP)
            </button>
          </div>
        </div>

        {/* XP Level Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-400 font-medium">Level {user.level} Progression</span>
            <span className="text-indigo-300 font-bold font-mono">{user.xp} / {user.nextLevelXp} XP ({progressPercent}%)</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-800/80 overflow-hidden p-0.5 border border-slate-700/50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${Math.min(100, progressPercent)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid: Active Quest & Daily Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Mission Card (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Terminal className="w-4 h-4" /> Active Challenge
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                currentMission.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                currentMission.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}>
                {currentMission.difficulty}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">{currentMission.title}</h2>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">{currentMission.summary}</p>

            {/* Mission Key Objectives */}
            <div className="space-y-2 mb-6">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Target Objectives</span>
              {currentMission.objectives.map((obj, i) => (
                <div key={obj.id} className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{obj.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> ~{currentMission.estimatedMinutes} min</span>
              <span className="flex items-center gap-1 text-amber-400 font-semibold"><Zap className="w-4 h-4" /> +{currentMission.xpReward} XP</span>
              <span className="text-slate-400">Category: {currentMission.category}</span>
            </div>

            <button
              onClick={() => {
                onSelectMission(currentMission.id);
                onNavigate('challenge.html');
              }}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" /> Continue in Arena
            </button>
          </div>
        </div>

        {/* Daily Objectives / Checklist (1 col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Daily Goals
              </h3>
              <span className="text-xs text-slate-400">2 of 3 Done</span>
            </div>

            <p className="text-xs text-slate-400 mb-5">Complete these daily activities to unlock bonus streak multipliers!</p>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="text-xs font-medium text-slate-200">Solve 1 Practice Challenge</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">+50 XP</span>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="text-xs font-medium text-slate-200">Run a SQL Query</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">+50 XP</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-xs text-slate-500">•</div>
                  <span className="text-xs font-medium text-slate-300">Complete 1 Quiz Assessment</span>
                </div>
                <button
                  onClick={() => onNavigate('quizzes.html')}
                  className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Streak Shield: Active</span>
            <button
              onClick={() => onNavigate('streak.html')}
              className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
            >
              Streak Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Recommended Practice Tracks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Recommended Practice Worlds</h3>
            <p className="text-xs text-slate-400">Step through beginner to advanced full-stack domains.</p>
          </div>
          <button
            onClick={() => onNavigate('practice.html')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            Explore all questions <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {worlds.slice(0, 4).map(world => (
            <div
              key={world.id}
              onClick={() => onNavigate('practice.html')}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 p-5 rounded-2xl transition group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  Tier {world.requiredLevel}
                </span>
                <span className="text-xs text-slate-400">{world.completedMissions}/{world.totalMissions} Quests</span>
              </div>
              <h4 className="font-bold text-white group-hover:text-indigo-400 transition">{world.title}</h4>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">{world.description}</p>
              <div className="w-full h-1.5 rounded-full bg-slate-800 mt-4 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${(world.completedMissions / world.totalMissions) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigate('roadmap.html')}
          className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl hover:border-purple-500/40 transition cursor-pointer flex items-center gap-3"
        >
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-white">Full Roadmap</h5>
            <p className="text-xs text-slate-400">View path nodes</p>
          </div>
        </div>

        <div
          onClick={() => onNavigate('quizzes.html')}
          className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl hover:border-cyan-500/40 transition cursor-pointer flex items-center gap-3"
        >
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-white">Quizzes</h5>
            <p className="text-xs text-slate-400">Test concepts</p>
          </div>
        </div>

        <div
          onClick={() => onNavigate('leaderboard.html')}
          className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl hover:border-amber-500/40 transition cursor-pointer flex items-center gap-3"
        >
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-white">Leaderboard</h5>
            <p className="text-xs text-slate-400">Rankings & podium</p>
          </div>
        </div>

        <div
          onClick={() => onNavigate('achievements.html')}
          className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl hover:border-rose-500/40 transition cursor-pointer flex items-center gap-3"
        >
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-white">Badges</h5>
            <p className="text-xs text-slate-400">Trophies & XP</p>
          </div>
        </div>
      </div>

    </div>
  );
};
