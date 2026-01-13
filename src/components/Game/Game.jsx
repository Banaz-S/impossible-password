import "./Game.css";
import GameHeader from "./GameHeader/GameHeader";
import { useState, useRef } from "react";
import PasswordInput from "./PasswordInput/PasswordInput";

function Game({ playerName, difficulty, onExit }) {
  const [password, setPassword] = useState("");
  const passwordInputRef = useRef(null);

  const timeLeft =
    difficulty === "easy" ? "∞" : difficulty === "medium" ? "02:00" : "01:30";

  const score = 0;

  return (
    <div className="game-screen">
      <GameHeader
        playerName={playerName}
        difficulty={difficulty}
        timeLeft={timeLeft}
        score={score}
      />

      <h1 className="game-title">Game Started 🎮</h1>

      <PasswordInput
        ref={passwordInputRef}
        password={password}
        setPassword={setPassword}
        disabled={false}
      />

      <button className="exit-button" onClick={onExit}>
        Exit Game
      </button>
    </div>
  );
}

export default Game;
