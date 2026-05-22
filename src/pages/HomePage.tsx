import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import type { TestVersion } from '../types';
import './HomePage.css';

interface VersionOption {
  version: TestVersion;
  label: string;
  badgeClass: string;
  questions: string;
  time: string;
  description: string;
}

const versions: VersionOption[] = [
  {
    version: 'quick',
    label: '精简版',
    badgeClass: 'quick',
    questions: '约 57 题',
    time: '15-20 分钟',
    description: '快速了解你的 MBTI 类型和主要认知功能，适合初次接触 MBTI 的用户',
  },
  {
    version: 'standard',
    label: '标准版',
    badgeClass: 'standard',
    questions: '约 81 题',
    time: '25-30 分钟',
    description: '更准确的类型判断，包含完整的八维功能栈分析，推荐大多数用户选择',
  },
  {
    version: 'deep',
    label: '深度版',
    badgeClass: 'deep',
    questions: '约 117 题',
    time: '40-50 分钟',
    description: '最全面的测量，精准定位你的认知功能排序与人格画像，适合深度探索',
  },
];

const features = [
  { icon: '📐', title: '国际标准量表', desc: '基于荣格认知功能理论，沿用国际标准人格测试框架' },
  { icon: '🎯', title: '双重维度测量', desc: '同时测量四维性格维度与八项认知功能，实现交叉验证' },
  { icon: '🔍', title: '信效度校验', desc: '内置注意力检测与一致性校验，确保结果真实可靠' },
  { icon: '📊', title: '深度解析报告', desc: '从性格内核到职场发展，输出系统化多维人格分析' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const startTest = useTestStore((s) => s.startTest);

  const handleStart = (version: TestVersion) => {
    startTest(version);
    navigate('/test');
  };

  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="home-icon">🧠</div>
        <h1 className="home-title">MBTI 性格测试</h1>
        <p className="home-subtitle">
          科学测量 · 深度解析 · 探索真实的自己
        </p>
        <p className="home-hero-desc">
          本平台沿用国际标准人格测试量表，依托四大性格维度与八项认知功能双重框架，
          搭建科学完善的测评体系。摒弃娱乐化浅层测评，输出系统化深度人格解析报告，
          涵盖性格内核、天赋潜能、职场发展、情感社交等多元维度，为你提供客观、精准、
          全面的高质量人格认知体验。
        </p>
      </div>

      <div className="features-row">
        {features.map((f) => (
          <div key={f.title} className="feature-item">
            <span className="feature-icon">{f.icon}</span>
            <div>
              <h4 className="feature-title">{f.title}</h4>
              <p className="feature-desc">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="version-section-label">选择测试版本</div>
      <div className="version-cards">
        {versions.map((v) => (
          <button
            key={v.version}
            className="version-card"
            onClick={() => handleStart(v.version)}
          >
            <div className="version-header">
              <span className="version-label">{v.label}</span>
              <span className={`version-badge ${v.badgeClass}`}>{v.questions}</span>
            </div>
            <p className="version-desc">{v.description}</p>
            <div className="version-footer">
              <span className="version-time">
                <span className="version-time-icon">⏱</span>
                {v.time}
              </span>
              <span className="version-start">开始测试 →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
