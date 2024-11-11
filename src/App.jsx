import './App.css'
import './Keyboard.css';
import { useState, useEffect } from 'react';

const keyLayout = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

function App() {
  
  const [inputText, setInputText] = useState('');
  const [keyLog, setKeyLog] = useState([]);
  const [pressedKey, setPressedKey] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, code } = event;
      const pressedKey = event.key.toUpperCase();
      setPressedKey(pressedKey)
      setInputText((prevText) => prevText + key);
      setKeyLog((prevLog) => [...prevLog, { key, code }]);
    };

    const handleKeyUp = () => {
      setPressedKey(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleReset = () => {
    setInputText('');
    setKeyLog([]);
  };

  return (
    <>
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

      <div className="keyboard">
        {keyLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => (
              <button
                key={key}
                className={`key ${pressedKey === key ? 'active' : ''}`}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
    
  );
}

export default App;
