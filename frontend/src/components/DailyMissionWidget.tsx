import React, { useState, useEffect } from 'react';
import {
  Target,
  Clock,
  Zap,
  Flame,
  CheckCircle2,
  ArrowRight,
  Trophy,
  Gift,
  ShieldCheck,
  Code2,
  Database,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { UserAccount, awardXPToUser, saveAccount } from '../lib/authStore';

interface DailyMissionWidgetProps {
  user: UserAccount;
  onSelectProblem: (problemId: string) => void;
  onNavigate?: (view: string) => void;
  onUpdateUser?: (user: UserAccount) => void;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'code' | 'sql' | 'quiz';
  targetId: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimitMinutes: number;
  xpReward: number;
  bonusReward: string;
}

const DAILY_MISSIONS: DailyMission[] = [
  {
    id: 'daily-problem-of-the-day',
    title: 'Problem of the Day: Concatenation of Array',
    description: 'Construct and return an array of twice the length by duplicating elements.',
    category: 'Arrays & Memory',
    type: 'code',
    targetId: 'concatenation-array',
    difficulty: 'Easy',
    timeLimitMinutes: 15,
    xpReward: 100,
    bonusReward: '+1 Daily Key'
  },
  {
    id: 'daily-sql-sprint',
    title: 'Speed Drill: SQL Customer Filtering',
    description: 'Filter customers residing in specific cities using SELECT and WHERE clauses.',
    category: 'SQL Databases',
    type: 'sql',
    targetId: 'sql-filtering',
    difficulty: 'Easy',
    timeLimitMinutes: 10,
    xpReward: 120,
    bonusReward: 'Database Crest'
  },
  {
    id: 'daily-quiz-blitz',
    title: 'Daily Blitz: DSA & Big-O Checkup',
    description: 'Answer 3 fast algorithmic time complexity & data structure questions.',
    category: 'DSA & Complexity',
    type: 'quiz',
    targetId: 'quizzes',
    difficulty: 'Medium',
    timeLimitMinutes: 5,
    xpReward: 80,
    bonusReward: 'Streak Shield'
  }
];

export const DailyMissionWidget: React.FC<DailyMissionWidgetProps> = ({
  user,
  onSelectProblem,
  onNavigate,
  onUpdateUser
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calculate live countdown until midnight
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);

      const diff = Math.max(0, endOfDay.getTime() - now.getTime());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute completed daily missions based on user's solvedProblemIds and dailyMissionsCompleted
  const completedMissionsSet = new Set<string>([
    ...(user.dailyMissionsCompleted || []),
    // If the user already solved the problem in their history, mark the corresponding mission as done!
    ...(user.solvedProblemIds?.includes('concatenation-array') ? ['daily-problem-of-the-day'] : []),
    ...(user.solvedProblemIds?.includes('sql-filtering') ? ['daily-sql-sprint'] : []),
    ...(user.quizzesCompleted && user.quizzesCompleted > 0 ? ['daily-quiz-blitz'] : [])
  ]);

  const completedCount = DAILY_MISSIONS.filter(m => completedMissionsSet.has(m.id)).length;
  const totalMissions = DAILY_MISSIONS.length;
  const isAllCompleted = completedCount === totalMissions;
  const isChestClaimed = user.dailyChestClaimed || false;

  const handleStartMission = (mission: DailyMission) => {
    if (mission.type === 'quiz') {
      if (onNavigate) onNavigate('quizzes');
      else window.location.hash = 'quizzes';
    } else {
      onSelectProblem(mission.targetId);
    }
  };

  const handleQuickCompleteMission = (mission: DailyMission, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentCompleted = new Set(user.dailyMissionsCompleted || []);
    currentCompleted.add(mission.id);

    const updatedSolved = new Set(user.solvedProblemIds || []);
    if (mission.type !== 'quiz') {
      updatedSolved.add(mission.targetId);
    }

    const updatedUser: UserAccount = {
      ...user,
      dailyMissionsCompleted: Array.from(currentCompleted),
      solvedProblemIds: Array.from(updatedSolved),
      problemsSolved: (user.problemsSolved || 0) + (updatedSolved.has(mission.targetId) ? 1 : 0),
      easySolved: (user.easySolved || 0) + 1,
      xp: user.xp + mission.xpReward
    };

    saveAccount(updatedUser);
    if (onUpdateUser) onUpdateUser(updatedUser);
  };

  const handleClaimChest = () => {
    if (!isAllCompleted || isChestClaimed) return;

    const updatedUser: UserAccount = {
      ...user,
      dailyChestClaimed: true,
      xp: user.xp + 200,
      streakDays: user.streakDays + 1
    };

    saveAccount(updatedUser);
    if (onUpdateUser) onUpdateUser(updatedUser);
  };

  return (
    <div className="bg-[#121724] border border-[#232f48] hover:border-purple-500/40 rounded-2xl p-5 shadow-2xl relative overflow-hidden transition-all duration-300">
      
      {/* Background ambient glow effect */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header Row: Title, Countdown Timer, Collapse Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10 pb-3 border-b border-[#1c2438]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30 shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-tight">Daily Missions & Time-Sensitive Quests</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center gap-1">
                <Flame className="w-3 h-3 fill-orange-400" />
                <span>2x XP Active</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Complete today's coding objectives before midnight to preserve your daily streak and earn bonus keys.
            </p>
          </div>
        </div>

        {/* Live Countdown & Collapse Toggle */}
        <div className="flex items-center gap-3">
          {/* Live countdown timer */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0b0e14] border border-[#232f48] shadow-inner font-mono text-xs text-purple-300">
            <Clock className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span className="text-[11px] text-slate-400">Resets in:</span>
            <span className="font-bold text-white tracking-wider">
              {String(timeRemaining.hours).padStart(2, '0')}h : {String(timeRemaining.minutes).padStart(2, '0')}m : {String(timeRemaining.seconds).padStart(2, '0')}s
            </span>
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#182030] transition cursor-pointer"
            title={isCollapsed ? 'Expand missions' : 'Collapse widget'}
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Content Area (when not collapsed) */}
      {!isCollapsed && (
        <div className="mt-4 space-y-4 relative z-10">
          
          {/* Progress Summary Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0b0e14]/70 border border-[#1c2438] rounded-xl p-3 text-xs">
            <div className="flex items-center gap-3 flex-1">
              <span className="font-bold text-slate-300 whitespace-nowrap">
                Today's Progress:
              </span>
              <div className="flex-1 max-w-md h-2 rounded-full bg-[#182030] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((completedCount / totalMissions) * 100)}%` }}
                />
              </div>
              <span className="font-mono text-purple-300 font-bold text-[11px]">
                {completedCount} / {totalMissions} Completed
              </span>
            </div>

            {/* Daily Chest Bonus Indicator */}
            <div className="flex items-center gap-2 shrink-0">
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold transition ${
                  isAllCompleted
                    ? isChestClaimed
                      ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-bounce cursor-pointer'
                    : 'bg-[#182030] text-slate-400 border border-[#232f48]'
                }`}
                onClick={handleClaimChest}
              >
                <Gift className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {isChestClaimed
                    ? 'Chest Claimed ✓ (+200 XP)'
                    : isAllCompleted
                    ? 'Claim Master Chest (+200 XP)'
                    : 'Reward Chest (3/3 to Unlock)'}
                </span>
              </div>
            </div>
          </div>

          {/* 3 Interactive Daily Mission Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {DAILY_MISSIONS.map(mission => {
              const isCompleted = completedMissionsSet.has(mission.id);

              return (
                <div
                  key={mission.id}
                  onClick={() => handleStartMission(mission)}
                  className={`rounded-xl p-4 border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                    isCompleted
                      ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-500/70 shadow-sm shadow-emerald-500/10'
                      : 'bg-[#0b0e14] border-[#1c2438] hover:border-purple-500/50 hover:bg-[#0e1320]'
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Top Tag & Time Limit */}
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="px-2 py-0.5 rounded-md bg-[#182030] text-slate-300 border border-[#232f48] font-mono text-[10px]">
                        {mission.category}
                      </span>
                      <span className="text-orange-400 font-mono text-[10px] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{mission.timeLimitMinutes}m limit</span>
                      </span>
                    </div>

                    {/* Mission Title */}
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition line-clamp-1">
                        {mission.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {mission.description}
                      </p>
                    </div>

                    {/* Reward Pill */}
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30 font-bold flex items-center gap-1">
                        <Zap className="w-3 h-3 fill-purple-400" />
                        <span>+{mission.xpReward} XP</span>
                      </span>
                      <span className="text-slate-400">
                        {mission.bonusReward}
                      </span>
                    </div>
                  </div>

                  {/* Action Button Row */}
                  <div className="pt-3 mt-3 border-t border-[#1c2438] flex items-center justify-between text-xs">
                    {isCompleted ? (
                      <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed (+{mission.xpReward} XP)</span>
                      </span>
                    ) : (
                      <span className="text-purple-400 group-hover:text-purple-300 font-semibold text-[11px] flex items-center gap-1">
                        <span>Start Challenge</span>
                        <ArrowRight className="w-3 h-3 transition transform group-hover:translate-x-1" />
                      </span>
                    )}

                    {!isCompleted && (
                      <button
                        onClick={(e) => handleQuickCompleteMission(mission, e)}
                        className="text-[10px] text-slate-500 hover:text-emerald-400 transition underline underline-offset-2 cursor-pointer"
                        title="Mark completed for testing"
                      >
                        Quick Check
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Gamification Streak Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                Completing all 3 daily missions guarantees streak preservation and +50 extra XP bonus!
              </span>
            </div>
            <div className="font-mono text-purple-300">
              Active Streak: <span className="font-bold text-orange-400">{user.streakDays} Days 🔥</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
