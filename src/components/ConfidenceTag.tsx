import type { ConfidenceLevel } from '../types';
import './ConfidenceTag.css';

const config: Record<ConfidenceLevel, { label: string; className: string }> = {
  high: { label: '✓ 结果置信度：高', className: 'conf-high' },
  medium: { label: '△ 结果置信度：中等', className: 'conf-medium' },
  low: { label: '✗ 结果置信度：较低', className: 'conf-low' },
};

interface ConfidenceTagProps {
  level: ConfidenceLevel;
}

export default function ConfidenceTag({ level }: ConfidenceTagProps) {
  const { label, className } = config[level];
  return <span className={`confidence-tag ${className}`}>{label}</span>;
}
