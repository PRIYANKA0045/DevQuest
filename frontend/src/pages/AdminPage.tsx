import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { ShieldAlert, Server, Users, Award, Plus, Sparkles, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface AdminPageProps {
  onAwardXp: (amount: number, reason?: string) => void;
  onNavigate: (page: PageRoute) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onAwardXp, onNavigate }) => {
  const [stats, setStats] = useState<any>({
    totalUsers: 14820,
    activeToday: 3240,
    totalMissionsCompleted: 98450,
    averageXpPerUser: 4210,
    serverUptime: '99.98%',
    systemHealth: 'Healthy',
    geminiAiLatency: '420ms'
  });

  const [bonusAmount, setBonusAmount] = useState<number>(500);
  const [bonusReason, setBonusReason] = useState<string>('Faculty Demonstration Bonus');
  const [bonusSuccess, setBonusSuccess] = useState<boolean>(false);

  // New Mission form
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'HTML/CSS' | 'SQL' | 'DSA' | 'React'>('SQL');
  const [newDifficulty, setNewDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [newSummary, setNewSummary] = useState<string>('');
  const [createdNotice, setCreatedNotice] = useState<string | null>(null);

  const handleGrantXp = () => {
    onAwardXp(Number(bonusAmount), bonusReason);
    setBonusSuccess(true);
    setTimeout(() => setBonusSuccess(false), 3000);
  };

  const handleCreateMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    setCreatedNotice(`Mission "${newTitle}" created and broadcast to curriculum!`);
    setNewTitle('');
    setNewSummary('');
    setTimeout(() => setCreatedNotice(null), 4000);
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" /> Platform Administration
          </div>
          <h1 className="text-3xl font-extrabold text-white">Admin Control Panel</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage curriculum missions, monitor platform vitals, and simulate developer testing workflows.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          SYSTEM OPERATIONAL (99.98% UPTIME)
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Developers</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white">{stats.totalUsers.toLocaleString()}</div>
          <p className="text-xs text-slate-400 mt-2">{stats.activeToday} active today</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Missions Solved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">{stats.totalMissionsCompleted.toLocaleString()}</div>
          <p className="text-xs text-slate-400 mt-2">Across web, SQL & DSA</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gemini AI Latency</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-purple-400">{stats.geminiAiLatency}</div>
          <p className="text-xs text-slate-400 mt-2">DevBuddy Code Reviewer</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Server Status</span>
            <Server className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-black text-white">{stats.systemHealth}</div>
          <p className="text-xs text-slate-400 mt-2">Express Node backend active</p>
        </div>
      </div>

      {/* Admin Actions: Grant XP & Create Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Quick Bonus / XP Simulator */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <h3 className="font-bold text-white text-lg mb-2 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" /> Grant XP Bonus (Testing & Demo)
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Instantly grant XP to the active user session to test leveling, tier promotions, and badge unlocks.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">XP Amount</label>
              <input
                type="number"
                value={bonusAmount}
                onChange={(e) => setBonusAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Reason / Description</label>
              <input
                type="text"
                value={bonusReason}
                onChange={(e) => setBonusReason(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={handleGrantXp}
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-600/30 transition cursor-pointer"
            >
              <Award className="w-4 h-4" /> Grant +{bonusAmount} XP to User
            </button>

            {bonusSuccess && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Successfully added +{bonusAmount} XP to session user!
              </div>
            )}
          </div>
        </div>

        {/* Create Curriculum Mission Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <h3 className="font-bold text-white text-lg mb-2 flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-400" /> Deploy New Curriculum Mission
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Add a new coding challenge or SQL problem to the live CodeQuest practice arena.
          </p>

          <form onSubmit={handleCreateMission} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Challenge Title</label>
              <input
                type="text"
                placeholder="e.g. Building an Accessible Dark-Mode Toggle"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Track</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="HTML/CSS">HTML/CSS</option>
                  <option value="SQL">SQL Databases</option>
                  <option value="DSA">DSA Algorithms</option>
                  <option value="React">React Framework</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Difficulty</label>
                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Problem Summary</label>
              <textarea
                placeholder="Brief summary of requirements..."
                value={newSummary}
                onChange={(e) => setNewSummary(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 h-20 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Publish Challenge to Arena
            </button>

            {createdNotice && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {createdNotice}
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};
