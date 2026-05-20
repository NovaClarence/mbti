interface PortraitProps { size?: number }

export default function PortraitENFP({ size = 200 }: PortraitProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="enfpGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#831843"/>
          <stop offset="100%" stopColor="#4a044e"/>
        </linearGradient>
        <linearGradient id="enfpAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f472b6"/>
          <stop offset="100%" stopColor="#facc15"/>
        </linearGradient>
        <radialGradient id="enfpBurst" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#f472b6" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#831843" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="200" height="200" rx="100" fill="url(#enfpGrad)"/>
      <circle cx="100" cy="100" r="95" fill="url(#enfpBurst)"/>
      <circle cx="100" cy="100" r="94" stroke="url(#enfpAccent)" strokeWidth="2" fill="none" opacity="0.8"/>
      {/* Rainbow arcs */}
      <path d="M30 160 Q100 100 170 160" stroke="#ef4444" strokeWidth="3" fill="none" opacity="0.4"/>
      <path d="M35 160 Q100 110 165 160" stroke="#facc15" strokeWidth="3" fill="none" opacity="0.4"/>
      <path d="M40 160 Q100 120 160 160" stroke="#22c55e" strokeWidth="3" fill="none" opacity="0.4"/>
      <path d="M45 160 Q100 130 155 160" stroke="#3b82f6" strokeWidth="3" fill="none" opacity="0.4"/>
      <path d="M50 160 Q100 140 150 160" stroke="#a855f7" strokeWidth="3" fill="none" opacity="0.4"/>
      {/* Big star — bouncy and energetic */}
      <path d="M100 30 L106 52 L128 52 L110 66 L117 88 L100 74 L83 88 L90 66 L72 52 L94 52 Z" fill="url(#enfpAccent)" opacity="0.5"/>
      {/* Small stars scattered */}
      <path d="M60 75 L62 83 L70 83 L63 88 L66 96 L60 91 L54 96 L57 88 L50 83 L58 83 Z" fill="#facc15" opacity="0.4"/>
      <path d="M140 75 L142 83 L150 83 L143 88 L146 96 L140 91 L134 96 L137 88 L130 83 L138 83 Z" fill="#f472b6" opacity="0.4"/>
      {/* Eyes — wide and excited */}
      <circle cx="86" cy="115" r="5" fill="#fce7f3"/>
      <circle cx="114" cy="115" r="5" fill="#fce7f3"/>
      <circle cx="87" cy="114" r="2.5" fill="#831843"/>
      <circle cx="115" cy="114" r="2.5" fill="#831843"/>
      {/* Big smile */}
      <path d="M86 130 Q100 148 114 130" stroke="#fce7f3" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Sparkle dots */}
      <circle cx="145" cy="45" r="2" fill="#facc15" opacity="0.8"/>
      <circle cx="160" cy="55" r="1.5" fill="#f472b6" opacity="0.7"/>
      <circle cx="42" cy="50" r="1.5" fill="#facc15" opacity="0.6"/>
    </svg>
  );
}
