import React, { useState, useEffect } from 'react';
import { Settings, Save, Check } from 'lucide-react';
import { UserAccount, saveAccount } from '../lib/authStore';

interface SettingsPageProps {
  user: UserAccount;
  onUpdateUser: (user: UserAccount) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ user, onUpdateUser }) => {
  const [name, setName] = useState<string>(user.name || '');
  const [username, setUsername] = useState<string>(user.username || '');
  const [email, setEmail] = useState<string>(user.email || '');
  const [title, setTitle] = useState<string>(user.title || '');
  const [avatarSeed, setAvatarSeed] = useState<string>(user.avatarSeed || user.username || '');
  const [preferredLang, setPreferredLang] = useState<string>('Python3');
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    setName(user.name);
    setUsername(user.username);
    setEmail(user.email);
    setTitle(user.title);
    setAvatarSeed(user.avatarSeed || user.username);
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser: UserAccount = {
      ...user,
      name,
      username,
      email,
      title,
      avatarSeed
    };
    saveAccount(updatedUser);
    onUpdateUser(updatedUser);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-sm font-bold text-white mb-0.5">Developer Settings</h2>
        <p className="text-xs text-slate-400">
          Manage profile preferences and account credentials for <span className="text-purple-300 font-semibold">@{user.username}</span>.
        </p>
      </div>

      <div className="bg-[#121724] border border-[#1c2438] rounded-2xl p-6 sm:p-8 shadow-xl">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#0b0e14] border border-[#1c2438] text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#0b0e14] border border-[#1c2438] text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Account Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#0b0e14] border border-[#1c2438] text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Developer Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#0b0e14] border border-[#1c2438] text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Bitmoji Avatar Seed</label>
              <input
                type="text"
                value={avatarSeed}
                onChange={(e) => setAvatarSeed(e.target.value)}
                placeholder="e.g. alex_warrior, sophie_dev"
                className="w-full px-3.5 py-2 rounded-xl bg-[#0b0e14] border border-[#1c2438] text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Default Coding Language</label>
              <select
                value={preferredLang}
                onChange={(e) => setPreferredLang(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0b0e14] border border-[#1c2438] text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              >
                <option value="Python3">Python3</option>
                <option value="JavaScript">JavaScript</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="SQL">SQL</option>
              </select>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between">
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-purple-600/30"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>

            {saved && (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Settings saved successfully!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
