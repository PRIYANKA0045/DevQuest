import React, { useState } from 'react';
import { Flame, Trophy, Calendar, ChevronLeft, ChevronRight, CheckCircle2, Zap } from 'lucide-react';
import { UserAccount, awardXPToUser, saveAccount } from '../lib/authStore';

interface StreakPageProps {
  user: UserAccount;
  onUpdateUser: (user: UserAccount) => void;
}

export const StreakPage: React.FC<StreakPageProps> = ({ user, onUpdateUser }) => {
  const [currentMonth] = useState<string>('July 2025');
  const [hasClaimedToday, setHasClaimedToday] = useState<boolean>(false);

  // Active days in current month strictly from user's real calendar history
  const activeDaysSet = new Set<number>(user.activeCalendarDays || []);

  const calendarDays = [
    { day: null },
    { day: 1, active: activeDaysSet.has(1) },
    { day: 2, active: activeDaysSet.has(2) },
    { day: 3, active: activeDaysSet.has(3) },
    { day: 4, active: activeDaysSet.has(4) },
    { day: 5, active: activeDaysSet.has(5) },
    { day: 6, active: activeDaysSet.has(6) },
    { day: 7, active: activeDaysSet.has(7) },
    { day: 8, active: activeDaysSet.has(8) },
    { day: 9, active: activeDaysSet.has(9) },
    { day: 10, active: activeDaysSet.has(10) },
    { day: 11, active: activeDaysSet.has(11) },
    { day: 12, active: activeDaysSet.has(12) },
    { day: 13, active: activeDaysSet.has(13) },
    { day: 14, active: activeDaysSet.has(14) },
    { day: 15, active: activeDaysSet.has(15) },
    { day: 16, active: activeDaysSet.has(16) },
    { day: 17, active: activeDaysSet.has(17) },
    { day: 18, active: activeDaysSet.has(18) },
    { day: 19, active: activeDaysSet.has(19) },
    { day: 20, active: activeDaysSet.has(20) },
    { day: 21, active: activeDaysSet.has(21) },
    { day: 22, active: activeDaysSet.has(22) },
    { day: 23, active: activeDaysSet.has(23) },
    { day: 24, active: activeDaysSet.has(24) },
    { day: 25, active: activeDaysSet.has(25) },
    { day: 26, active: activeDaysSet.has(26) },
    { day: 27, active: activeDaysSet.has(27) },
    { day: 28, active: activeDaysSet.has(28) },
    { day: 29, active: activeDaysSet.has(29) },
    { day: 30, active: activeDaysSet.has(30) },
    { day: 31, active: activeDaysSet.has(31) }
  ];

  const handleClaimStreak = () => {
    if (hasClaimedToday) return;
    const newStreak = user.streakDays + 1;
    const newLongest = Math.max(user.longestStreak || user.streakDays, newStreak);
    const updatedUser: UserAccount = {
      ...user,
      streakDays: newStreak,
      longestStreak: newLongest,
      xp: user.xp + 50,
      activeCalendarDays: Array.from(new Set([...(user.activeCalendarDays || []), 20]))
    };
    saveAccount(updatedUser);
    onUpdateUser(updatedUser);
    setHasClaimedToday(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header matching Collage Screen 3 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white mb-0.5">Activity Streak</h2>
          <p className="text-xs text-slate-400">
            Keep your coding momentum alive every single day, <span className="text-purple-300 font-semibold">@{user.username}</span>.
          </p>
        </div>

        <button
          onClick={handleClaimStreak}
          disabled={hasClaimedToday}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
            hasClaimedToday
              ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 cursor-default'
              : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-lg shadow-orange-600/30'
          }`}
        >
          {hasClaimedToday ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Today's Streak Claimed (+50 XP)</span>
            </>
          ) : (
            <>
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>Claim Today (+1 Day & 50 XP)</span>
            </>
          )}
        </button>
      </div>

      {/* Top Row: Current Streak Card (Left) + July 2025 Calendar Card (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Card: Current Streak */}
        <div className="md:col-span-1 bg-[#121724] border border-[#1c2438] rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <span className="text-xs text-slate-400 font-medium">Current Streak</span>
            <div className="text-4xl font-extrabold text-white mt-4 flex items-baseline gap-2">
              {user.streakDays} <span className="text-lg font-normal text-slate-400">days</span>
            </div>
            <div className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
              <span>Keep it up, {user.name}!</span>
              <span className="text-base">🔥</span>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Flame className="w-10 h-10 text-orange-400 fill-orange-400/80 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Right Card: July 2025 Calendar */}
        <div className="md:col-span-2 bg-[#121724] border border-[#1c2438] rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-white">{currentMonth}</span>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded bg-[#182030] text-slate-400 hover:text-white">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 rounded bg-[#182030] text-slate-400 hover:text-white">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Days Header: Mon Tue Wed Thu Fri Sat Sun */}
          <div className="grid grid-cols-7 gap-2 text-center text-[11px] text-slate-400 mb-2 font-medium">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2 text-center">
            {calendarDays.map((item, idx) => {
              if (item.day === null) {
                return <div key={idx} className="h-7 w-7" />;
              }

              return (
                <div key={idx} className="flex justify-center">
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                      item.active
                        ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/40 font-bold'
                        : 'text-slate-400 hover:bg-[#182030]'
                    }`}
                  >
                    {item.day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Middle Row: Longest Streak (Left) + Total Active Days (Right) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Longest Streak */}
        <div className="bg-[#121724] border border-[#1c2438] rounded-2xl p-5 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Longest Streak</span>
            <div className="text-2xl font-bold text-white mt-0.5">{user.longestStreak ?? 0} days</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Personal Record</div>
          </div>
        </div>

        {/* Total Active Days */}
        <div className="bg-[#121724] border border-[#1c2438] rounded-2xl p-5 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Total Active Days</span>
            <div className="text-2xl font-bold text-white mt-0.5">
              {user.activeCalendarDays?.length ?? (user.streakDays > 0 ? user.streakDays : 0)} days
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Keep coding every day!</div>
          </div>
        </div>

      </div>

      {/* Bottom Row: Streak History (Contribution Heatmap) */}
      <div className="bg-[#121724] border border-[#1c2438] rounded-2xl p-6 shadow-xl space-y-4">
        <h4 className="text-xs font-bold text-white">Streak History</h4>

        {/* Months Label */}
        <div className="flex justify-between text-[11px] text-slate-500 font-mono px-8 max-w-3xl">
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
        </div>

        {/* Heatmap Matrix with Mon / Wed / Fri labels */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <div className="flex flex-col justify-between text-[10px] text-slate-500 font-mono py-1 pr-1">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          <div className="flex gap-1.5 min-w-[650px]">
            {Array.from({ length: 26 }).map((_, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-1.5">
                {Array.from({ length: 7 }).map((_, rowIdx) => {
                  const hasStreak = (user.streakDays || 0) > 0;
                  const activeCols = Math.ceil((user.streakDays || 0) / 2);
                  const isRecent = hasStreak && colIdx >= 26 - activeCols;
                  
                  // For a brand new user with 0 streak and no active days, all squares are 0 (empty)
                  let intensity: number = 0;
                  if (isRecent) {
                    intensity = 3;
                  } else if (hasStreak && (colIdx + rowIdx) % 4 === 0 && colIdx >= 26 - activeCols - 4) {
                    intensity = 2;
                  }

                  return (
                    <div
                      key={rowIdx}
                      className={`w-3.5 h-3.5 rounded-sm transition cursor-pointer ${
                        intensity === 0 ? 'bg-[#182030]' :
                        intensity === 1 ? 'bg-emerald-950 border border-emerald-900' :
                        intensity === 2 ? 'bg-emerald-700' :
                        'bg-emerald-500'
                      }`}
                      title={intensity > 0 ? `Activity recorded` : `No activity`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap Legend */}
        <div className="flex items-center justify-end gap-1.5 text-[10px] text-slate-500 font-mono pt-2">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-[#182030]" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-950" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-700" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
