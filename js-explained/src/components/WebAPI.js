import React from 'react';

const WebAPI = ({ webAPI }) => {
  return (
    <div className="webAPI">
      <h2>Web API</h2>
      <ul>
        {webAPI.map((api, index) => (
          <li key={index}>{api}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebAPI;
