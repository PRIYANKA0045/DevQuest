import { UserProfile, World, Mission, LeaderboardEntry, QuizQuestion, AchievementBadge } from '../types';

export async function fetchUserProfile(): Promise<UserProfile> {
  const res = await fetch('/api/user');
  if (!res.ok) throw new Error('Failed to load user profile');
  return res.json();
}

export async function loginUser(email?: string, password?: string): Promise<{ success: boolean; user: UserProfile }> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function signupUser(data: any): Promise<{ success: boolean; user: UserProfile }> {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateUserSettings(settings: Partial<UserProfile>): Promise<{ success: boolean; user: UserProfile }> {
  const res = await fetch('/api/user/settings', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  });
  return res.json();
}

export async function fetchWorlds(): Promise<World[]> {
  const res = await fetch('/api/worlds');
  return res.json();
}

export async function fetchMissions(params?: { category?: string; difficulty?: string; search?: string }): Promise<Mission[]> {
  const query = new URLSearchParams(params as any).toString();
  const res = await fetch(`/api/missions?${query}`);
  return res.json();
}

export async function fetchMissionById(id: string): Promise<Mission> {
  const res = await fetch(`/api/missions/${id}`);
  return res.json();
}

export async function submitMission(missionId: string): Promise<any> {
  const res = await fetch(`/api/missions/${missionId}/submit`, {
    method: 'POST'
  });
  return res.json();
}

export async function runSqlQuery(query: string): Promise<any> {
  const res = await fetch('/api/sql/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  return res.json();
}

export async function runDsaCode(code: string, language: string, testCases: any[]): Promise<any> {
  const res = await fetch('/api/dsa/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, language, testCases })
  });
  return res.json();
}

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  const res = await fetch('/api/leaderboard');
  return res.json();
}

export async function fetchAchievements(): Promise<AchievementBadge[]> {
  const res = await fetch('/api/achievements');
  return res.json();
}

export async function fetchQuizzes(): Promise<QuizQuestion[]> {
  const res = await fetch('/api/quizzes');
  return res.json();
}

export async function claimDailyStreak(): Promise<any> {
  const res = await fetch('/api/streak/claim-daily', { method: 'POST' });
  return res.json();
}

export async function useStreakFreeze(): Promise<any> {
  const res = await fetch('/api/streak/use-freeze', { method: 'POST' });
  return res.json();
}

export async function awardXp(amount: number, reason?: string): Promise<UserProfile> {
  const res = await fetch('/api/user/add-xp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, reason })
  });
  return res.json();
}

export async function askAIMentor(prompt: string, contextCode?: string): Promise<{ text: string }> {
  const res = await fetch('/api/ai/mentor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, contextCode })
  });
  return res.json();
}

export async function reviewCodeAI(code: string, missionTitle: string, requirements: string[]): Promise<any> {
  const res = await fetch('/api/ai/review', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, missionTitle, requirements })
  });
  return res.json();
}

export async function generateMissionAI(techStack: string, difficulty: string, industry: string): Promise<any> {
  const res = await fetch('/api/ai/generate-mission', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ techStack, difficulty, industry })
  });
  return res.json();
}

export async function runMockInterviewAI(role: string, question?: string, answer?: string): Promise<any> {
  const res = await fetch('/api/ai/interview', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role, question, answer })
  });
  return res.json();
}
