import React from 'react';

const CallbackQueue = ({ callbackQueue }) => {
  return (
    <div className="callbackQueue">
      <h2>Callback Queue</h2>
      <ul>
        {callbackQueue.map((callback, index) => (
          <li key={index}>{callback}</li>
        ))}
      </ul>
    </div>
  );
};

export default CallbackQueue;
