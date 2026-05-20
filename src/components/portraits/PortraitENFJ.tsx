interface PortraitProps { size?: number }

export default function PortraitENFJ({ size = 200 }: PortraitProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="enfjGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c2d12"/>
          <stop offset="100%" stopColor="#9a3412"/>
        </linearGradient>
        <linearGradient id="enfjAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24"/>
          <stop offset="100%" stopColor="#f97316"/>
        </linearGradient>
        <radialGradient id="enfjSun" cx="0.5" cy="0.4" r="0.45">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#7c2d12" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="200" height="200" rx="100" fill="url(#enfjGrad)"/>
      <circle cx="100" cy="100" r="94" stroke="url(#enfjAccent)" strokeWidth="2" fill="none"/>
      <circle cx="100" cy="100" r="86" stroke="url(#enfjAccent)" strokeWidth="0.5" fill="none" opacity="0.3"/>
      {/* Radiant sun */}
      <circle cx="100" cy="72" r="45" fill="url(#enfjSun)"/>
      <circle cx="100" cy="72" r="18" fill="#fbbf24" opacity="0.5"/>
      <circle cx="100" cy="72" r="14" fill="#fef3c7" opacity="0.4"/>
      {/* Sun rays */}
      <line x1="100" y1="50" x2="100" y2="40" stroke="#fbbf24" strokeWidth="2" opacity="0.5" strokeLinecap="round"/>
      <line x1="118" y1="54" x2="125" y2="46" stroke="#fbbf24" strokeWidth="2" opacity="0.5" strokeLinecap="round"/>
      <line x1="130" y1="68" x2="140" y2="64" stroke="#fbbf24" strokeWidth="2" opacity="0.5" strokeLinecap="round"/>
      <line x1="82" y1="54" x2="75" y2="46" stroke="#fbbf24" strokeWidth="2" opacity="0.5" strokeLinecap="round"/>
      <line x1="70" y1="68" x2="60" y2="64" stroke="#fbbf24" strokeWidth="2" opacity="0.5" strokeLinecap="round"/>
      {/* Wings — flowing outward */}
      <path d="M55 100 Q25 75 35 55 Q45 45 60 60 Q55 80 70 100" fill="url(#enfjAccent)" opacity="0.2"/>
      <path d="M145 100 Q175 75 165 55 Q155 45 140 60 Q145 80 130 100" fill="url(#enfjAccent)" opacity="0.2"/>
      <path d="M58 100 Q35 80 42 62 Q48 52 58 65 Q55 82 65 100" stroke="url(#enfjAccent)" strokeWidth="1" fill="none" opacity="0.4"/>
      <path d="M142 100 Q165 80 158 62 Q152 52 142 65 Q145 82 135 100" stroke="url(#enfjAccent)" strokeWidth="1" fill="none" opacity="0.4"/>
      {/* Eyes — warm and caring */}
      <path d="M80 120 Q88 114 96 120" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M120 120 Q112 114 104 120" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Warm smile */}
      <path d="M88 132 Q100 145 112 132" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
