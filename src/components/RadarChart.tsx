import {
  RadarChart as ReRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import type { CognitiveFunction } from '../types';
import './RadarChart.css';

interface RadarChartProps {
  functions: Record<CognitiveFunction, number>;
  dominant: CognitiveFunction;
  auxiliary: CognitiveFunction;
}

const functionLabels: Record<CognitiveFunction, string> = {
  Ti: 'Ti 内倾思维', Te: 'Te 外倾思维',
  Fi: 'Fi 内倾情感', Fe: 'Fe 外倾情感',
  Si: 'Si 内倾感觉', Se: 'Se 外倾感觉',
  Ni: 'Ni 内倾直觉', Ne: 'Ne 外倾直觉',
};

export default function FunctionsRadarChart({ functions, dominant, auxiliary }: RadarChartProps) {
  const data = (Object.entries(functions) as [CognitiveFunction, number][]).map(([fn, value]) => ({
    function: functionLabels[fn],
    value,
  }));

  return (
    <div className="radar-chart-container">
      <h3 className="radar-title">八维认知功能</h3>
      <ResponsiveContainer width="100%" height={320}>
        <ReRadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="#e0e0e0" />
          <PolarAngleAxis dataKey="function" tick={{ fontSize: 11, fill: '#666' }} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            dataKey="value"
            stroke="#667eea"
            fill="#667eea"
            fillOpacity={0.25}
            strokeWidth={2}
          />
        </ReRadarChart>
      </ResponsiveContainer>
      <div className="radar-legend">
        <span>主功能: <strong>{functionLabels[dominant]}</strong></span>
        <span>辅助功能: <strong>{functionLabels[auxiliary]}</strong></span>
      </div>
    </div>
  );
}
