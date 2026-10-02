import React from 'react';

export const RocketIllustration: React.FC<{ className?: string }> = ({ className = "w-72 h-72" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background stars glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-indigo-900/20 to-transparent rounded-3xl" />
      
      {/* Background Star Particles */}
      <div className="absolute top-6 left-10 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping" />
      <div className="absolute top-16 right-12 w-2 h-2 bg-purple-300 rounded-full opacity-80" />
      <div className="absolute bottom-20 left-8 w-1 h-1 bg-white rounded-full opacity-60" />
      <div className="absolute top-36 left-4 w-1.5 h-1.5 bg-indigo-300 rounded-full opacity-75" />
      <div className="absolute bottom-32 right-10 w-1 h-1 bg-yellow-200 rounded-full opacity-90" />
      <div className="absolute top-10 right-28 w-1 h-1 bg-white rounded-full opacity-80" />

      {/* SVG Rocket Illustration matching the collage */}
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-48 h-56 drop-shadow-[0_15px_30px_rgba(124,58,237,0.4)]"
      >
        {/* Exhaust Fire / Blast Plume */}
        <path
          d="M85 160C85 185 95 215 100 225C105 215 115 185 115 160H85Z"
          fill="url(#fireOuter)"
        />
        <path
          d="M92 160C92 178 98 198 100 205C102 198 108 178 108 160H92Z"
          fill="url(#fireInner)"
        />

        {/* Smoke Clouds at bottom */}
        <ellipse cx="65" cy="205" rx="20" ry="14" fill="#2d1b4e" opacity="0.6" />
        <ellipse cx="135" cy="205" rx="20" ry="14" fill="#2d1b4e" opacity="0.6" />
        <ellipse cx="100" cy="215" rx="30" ry="16" fill="#1e1035" opacity="0.8" />
        <ellipse cx="80" cy="225" rx="22" ry="12" fill="#170c2a" />
        <ellipse cx="120" cy="225" rx="22" ry="12" fill="#170c2a" />

        {/* Rocket Left Fin */}
        <path
          d="M72 135L48 162C48 162 60 166 75 158L72 135Z"
          fill="#5b21b6"
        />
        <path
          d="M70 136L52 160C56 162 65 163 74 156L70 136Z"
          fill="#7c3aed"
        />

        {/* Rocket Right Fin */}
        <path
          d="M128 135L152 162C152 162 140 166 125 158L128 135Z"
          fill="#4c1d95"
        />
        <path
          d="M130 136L148 160C144 162 135 163 126 156L130 136Z"
          fill="#6d28d9"
        />

        {/* Rocket Main Body */}
        <path
          d="M100 35C80 70 72 110 72 150H128C128 110 120 70 100 35Z"
          fill="url(#bodyGradient)"
        />

        {/* Rocket Nose Tip */}
        <path
          d="M100 35C93 48 88 62 86 75H114C112 62 107 48 100 35Z"
          fill="#4338ca"
        />

        {/* Rocket Porthole Window Outer Ring */}
        <circle cx="100" cy="100" r="16" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="3" />
        {/* Porthole Glass */}
        <circle cx="100" cy="100" r="12" fill="#38bdf8" />
        {/* Window Reflection */}
        <path
          d="M93 94C95 91 99 90 103 91C101 93 99 97 98 101C95 100 93 97 93 94Z"
          fill="#ffffff"
          opacity="0.7"
        />

        {/* Rocket Body Highlights */}
        <path
          d="M78 110C78 125 80 140 82 150H86C84 140 82 125 82 110H78Z"
          fill="#ffffff"
          opacity="0.25"
        />

        <defs>
          <linearGradient id="bodyGradient" x1="72" y1="35" x2="128" y2="150" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ede9fe" />
            <stop offset="0.6" stopColor="#c4b5fd" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="fireOuter" x1="100" y1="160" x2="100" y2="225" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f59e0b" />
            <stop offset="0.5" stopColor="#ef4444" />
            <stop offset="1" stopColor="#b91c1c" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fireInner" x1="100" y1="160" x2="100" y2="205" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fef08a" />
            <stop offset="0.6" stopColor="#f59e0b" />
            <stop offset="1" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
