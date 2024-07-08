import React from 'react';
// import './CallStack.css';

const CallStack = ({ callStack }) => {
  return (
    <div className="callStack">
      <h2>Call Stack</h2>
      <ul>
        {callStack.map((func, index) => (
          <li key={index}>{func}</li>
        ))}
      </ul>
    </div>
  );
};

export default CallStack;
