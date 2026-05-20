interface PortraitProps { size?: number }

export default function PortraitISTP({ size = 200 }: PortraitProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="istpGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e293b"/>
          <stop offset="100%" stopColor="#2d3a3a"/>
        </linearGradient>
        <linearGradient id="istpAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f97316"/>
          <stop offset="100%" stopColor="#d946ef"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="100" fill="url(#istpGrad)"/>
      <circle cx="100" cy="100" r="94" stroke="#475569" strokeWidth="2" fill="none"/>
      <circle cx="100" cy="100" r="86" stroke="#475569" strokeWidth="0.5" fill="none" opacity="0.3"/>
      {/* Wrench shape — handle */}
      <rect x="130" y="85" width="30" height="10" rx="2" fill="url(#istpAccent)" opacity="0.4" transform="rotate(30 145 90)"/>
      {/* Wrench head */}
      <path d="M90 50 L118 50 L125 57 L125 85 Q125 98 112 98 L90 98 L76 84 L76 57 L90 50 Z" fill="url(#istpAccent)" opacity="0.3"/>
      {/* Wrench head inner cutout */}
      <circle cx="96" cy="74" r="16" fill="#1e293b"/>
      <circle cx="96" cy="74" r="16" stroke="url(#istpAccent)" strokeWidth="1.5" fill="none" opacity="0.5"/>
      {/* Star/burst accent top right */}
      <path d="M150 38 L153 48 L163 48 L155 54 L158 64 L150 58 L142 64 L145 54 L137 48 L147 48 Z" fill="url(#istpAccent)" opacity="0.55"/>
      {/* Eyes — focused */}
      <path d="M78 115 L92 110" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round"/>
      <path d="M122 115 L108 110" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round"/>
      {/* Confident mouth */}
      <line x1="92" y1="128" x2="108" y2="128" stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Brow ridge */}
      <line x1="76" y1="105" x2="90" y2="108" stroke="url(#istpAccent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="124" y1="105" x2="110" y2="108" stroke="url(#istpAccent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}
