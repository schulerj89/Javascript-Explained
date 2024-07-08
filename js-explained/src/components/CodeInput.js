import React, { useState } from 'react';
// import './CodeInput.css';

const CodeInput = ({ onExecute }) => {
  const [code, setCode] = useState('');

  const handleExecute = () => {
    onExecute(code);
  };

  return (
    <div className="codeInput">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here..."
      />
      <button onClick={handleExecute}>Execute</button>
    </div>
  );
};

export default CodeInput;
