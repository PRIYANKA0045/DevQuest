import React, { useState } from 'react';
import { BitmojiAvatar } from '../components/BitmojiAvatar';
import { UserAccount, getSavedAccounts, DEFAULT_ACCOUNTS } from '../lib/authStore';
import { Trophy, Check, ArrowRightLeft } from 'lucide-react';

interface LeaderboardPageProps {
  user: UserAccount;
  onSwitchAccount: (account: UserAccount) => void;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ user, onSwitchAccount }) => {
  const [topTab, setTopTab] = useState<'Global' | 'Friends' | 'Country' | 'Weekly'>('Global');
  const [subTab, setSubTab] = useState<'Experience' | 'Badges' | 'Problems Solved' | 'Achievements'>('Experience');

  const savedAccounts = getSavedAccounts();

  // Combine saved accounts with leaderboard ranking
  const rankingUsers = [
    {
      place: 1,
      id: 'acc_alex',
      email: 'alex.rivers@codequest.dev',
      badgeColor: 'text-amber-400',
      username: '@alex_dev',
      name: 'Alex Rivers',
      avatarSeed: 'alex_warrior',
      exp: '4,850 XP',
      badges: 15,
      solved: { easy: 52, medium: 25, hard: 10 }
    },
    {
      place: 2,
      id: 'acc_sophie',
      email: 'sophie.martin@codequest.dev',
      badgeColor: 'text-purple-400',
      username: '@sophie_code',
      name: 'Sophie Martin',
      avatarSeed: 'sophie_dev',
      exp: '1,660 XP',
      badges: 12,
      solved: { easy: 28, medium: 11, hard: 3 }
    },
    {
      place: 3,
      id: 'acc_ethan',
      email: 'ethan.vance@codequest.dev',
      badgeColor: 'text-sky-400',
      username: '@ethan_prog',
      name: 'Ethan Vance',
      avatarSeed: 'ethan_coder',
      exp: '1,035 XP',
      badges: 10,
      solved: { easy: 20, medium: 7, hard: 1 }
    },
    {
      place: 4,
      id: 'acc_john',
      email: 'john.builder@codequest.dev',
      badgeColor: 'text-slate-400',
      username: '@john_doe',
      name: 'John Builder',
      avatarSeed: 'john_builder',
      exp: '920 XP',
      badges: 8,
      solved: { easy: 16, medium: 7, hard: 1 }
    },
    {
      place: 5,
      id: 'acc_anna',
      email: 'anna.tech@codequest.dev',
      badgeColor: 'text-slate-400',
      username: '@coder_anna',
      name: 'Anna Tech',
      avatarSeed: 'anna_tech',
      exp: '860 XP',
      badges: 9,
      solved: { easy: 18, medium: 4, hard: 0 }
    }
  ];

  const handleSelectDeveloper = (emailOrId: string) => {
    const found = savedAccounts.find(
      a => a.email.toLowerCase() === emailOrId.toLowerCase() || a.id === emailOrId
    ) || DEFAULT_ACCOUNTS.find(
      a => a.email.toLowerCase() === emailOrId.toLowerCase() || a.id === emailOrId
    );

    if (found) {
      onSwitchAccount(found);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header & Filter Pills matching Collage Screen 2 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-white mb-1">Developer Leaderboard</h2>
          <p className="text-xs text-slate-400">
            Click on any developer in the podium or ranking table to switch to their account and play as them.
          </p>
        </div>
        
        <div className="flex gap-2">
          {(['Global', 'Friends', 'Country', 'Weekly'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setTopTab(tab)}
              className={`px-4 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                topTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#151c2c] text-slate-400 hover:text-white border border-[#232f48]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Podium Section with Cartoon Bitmoji Avatars matching collage */}
      <div className="flex justify-center items-end gap-3 sm:gap-6 pt-6 pb-2">
        
        {/* 2nd Place: Sophie (Bitmoji) */}
        <div
          onClick={() => handleSelectDeveloper('sophie.martin@codequest.dev')}
          className="flex flex-col items-center group cursor-pointer"
          title="Click to switch and play as Sophie"
        >
          <div className="relative mb-2 transition transform group-hover:-translate-y-1">
            <BitmojiAvatar
              seed="sophie_dev"
              alt="Sophie Bitmoji"
              className="w-14 h-14 border-2 border-purple-500 shadow-lg shadow-purple-500/20"
            />
            <span className="absolute -bottom-1 -right-1 text-sm bg-[#121724] rounded-full px-0.5">🇫🇷</span>
            {user.email.toLowerCase().includes('sophie') && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full shadow">
                YOU
              </span>
            )}
          </div>
          <div className="text-xs font-bold text-white group-hover:text-purple-300 transition">Sophie</div>
          <div className="text-[10px] text-slate-400 font-mono mb-2">1,660 XP</div>

          {/* 3D Podium Block 2 */}
          <div className="w-24 sm:w-28 h-28 bg-gradient-to-t from-[#201738] to-[#3b246a] border-t-2 border-purple-400 rounded-t-xl flex flex-col items-center justify-center shadow-lg relative group-hover:border-purple-300 transition">
            <span className="text-2xl font-black text-purple-200">2</span>
            <span className="text-[9px] text-purple-300 font-semibold mt-1">Switch</span>
          </div>
        </div>

        {/* 1st Place: Alex (Center, Tallest - Bitmoji with golden crown) */}
        <div
          onClick={() => handleSelectDeveloper('alex.rivers@codequest.dev')}
          className="flex flex-col items-center group cursor-pointer"
          title="Click to switch and play as Alex"
        >
          <div className="relative mb-2 transition transform group-hover:-translate-y-1">
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-r from-amber-400 to-yellow-300 shadow-xl shadow-amber-500/20">
              <BitmojiAvatar
                seed="alex_warrior"
                alt="Alex Bitmoji"
                className="w-full h-full border-2 border-[#121724]"
              />
            </div>
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg">👑</span>
            <span className="absolute -bottom-1 -right-1 text-xs">🛡️</span>
            {user.email.toLowerCase().includes('alex') && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full shadow">
                YOU
              </span>
            )}
          </div>
          <div className="text-xs font-bold text-amber-300 flex items-center gap-1 group-hover:text-amber-200 transition">Alex</div>
          <div className="text-[10px] text-slate-400 font-mono mb-2">4,850 XP</div>

          {/* 3D Podium Block 1 */}
          <div className="w-28 sm:w-32 h-36 bg-gradient-to-t from-[#36270e] to-[#785412] border-t-2 border-amber-400 rounded-t-xl flex flex-col items-center justify-center shadow-2xl relative group-hover:border-amber-300 transition">
            <span className="text-3xl font-black text-amber-200">1</span>
            <span className="text-[9px] text-amber-300 font-semibold mt-1">Switch</span>
          </div>
        </div>

        {/* 3rd Place: Ethan (Bitmoji) */}
        <div
          onClick={() => handleSelectDeveloper('ethan.vance@codequest.dev')}
          className="flex flex-col items-center group cursor-pointer"
          title="Click to switch and play as Ethan"
        >
          <div className="relative mb-2 transition transform group-hover:-translate-y-1">
            <BitmojiAvatar
              seed="ethan_coder"
              alt="Ethan Bitmoji"
              className="w-14 h-14 border-2 border-sky-500 shadow-lg shadow-sky-500/20"
            />
            <span className="absolute -bottom-1 -right-1 text-sm bg-[#121724] rounded-full px-0.5">🇨🇦</span>
            {user.email.toLowerCase().includes('ethan') && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full shadow">
                YOU
              </span>
            )}
          </div>
          <div className="text-xs font-bold text-white group-hover:text-sky-300 transition">Ethan</div>
          <div className="text-[10px] text-slate-400 font-mono mb-2">1,035 XP</div>

          {/* 3D Podium Block 3 */}
          <div className="w-24 sm:w-28 h-24 bg-gradient-to-t from-[#152a3d] to-[#1f4868] border-t-2 border-sky-400 rounded-t-xl flex flex-col items-center justify-center shadow-lg relative group-hover:border-sky-300 transition">
            <span className="text-2xl font-black text-sky-200">3</span>
            <span className="text-[9px] text-sky-300 font-semibold mt-1">Switch</span>
          </div>
        </div>

      </div>

      {/* Filter Tabs matching collage: Experience, Badges, Problems Solved, Achievements */}
      <div className="flex gap-4 border-b border-[#1c2438] pb-2 text-xs font-medium text-slate-400">
        {(['Experience', 'Badges', 'Problems Solved', 'Achievements'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`pb-1 cursor-pointer transition ${
              subTab === tab
                ? 'text-white border-b-2 border-purple-500 font-bold'
                : 'hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Leaderboard Table with Bitmoji Avatars */}
      <div className="bg-[#121724] border border-[#1c2438] rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0e1320] text-slate-400 font-medium border-b border-[#1c2438]">
            <tr>
              <th className="px-4 py-3 w-16">Rank</th>
              <th className="px-4 py-3">Developer</th>
              <th className="px-4 py-3">Experience</th>
              <th className="px-4 py-3">Badges</th>
              <th className="px-4 py-3">Problems Solved</th>
              <th className="px-4 py-3 text-right">Switch Account</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1c2438]">
            {rankingUsers.map(u => {
              const isCurrentUser =
                user.email.toLowerCase() === u.email.toLowerCase() ||
                user.username.toLowerCase() === u.username.replace('@', '').toLowerCase();

              return (
                <tr
                  key={u.username}
                  className={`hover:bg-[#182030]/60 transition ${isCurrentUser ? 'bg-purple-950/20' : ''}`}
                >
                  {/* Place Icon */}
                  <td className="px-4 py-3 font-bold font-mono">
                    <span className={`inline-flex items-center gap-1 ${u.badgeColor}`}>
                      {u.place === 1 ? '🥇' : u.place === 2 ? '🥈' : u.place === 3 ? '🥉' : ''} {u.place}
                    </span>
                  </td>

                  {/* Username with Bitmoji Avatar */}
                  <td className="px-4 py-3 font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <BitmojiAvatar seed={u.avatarSeed} alt={u.username} className="w-6 h-6 border border-[#232f48]" />
                      <span>{u.username}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({u.name})</span>
                      {isCurrentUser && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold ml-1">
                          Active (You)
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Experience */}
                  <td className="px-4 py-3 font-mono text-purple-300 font-bold">
                    {u.exp}
                  </td>

                  {/* Badges Count */}
                  <td className="px-4 py-3 font-mono text-slate-300">
                    {u.badges}
                  </td>

                  {/* Problems Solved Pills: Easy, Medium, Hard */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 font-mono text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Easy: {u.solved.easy}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Medium: {u.solved.medium}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Hard: {u.solved.hard}
                      </span>
                    </div>
                  </td>

                  {/* Switch to this Account button */}
                  <td className="px-4 py-3 text-right">
                    {isCurrentUser ? (
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center justify-end gap-1">
                        <Check className="w-3.5 h-3.5" /> Selected
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSelectDeveloper(u.email)}
                        className="px-3 py-1 rounded-lg bg-[#182030] hover:bg-purple-600 hover:text-white border border-[#232f48] text-[11px] text-slate-300 font-semibold transition cursor-pointer flex items-center gap-1.5 ml-auto"
                      >
                        <ArrowRightLeft className="w-3 h-3" />
                        <span>Switch</span>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}

            {/* If the active user is not in the top 5, render their real rank row at the bottom */}
            {(() => {
              const isInTop5 = rankingUsers.some(
                u => user.email.toLowerCase() === u.email.toLowerCase() ||
                     user.username.toLowerCase() === u.username.replace('@', '').toLowerCase()
              );

              if (isInTop5) return null;

              const solvedEasy = user.easySolved || 0;
              const solvedMedium = user.mediumSolved || 0;
              const solvedHard = user.hardSolved || 0;
              const userBadgesCount = (user.problemsSolved >= 1 ? 1 : 0) + (user.problemsSolved >= 50 ? 1 : 0) + (user.streakDays >= 7 ? 1 : 0);

              return (
                <>
                  <tr className="bg-[#0b0e14]/50">
                    <td colSpan={6} className="px-4 py-2 text-center text-[10px] text-slate-500 font-mono">
                      ••• Your Placement in Global Standings •••
                    </td>
                  </tr>
                  <tr className="bg-purple-950/30 border-t-2 border-purple-500/50">
                    {/* Place */}
                    <td className="px-4 py-3 font-bold font-mono text-purple-300">
                      #{user.globalRank || 1540}
                    </td>

                    {/* Username with Bitmoji */}
                    <td className="px-4 py-3 font-semibold text-white">
                      <div className="flex items-center gap-2">
                        <BitmojiAvatar seed={user.avatarSeed || user.username} alt={user.username} className="w-6 h-6 border border-purple-500" />
                        <span>@{user.username}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({user.name})</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold ml-1">
                          Active (You)
                        </span>
                      </div>
                    </td>

                    {/* Experience */}
                    <td className="px-4 py-3 font-mono text-purple-300 font-bold">
                      {user.xp.toLocaleString()} XP
                    </td>

                    {/* Badges */}
                    <td className="px-4 py-3 font-mono text-slate-300">
                      {userBadgesCount}
                    </td>

                    {/* Problems Solved Pills */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 font-mono text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Easy: {solvedEasy}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Medium: {solvedMedium}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          Hard: {solvedHard}
                        </span>
                      </div>
                    </td>

                    {/* Selected state */}
                    <td className="px-4 py-3 text-right">
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center justify-end gap-1">
                        <Check className="w-3.5 h-3.5" /> Selected
                      </span>
                    </td>
                  </tr>
                </>
              );
            })()}
          </tbody>
        </table>
      </div>
    </div>
  );
};
