import { useState } from "react";
import "./StartScreen.css";

function StartScreen() {
  const [playerName, setPlayerName] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  const difficultyInfo = {
    easy: {
      time: "Unlimited time",
      rules: "Simple and forgiving rules",
    },
    medium: {
      time: "2 minutes",
      rules: "More logic, more restrictions",
    },
    evil: {
      time: "1.5 minutes",
      rules: "Precise, chaotic, and cruel 😈",
    },
  };

  return (
    <div className="start-screen">
      <h1 className="title">The Impossible Password</h1>

      <p className="subtitle">
        Create a powerful password by satisfying all the rules 😈
      </p>

      {/* Player Name */}
      <input
        type="text"
        placeholder="Enter your name"
        className="name-input"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />

      {/* Difficulty Selector */}
      <div className="difficulty-group">
        <button
          className={`difficulty-btn easy ${
            difficulty === "easy" ? "active" : ""
          }`}
          onClick={() => setDifficulty("easy")}
        >
          Easy
        </button>

        <button
          className={`difficulty-btn medium ${
            difficulty === "medium" ? "active" : ""
          }`}
          onClick={() => setDifficulty("medium")}
        >
          Medium
        </button>

        <button
          className={`difficulty-btn evil ${
            difficulty === "evil" ? "active" : ""
          }`}
          onClick={() => setDifficulty("evil")}
        >
          Evil
        </button>
      </div>

      {/* Difficulty Info */}
      <div className="difficulty-info">
        <p>
          ⏱ <strong>Time:</strong> {difficultyInfo[difficulty].time}
        </p>
        <p>
          📜 <strong>Rules:</strong> {difficultyInfo[difficulty].rules}
        </p>
      </div>

      <button className="start-button">Start Game</button>
    </div>
  );
}

export default StartScreen;
