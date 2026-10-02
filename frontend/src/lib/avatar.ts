// Helper to generate consistent cartoon / bitmoji-style avatars for any username or email

export function getBitmojiAvatar(seed: string): string {
  const cleanSeed = encodeURIComponent(seed.trim().toLowerCase() || 'coder');
  // DiceBear Avataaars generates modern Bitmoji / Memoji style illustrated characters
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanSeed}&backgroundColor=1e1b4b,2e1065,0f172a,172554&radius=50`;
}

// Pre-defined Bitmoji seeds matching the characters in the collage
export const BITMOJI_SEEDS = {
  alex: 'AlexHero',      // Golden-crowned leader
  sophie: 'SophieDev',   // 2nd place
  ethan: 'EthanCoder',   // 3rd place
  john: 'JohnBuilder',   // 4th place
  anna: 'AnnaTech',      // 5th place
  defaultUser: 'CodeQuester'
};
