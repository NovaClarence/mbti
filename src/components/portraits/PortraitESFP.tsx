interface PortraitProps { size?: number }

export default function PortraitESFP({ size = 200 }: PortraitProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="esfpGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#831843"/>
          <stop offset="100%" stopColor="#701a75"/>
        </linearGradient>
        <linearGradient id="esfpAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d946ef"/>
          <stop offset="100%" stopColor="#fbbf24"/>
        </linearGradient>
        <radialGradient id="esfpGlow" cx="0.5" cy="0.45" r="0.4">
          <stop offset="0%" stopColor="#d946ef" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#831843" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="200" height="200" rx="100" fill="url(#esfpGrad)"/>
      <circle cx="100" cy="100" r="94" stroke="url(#esfpAccent)" strokeWidth="2" fill="none"/>
      <circle cx="100" cy="100" r="86" stroke="url(#esfpAccent)" strokeWidth="0.5" fill="none" opacity="0.25"/>
      <circle cx="100" cy="90" r="52" fill="url(#esfpGlow)"/>
      {/* Music note — curvy and flamboyant */}
      <ellipse cx="68" cy="48" rx="8" ry="6" fill="url(#esfpAccent)" opacity="0.4" transform="rotate(-20 68 48)"/>
      <line x1="76" y1="48" x2="76" y2="30" stroke="url(#esfpAccent)" strokeWidth="2.5" opacity="0.5" strokeLinecap="round"/>
      <path d="M76 35 Q90 38 96 48" stroke="url(#esfpAccent)" strokeWidth="2.5" fill="none" opacity="0.4" strokeLinecap="round"/>
      <circle cx="96" cy="48" r="3" fill="url(#esfpAccent)" opacity="0.35"/>
      {/* Sparkles radiating outward */}
      <path d="M135 42 L138 34 L140 42 L148 44 L140 46 L138 54 L136 46 L128 44 Z" fill="#fbbf24" opacity="0.55"/>
      <path d="M55 145 L57 139 L59 145 L65 147 L59 149 L57 155 L55 149 L49 147 Z" fill="#d946ef" opacity="0.45"/>
      <path d="M150 130 L152 124 L154 130 L160 132 L154 134 L152 140 L150 134 L144 132 Z" fill="#d946ef" opacity="0.4"/>
      {/* Curvy organic decorative swirl */}
      <path d="M38 95 Q55 75 70 90 Q85 105 100 88 Q115 70 130 85 Q145 100 160 88" stroke="url(#esfpAccent)" strokeWidth="2.5" fill="none" opacity="0.35" strokeLinecap="round"/>
      {/* Eyes — big expressive */}
      <circle cx="86" cy="110" r="5.5" fill="#fce7f3"/>
      <circle cx="114" cy="110" r="5.5" fill="#fce7f3"/>
      <circle cx="87" cy="109" r="3" fill="#831843"/>
      <circle cx="115" cy="109" r="3" fill="#831843"/>
      {/* Eyelash wink left */}
      <path d="M81 105 Q86 102 91 105" stroke="#d946ef" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      {/* Playful smile */}
      <path d="M88 124 Q100 138 112 124" stroke="#fce7f3" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Confetti dots */}
      <circle cx="48" cy="82" r="2.5" fill="#fbbf24" opacity="0.55"/>
      <circle cx="155" cy="70" r="2" fill="#d946ef" opacity="0.5"/>
      <circle cx="120" cy="38" r="1.8" fill="#fbbf24" opacity="0.5"/>
    </svg>
  );
}
