import React, { useState } from "react";
import RepetitionExercise from "./components/RepetitionExercise";
import DurationExercise from "./components/DurationExercise";

const EXERCISES = [
  { name: "Push Ups", type: "repetition" },
  { name: "Bicycling", type: "duration" },
  { name: "Jumping Jacks", type: "repetition" },
  { name: "Running", type: "duration" },
  { name: "Sit Ups", type: "repetition" },
];

function App() {
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Screen 1: Menu
  if (!selectedExercise) {
    return (
      <div style={{ padding: 20 }}>
        <h1 style={{ fontSize: 48, marginBottom: 10 }}>Go Do Something!</h1>
        <p>Select an exercise:</p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            width: 220,
          }}
        >
          {EXERCISES.map((ex) => (
            <button key={ex.name} onClick={() => setSelectedExercise(ex)}>
              {ex.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Screen 2: Exercise screen
  const { name, type } = selectedExercise;

  return (
    <div style={{ padding: 20 }}>
      {type === "repetition" ? (
        <RepetitionExercise
          name={name}
          onReturn={() => setSelectedExercise(null)}
        />
      ) : (
        <DurationExercise
          name={name}
          onReturn={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
}

export default App;