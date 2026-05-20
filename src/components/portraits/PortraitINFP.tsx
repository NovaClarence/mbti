interface PortraitProps { size?: number }

export default function PortraitINFP({ size = 200 }: PortraitProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="infpGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2d1b4e"/>
          <stop offset="100%" stopColor="#4a2c6e"/>
        </linearGradient>
        <linearGradient id="infpAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c4b5fd"/>
          <stop offset="100%" stopColor="#f9a8d4"/>
        </linearGradient>
        <radialGradient id="infpGlow" cx="0.5" cy="0.35" r="0.35">
          <stop offset="0%" stopColor="#f9a8d4" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#2d1b4e" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="200" height="200" rx="100" fill="url(#infpGrad)"/>
      <circle cx="100" cy="100" r="94" stroke="url(#infpAccent)" strokeWidth="2" fill="none"/>
      {/* Inner glow */}
      <circle cx="100" cy="75" r="55" fill="url(#infpGlow)"/>
      {/* Flower petals */}
      <ellipse cx="100" cy="48" rx="12" ry="20" fill="url(#infpAccent)" opacity="0.35" transform="rotate(0 100 48)"/>
      <ellipse cx="100" cy="48" rx="12" ry="20" fill="url(#infpAccent)" opacity="0.3" transform="rotate(72 100 48)"/>
      <ellipse cx="100" cy="48" rx="12" ry="20" fill="url(#infpAccent)" opacity="0.3" transform="rotate(144 100 48)"/>
      <ellipse cx="100" cy="48" rx="12" ry="20" fill="url(#infpAccent)" opacity="0.3" transform="rotate(216 100 48)"/>
      <ellipse cx="100" cy="48" rx="12" ry="20" fill="url(#infpAccent)" opacity="0.3" transform="rotate(288 100 48)"/>
      <circle cx="100" cy="48" r="8" fill="#f9a8d4" opacity="0.6"/>
      {/* Stem */}
      <line x1="100" y1="56" x2="100" y2="145" stroke="#c4b5fd" strokeWidth="2" opacity="0.35"/>
      {/* Cloud shapes */}
      <ellipse cx="55" cy="58" rx="20" ry="10" fill="#c4b5fd" opacity="0.15"/>
      <ellipse cx="145" cy="62" rx="18" ry="9" fill="#f9a8d4" opacity="0.12"/>
      <ellipse cx="68" cy="52" rx="14" ry="7" fill="#c4b5fd" opacity="0.1"/>
      {/* Eyes — dreamy/downcast */}
      <path d="M76 118 Q84 112 92 118" stroke="#fce7f3" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M108 118 Q116 112 124 118" stroke="#fce7f3" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Soft smile */}
      <path d="M90 132 Q100 140 110 132" stroke="#fce7f3" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
