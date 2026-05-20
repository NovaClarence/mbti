import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import SharePage from './pages/SharePage';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/share" element={<SharePage />} />
      </Routes>
    </div>
  );
}

export default App;
