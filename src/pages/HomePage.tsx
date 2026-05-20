// src/pages/HomePage.tsx
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import type { TestVersion } from '../types';
import './HomePage.css';

interface VersionOption {
  version: TestVersion;
  label: string;
  questions: string;
  time: string;
  description: string;
}

const versions: VersionOption[] = [
  {
    version: 'quick',
    label: '精简版',
    questions: '~50题',
    time: '15-20分钟',
    description: '快速了解你的MBTI类型和主要认知功能',
  },
  {
    version: 'standard',
    label: '标准版',
    questions: '~80题',
    time: '25-30分钟',
    description: '平衡的题目量，获得更准确的类型判断和功能栈分析',
  },
  {
    version: 'deep',
    label: '深度版',
    questions: '~120题',
    time: '40-50分钟',
    description: '最全面的测量，精准定位你的认知功能排序',
  },
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
        <h1 className="home-title">MBTI 性格测试</h1>
        <p className="home-subtitle">
          基于荣格认知功能理论，精准测量你的性格类型
        </p>
      </div>

      <div className="version-cards">
        {versions.map((v) => (
          <button
            key={v.version}
            className="version-card"
            onClick={() => handleStart(v.version)}
          >
            <div className="version-header">
              <span className="version-label">{v.label}</span>
              <span className="version-count">{v.questions}</span>
            </div>
            <p className="version-desc">{v.description}</p>
            <div className="version-footer">
              <span className="version-time">⏱ {v.time}</span>
              <span className="version-start">开始测试 →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
