import React, { useState } from "react";

export default function RepetitionExercise({ name, onReturn }) {
  const [count, setCount] = useState(0);

  const addOne = () => setCount((prev) => prev + 1);
  const reset = () => setCount(0);

  return (
    <div style={{ padding: 20 }}>
      <h1>{name}</h1>
      <p style={{ fontSize: 22 }}>Reps: {count}</p>

    
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={addOne}>Complete Rep</button>
        <button onClick={reset}>Reset</button>
        <button onClick={onReturn}>Return</button>
      </div>
    </div>
  );
}