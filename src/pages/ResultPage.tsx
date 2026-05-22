import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import { typeProfiles } from '../data/typeProfiles';
import type { MBTIType, Dimension, TestResult } from '../types';
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

const tocItems = [
  { id: 'overview', label: '概述', emoji: '📖' },
  { id: 'dimensions', label: '维度', emoji: '📊' },
  { id: 'functions', label: '八维', emoji: '🎯' },
  { id: 'traits', label: '特质', emoji: '🏷' },
  { id: 'strengths', label: '天赋', emoji: '💪' },
  { id: 'weaknesses', label: '短板', emoji: '🔍' },
  { id: 'emotional', label: '情绪', emoji: '💜' },
  { id: 'career', label: '职场', emoji: '💼' },
  { id: 'academic', label: '学业', emoji: '📚' },
  { id: 'relationships', label: '情感', emoji: '💕' },
  { id: 'growth', label: '提升', emoji: '✨' },
];

function encodeShareData(result: TestResult): string {
  const data = {
    t: result.type,
    d: Object.fromEntries(
      Object.entries(result.dimensions).map(([k, v]) => [k, { s: v.score, d: v.direction, g: v.strength }])
    ),
    f: result.functions,
    r: { c: result.reliability.consistency, ap: result.reliability.attentionPassed, at: result.reliability.attentionTotal, cf: result.reliability.confidence },
  };
  return btoa(encodeURIComponent(JSON.stringify(data)));
}

function decodeShareData(encoded: string): TestResult | null {
  try {
    const json = decodeURIComponent(atob(encoded));
    const data = JSON.parse(json);
    const dims = {} as TestResult['dimensions'];
    for (const [k, v] of Object.entries(data.d as Record<string, { s: number; d: string; g: number }>)) {
      dims[k as Dimension] = { score: v.s, direction: v.d, strength: v.g };
    }
    return {
      type: data.t,
      dimensions: dims,
      functions: data.f,
      reliability: {
        consistency: data.r.c,
        attentionPassed: data.r.ap,
        attentionTotal: data.r.at,
        confidence: data.r.cf,
      },
    };
  } catch {
    return null;
  }
}

