interface PortraitProps { size?: number }

export default function PortraitESTP({ size = 200 }: PortraitProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="estpGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7f1d1d"/>
          <stop offset="100%" stopColor="#9a3412"/>
        </linearGradient>
        <linearGradient id="estpAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ef4444"/>
          <stop offset="100%" stopColor="#f97316"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="100" fill="url(#estpGrad)"/>
      <circle cx="100" cy="100" r="94" stroke="url(#estpAccent)" strokeWidth="2" fill="none"/>
      <circle cx="100" cy="100" r="86" stroke="url(#estpAccent)" strokeWidth="0.5" fill="none" opacity="0.3"/>
      {/* Dynamic flame shape — large, outward */}
      <path d="M100 25 Q130 55 135 85 Q140 120 120 135 Q100 150 80 135 Q60 120 65 85 Q70 55 100 25 Z" fill="url(#estpAccent)" opacity="0.3"/>
      {/* Inner flame */}
      <path d="M100 40 Q120 65 122 85 Q124 110 110 120 Q100 130 90 120 Q76 110 78 85 Q80 65 100 40 Z" fill="url(#estpAccent)" opacity="0.2"/>
      {/* Core flame */}
      <path d="M100 55 Q112 75 112 88 Q112 102 104 107 Q96 102 88 88 Q88 75 100 55 Z" fill="#fbbf24" opacity="0.3"/>
      {/* Diagonal bolt accents — asymmetric */}
      <path d="M50 38 L58 30 L55 42 Z" fill="#f97316" opacity="0.5"/>
      <path d="M160 38 L152 30 L155 42 Z" fill="#f97316" opacity="0.5"/>
      <path d="M42 65 L50 57 L47 69 Z" fill="#f97316" opacity="0.35"/>
      <path d="M168 65 L160 57 L163 69 Z" fill="#f97316" opacity="0.35"/>
      {/* Eyes — bold confident */}
      <path d="M78 108 L92 102" stroke="#fef3c7" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M122 108 L108 102" stroke="#fef3c7" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Confident grin */}
      <path d="M88 122 Q100 134 112 122" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Flame tips above eyes */}
      <path d="M88 92 L92 82" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M112 92 L108 82" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}
