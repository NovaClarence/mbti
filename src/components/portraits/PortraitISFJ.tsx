interface PortraitProps { size?: number }

export default function PortraitISFJ({ size = 200 }: PortraitProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="isfjGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2d2a3a"/>
          <stop offset="100%" stopColor="#4a3f50"/>
        </linearGradient>
        <linearGradient id="isfjAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e2b4bd"/>
          <stop offset="100%" stopColor="#d4a0a7"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="100" fill="url(#isfjGrad)"/>
      <circle cx="100" cy="100" r="94" stroke="url(#isfjAccent)" strokeWidth="2" fill="none"/>
      <circle cx="100" cy="100" r="86" stroke="url(#isfjAccent)" strokeWidth="0.5" fill="none" opacity="0.3"/>
      {/* Home shape — roof */}
      <path d="M100 48 L135 80 L65 80 Z" fill="url(#isfjAccent)" opacity="0.2"/>
      <path d="M100 52 L130 80 L70 80 Z" stroke="url(#isfjAccent)" strokeWidth="1.5" fill="none"/>
      {/* Home shape — walls */}
      <rect x="72" y="80" width="56" height="55" rx="2" fill="url(#isfjAccent)" opacity="0.15"/>
      <rect x="72" y="80" width="56" height="55" rx="2" stroke="url(#isfjAccent)" strokeWidth="1" fill="none"/>
      {/* Door */}
      <rect x="94" y="108" width="12" height="27" rx="3" fill="url(#isfjAccent)" opacity="0.3"/>
      <circle cx="104" cy="122" r="1" fill="#4a3f50"/>
      {/* Window */}
      <rect x="78" y="90" width="8" height="8" rx="1" fill="url(#isfjAccent)" opacity="0.25"/>
      <line x1="82" y1="90" x2="82" y2="98" stroke="url(#isfjAccent)" strokeWidth="0.5" opacity="0.5"/>
      <line x1="78" y1="94" x2="86" y2="94" stroke="url(#isfjAccent)" strokeWidth="0.5" opacity="0.5"/>
      {/* Chimney */}
      <rect x="118" y="48" width="6" height="18" rx="1" fill="url(#isfjAccent)" opacity="0.2"/>
      {/* Heart in center */}
      <path d="M100 75 Q94 65 88 70 Q82 75 88 82 L100 94 L112 82 Q118 75 112 70 Q106 65 100 75 Z" fill="url(#isfjAccent)" opacity="0.35"/>
      {/* Eyes — warm */}
      <circle cx="90" cy="100" r="2.5" fill="#fce4ec"/>
      <circle cx="110" cy="100" r="2.5" fill="#fce4ec"/>
      {/* Soft smile */}
      <path d="M94 108 Q100 114 106 108" stroke="#fce4ec" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
