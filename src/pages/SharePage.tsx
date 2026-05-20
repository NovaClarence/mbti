import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import ShareCard from '../components/ShareCard';
import { downloadCardAsImage, copyCardAsImage } from '../utils/share';
import './SharePage.css';

export default function SharePage() {
  const navigate = useNavigate();
  const result = useTestStore((s) => s.result);

  if (!result) {
    navigate('/', { replace: true });
    return null;
  }

  const handleDownload = async () => {
    try {
      await downloadCardAsImage('share-card', `MBTI-${result.type}.png`);
    } catch {
      alert('保存失败，请重试');
    }
  };

  const handleCopy = async () => {
    try {
      await copyCardAsImage('share-card');
      alert('名片已复制到剪贴板');
    } catch {
      alert('复制失败，请使用保存按钮');
    }
  };

  return (
    <div className="share-page">
      <h2>你的 MBTI 名片</h2>
      <p className="share-subtitle">保存或分享给朋友</p>

      <ShareCard result={result} />

      <div className="share-actions">
        <button className="share-btn share-btn-primary" onClick={handleDownload}>
          保存图片
        </button>
        <button className="share-btn share-btn-secondary" onClick={handleCopy}>
          复制图片
        </button>
        <button className="share-btn share-btn-outline" onClick={() => navigate('/result')}>
          返回报告
        </button>
      </div>
    </div>
  );
}
