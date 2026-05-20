import type { DimensionResult } from '../types';
import './DimensionBar.css';

interface DimensionBarProps {
  left: string;
  right: string;
  result: DimensionResult;
}

export default function DimensionBar({ left, right, result }: DimensionBarProps) {
  const isLeft = result.direction === left;
  const leftPct = isLeft ? result.strength : 100 - result.strength;
  const rightPct = 100 - leftPct;

  return (
    <div className="dimension-bar-row">
      <span className="dim-label dim-left">{left}</span>
      <div className="dim-bar-wrap">
        <div className="dim-bar-segment dim-bar-bg" style={{ flex: leftPct }}>
          {isLeft && <span className="dim-bar-value">{result.strength}%</span>}
        </div>
        <div className="dim-bar-segment dim-bar-fill" style={{ flex: rightPct }}>
          {!isLeft && <span className="dim-bar-value dim-bar-value-right">{result.strength}%</span>}
        </div>
      </div>
      <span className="dim-label dim-right">{right}</span>
    </div>
  );
}
