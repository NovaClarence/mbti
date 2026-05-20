import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import type { TestVersion } from '../types';
import './HomePage.css';

interface VersionOption {
  version: TestVersion;
  label: string;
  badgeClass: string;
  time: string;
  description: string;
}

const versions: VersionOption[] = [
  {
    version: 'quick',
    label: '精简版',
    badgeClass: 'quick',
    time: '15-20 分钟',
    description: '快速了解你的 MBTI 类型和主要认知功能',
  },
  {
    version: 'standard',
    label: '标准版',
    badgeClass: 'standard',
    time: '25-30 分钟',
    description: '更准确的类型判断，包含完整的八维功能栈分析',
  },
  {
    version: 'deep',
    label: '深度版',
    badgeClass: 'deep',
    time: '40-50 分钟',
    description: '最全面的测量，精准定位你的认知功能排序与人格画像',
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
        <div className="home-icon">🧠</div>
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
              <span className={`version-badge ${v.badgeClass}`}>{v.label}</span>
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
