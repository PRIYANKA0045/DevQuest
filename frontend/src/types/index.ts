export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  role: 'developer' | 'admin';
  title: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  streakDays: number;
  streakFreezeRemaining: number;
  longestStreak: number;
  totalActiveDays: number;
  completedMissionsCount: number;
  solvedChallengesCount: number;
  rank: number;
  avatar: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  joinedDate: string;
  preferredLanguage: string;
  theme: 'dark' | 'light';
  editorFontSize: number;
  stats: {
    hoursSpent: number;
    accuracy: number;
    challengesAttempted: number;
    codeReviewScoreAvg: number;
    languageBreakdown: { language: string; percentage: number; color: string }[];
    recentActivity: { id: string; action: string; title: string; timestamp: string; xp: number }[];
    contributionGrid: { date: string; count: number; level: number }[];
  };
  unlockedBadges: string[];
}

export interface Mission {
  id: string;
  worldId: string;
  title: string;
  clientName: string;
  companyName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  category: 'HTML/CSS' | 'JavaScript' | 'SQL' | 'DSA' | 'React' | 'Node' | 'MongoDB';
  type: 'web' | 'sql' | 'dsa';
  xpReward: number;
  summary: string;
  story: string;
  estimatedMinutes: number;
  requirements: string[];
  objectives: { id: string; description: string; completed?: boolean }[];
  starterHtml?: string;
  starterCss?: string;
  starterJs?: string;
  starterSql?: string;
  expectedSqlResult?: any[];
  starterCode?: {
    javascript: string;
    python: string;
    cpp: string;
    java: string;
  };
  testCases?: {
    input: string;
    expectedOutput: string;
    isSecret?: boolean;
  }[];
  hints: string[];
  completed?: boolean;
}

export interface World {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  totalMissions: number;
  completedMissions: number;
  requiredLevel: number;
  badgeName: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  xpReward: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  username: string;
  avatar: string;
  title: string;
  xp: number;
  streakDays: number;
  league: 'Grandmaster' | 'Diamond' | 'Platinum' | 'Gold' | 'Silver';
  badgesCount: number;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Beginner' | 'Streak' | 'Mastery' | 'Speed' | 'Special';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  xpReward: number;
  unlockedAt?: string;
  progressCurrent?: number;
  progressTarget?: number;
}

export type PageRoute = 
  | 'index.html'
  | 'dashboard.html'
  | 'roadmap.html'
  | 'practice.html'
  | 'challenge.html'
  | 'lesson.html'
  | 'quizzes.html'
  | 'leaderboard.html'
  | 'streak.html'
  | 'achievements.html'
  | 'stats.html'
  | 'profile.html'
  | 'admin.html'
  | 'settings.html'
  | 'login.html'
  | 'signup.html';
