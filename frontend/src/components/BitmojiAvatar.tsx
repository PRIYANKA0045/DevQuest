import React, { useState } from 'react';
import { getBitmojiAvatar } from '../lib/avatar';

interface BitmojiAvatarProps {
  seed: string;
  alt?: string;
  className?: string;
}

export const BitmojiAvatar: React.FC<BitmojiAvatarProps> = ({
  seed,
  alt = 'Avatar',
  className = 'w-10 h-10'
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const avatarUrl = getBitmojiAvatar(seed);

  if (hasError) {
    // Crisp stylized vector cartoon bitmoji fallback
    const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const skinTones = ['#fbcfe8', '#fed7aa', '#fde047', '#fbcfe8', '#fed7aa'];
    const hairColors = ['#7c3aed', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#6366f1'];
    const skin = skinTones[hash % skinTones.length];
    const hair = hairColors[(hash * 3) % hairColors.length];

    return (
      <svg
        viewBox="0 0 100 100"
        className={`rounded-full shrink-0 select-none overflow-hidden ${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" fill="#1e1b4b" />
        {/* Hair Back */}
        <circle cx="50" cy="42" r="32" fill={hair} />
        {/* Face */}
        <circle cx="50" cy="50" r="26" fill={skin} />
        {/* Eyes */}
        <circle cx="41" cy="48" r="3.5" fill="#0f172a" />
        <circle cx="59" cy="48" r="3.5" fill="#0f172a" />
        <circle cx="42" cy="46.5" r="1" fill="#ffffff" />
        <circle cx="60" cy="46.5" r="1" fill="#ffffff" />
        {/* Smile */}
        <path d="M43 58 Q50 66 57 58" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Blush */}
        <circle cx="37" cy="54" r="3" fill="#f43f5e" opacity="0.4" />
        <circle cx="63" cy="54" r="3" fill="#f43f5e" opacity="0.4" />
        {/* Hair Front */}
        <path d="M26 36 Q50 20 74 36 Q60 28 50 30 Q40 28 26 36Z" fill={hair} />
        {/* Shirt / Hoodie */}
        <path d="M22 100 Q50 78 78 100 Z" fill="#6366f1" />
      </svg>
    );
  }

  return (
    <img
      src={avatarUrl}
      alt={alt}
      onError={() => setHasError(true)}
      className={`rounded-full object-cover shrink-0 select-none ${className}`}
      loading="lazy"
    />
  );
};
