import React, { useEffect, useRef, useState } from "react";

function pad2(num) {
  return String(num).padStart(2, "0");
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${pad2(minutes)}:${pad2(seconds)}`;
}

export default function DurationExercise({ name, image, onReturn }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [imgOk, setImgOk] = useState(true);

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
    <div className="exercise-page">
      <h1>{name}</h1>
      <p className="subtitle">Duration</p>

      <div className="exercise-image">
        {imgOk ? (
          <img src={image} alt={name} onError={() => setImgOk(false)} />
        ) : (
          <div className="image-fallback">Image not found</div>
        )}
      </div>

      <p className="timer">{formatTime(seconds)}</p>
      <p className="meta">{running ? "Timer running..." : "Timer stopped"}</p>

      <div className="button-row">
        {!running ? (
          <button onClick={start}>Start</button>
        ) : (
          <button onClick={stop}>Stop</button>
        )}
        <button onClick={reset}>Reset</button>
        <button onClick={onReturn} className="secondary">
          Return
        </button>
      </div>
    </div>
  );
}