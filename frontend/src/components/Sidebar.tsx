import React, { useState } from 'react';
import {
  ArrowLeft,
  ListTodo,
  CheckSquare,
  BarChart2,
  Trophy,
  Award,
  Flame,
  Settings,
  ArrowRightLeft,
  Check
} from 'lucide-react';
import { BitmojiAvatar } from './BitmojiAvatar';
import { UserAccount, getSavedAccounts } from '../lib/authStore';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  user: UserAccount;
  onSwitchAccount?: (account: UserAccount) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, user, onSwitchAccount }) => {
  const [showQuickSwitch, setShowQuickSwitch] = useState<boolean>(false);
  const savedAccounts = getSavedAccounts();

  const menuItems = [
    { id: 'courses', label: 'Practice Problems', icon: ListTodo },
    { id: 'quizzes', label: 'Quizzes & Tests', icon: CheckSquare },
    { id: 'stats', label: 'Stats', icon: BarChart2 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'streak', label: 'Streak', icon: Flame },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-56 shrink-0 bg-[#0d111a] border-r border-[#1c2438] p-4 flex flex-col justify-between select-none relative">
      <div>
        {/* Menu header with back arrow as in the collage */}
        <div className="flex items-center gap-2 text-slate-300 font-bold text-sm mb-6 px-2">
          <span>Menu</span>
          <ArrowLeft className="w-4 h-4 text-slate-400" />
        </div>

        {/* Navigation list */}
        <div className="space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id || (item.id === 'courses' && activeView === 'practice');

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#1e1b38] text-purple-300 border border-purple-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#151c2c]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* User profile shortcut & quick account switch in sidebar footer */}
      <div className="pt-4 border-t border-[#1c2438] relative">
        <div className="flex items-center justify-between gap-1">
          <button
            onClick={() => onNavigate('profile')}
            className="flex-1 flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#151c2c] transition text-left cursor-pointer overflow-hidden"
          >
            <BitmojiAvatar
              seed={user.avatarSeed || user.username}
              className="w-7 h-7 border border-emerald-400 shrink-0"
            />
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-white truncate">@{user.username}</div>
              <div className="text-[10px] text-slate-400 truncate">{user.title}</div>
            </div>
          </button>

          {onSwitchAccount && (
            <button
              onClick={() => setShowQuickSwitch(!showQuickSwitch)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-purple-300 hover:bg-[#151c2c] transition cursor-pointer"
              title="Switch developer account"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick account switch popover */}
        {showQuickSwitch && onSwitchAccount && (
          <div className="absolute bottom-16 left-0 right-0 bg-[#121724] border border-[#232f48] rounded-xl p-2 shadow-2xl z-40 space-y-1 text-xs">
            <div className="text-[10px] font-bold text-slate-400 px-1 py-0.5 uppercase tracking-wider">
              Switch Account:
            </div>
            {savedAccounts.map(acc => (
              <button
                key={acc.id}
                onClick={() => {
                  onSwitchAccount(acc);
                  setShowQuickSwitch(false);
                }}
                className={`w-full flex items-center justify-between p-1.5 rounded-lg transition text-left cursor-pointer ${
                  acc.email === user.email ? 'bg-purple-950/60 text-purple-200' : 'hover:bg-[#182030] text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <BitmojiAvatar seed={acc.avatarSeed} className="w-5 h-5 shrink-0" />
                  <span className="truncate text-[11px]">{acc.name}</span>
                </div>
                {acc.email === user.email && <Check className="w-3 h-3 text-purple-400 shrink-0" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
