import React, { useState } from 'react';
import { RocketIllustration } from '../components/RocketIllustration';
import { loginOrRegisterWithEmail, UserAccount } from '../lib/authStore';

interface SignupPageProps {
  onSignupSuccess: (account: UserAccount) => void;
  onNavigateToLogin: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({
  onSignupSuccess,
  onNavigateToLogin
}) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    const account = loginOrRegisterWithEmail(email, username);
    onSignupSuccess(account);
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center p-6 bg-[#0b0e14]">
      <div className="w-full max-w-4xl bg-[#121724] border border-[#1c2438] rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Side: Rocket in Space matching Collage Screen 8 */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4">
          <RocketIllustration className="w-64 h-64 sm:w-80 sm:h-80" />
        </div>

        {/* Right Side: Create Account Form matching Collage Screen 8 */}
        <div className="w-full md:w-1/2 space-y-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold mb-2">
              ✨ Fresh Profile • 0 XP • Level 1 • 0 Solved
            </div>
            <h1 className="text-2xl font-bold text-white">Create New Account</h1>
            <p className="text-xs text-slate-400 mt-1">
              Start your fresh coding journey from Level 1 with zero pre-existing progress.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Username</label>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1c2438] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1c2438] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0e14] border border-[#1c2438] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-xs shadow-md shadow-purple-600/30 transition cursor-pointer mt-2"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 pt-2 border-t border-[#1c2438]">
            Already have an account?{' '}
            <button
              onClick={onNavigateToLogin}
              className="text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
