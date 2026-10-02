import { getBitmojiAvatar } from './avatar';

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  username: string;
  title: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  streakDays: number;
  longestStreak: number;
  problemsSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  accuracy: number;
  globalRank: number;
  avatarSeed: string;
  solvedProblemIds: string[];
  activeCalendarDays: number[];
  quizzesCompleted: number;
  quizScore: number;
  languages: { name: string; percent: number; color: string }[];
  dailyMissionsCompleted?: string[];
  dailyChestClaimed?: boolean;
}

const STORAGE_KEY = 'codequest_saved_accounts_v2';
const ACTIVE_ACCOUNT_KEY = 'codequest_active_email_v2';

// Rich starter accounts representing different people with distinct levels, stats, and achievements
export const DEFAULT_ACCOUNTS: UserAccount[] = [
  {
    id: 'acc_alex',
    email: 'alex.rivers@codequest.dev',
    name: 'Alex Rivers',
    username: 'alex_dev',
    title: 'Level 4 Warrior',
    level: 4,
    xp: 4850,
    nextLevelXp: 5000,
    streakDays: 14,
    longestStreak: 21,
    problemsSolved: 87,
    easySolved: 52,
    mediumSolved: 25,
    hardSolved: 10,
    accuracy: 94.2,
    globalRank: 1,
    avatarSeed: 'alex_warrior',
    solvedProblemIds: [
      'score-string',
      'concatenation-array',
      'kids-candies',
      'two-sum',
      'valid-anagram',
      'reverse-linked-list',
      'defanging-ip',
      'binary-search'
    ],
    activeCalendarDays: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    quizzesCompleted: 12,
    quizScore: 92,
    languages: [
      { name: 'Python', percent: 68, color: '#a855f7' },
      { name: 'C++', percent: 18, color: '#38bdf8' },
      { name: 'JavaScript', percent: 14, color: '#eab308' }
    ]
  },
  {
    id: 'acc_sophie',
    email: 'sophie.martin@codequest.dev',
    name: 'Sophie Martin',
    username: 'sophie_code',
    title: 'Algorithm Specialist',
    level: 3,
    xp: 1660,
    nextLevelXp: 2500,
    streakDays: 9,
    longestStreak: 12,
    problemsSolved: 42,
    easySolved: 28,
    mediumSolved: 11,
    hardSolved: 3,
    accuracy: 88.5,
    globalRank: 2,
    avatarSeed: 'sophie_dev',
    solvedProblemIds: [
      'concatenation-array',
      'defanging-ip',
      'two-sum',
      'reverse-linked-list'
    ],
    activeCalendarDays: [11, 12, 13, 14, 15, 16, 17, 18, 19],
    quizzesCompleted: 6,
    quizScore: 84,
    languages: [
      { name: 'JavaScript / TS', percent: 75, color: '#eab308' },
      { name: 'Python', percent: 15, color: '#a855f7' },
      { name: 'Rust', percent: 10, color: '#f97316' }
    ]
  },
  {
    id: 'acc_ethan',
    email: 'ethan.vance@codequest.dev',
    name: 'Ethan Vance',
    username: 'ethan_prog',
    title: 'Data & SQL Engineer',
    level: 2,
    xp: 1035,
    nextLevelXp: 2000,
    streakDays: 5,
    longestStreak: 8,
    problemsSolved: 28,
    easySolved: 20,
    mediumSolved: 7,
    hardSolved: 1,
    accuracy: 81.3,
    globalRank: 3,
    avatarSeed: 'ethan_coder',
    solvedProblemIds: [
      'score-string',
      'binary-search',
      'kids-candies'
    ],
    activeCalendarDays: [15, 16, 17, 18, 19],
    quizzesCompleted: 4,
    quizScore: 78,
    languages: [
      { name: 'SQL & PostgreSQL', percent: 60, color: '#38bdf8' },
      { name: 'Python', percent: 30, color: '#a855f7' },
      { name: 'Java', percent: 10, color: '#ef4444' }
    ]
  },
  {
    id: 'acc_john',
    email: 'john.builder@codequest.dev',
    name: 'John Builder',
    username: 'john_doe',
    title: 'Full Stack Artisan',
    level: 2,
    xp: 920,
    nextLevelXp: 1800,
    streakDays: 3,
    longestStreak: 7,
    problemsSolved: 24,
    easySolved: 16,
    mediumSolved: 7,
    hardSolved: 1,
    accuracy: 83.0,
    globalRank: 4,
    avatarSeed: 'john_builder',
    solvedProblemIds: [
      'score-string',
      'valid-anagram'
    ],
    activeCalendarDays: [17, 18, 19],
    quizzesCompleted: 3,
    quizScore: 80,
    languages: [
      { name: 'Go', percent: 55, color: '#06b6d4' },
      { name: 'TypeScript', percent: 45, color: '#3b82f6' }
    ]
  },
  {
    id: 'acc_anna',
    email: 'anna.tech@codequest.dev',
    name: 'Anna Tech',
    username: 'coder_anna',
    title: 'Frontend Explorer',
    level: 2,
    xp: 860,
    nextLevelXp: 1500,
    streakDays: 4,
    longestStreak: 10,
    problemsSolved: 22,
    easySolved: 18,
    mediumSolved: 4,
    hardSolved: 0,
    accuracy: 89.2,
    globalRank: 5,
    avatarSeed: 'anna_tech',
    solvedProblemIds: [
      'concatenation-array',
      'kids-candies'
    ],
    activeCalendarDays: [16, 17, 18, 19],
    quizzesCompleted: 5,
    quizScore: 88,
    languages: [
      { name: 'React / JS', percent: 80, color: '#61dafb' },
      { name: 'CSS / Tailwind', percent: 20, color: '#38bdf8' }
    ]
  }
];

