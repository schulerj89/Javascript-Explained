import React, { useState, useEffect } from 'react';

const EventLoop = ({ callStack, callbackQueue, setCallStack, setCallbackQueue, speed }) => {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (callStack.length === 0 && callbackQueue.length > 0) {
        const [nextTask, ...remainingQueue] = callbackQueue;
        setCallbackQueue(remainingQueue);
        setCallStack((prevStack) => [...prevStack, nextTask]);
        
        // Indicate event loop is running
        setIsRunning(true);

        // Simulate task execution time
        setTimeout(() => {
          setCallStack((prevStack) => prevStack.slice(0, -1));
          setIsRunning(false);
        }, speed);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [callStack, callbackQueue, setCallStack, setCallbackQueue, speed]);

  return (
    <div>
      <h2>Event Loop</h2>
      <p>Moving tasks from Callback Queue to Call Stack</p>
      {isRunning ? <p className="event-loop-text">Event loop is running now...</p> : <p className="event-loop-text">Event loop is idle.</p>}
    </div>
  );
};

export default EventLoop;
