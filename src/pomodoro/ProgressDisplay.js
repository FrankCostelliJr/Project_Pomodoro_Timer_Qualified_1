import React from 'react'

function ProgressDisplay({ progressBar }) {
  return (
    <div className="col">
    <div className="progress" style={{ height: "20px" }}>
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={progressBar} 
        style={{ width: `${progressBar}%` }} 
      />
    </div>
  </div>
  )
}

export default ProgressDisplay
