import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import BreakControls from './BreakControls';
import FocusControls from './FocusControls';
import TimerControls from './TimerControls';
import TimeDisplay from './TimeDisplay';
import ProgressDisplay from './ProgressDisplay';


function Pomodoro() {
  // Timer starts out paused

  // Timer States:
  const [isTimerRunning, setIsTimerRunning] = useState(false);
    //  For button handlers:
  const [focusTimerMins, setFocusTimerMins] = useState(25);
  const [breakTimerMins, setBreakTimerMins] = useState(5);
    //  Initial States:
  const [initFocusMins, setInitFocusMins] = useState(25);
  const [initBreakMins, setInitBreakMins] = useState(5);
    //  Current States:
  const [currentTimerMins, setCurrentTimerMins] = useState(25);
  const [currentTimerSecs, setCurrentTimerSecs] = useState(0);
    //  Timer progress bar state:
  const [progressBar, setProgressBar] = useState(0);

  // Session States:
  const [initPlay, setInitPlay] = useState(true);
  const [activeSession, setActiveSession] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  // Handle focus timer buttons:
  const decreaseFocusTimer = () => {
    if(focusTimerMins > 5 && !isTimerRunning && initPlay) setFocusTimerMins(minutes => minutes -= 5);
  }
  const increaseFocusTimer = () => {
    if(focusTimerMins < 60 && !isTimerRunning && initPlay) setFocusTimerMins(minutes => minutes += 5);
  }

  // Handle break timer buttons:
  const decreaseBreakTimer = () => {
    if(breakTimerMins > 1 && !isTimerRunning && initPlay) setBreakTimerMins(minutes => minutes -= 1);
  }
  const increaseBreakTimer = () => {
    if(breakTimerMins < 15 && !isTimerRunning && initPlay) setBreakTimerMins(minutes => minutes += 1);
  }

  // Create a helper function that converts minutes and seconds into a percentage of initial duration:
  function progPercentage(currentMins, currentSecs, initialDuration) {
    return 100 - (((currentMins * 60) + currentSecs) / (initialDuration * 60) *100);
  }

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      setCurrentTimerSecs(second => {
        //If the timer is zero restart, else subtract 1 second
        second === 0 ? second = 59 : second -= 1;
        if(second === 59) setCurrentTimerMins(minutes => currentTimerMins - 1);
        return second;
      });

      if (onBreak) {
        setProgressBar(progress => progress = progPercentage(currentTimerMins, currentTimerSecs, initBreakMins))
      } else {
        setProgressBar(progress => progress = progPercentage(currentTimerMins, currentTimerSecs, initFocusMins))
      }

      if (currentTimerMins === 0 && currentTimerSecs === 1) timerExpired();
      

    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    if (initPlay) {
      setInitFocusMins(minutes => minutes = focusTimerMins);
      setInitBreakMins(minutes => minutes = breakTimerMins);
      setCurrentTimerMins(minutes => minutes = focusTimerMins);
      setInitPlay(state => state = false);
    }
    setActiveSession(state => state = true);
    setIsTimerRunning((prevState) => !prevState);
  }

  function stop() {
    setInitPlay(state => state = true);
    setIsTimerRunning(state => state = false);
    setOnBreak(state => state = false);
    setActiveSession(state => state = false);
    setProgressBar(progress => progress = 0);
    setCurrentTimerMins(minutes => minutes = focusTimerMins);
    setCurrentTimerSecs(seconds => seconds = 0);
    setInitFocusMins(minutes => minutes = focusTimerMins);
    setInitBreakMins(minutes => minutes = breakTimerMins);
  }

  function timerExpired() {
    (!onBreak) ? focusExpired() : breakExpired();
  }

  function focusExpired() {
    new Audio(`${process.env.PUBLIC_URL}/alarm/tones.mp3`).play();
    setOnBreak(state => state = true);
    setProgressBar(progress => progress = 0);
    setCurrentTimerSecs(seconds => seconds = 0);
    setCurrentTimerMins(minutes => minutes = initBreakMins);
  }

  function breakExpired() {
    new Audio(`${process.env.PUBLIC_URL}/alarm/finish.mp3`).play();
    setOnBreak(state => state = false);
    setProgressBar(progress => progress = 0);
    setCurrentTimerSecs(seconds => seconds = 0);
    setCurrentTimerMins(minutes => minutes = initFocusMins);
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <FocusControls increaseFocusTimer={increaseFocusTimer} decreaseFocusTimer={decreaseFocusTimer} focusTimerMins={focusTimerMins}/>
        <BreakControls increaseBreakTimer={increaseBreakTimer} decreaseBreakTimer={decreaseBreakTimer} breakTimerMins={breakTimerMins}/>
      </div>
      <div className="row">
        <TimerControls playPause={playPause} classNames={classNames} isTimerRunning={isTimerRunning} stop={stop} />
      </div> 
      <div style={activeSession ? {display: 'block'} : {display: 'none'}}>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
        <TimeDisplay onBreak={onBreak} initBreakMins={initBreakMins} initFocusMins={initFocusMins} currentTimerMins={currentTimerMins} currentTimerSecs={currentTimerSecs} isTimerRunning={isTimerRunning} />
        </div>
        <div className="row mb-2">
        <ProgressDisplay progressBar={progressBar} />
        </div>
      </div> 
    </div>
  );
}

export default Pomodoro;
