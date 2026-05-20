interface PortraitProps { size?: number }

export default function PortraitISTJ({ size = 200 }: PortraitProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="istjGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e293b"/>
          <stop offset="100%" stopColor="#334155"/>
        </linearGradient>
        <linearGradient id="istjAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#94a3b8"/>
          <stop offset="100%" stopColor="#64748b"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="100" fill="url(#istjGrad)"/>
      <circle cx="100" cy="100" r="94" stroke="url(#istjAccent)" strokeWidth="2" fill="none"/>
      <circle cx="100" cy="100" r="86" stroke="url(#istjAccent)" strokeWidth="0.5" fill="none" opacity="0.3"/>
      {/* Shield shape */}
      <path d="M100 42 L135 58 L135 110 Q135 150 100 168 Q65 150 65 110 L65 58 Z" fill="url(#istjAccent)" opacity="0.25"/>
      <path d="M100 48 L130 62 L130 110 Q130 146 100 162 Q70 146 70 110 L70 62 Z" stroke="url(#istjAccent)" strokeWidth="1.5" fill="none"/>
      {/* Vertical pillar */}
      <line x1="100" y1="65" x2="100" y2="140" stroke="url(#istjAccent)" strokeWidth="1.5" opacity="0.4"/>
      {/* Horizontal bars */}
      <line x1="82" y1="80" x2="118" y2="80" stroke="url(#istjAccent)" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
      <line x1="82" y1="95" x2="118" y2="95" stroke="url(#istjAccent)" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
      <line x1="85" y1="110" x2="115" y2="110" stroke="url(#istjAccent)" strokeWidth="1.5" opacity="0.3" strokeLinecap="round"/>
      {/* Eyes — steady and direct */}
      <rect x="78" y="90" width="8" height="4" rx="1" fill="#f1f5f9"/>
      <rect x="114" y="90" width="8" height="4" rx="1" fill="#f1f5f9"/>
      {/* Firm mouth */}
      <line x1="90" y1="115" x2="110" y2="115" stroke="#f1f5f9" strokeWidth="2" strokeLinecap="round"/>
      {/* Corner pillars */}
      <rect x="72" y="55" width="4" height="12" rx="1" fill="url(#istjAccent)" opacity="0.5"/>
      <rect x="124" y="55" width="4" height="12" rx="1" fill="url(#istjAccent)" opacity="0.5"/>
    </svg>
  );
}
