import React from 'react';
// import './Heap.css';

const Heap = ({ heap }) => {
  return (
    <div>
      <h2>Heap</h2>
      <ul>
        {heap.map((obj, index) => (
          <li key={index}>{`${obj.name}: ${obj.value}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Heap;
