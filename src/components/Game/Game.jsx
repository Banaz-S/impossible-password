import "./Game.css";
import GameHeader from "./GameHeader/GameHeader";
import { useState, useRef } from "react";
import PasswordInput from "./PasswordInput/PasswordInput";
import RulesBoard from "./RulesBoard/RulesBoard";
import { RULES } from "../../data/rules";

function Game({ playerName, difficulty, onExit }) {
  const [password, setPassword] = useState("");
  const passwordInputRef = useRef(null);

  const timeLeft =
    difficulty === "easy" ? "∞" : difficulty === "medium" ? "01:30" : "01:00";

  const score = 0;

  const rules = RULES[difficulty];

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

      <RulesBoard rules={rules} password={password} />

      <button className="exit-button" onClick={onExit}>
        Exit Game
      </button>
    </div>
  );
}

export default Game;
