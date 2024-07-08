import React, { useState } from 'react';
import Heap from './components/Heap';
import CallStack from './components/CallStack';
import WebAPI from './components/WebAPI';
import CallbackQueue from './components/CallbackQueue';
import EventLoop from './components/EventLoop';
import CodeInput from './components/CodeInput';
import SpeedSlider from './components/SpeedSlider';
import './styles/App.css';
import { parseAndExecuteCode } from './utils';

const App = () => {
  const [heap, setHeap] = useState([]);
  const [callStack, setCallStack] = useState([]);
  const [webAPI, setWebAPI] = useState([]);
  const [callbackQueue, setCallbackQueue] = useState([]);
  const [speed, setSpeed] = useState(500); // Default speed in milliseconds

  const handleCodeExecution = (code) => {
    parseAndExecuteCode(code, setCallStack, setHeap, setWebAPI, setCallbackQueue, speed);
  };

  return (
    <div>
      <h1>JavaScript Event Loop Visualizer</h1>
      <div className="container">
        <div className="heap">
          <Heap heap={heap} />
        </div>
        <div className="call-stack">
          <CallStack callStack={callStack} />
        </div>
        <div className="web-api">
          <WebAPI webAPI={webAPI} />
        </div>
        <div className="callback-queue">
          <CallbackQueue callbackQueue={callbackQueue} />
        </div>
      </div>
      <div className="event-loop">
        <EventLoop
          callStack={callStack}
          callbackQueue={callbackQueue}
          setCallStack={setCallStack}
          setCallbackQueue={setCallbackQueue}
          speed={speed}
        />
      </div>
      <SpeedSlider speed={speed} setSpeed={setSpeed} />
      <CodeInput onExecute={handleCodeExecution} />
    </div>
  );
};

export default App;
