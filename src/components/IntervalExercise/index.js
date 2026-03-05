import React, { useEffect, useRef, useState } from "react";

function pad2(num) {
  return String(num).padStart(2, "0");
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${pad2(minutes)}:${pad2(seconds)}`;
}

export default function IntervalExercise({ name, image, onReturn }) {
  const [workSeconds, setWorkSeconds] = useState(30);
  const [restSeconds, setRestSeconds] = useState(15);
  const [roundsTotal, setRoundsTotal] = useState(5);

  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState("work");
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [imgOk, setImgOk] = useState(true);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) {
      setPhase("work");
      setRound(1);
      setTimeLeft(workSeconds);
    }
  }, [workSeconds, restSeconds, roundsTotal, running]);

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;

        if (phase === "work") {
          setPhase("rest");
          return restSeconds;
        }

        if (round < roundsTotal) {
          setRound((r) => r + 1);
          setPhase("work");
          return workSeconds;
        }

        setRunning(false);
        return 0;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running, phase, round, roundsTotal, workSeconds, restSeconds]);

  const start = () => setRunning(true);
  const stop = () => setRunning(false);

  const reset = () => {
    setRunning(false);
    setPhase("work");
    setRound(1);
    setTimeLeft(workSeconds);
  };

  const phaseLabel = phase === "work" ? "Work" : "Rest";

  return (
    <div className="exercise-page">
      <h1>{name}</h1>
      <p className="subtitle">
        {phaseLabel} • Round {round}/{roundsTotal}
      </p>

      <div className="exercise-image">
        {imgOk ? (
          <img src={image} alt={name} onError={() => setImgOk(false)} />
        ) : (
          <div className="image-fallback">Image not found</div>
        )}
      </div>

      <p className="timer">{formatTime(timeLeft)}</p>

      <div className="settings">
        <label className="setting-row">
          <span>Work (sec)</span>
          <input
            type="number"
            min="5"
            value={workSeconds}
            disabled={running}
            onChange={(e) => setWorkSeconds(Math.max(5, Number(e.target.value) || 5))}
          />
        </label>

        <label className="setting-row">
          <span>Rest (sec)</span>
          <input
            type="number"
            min="0"
            value={restSeconds}
            disabled={running}
            onChange={(e) => setRestSeconds(Math.max(0, Number(e.target.value) || 0))}
          />
        </label>

        <label className="setting-row">
          <span>Rounds</span>
          <input
            type="number"
            min="1"
            value={roundsTotal}
            disabled={running}
            onChange={(e) => setRoundsTotal(Math.max(1, Number(e.target.value) || 1))}
          />
        </label>
      </div>

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