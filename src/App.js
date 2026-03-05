import React, { useState } from "react";
import "./App.css";

import RepetitionExercise from "./components/RepetitionExercise";
import DurationExercise from "./components/DurationExercise";
import IntervalExercise from "./components/IntervalExercise";

const img = (file) => `${process.env.PUBLIC_URL}/images/${file}`;

const EXERCISES = [
  { name: "Push Ups", type: "repetition", image: img("pushups.jpg") },
  { name: "Bicycling", type: "duration", image: img("bicycling.jpg") },
  { name: "Jumping Jacks", type: "repetition", image: img("jumpingjacks.jpg") },
  { name: "Running", type: "duration", image: img("running.jpg") },
  { name: "Sit Ups", type: "repetition", image: img("situps.jpg") },
  { name: "HIIT Intervals", type: "interval", image: img("hiit.jpg") },
];

function App() {
  const [selectedExercise, setSelectedExercise] = useState(null);

  // HOME
  if (!selectedExercise) {
    return (
      <div className="app-shell">
        <div className="app">
          <div className="app-header">
            <div className="brand">RUN2FIT</div>
            <div className="tagline">A place to achieve your fitness goals</div>
          </div>

          <div className="screen">
            <h1>Go Do Something!</h1>
            <p className="subtitle">Select an exercise:</p>

            <div className="exercise-list">
              {EXERCISES.map((ex) => (
                <button key={ex.name} onClick={() => setSelectedExercise(ex)}>
                  {ex.name}
                </button>
              ))}
            </div>

            <div className="bottom-accent" />
          </div>
        </div>
      </div>
    );
  }

  // EXERCISE SCREEN
  const { name, type, image } = selectedExercise;

  return (
    <div className="app-shell">
      <div className="app">
        <div className="app-header">
          <div className="brand">RUN2FIT</div>
          <div className="tagline">A place to achieve your fitness goals</div>
        </div>

        <div className="screen">
          {type === "repetition" ? (
            <RepetitionExercise
              name={name}
              image={image}
              onReturn={() => setSelectedExercise(null)}
            />
          ) : type === "duration" ? (
            <DurationExercise
              name={name}
              image={image}
              onReturn={() => setSelectedExercise(null)}
            />
          ) : (
            <IntervalExercise
              name={name}
              image={image}
              onReturn={() => setSelectedExercise(null)}
            />
          )}

          <div className="bottom-accent" />
        </div>
      </div>
    </div>
  );
}

export default App;