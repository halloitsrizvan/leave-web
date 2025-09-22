import React from 'react'
import './LoadForAll.css'

const LoadForAll = ({ title = "Loading..." }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="orbit">
          <div className="electron"></div>
          <div className="electron"></div>
          
          <div className="electron"></div>
        </div>
        <div className="loading-text">{title}</div>
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      </div>
    </div>
  );
};
export default LoadForAll