export function getSavedAccounts(): UserAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
      return DEFAULT_ACCOUNTS;
    }
    const accounts = JSON.parse(raw);
    return Array.isArray(accounts) && accounts.length > 0 ? accounts : DEFAULT_ACCOUNTS;
  } catch {
    return DEFAULT_ACCOUNTS;
  }
}

export function saveAccount(account: UserAccount) {
  const accounts = getSavedAccounts();
  const existingIdx = accounts.findIndex(a => a.email.toLowerCase() === account.email.toLowerCase() || a.id === account.id);
  if (existingIdx >= 0) {
    accounts[existingIdx] = account;
  } else {
    accounts.push(account);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

export function getActiveAccount(): UserAccount {
  const accounts = getSavedAccounts();
  try {
    const activeEmail = localStorage.getItem(ACTIVE_ACCOUNT_KEY);
    if (activeEmail) {
      const found = accounts.find(a => a.email.toLowerCase() === activeEmail.toLowerCase());
      if (found) return found;
    }
  } catch {
    // ignore
  }
  return accounts[0] || DEFAULT_ACCOUNTS[0];
}

export function setActiveAccountEmail(email: string) {
  localStorage.setItem(ACTIVE_ACCOUNT_KEY, email.toLowerCase());
}

export function awardXPToUser(user: UserAccount, xpToAdd: number): UserAccount {
  const updatedXp = user.xp + xpToAdd;
  let newLevel = user.level;
  let nextXp = user.nextLevelXp;
  
  if (updatedXp >= nextXp) {
    newLevel += 1;
    nextXp = Math.round(nextXp * 1.5);
  }

  const updatedUser: UserAccount = {
    ...user,
    xp: updatedXp,
    level: newLevel,
    nextLevelXp: nextXp
  };

  saveAccount(updatedUser);
  return updatedUser;
}

export function loginOrRegisterWithEmail(email: string, username?: string, name?: string): UserAccount {
  const cleanEmail = email.trim().toLowerCase();
  const accounts = getSavedAccounts();
  const found = accounts.find(a => a.email.toLowerCase() === cleanEmail);

  if (found) {
    setActiveAccountEmail(found.email);
    return found;
  }

  // Create new account for this new email - brand new user starts with zero progress
  const baseUsername = username || cleanEmail.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_');
  const baseName = name || baseUsername.replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const newAccount: UserAccount = {
    id: 'acc_' + Date.now(),
    email: cleanEmail,
    name: baseName,
    username: baseUsername,
    title: 'Novice Explorer',
    level: 1,
    xp: 0,
    nextLevelXp: 500,
    streakDays: 0,
    longestStreak: 0,
    problemsSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    accuracy: 0.0,
    globalRank: 1540 + Math.floor(Math.random() * 200),
    avatarSeed: baseUsername,
    solvedProblemIds: [],
    activeCalendarDays: [],
    quizzesCompleted: 0,
    quizScore: 0,
    languages: [],
    dailyMissionsCompleted: [],
    dailyChestClaimed: false
  };

  saveAccount(newAccount);
  setActiveAccountEmail(cleanEmail);
  return newAccount;
}
