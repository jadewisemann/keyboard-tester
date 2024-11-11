import './App.css'

import { useState, useEffect } from 'react';

function App() {

  const [inputText, setInputText] = useState('');
  const [keyLog, setKeyLog] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, code } = event;
      setInputText((prevText) => prevText + key);
      setKeyLog((prevLog) => [...prevLog, { key, code }]);
    };

    window.addEventListener('keydown', handleKeyDown);
    // clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleReset = () => {
    setInputText('');
    setKeyLog([]);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>키보드 입력 테스트</h1>
      <div style={{ marginBottom: '20px' }}>
        <strong>입력된 텍스트:</strong> {inputText}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <strong>입력된 키 기록:</strong>
        <ul>
          {keyLog.map((entry, index) => (
            <li key={index}>
              Key: {entry.key}, Code: {entry.code}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleReset}>리셋</button>
    </div>
  );
}

export default App;
