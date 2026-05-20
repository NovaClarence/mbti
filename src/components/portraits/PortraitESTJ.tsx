interface PortraitProps { size?: number }

export default function PortraitESTJ({ size = 200 }: PortraitProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="estjGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e293b"/>
          <stop offset="100%" stopColor="#450a0a"/>
        </linearGradient>
        <linearGradient id="estjAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6"/>
          <stop offset="100%" stopColor="#dc2626"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="100" fill="url(#estjGrad)"/>
      <circle cx="100" cy="100" r="94" stroke="url(#estjAccent)" strokeWidth="2" fill="none"/>
      <circle cx="100" cy="100" r="86" stroke="url(#estjAccent)" strokeWidth="0.5" fill="none" opacity="0.3"/>
      {/* Building/pillar motif — outward structure */}
      <rect x="55" y="45" width="25" height="120" rx="3" fill="url(#estjAccent)" opacity="0.15"/>
      <rect x="120" y="45" width="25" height="120" rx="3" fill="url(#estjAccent)" opacity="0.15"/>
      <rect x="55" y="45" width="25" height="120" rx="3" stroke="url(#estjAccent)" strokeWidth="1.5" fill="none"/>
      <rect x="120" y="45" width="25" height="120" rx="3" stroke="url(#estjAccent)" strokeWidth="1.5" fill="none"/>
      {/* Pediment / top lintel */}
      <path d="M50 45 L100 22 L150 45" stroke="url(#estjAccent)" strokeWidth="2" fill="none"/>
      <path d="M50 45 L100 22 L150 45" fill="url(#estjAccent)" opacity="0.12"/>
      {/* Base */}
      <line x1="50" y1="165" x2="150" y2="165" stroke="url(#estjAccent)" strokeWidth="2.5"/>
      {/* Central gavel */}
      <rect x="96" y="130" width="8" height="30" rx="2" fill="url(#estjAccent)" opacity="0.5"/>
      <rect x="87" y="128" width="26" height="10" rx="3" fill="url(#estjAccent)" opacity="0.55"/>
      {/* Eyes — authoritative */}
      <rect x="82" y="85" width="10" height="5" rx="1" fill="#f8fafc"/>
      <rect x="108" y="85" width="10" height="5" rx="1" fill="#f8fafc"/>
      {/* Firm serious mouth */}
      <line x1="90" y1="105" x2="110" y2="105" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round"/>
      {/* Brow line */}
      <line x1="80" y1="82" x2="90" y2="84" stroke="url(#estjAccent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="120" y1="82" x2="110" y2="84" stroke="url(#estjAccent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
    </svg>
  );
}
