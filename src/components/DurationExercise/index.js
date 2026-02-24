import React, { useEffect, useRef, useState } from "react";

function pad2(num) {
  return String(num).padStart(2, "0");
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${pad2(minutes)}:${pad2(seconds)}`;
}

export default function DurationExercise({ name, onReturn }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running]);

  const start = () => setRunning(true);
  const stop = () => setRunning(false);

  const reset = () => {
    setRunning(false);
    setSeconds(0);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>{name}</h1>
      <p style={{ fontSize: 24 }}>{formatTime(seconds)}</p>

    
      <div style={{ display: "flex", gap: 10 }}>
        {!running ? <button onClick={start}>Start</button> : <button onClick={stop}>Stop</button>}
        <button onClick={reset}>Reset</button>
        <button onClick={onReturn}>Return</button>
      </div>
    </div>
  );
}