export default function ResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const storeResult = useTestStore((s) => s.result);
  const resetTest = useTestStore((s) => s.resetTest);

  // Support both store-based and URL-shared results
  const shared = searchParams.get('r');
  const result = storeResult ?? (shared ? decodeShareData(shared) : null);

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

  const handleCopyLink = async () => {
    const shareData = encodeShareData(result);
    const url = `${window.location.origin}/result?r=${shareData}`;
    try {
      await navigator.clipboard.writeText(url);
      alert('分享链接已复制到剪贴板！');
    } catch {
      alert('复制失败，请手动复制地址栏中的链接');
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="result-page">
      {/* ── Sticky TOC ── */}
      <nav className="result-toc">
        {tocItems.map((item) => (
          <button
            key={item.id}
            className="toc-item"
            onClick={() => scrollTo(item.id)}
            title={item.label}
          >
            <span className="toc-emoji">{item.emoji}</span>
            <span className="toc-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* ── Hero ── */}
      <section className="result-hero" id="hero">
        <TypeBadge type={result.type} title={profile.title} />
        <ConfidenceTag level={result.reliability.confidence} />
      </section>

      {/* ── 概述 ── */}
      {report && (
        <section className="result-section animate-in" id="overview">
          <h3>性格概述</h3>
          <p className="report-overview">{report.overview}</p>
        </section>
      )}

      {/* ── 四维度分布 ── */}
      <section className="result-section animate-in" id="dimensions">
        <h3>四维度分布</h3>
        {(Object.entries(result.dimensions) as [Dimension, typeof result.dimensions['E/I']][]).map(
          ([dim, data]) => {
            const [left, right] = dimensionLabels[dim];
            return <DimensionBar key={dim} left={left} right={right} result={data} />;
          },
        )}
      </section>

      {/* ── 八维认知功能 ── */}
      <section className="result-section animate-in" id="functions">
        <FunctionsRadarChart
          functions={result.functions}
          dominant={profile.dominantFunction}
          auxiliary={profile.auxiliaryFunction}
        />
      </section>

      {/* ── 认知功能解读 ── */}
      {report && (
        <section className="result-section animate-in" id="function-meaning">
          <h3>认知功能解读</h3>
          <div className="report-cards">
            <div className="report-card card-dominant">
              <h4>主导功能：{profile.dominantFunction}</h4>
              <p>{functionMeanings[profile.dominantFunction]}</p>
            </div>
            <div className="report-card card-auxiliary">
              <h4>辅助功能：{profile.auxiliaryFunction}</h4>
              <p>{functionMeanings[profile.auxiliaryFunction]}</p>
            </div>
          </div>
        </section>
      )}

      {report && (
        <>
          <section className="result-section animate-in" id="traits">
            <h3>核心特质</h3>
            <div className="trait-tags">
              {profile.traits.map((trait) => (
                <span key={trait} className="trait-tag">{trait}</span>
              ))}
            </div>
          </section>

          <section className="result-section animate-in" id="strengths">
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

          <section className="result-section animate-in" id="weaknesses">
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

          <section className="result-section animate-in" id="emotional">
            <h3>情绪特质</h3>
            <div className="report-card card-emotional">
              <p>{report.emotional}</p>
            </div>
          </section>

          <section className="result-section animate-in" id="career">
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

          <section className="result-section animate-in" id="academic">
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

          <section className="result-section animate-in" id="relationships">
            <h3>情感社交</h3>
            <div className="report-card card-relationships">
              <p>{report.relationships}</p>
            </div>
          </section>

          <section className="result-section animate-in" id="growth">
            <h3>自我提升</h3>
            <ul className="growth-list">
              {report.growth.map((g, i) => (
                <li key={i} className="growth-item">{g}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      <section className="result-actions animate-in">
        <button className="action-btn action-primary" onClick={() => navigate('/share')}>
          查看名片 &amp; 分享
        </button>
        <button className="action-btn action-share" onClick={handleCopyLink}>
          复制分享链接
        </button>
        <button className="action-btn action-secondary" onClick={handleRetake}>
          重新测试
        </button>
      </section>
    </div>
  );
}

// 认知功能在日常生活中的实际含义
const functionMeanings: Record<string, string> = {
  Ti: '内倾思维让你追求内在逻辑的一致性。你天生喜欢拆解问题、理解事物运作的底层原理。在决策时你更依赖自己构建的思维框架而非外部规则。这让你成为深刻的分析者和独立的思想者，但有时可能陷入过度分析而迟迟不行动。',
  Te: '外倾思维让你善于组织和高效执行。你以"什么最有效"为准则，擅长制定计划、调度资源、衡量结果。你天然懂得如何将混乱变为有序，是团队中最可靠的执行引擎。注意不要因为过度追求效率而忽略他人的感受。',
  Fi: '内倾情感赋予你深厚的个人价值观和强烈的道德指南。你忠于内心的声音，不盲从外部评判标准。你能深刻地感受情绪，并因此拥有独特的审美和高度的正直。但要小心不要把所有批评都看作是针对你人格的攻击。',
  Fe: '外倾情感让你能敏锐感知并回应他人的情绪需求。你能轻松创造和谐、温暖的氛围，是群体中的黏合剂和疗愈者。你自发地关心他人，并在为他人创造喜悦中找到自己的满足。需要警惕的是不要为他人过多牺牲自我。',
  Si: '内倾感觉让你重视经验、传统和细节。你从过往经历中汲取宝贵的智慧和稳定感。你对细节的精准记忆让你成为出色的实践者和可靠的依托者。不过过于依赖熟悉模式可能让你错失新机会。',
  Se: '外倾感觉让你全情投入当下的感官体验。你拥有实际操作的工具和动手解决问题的直觉。对此时此刻的敏锐感知让你能随机应变、灵活应对。你需要确保也分配精力给长远目标和规划。',
  Ni: '内倾直觉赋予你穿透表象直击本质的洞察力。你能在不完整的信息中直接拼凑出未来的发展趋势和深层真相。你是天生的战略家和远见者。但你的洞察并不总能让他人理解——耐心解释你的思路很重要。',
  Ne: '外倾直觉让你在各种可能性之间自由穿梭并发现意想不到的连接。你源源不断地产生灵感和创意，跳出事外看到未来的多种可能路径。你的热情和创新精神极具感染力。但你需要专注于一项事务直到完成——收尾同样重要。',
};
