interface PortraitProps { size?: number }

export default function PortraitINFJ({ size = 200 }: PortraitProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="infjGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d3b4e"/>
          <stop offset="100%" stopColor="#1a2a4a"/>
        </linearGradient>
        <linearGradient id="infjAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7ec8e3"/>
          <stop offset="100%" stopColor="#b8a9d4"/>
        </linearGradient>
        <radialGradient id="infjMoon" cx="0.5" cy="0.4" r="0.4">
          <stop offset="0%" stopColor="#d4c5e9" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#0d3b4e" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="200" height="200" rx="100" fill="url(#infjGrad)"/>
      <circle cx="100" cy="100" r="94" stroke="url(#infjAccent)" strokeWidth="2" fill="none"/>
      {/* Moon glow */}
      <circle cx="100" cy="75" r="50" fill="url(#infjMoon)"/>
      <circle cx="100" cy="65" r="20" fill="#d4c5e9" opacity="0.35"/>
      {/* Flowing curves — mist/water */}
      <path d="M50 140 Q75 110 100 125 Q125 140 150 115" stroke="url(#infjAccent)" strokeWidth="2" fill="none" opacity="0.6"/>
      <path d="M40 155 Q70 130 100 145 Q130 160 160 140" stroke="url(#infjAccent)" strokeWidth="1.5" fill="none" opacity="0.4"/>
      <path d="M45 168 Q75 148 100 160 Q125 172 155 155" stroke="url(#infjAccent)" strokeWidth="1" fill="none" opacity="0.25"/>
      {/* Eyes — serene crescent */}
      <path d="M76 88 Q84 82 92 88" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M108 88 Q116 82 124 88" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Gentle smile */}
      <path d="M88 110 Q100 120 112 110" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Third eye / wisdom dot */}
      <circle cx="100" cy="80" r="2.5" fill="#d4c5e9" opacity="0.8"/>
      {/* Nebula wisps */}
      <ellipse cx="70" cy="60" rx="18" ry="6" fill="#7ec8e3" opacity="0.12" transform="rotate(-20 70 60)"/>
      <ellipse cx="135" cy="55" rx="15" ry="5" fill="#b8a9d4" opacity="0.12" transform="rotate(15 135 55)"/>
    </svg>
  );
}
