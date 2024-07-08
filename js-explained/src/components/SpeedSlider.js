import React from 'react';

const SpeedSlider = ({ speed, setSpeed }) => {
  return (
    <div className="speed-slider">
      <label>Speed: {speed} ms</label>
      <input
        type="range"
        min="100"
        max="2000"
        value={speed}
        onChange={(e) => setSpeed(parseInt(e.target.value))}
      />
    </div>
  );
};

export default SpeedSlider;
