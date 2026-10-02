import React, { useState } from 'react';
import { RocketIllustration } from '../components/RocketIllustration';
import { BitmojiAvatar } from '../components/BitmojiAvatar';
import { getSavedAccounts, loginOrRegisterWithEmail, UserAccount } from '../lib/authStore';

interface LoginPageProps {
  onLoginSuccess: (account: UserAccount) => void;
  onNavigateToSignup: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateToSignup
}) => {
  const savedAccounts = getSavedAccounts();
  const [email, setEmail] = useState<string>('alex.rivers@codequest.dev');
  const [password, setPassword] = useState<string>('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    const account = loginOrRegisterWithEmail(email);
    onLoginSuccess(account);
  };

  const handleSelectSavedAccount = (acc: UserAccount) => {
    setEmail(acc.email);
    const logged = loginOrRegisterWithEmail(acc.email);
    onLoginSuccess(logged);
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center p-6 bg-[#0b0e14]">
      <div className="w-full max-w-4xl bg-[#121724] border border-[#1c2438] rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Side: Rocket in Space matching Collage Screen 7 */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4">
          <RocketIllustration className="w-64 h-64 sm:w-80 sm:h-80" />
        </div>

        {/* Right Side: Login Form matching Collage Screen 7 */}
        <div className="w-full md:w-1/2 space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome Back!</h1>
            <p className="text-xs text-slate-400 mt-1">
              Login with any email to continue your coding journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter any email (e.g. you@example.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1c2438] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-300">Password</label>
                <span className="text-[11px] text-purple-400">
                  Any password works for dev login
                </span>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1c2438] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-xs shadow-md shadow-purple-600/30 transition cursor-pointer"
            >
              Login with this Email
            </button>
          </form>

          {/* Quick Select from Saved / Pre-configured Accounts */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-slate-400 block mb-2">
              Or 1-Click Switch Account:
            </span>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {savedAccounts.map(acc => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => handleSelectSavedAccount(acc)}
                  className="w-full flex items-center justify-between p-2 rounded-xl bg-[#0b0e14] border border-[#1c2438] hover:border-purple-500/40 transition text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <BitmojiAvatar seed={acc.avatarSeed} className="w-6 h-6 border border-[#232f48]" />
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-purple-300 transition">
                        {acc.name} <span className="text-[10px] text-slate-400 font-normal font-mono">(@{acc.username})</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">{acc.email}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono font-bold text-purple-400">{acc.xp} XP</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 pt-2 border-t border-[#1c2438]">
            Don't have an account?{' '}
            <button
              onClick={onNavigateToSignup}
              className="text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
            >
              Sign up
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
