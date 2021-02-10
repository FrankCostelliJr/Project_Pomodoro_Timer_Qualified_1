import React from 'react'
import TimeDisplay from './TimeDisplay';
import ProgressDisplay from './ProgressDisplay';

function Display(props) {
  const {
    activeSession,
    onBreak,
    initBreakMins,
    initFocusMins,
    currentTimerMins,
    currentTimerSecs,
    isTimerRunning,
    progressBar
  } = props;

  return (
    <div style={activeSession ? {display: 'block'} : {display: 'none'}}> 
    {/* TODO: This area should show only when a focus or break session is running or pauses */}
    <div className="row mb-2">
    <TimeDisplay onBreak={onBreak} initBreakMins={initBreakMins} initFocusMins={initFocusMins} currentTimerMins={currentTimerMins} currentTimerSecs={currentTimerSecs} isTimerRunning={isTimerRunning} />
    </div>
    <div className="row mb-2">
    <ProgressDisplay progressBar={progressBar} />
    </div>
  </div> 
  )
}

export default Display
