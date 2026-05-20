import type { MBTIType } from '../types';
import type { TestResult } from '../types';
import { typeProfiles } from '../data/typeProfiles';
import CharacterPortrait from './CharacterPortrait';
import './ShareCard.css';

interface ShareCardProps {
  result: TestResult;
}

export default function ShareCard({ result }: ShareCardProps) {
  const profile = typeProfiles[result.type as MBTIType];
  if (!profile) return null;

  const dimStr = (Object.entries(result.dimensions) as [string, { direction: string; strength: number }][])
    .map(([, d]) => `${d.direction} ${d.strength}%`)
    .join('  ·  ');

  return (
    <div className="share-card" id="share-card">
      <div className="share-card-img">
        <CharacterPortrait type={result.type as MBTIType} size={180} />
      </div>
      <div className="share-card-body">
        <div className="share-type-row">
          <span className="share-type-badge">{result.type}</span>
          <span className="share-type-name">{profile.title}</span>
        </div>
        <div className="share-traits">
          {profile.traits.map((t) => (
            <span key={t} className="share-trait">{t}</span>
          ))}
        </div>
        <div className="share-dims">{dimStr}</div>
      </div>
      <div className="share-card-footer">
        <span className="share-site">MBTI 精准测试</span>
        <span className="share-cta">你也来测测看 →</span>
      </div>
    </div>
  );
}
