import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { CoursesPage } from './pages/CoursesPage';
import { ChallengePage } from './pages/ChallengePage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { StreakPage } from './pages/StreakPage';
import { ProfilePage } from './pages/ProfilePage';
import { AchievementsPage } from './pages/AchievementsPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { QuizzesPage } from './pages/QuizzesPage';
import { StatsPage } from './pages/StatsPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { getActiveAccount, setActiveAccountEmail, UserAccount } from './lib/authStore';

export default function App() {
  const [activeView, setActiveView] = useState<string>('courses');
  const [selectedProblemId, setSelectedProblemId] = useState<string>('concatenation-array');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [user, setUser] = useState<UserAccount>(getActiveAccount());

  // Sync with browser hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveView(hash);
      }
    };
    if (window.location.hash) {
      handleHash();
    }
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (view: string) => {
    setActiveView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProblem = (problemId: string) => {
    setSelectedProblemId(problemId);
    navigateTo('challenge');
  };

  const handleSwitchAccount = (account: UserAccount) => {
    setUser(account);
    setActiveAccountEmail(account.email);
  };

  const handleUpdateUser = (updatedAccount: UserAccount) => {
    setUser(updatedAccount);
  };

  const handleLoginSuccess = (account: UserAccount) => {
    setUser(account);
    setActiveAccountEmail(account.email);
    setIsLoggedIn(true);
    navigateTo('courses');
  };

  const isAuthPage = activeView === 'login' || activeView === 'signup';

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex flex-col font-sans selection:bg-purple-900/40 selection:text-purple-200">
      
      {/* Top Navbar matching the collage with Bitmoji and Account Switcher */}
      <Navbar
        key={user.id + '-navbar'}
        activeNav={activeView}
        onNavigate={navigateTo}
        isLoggedIn={isLoggedIn}
        user={user}
        onSwitchAccount={handleSwitchAccount}
        onLogout={() => {
          setIsLoggedIn(false);
          navigateTo('login');
        }}
      />

      {/* Main View Area */}
      {isAuthPage ? (
        <div className="flex-1 bg-[#0b0e14]">
          {activeView === 'login' ? (
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onNavigateToSignup={() => navigateTo('signup')}
            />
          ) : (
            <SignupPage
              onSignupSuccess={handleLoginSuccess}
              onNavigateToLogin={() => navigateTo('login')}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar ("Menu ←") matching the collage */}
          <Sidebar
            key={user.id + '-sidebar'}
            activeView={activeView}
            onNavigate={navigateTo}
            user={user}
            onSwitchAccount={handleSwitchAccount}
          />

          {/* Dynamic Content Pane matching exact collage views */}
          <main className="flex-1 overflow-y-auto bg-[#0b0e14] min-h-[calc(100vh-56px)]">
            {(activeView === 'courses' || activeView === 'practice') && (
              <CoursesPage
                key={user.id + '-courses'}
                onSelectProblem={handleSelectProblem}
                user={user}
                onNavigate={navigateTo}
                onUpdateUser={handleUpdateUser}
              />
            )}

            {activeView === 'challenge' && (
              <ChallengePage
                key={user.id + '-challenge-' + selectedProblemId}
                problemId={selectedProblemId}
                onNavigateBack={() => navigateTo('courses')}
              />
            )}

            {activeView === 'leaderboard' && (
              <LeaderboardPage
                key={user.id + '-leaderboard'}
                user={user}
                onSwitchAccount={handleSwitchAccount}
              />
            )}

            {activeView === 'streak' && (
              <StreakPage
                key={user.id + '-streak'}
                user={user}
                onUpdateUser={handleUpdateUser}
              />
            )}

            {activeView === 'profile' && (
              <ProfilePage
                key={user.id + '-profile'}
                user={user}
                onNavigateToAchievements={() => navigateTo('achievements')}
              />
            )}

            {activeView === 'achievements' && (
              <AchievementsPage key={user.id + '-achievements'} user={user} />
            )}

            {activeView === 'roadmap' && (
              <RoadmapPage
                key={user.id + '-roadmap'}
                user={user}
                onSelectStep={() => navigateTo('courses')}
              />
            )}

            {activeView === 'quizzes' && (
              <QuizzesPage
                key={user.id + '-quizzes'}
                user={user}
                onUpdateUser={handleUpdateUser}
              />
            )}

            {activeView === 'stats' && (
              <StatsPage
                key={user.id + '-stats'}
                user={user}
              />
            )}

            {activeView === 'settings' && (
              <SettingsPage
                key={user.id + '-settings'}
                user={user}
                onUpdateUser={handleUpdateUser}
              />
            )}
          </main>
        </div>
      )}

    </div>
  );
}
