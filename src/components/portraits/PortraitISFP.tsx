interface PortraitProps { size?: number }

export default function PortraitISFP({ size = 200 }: PortraitProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="isfpGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a2e1a"/>
          <stop offset="100%" stopColor="#2d3a2d"/>
        </linearGradient>
        <linearGradient id="isfpAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#86c440"/>
          <stop offset="100%" stopColor="#c4a882"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="100" fill="url(#isfpGrad)"/>
      <circle cx="100" cy="100" r="94" stroke="url(#isfpAccent)" strokeWidth="2" fill="none"/>
      <circle cx="100" cy="100" r="86" stroke="url(#isfpAccent)" strokeWidth="0.5" fill="none" opacity="0.25"/>
      {/* Organic leaf shapes */}
      <path d="M60 140 Q40 110 50 70 Q65 60 80 75 Q90 50 110 55 Q130 60 135 45 Q145 30 155 50 Q165 70 150 95 Q160 110 155 135 Q145 160 120 160 Q95 170 75 155 Q60 165 50 145 Z" fill="url(#isfpAccent)" opacity="0.18"/>
      {/* Leaf veins */}
      <path d="M95 55 Q100 90 90 120" stroke="#86c440" strokeWidth="1" fill="none" opacity="0.35"/>
      <path d="M95 80 Q75 85 65 100" stroke="#86c440" strokeWidth="0.7" fill="none" opacity="0.25"/>
      <path d="M95 80 Q115 90 120 105" stroke="#86c440" strokeWidth="0.7" fill="none" opacity="0.25"/>
      {/* Brush stroke accents */}
      <path d="M45 95 Q65 75 90 85 Q115 68 140 80 Q155 70 160 85" stroke="url(#isfpAccent)" strokeWidth="3" fill="none" opacity="0.35" strokeLinecap="round"/>
      {/* Eyes — gentle and observant */}
      <circle cx="88" cy="115" r="3.5" fill="#e8f5e9"/>
      <circle cx="112" cy="115" r="3.5" fill="#e8f5e9"/>
      <circle cx="89" cy="114" r="1.5" fill="#1a2e1a"/>
      <circle cx="113" cy="114" r="1.5" fill="#1a2e1a"/>
      {/* Soft smile */}
      <path d="M92 125 Q100 133 108 125" stroke="#e8f5e9" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Paint dot accent */}
      <circle cx="145" cy="55" r="5" fill="url(#isfpAccent)" opacity="0.4"/>
    </svg>
  );
}
