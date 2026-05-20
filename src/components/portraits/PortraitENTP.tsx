interface PortraitProps { size?: number }

export default function PortraitENTP({ size = 200 }: PortraitProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="entpGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#78350f"/>
          <stop offset="100%" stopColor="#1e3a5f"/>
        </linearGradient>
        <linearGradient id="entpAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb923c"/>
          <stop offset="100%" stopColor="#2dd4bf"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="100" fill="url(#entpGrad)"/>
      <circle cx="100" cy="100" r="94" stroke="url(#entpAccent)" strokeWidth="2" fill="none"/>
      <circle cx="100" cy="100" r="86" stroke="url(#entpAccent)" strokeWidth="0.5" fill="none" opacity="0.3"/>
      {/* Lightning bolt — dynamic, outward */}
      <path d="M115 30 L95 75 L110 80 L85 125 L100 80 L85 75 Z" fill="url(#entpAccent)" opacity="0.5"/>
      {/* Chat bubble top right */}
      <path d="M130 35 Q130 25 140 25 L168 25 Q178 25 178 35 L178 50 Q178 60 168 60 L148 60 L140 70 L142 58 L140 60 Q130 60 130 50 Z" fill="url(#entpAccent)" opacity="0.2"/>
      <path d="M132 37 Q132 30 140 30 L166 30 Q173 30 173 37 L173 48 Q173 55 166 55 L148 55 L142 62 L143 54 L142 55 Q132 55 132 48 Z" stroke="url(#entpAccent)" strokeWidth="1.5" fill="none"/>
      {/* Dot-dot-dot in chat */}
      <circle cx="142" cy="42" r="2" fill="#2dd4bf" opacity="0.7"/>
      <circle cx="150" cy="42" r="2" fill="#2dd4bf" opacity="0.7"/>
      <circle cx="158" cy="42" r="2" fill="#2dd4bf" opacity="0.7"/>
      {/* Eyes — mischievous */}
      <path d="M78 115 Q86 108 94 115" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M122 115 Q114 108 106 115" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Grin */}
      <path d="M88 128 Q100 140 112 128" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Question mark */}
      <text x="62" y="62" fontFamily="serif" fontSize="24" fontWeight="bold" fill="url(#entpAccent)" opacity="0.4">?</text>
    </svg>
  );
}
