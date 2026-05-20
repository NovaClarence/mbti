interface PortraitProps { size?: number }

export default function PortraitINTJ({ size = 200 }: PortraitProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="intjGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1a2e"/>
          <stop offset="100%" stopColor="#16213e"/>
        </linearGradient>
        <linearGradient id="intjAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#667eea"/>
          <stop offset="100%" stopColor="#764ba2"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="100" fill="url(#intjGrad)"/>
      <circle cx="100" cy="100" r="94" stroke="url(#intjAccent)" strokeWidth="2" fill="none"/>
      <circle cx="100" cy="100" r="86" stroke="url(#intjAccent)" strokeWidth="0.5" fill="none" opacity="0.3"/>
      <path d="M100 50 L130 80 L125 150 L75 150 L70 80 Z" fill="url(#intjAccent)" opacity="0.3"/>
      <line x1="82" y1="95" x2="92" y2="95" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <line x1="108" y1="95" x2="118" y2="95" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <line x1="88" y1="120" x2="112" y2="120" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="92" y="38" width="16" height="10" rx="3" fill="url(#intjAccent)" opacity="0.7"/>
    </svg>
  );
}
