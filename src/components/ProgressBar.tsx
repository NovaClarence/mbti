import './ProgressBar.css';

interface ProgressBarProps {
  current: number;
  total: number;
  versionLabel: string;
}

export default function ProgressBar({ current, total, versionLabel }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="progress-bar-container">
      <div className="progress-info">
        <span className="progress-count">第 {current} / {total} 题</span>
        <span className="progress-version">{versionLabel}</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
