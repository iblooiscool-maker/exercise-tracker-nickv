import React, { useState } from "react";

export default function RepetitionExercise({ name, image, onReturn }) {
  const [count, setCount] = useState(0);
  const [imgOk, setImgOk] = useState(true);

  const addOne = () => setCount((prev) => prev + 1);
  const reset = () => setCount(0);

  return (
    <div className="exercise-page">
      <h1>{name}</h1>
      <p className="subtitle">Repetition</p>

      <div className="exercise-image">
        {imgOk ? (
          <img src={image} alt={name} onError={() => setImgOk(false)} />
        ) : (
          <div className="image-fallback">Image not found</div>
        )}
      </div>

      <p className="timer">{count}</p>
      <p className="meta">Number of reps</p>

      <div className="button-row">
        <button onClick={addOne}>Complete Rep</button>
        <button onClick={reset}>Reset</button>
        <button onClick={onReturn} className="secondary">
          Return
        </button>
      </div>
    </div>
  );
}