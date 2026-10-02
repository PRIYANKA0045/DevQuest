import React, { useState } from 'react';
import { Rocket, Flame, ChevronDown, UserPlus, LogOut, Check, ArrowRightLeft, Plus } from 'lucide-react';
import { BitmojiAvatar } from './BitmojiAvatar';
import { UserAccount, getSavedAccounts, loginOrRegisterWithEmail } from '../lib/authStore';

interface NavbarProps {
  activeNav: string;
  onNavigate: (view: string) => void;
  isLoggedIn: boolean;
  user: UserAccount;
  onSwitchAccount: (account: UserAccount) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeNav,
  onNavigate,
  isLoggedIn,
  user,
  onSwitchAccount,
  onLogout
}) => {
  const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);
  const [quickEmailInput, setQuickEmailInput] = useState<string>('');
  const savedAccounts = getSavedAccounts();

  const handleQuickEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickEmailInput.trim()) return;
    const account = loginOrRegisterWithEmail(quickEmailInput.trim());
    onSwitchAccount(account);
    setQuickEmailInput('');
    setShowAccountMenu(false);
  };

  return (
    <nav className="h-14 bg-[#0d111a] border-b border-[#1c2438] px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0 select-none">
      {/* Left: Brand matching Collage */}
      <div className="flex items-center gap-8">
        <button
          onClick={() => onNavigate('courses')}
          className="flex items-center gap-2.5 text-white font-bold text-base hover:opacity-90 transition cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-[#7c3aed] flex items-center justify-center text-white shadow-sm shadow-purple-600/40">
            <Rocket className="w-4 h-4 fill-white" />
          </div>
          <span className="tracking-tight text-lg font-bold">CodeQuest</span>
        </button>

        {/* Top Center Nav Links: Courses, Practice, Roadmap */}
        <div className="hidden sm:flex items-center gap-6 text-xs font-medium text-slate-400">
          <button
            onClick={() => onNavigate('courses')}
            className={`transition cursor-pointer ${
              activeNav === 'courses' ? 'text-white font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => onNavigate('practice')}
            className={`transition cursor-pointer ${
              activeNav === 'practice' || activeNav === 'challenge' ? 'text-white font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Practice
          </button>
          <button
            onClick={() => onNavigate('quizzes')}
            className={`transition cursor-pointer ${
              activeNav === 'quizzes' ? 'text-white font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Quizzes
          </button>
          <button
            onClick={() => onNavigate('roadmap')}
            className={`transition cursor-pointer ${
              activeNav === 'roadmap' ? 'text-white font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Roadmap
          </button>
        </div>
      </div>

      {/* Right Side: Streak & Bitmoji Profile with Multi-Email Account Switcher */}
      <div className="flex items-center gap-3">
        {isLoggedIn ? (
          <>
            {/* Streak flame indicator */}
            <button
              onClick={() => onNavigate('streak')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e1728] border border-orange-500/30 text-orange-400 text-xs font-semibold hover:bg-orange-500/20 transition cursor-pointer"
              title="Daily Streak"
            >
              <Flame className="w-3.5 h-3.5 fill-orange-400" />
              <span>{user.streakDays} days</span>
            </button>

            {/* Profile & Account Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="flex items-center gap-2 pl-2.5 pr-2 py-1 rounded-full bg-[#151c2c] border border-[#232f48] hover:border-purple-500/50 text-xs text-slate-200 transition cursor-pointer"
              >
                <span className="font-mono text-purple-300 font-bold hidden sm:inline">{user.xp.toLocaleString()} XP</span>
                <BitmojiAvatar
                  seed={user.avatarSeed || user.username}
                  alt={user.name}
                  className="w-6 h-6 border border-emerald-400"
                />
                <span className="font-medium text-white max-w-[80px] truncate hidden md:inline">
                  @{user.username}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Account Switcher Dropdown Menu */}
              {showAccountMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-[#121724] border border-[#232f48] rounded-2xl shadow-2xl p-3 z-50 text-xs space-y-3">
                  
                  {/* Current Active Account Header */}
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#1c2438]">
                    <BitmojiAvatar seed={user.avatarSeed || user.username} className="w-10 h-10 border-2 border-emerald-400 shadow-md shadow-emerald-500/20" />
                    <div className="overflow-hidden flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white truncate">{user.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">Active</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono truncate">{user.email}</div>
                      <div className="flex items-center gap-2 text-[10px] text-purple-300 mt-0.5">
                        <span className="font-semibold">{user.title}</span>
                        <span>•</span>
                        <span className="font-mono">{user.xp.toLocaleString()} XP</span>
                      </div>
                    </div>
                  </div>

                  {/* Switch Account Section */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 flex items-center justify-between">
                      <span>Switch to Another Developer:</span>
                      <span className="text-[9px] text-purple-400 font-normal">Instant re-render</span>
                    </span>

                    <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
                      {savedAccounts.map(acc => {
                        const isCurrent = acc.email.toLowerCase() === user.email.toLowerCase();

                        return (
                          <button
                            key={acc.id}
                            onClick={() => {
                              onSwitchAccount(acc);
                              setShowAccountMenu(false);
                            }}
                            className={`w-full flex items-center justify-between p-2 rounded-xl transition text-left cursor-pointer ${
                              isCurrent
                                ? 'bg-purple-950/50 border border-purple-500/40 text-purple-200'
                                : 'hover:bg-[#182030] text-slate-300 border border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              <BitmojiAvatar seed={acc.avatarSeed} className="w-6 h-6 border border-slate-700 shrink-0" />
                              <div className="overflow-hidden">
                                <div className="text-[11px] font-semibold text-white truncate flex items-center gap-1">
                                  <span>{acc.name}</span>
                                  <span className="text-[10px] text-slate-400 font-normal">@{acc.username}</span>
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono truncate">
                                  {acc.email} • {acc.xp} XP
                                </div>
                              </div>
                            </div>
                            {isCurrent ? (
                              <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                            ) : (
                              <ArrowRightLeft className="w-3 h-3 text-slate-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Sign In or Create Fresh User with Any Custom Email */}
                  <form onSubmit={handleQuickEmailSubmit} className="pt-2 border-t border-[#1c2438] space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block flex items-center justify-between">
                      <span>Create New Clean Slate User:</span>
                      <span className="text-[9px] text-emerald-400 font-semibold">Starts with 0 XP</span>
                    </span>
                    <div className="flex gap-1.5">
                      <input
                        type="email"
                        placeholder="e.g. newcomer@codequest.dev"
                        value={quickEmailInput}
                        onChange={e => setQuickEmailInput(e.target.value)}
                        className="flex-1 bg-[#0b0e14] border border-[#232f48] rounded-lg px-2.5 py-1 text-[11px] text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
                      />
                      <button
                        type="submit"
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition cursor-pointer shrink-0 flex items-center gap-1"
                        title="Create or switch to this email"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Create</span>
                      </button>
                    </div>
                  </form>

                  {/* Navigation Links */}
                  <div className="pt-2 border-t border-[#1c2438] space-y-1">
                    <button
                      onClick={() => {
                        setShowAccountMenu(false);
                        onNavigate('profile');
                      }}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#182030] transition text-left cursor-pointer"
                    >
                      <span>View Full Profile & Portfolio</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowAccountMenu(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-rose-300 hover:bg-rose-950/30 transition text-left cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>

                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => onNavigate('login')}
              className="px-4 py-1.5 rounded-lg bg-[#151c2c] border border-[#232f48] text-xs font-medium text-slate-200 hover:bg-[#1a2337] transition cursor-pointer"
            >
              Login
            </button>

            <button
              onClick={() => onNavigate('signup')}
              className="px-4 py-1.5 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-xs font-semibold text-white shadow-sm shadow-purple-600/30 transition cursor-pointer"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
