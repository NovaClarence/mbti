import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import { typeProfiles } from '../data/typeProfiles';
import type { MBTIType, Dimension } from '../types';
import type { TypeReport } from '../data/typeReports';
import typeReports from '../data/typeReports';
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

  const report: TypeReport | undefined = typeReports[result.type as MBTIType];

  const handleRetake = () => {
    resetTest();
    navigate('/');
  };

  return (
    <div className="result-page">
      {/* ── Hero ── */}
      <section className="result-hero">
        <TypeBadge type={result.type} title={profile.title} />
        <ConfidenceTag level={result.reliability.confidence} />
      </section>

      {/* ── 概述 ── */}
      {report && (
        <section className="result-section animate-in">
          <h3>性格概述</h3>
          <p className="report-overview">{report.overview}</p>
        </section>
      )}

      {/* ── 四维度分布 ── */}
      <section className="result-section animate-in">
        <h3>四维度分布</h3>
        {(Object.entries(result.dimensions) as [Dimension, typeof result.dimensions['E/I']][]).map(
          ([dim, data]) => {
            const [left, right] = dimensionLabels[dim];
            return <DimensionBar key={dim} left={left} right={right} result={data} />;
          },
        )}
      </section>

      {/* ── 八维认知功能 ── */}
      <section className="result-section animate-in">
        <FunctionsRadarChart
          functions={result.functions}
          dominant={profile.dominantFunction}
          auxiliary={profile.auxiliaryFunction}
        />
      </section>

      {report && (
        <>
          {/* ── 核心特质 ── */}
          <section className="result-section animate-in">
            <h3>核心特质</h3>
            <div className="trait-tags">
              {profile.traits.map((trait) => (
                <span key={trait} className="trait-tag">{trait}</span>
              ))}
            </div>
          </section>

          {/* ── 天赋潜能 ── */}
          <section className="result-section animate-in">
            <h3>天赋潜能</h3>
            <div className="report-cards">
              {report.strengths.map((s, i) => (
                <div key={i} className="report-card card-strength">
                  <h4>{s.title}</h4>
                  <p>{s.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 性格短板 ── */}
          <section className="result-section animate-in">
            <h3>性格短板</h3>
            <div className="report-cards">
              {report.weaknesses.map((w, i) => (
                <div key={i} className="report-card card-weakness">
                  <h4>{w.title}</h4>
                  <p>{w.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 情绪特质 ── */}
          <section className="result-section animate-in">
            <h3>情绪特质</h3>
            <div className="report-card card-emotional">
              <p>{report.emotional}</p>
            </div>
          </section>

          {/* ── 职场发展 ── */}
          <section className="result-section animate-in">
            <h3>职场发展</h3>
            <div className="report-cards">
              {report.career.map((c, i) => (
                <div key={i} className="report-card card-career">
                  <h4>{c.title}</h4>
                  <p>{c.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 学业规划 ── */}
          <section className="result-section animate-in">
            <h3>学业规划</h3>
            <div className="report-cards">
              {report.academic.map((a, i) => (
                <div key={i} className="report-card card-academic">
                  <h4>{a.title}</h4>
                  <p>{a.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 情感社交 ── */}
          <section className="result-section animate-in">
            <h3>情感社交</h3>
            <div className="report-card card-relationships">
              <p>{report.relationships}</p>
            </div>
          </section>

          {/* ── 自我提升 ── */}
          <section className="result-section animate-in">
            <h3>自我提升</h3>
            <ul className="growth-list">
              {report.growth.map((g, i) => (
                <li key={i} className="growth-item">{g}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {/* ── Actions ── */}
      <section className="result-actions animate-in">
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
