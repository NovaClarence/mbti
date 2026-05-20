interface PortraitProps { size?: number }

export default function PortraitENTJ({ size = 200 }: PortraitProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="entjGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7f1d1d"/>
          <stop offset="100%" stopColor="#991b1b"/>
        </linearGradient>
        <linearGradient id="entjAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b"/>
          <stop offset="100%" stopColor="#ef4444"/>
        </linearGradient>
        <radialGradient id="entjGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="200" height="200" rx="100" fill="url(#entjGrad)"/>
      <circle cx="100" cy="100" r="95" fill="url(#entjGlow)"/>
      <circle cx="100" cy="100" r="94" stroke="url(#entjAccent)" strokeWidth="2" fill="none"/>
      {/* Crown — outward facing */}
      <path d="M65 55 L75 30 L90 45 L100 25 L110 45 L125 30 L135 55 L145 50 L140 70 L60 70 Z" fill="url(#entjAccent)" opacity="0.35"/>
      <path d="M68 55 L78 35 L90 48 L100 30 L110 48 L122 35 L132 55" stroke="url(#entjAccent)" strokeWidth="2" fill="none"/>
      {/* Crown jewels */}
      <circle cx="100" cy="32" r="3" fill="#fbbf24" opacity="0.9"/>
      <circle cx="78" cy="38" r="2" fill="#fbbf24" opacity="0.7"/>
      <circle cx="122" cy="38" r="2" fill="#fbbf24" opacity="0.7"/>
      {/* Downward arrows — commanding */}
      <path d="M60 110 L50 140 L58 130 L60 140 L67 130 L68 140 L78 110" stroke="url(#entjAccent)" strokeWidth="2" fill="none" opacity="0.5"/>
      <path d="M140 110 L150 140 L142 130 L140 140 L133 130 L132 140 L122 110" stroke="url(#entjAccent)" strokeWidth="2" fill="none" opacity="0.5"/>
      {/* Eyes — sharp and commanding */}
      <polygon points="78,90 86,85 92,90 86,88" fill="#fef3c7"/>
      <polygon points="122,90 114,85 108,90 114,88" fill="#fef3c7"/>
      {/* Determined mouth */}
      <path d="M88 118 L100 112 L112 118" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Central pillar */}
      <line x1="100" y1="75" x2="100" y2="95" stroke="url(#entjAccent)" strokeWidth="2" opacity="0.5"/>
    </svg>
  );
}
