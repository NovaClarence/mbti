interface PortraitProps { size?: number }

export default function PortraitINTP({ size = 200 }: PortraitProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="intpGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a2a3a"/>
          <stop offset="100%" stopColor="#0f4c5c"/>
        </linearGradient>
        <linearGradient id="intpAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#48cae4"/>
          <stop offset="100%" stopColor="#0077b6"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="100" fill="url(#intpGrad)"/>
      <circle cx="100" cy="100" r="94" stroke="url(#intpAccent)" strokeWidth="2" fill="none"/>
      {/* Inner gear */}
      <circle cx="100" cy="100" r="45" stroke="url(#intpAccent)" strokeWidth="3" fill="none" opacity="0.5"/>
      <circle cx="100" cy="100" r="30" stroke="url(#intpAccent)" strokeWidth="1.5" fill="none" opacity="0.3"/>
      <circle cx="100" cy="100" r="6" fill="url(#intpAccent)" opacity="0.7"/>
      {/* Gear teeth */}
      <rect x="97" y="50" width="6" height="14" rx="1" fill="url(#intpAccent)" opacity="0.6"/>
      <rect x="97" y="136" width="6" height="14" rx="1" fill="url(#intpAccent)" opacity="0.6"/>
      <rect x="50" y="97" width="14" height="6" rx="1" fill="url(#intpAccent)" opacity="0.6"/>
      <rect x="136" y="97" width="14" height="6" rx="1" fill="url(#intpAccent)" opacity="0.6"/>
      <rect x="65" y="65" width="12" height="6" rx="1" fill="url(#intpAccent)" opacity="0.5" transform="rotate(45 71 68)"/>
      <rect x="123" y="65" width="12" height="6" rx="1" fill="url(#intpAccent)" opacity="0.5" transform="rotate(-45 129 68)"/>
      <rect x="65" y="129" width="12" height="6" rx="1" fill="url(#intpAccent)" opacity="0.5" transform="rotate(-45 71 132)"/>
      <rect x="123" y="129" width="12" height="6" rx="1" fill="url(#intpAccent)" opacity="0.5" transform="rotate(45 129 132)"/>
      {/* Eyes */}
      <line x1="78" y1="85" x2="92" y2="85" stroke="#e0f7fa" strokeWidth="2" strokeLinecap="round"/>
      <line x1="108" y1="85" x2="122" y2="85" stroke="#e0f7fa" strokeWidth="2" strokeLinecap="round"/>
      {/* Mouth — thoughtful */}
      <path d="M85 115 Q100 125 115 115" stroke="#e0f7fa" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Book on left */}
      <path d="M38 130 L38 165 L55 165 L55 130 Z" fill="url(#intpAccent)" opacity="0.25"/>
      <line x1="46" y1="130" x2="46" y2="165" stroke="#48cae4" strokeWidth="0.5" opacity="0.5"/>
    </svg>
  );
}
