import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import './TestPage.css';

const versionLabels: Record<string, string> = {
  quick: '精简版',
  standard: '标准版',
  deep: '深度版',
};

export default function TestPage() {
  const navigate = useNavigate();
  const { questions, currentIndex, answers, version, answerQuestion, nextQuestion, completeTest } =
    useTestStore();

  if (questions.length === 0) {
    navigate('/', { replace: true });
    return null;
  }

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion?.id];
  const isLast = currentIndex >= questions.length - 1;

  const handleSelect = (score: number) => {
    if (!currentQuestion) return;
    answerQuestion(currentQuestion.id, score);
  };

  const handleNext = () => {
    if (isLast) {
      completeTest();
      navigate('/result');
    } else {
      nextQuestion();
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="test-page">
      <ProgressBar
        current={currentIndex + 1}
        total={questions.length}
        versionLabel={versionLabels[version]}
      />
      <QuestionCard
        questionText={currentQuestion.text}
        selectedAnswer={selectedAnswer}
        onSelect={handleSelect}
      />
      <button
        className="next-btn"
        disabled={selectedAnswer === undefined}
        onClick={handleNext}
      >
        {isLast ? '查看结果' : '下一题 →'}
      </button>
    </div>
  );
}
