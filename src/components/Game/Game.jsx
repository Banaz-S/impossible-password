import "./Game.css";
import GameHeader from "./GameHeader/GameHeader";
import { useState, useRef, useEffect } from "react";
import PasswordInput from "./PasswordInput/PasswordInput";
import RulesBoard from "./RulesBoard/RulesBoard";
import { RULES } from "../../data/rules";
import WinScreen from "../WinScreen/WinScreen";

function Game({ playerName, difficulty, onExit }) {
  useEffect(() => {
    passwordInputRef.current?.focus();
  }, []);

  const [password, setPassword] = useState("");
  const passwordInputRef = useRef(null);
  const [hasWon, setHasWon] = useState(false);
  const [score, setScore] = useState(0);

  const timeLeft =
    difficulty === "easy" ? "∞" : difficulty === "medium" ? "01:30" : "01:00";

  const rules = RULES[difficulty];

  useEffect(() => {
    const allSatisfied = rules.every((rule) => rule.validate(password));

    if (allSatisfied && rules.length > 0) {
      setHasWon(true);
    }
  }, [password, rules]);

  useEffect(() => {
    const satisfiedCount = rules.filter((rule) =>
      rule.validate(password)
    ).length;

    let multiplier = 1;
    if (difficulty === "medium") multiplier = 1.5;
    if (difficulty === "evil") multiplier = 2;

    setScore(Math.floor(satisfiedCount * 10 * multiplier));
  }, [password, rules, difficulty]);

  if (hasWon) {
    return (
      <WinScreen
        playerName={playerName}
        difficulty={difficulty}
        password={password}
        score={score}
        onRestart={onExit}
      />
    );
  }

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
