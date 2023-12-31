import React, { useState, useEffect, useRef } from "react";
import "./Timer.css"; 

function Timer() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const timer = useRef();

  //  load from local storage 
  useEffect(() => {
    const savedTime = parseInt(localStorage.getItem("elapsedTime"), 10) || 0;
    const savedRunning = localStorage.getItem("timerRunning") === "true";
    const savedTimerStarted = localStorage.getItem("timerStarted") === "true";

    setTime(savedTime);
    setRunning(savedRunning);
    setTimerStarted(savedTimerStarted);

    if (savedRunning && savedTimerStarted) {
      startTimer();
    }
  }, []);

  // Save the elapsed time to local storage 
  useEffect(() => {
    localStorage.setItem("elapsedTime", time.toString());
    localStorage.setItem("timerRunning", running.toString());
    localStorage.setItem("timerStarted", timerStarted.toString());
  }, [time, running, timerStarted]);

  const startTimer = () => {
    timer.current = setInterval(() => {
      setTime((prev) => prev + 10);
    }, 10);
  };

  const handleStartPauseClick = () => {
    if (running) {
      clearInterval(timer.current);
    } else {
   
      if (!timerStarted) {
        setTime(0);
      }
      startTimer();
    }

    setRunning(!running);
    setTimerStarted(true);
  };

  const handleStopClick = () => {
    clearInterval(timer.current);
    setRunning(false);
    setTimerStarted(false);
    setTime(0);
  };

  return (
    <div className="stopwatch">
      {format(time)}
      <div>
        <button className="start" onClick={handleStartPauseClick}>
          {running ? "Pause" : "Start"}
        </button>
        {running && (
          <button className="stop" onClick={handleStopClick}>
            Stop
          </button>
        )}
      </div>
    </div>
  );
}

const format = (time) => {
  let milliseconds = Math.floor(time % 1000);
  let seconds = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / (1000 * 60)) % 60);
  let hours = Math.floor(time / (1000 * 60 * 60));

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

  return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
};

export default Timer;
