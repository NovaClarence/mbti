import type { MBTIType } from '../types';
import { portraitMap } from './portraits/portraits';

interface CharacterPortraitProps {
  type: MBTIType;
  size?: number;
}

export default function CharacterPortrait({ type, size = 200 }: CharacterPortraitProps) {
  const Portrait = portraitMap[type];
  if (!Portrait) return null;
  return (
    <div className="character-portrait" style={{ width: size, height: size }}>
      <Portrait size={size} />
    </div>
  );
}
