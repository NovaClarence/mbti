interface PortraitProps { size?: number }

export default function PortraitESFJ({ size = 200 }: PortraitProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="esfjGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7f1d1d"/>
          <stop offset="100%" stopColor="#9a3412"/>
        </linearGradient>
        <linearGradient id="esfjAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb923c"/>
          <stop offset="100%" stopColor="#fca5a5"/>
        </linearGradient>
        <radialGradient id="esfjWarm" cx="0.5" cy="0.45" r="0.4">
          <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="200" height="200" rx="100" fill="url(#esfjGrad)"/>
      <circle cx="100" cy="100" r="94" stroke="url(#esfjAccent)" strokeWidth="2" fill="none"/>
      <circle cx="100" cy="100" r="86" stroke="url(#esfjAccent)" strokeWidth="0.5" fill="none" opacity="0.3"/>
      <circle cx="100" cy="85" r="50" fill="url(#esfjWarm)"/>
      {/* Outstretched hands — welcoming */}
      <path d="M50 120 Q35 90 45 70 Q55 55 65 70 Q60 100 50 120" fill="url(#esfjAccent)" opacity="0.2"/>
      <path d="M150 120 Q165 90 155 70 Q145 55 135 70 Q140 100 150 120" fill="url(#esfjAccent)" opacity="0.2"/>
      <path d="M52 120 Q40 95 48 78 Q55 65 62 78 Q58 100 52 120" stroke="url(#esfjAccent)" strokeWidth="1.5" fill="none"/>
      <path d="M148 120 Q160 95 152 78 Q145 65 138 78 Q142 100 148 120" stroke="url(#esfjAccent)" strokeWidth="1.5" fill="none"/>
      {/* Smile face — warm and inviting */}
      {/* Eyes — crescent happy */}
      <path d="M80 90 Q86 82 92 90" stroke="#fef3c7" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M108 90 Q114 82 120 90" stroke="#fef3c7" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Rosy cheeks */}
      <circle cx="78" cy="100" r="5" fill="#fca5a5" opacity="0.3"/>
      <circle cx="122" cy="100" r="5" fill="#fca5a5" opacity="0.3"/>
      {/* Big warm smile */}
      <path d="M85 108 Q100 126 115 108" stroke="#fef3c7" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Heart top center */}
      <path d="M100 58 Q94 50 89 55 Q85 60 89 66 L100 75 L111 66 Q115 60 111 55 Q106 50 100 58 Z" fill="url(#esfjAccent)" opacity="0.4"/>
    </svg>
  );
}
