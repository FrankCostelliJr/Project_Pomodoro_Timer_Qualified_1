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
        aria-valuenow={progressBar} // TODO: Increase aria-valuenow as elapsed time increases
        style={{ width: `${progressBar}%` }} // TODO: Increase width % as elapsed time increases
      />
    </div>
  </div>
  )
}

export default ProgressDisplay
