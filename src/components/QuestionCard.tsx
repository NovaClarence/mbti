import './QuestionCard.css';

interface QuestionCardProps {
  questionText: string;
  selectedAnswer: number | undefined;
  onSelect: (score: number) => void;
}

const options = [
  { value: 1, label: '非常不同意' },
  { value: 2, label: '不同意' },
  { value: 3, label: '中立' },
  { value: 4, label: '同意' },
  { value: 5, label: '非常同意' },
];

export default function QuestionCard({ questionText, selectedAnswer, onSelect }: QuestionCardProps) {
  return (
    <div className="question-card">
      <p className="question-text">{questionText}</p>
      <div className="question-options">
        {options.map((opt) => (
          <button
            key={opt.value}
            className={`option-btn ${selectedAnswer === opt.value ? 'selected' : ''}`}
            onClick={() => onSelect(opt.value)}
          >
            <span className="option-radio" />
            <span className="option-label">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
