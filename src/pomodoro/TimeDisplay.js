import React from 'react'
import { minutesToDuration } from '../utils/duration';
import {secondsToDuration} from '../utils/duration';

function TimeDisplay(props) {

  const {
    onBreak,
    initFocusMins,
    initBreakMins,
    currentTimerMins,
    currentTimerSecs,
    isTimerRunning
  } = props;

  return (
    <div className="col">
    {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
    <h2 data-testid="session-title">
    {!onBreak ? "Focusing" : "On Break"} for {!onBreak ? minutesToDuration(initFocusMins) : minutesToDuration(initBreakMins)} minutes
    </h2>
    {/* TODO: Update message below to include time remaining in the current session */}
    <p className="lead" data-testid="session-sub-title">
      {secondsToDuration((currentTimerMins * 60) + currentTimerSecs)} remaining
    </p>
    {!isTimerRunning ? <h2>PAUSED</h2> : null}
    </div>
  )
}

export default TimeDisplay
