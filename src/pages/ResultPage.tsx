import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import { typeProfiles } from '../data/typeProfiles';
import type { MBTIType, Dimension } from '../types';
import TypeBadge from '../components/TypeBadge';
import ConfidenceTag from '../components/ConfidenceTag';
import DimensionBar from '../components/DimensionBar';
import FunctionsRadarChart from '../components/RadarChart';
import './ResultPage.css';

const dimensionLabels: Record<Dimension, [string, string]> = {
  'E/I': ['E', 'I'],
  'S/N': ['S', 'N'],
  'T/F': ['T', 'F'],
  'J/P': ['J', 'P'],
};

export default function ResultPage() {
  const navigate = useNavigate();
  const result = useTestStore((s) => s.result);
  const resetTest = useTestStore((s) => s.resetTest);

  if (!result) {
    navigate('/', { replace: true });
    return null;
  }

  const profile = typeProfiles[result.type as MBTIType] ?? {
    type: result.type as MBTIType,
    title: '',
    traits: [],
    dominantFunction: 'Ni' as const,
    auxiliaryFunction: 'Te' as const,
  };

  const handleRetake = () => {
    resetTest();
    navigate('/');
  };

  return (
    <div className="result-page">
      <section className="result-hero">
        <TypeBadge type={result.type} title={profile.title} />
        <ConfidenceTag level={result.reliability.confidence} />
      </section>

      <section className="result-section">
        <h3>四维度分布</h3>
        {(Object.entries(result.dimensions) as [Dimension, typeof result.dimensions['E/I']][]).map(
          ([dim, data]) => {
            const [left, right] = dimensionLabels[dim];
            return (
              <DimensionBar key={dim} left={left} right={right} result={data} />
            );
          },
        )}
      </section>

      <section className="result-section">
        <FunctionsRadarChart
          functions={result.functions}
          dominant={profile.dominantFunction}
          auxiliary={profile.auxiliaryFunction}
        />
      </section>

      <section className="result-section">
        <h3>核心特质</h3>
        <div className="trait-tags">
          {profile.traits.map((trait) => (
            <span key={trait} className="trait-tag">{trait}</span>
          ))}
        </div>
      </section>

      <section className="result-actions">
        <button className="action-btn action-primary" onClick={() => navigate('/share')}>
          查看名片 &amp; 分享
        </button>
        <button className="action-btn action-secondary" onClick={handleRetake}>
          重新测试
        </button>
      </section>
    </div>
  );
}
