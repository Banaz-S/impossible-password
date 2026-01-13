import "./Game.css";
import GameHeader from "./GameHeader/GameHeader";

function Game({ playerName, difficulty, onExit }) {
  const timeLeft =
    difficulty === "easy" ? "∞" : difficulty === "medium" ? "02:00" : "01:30";

  const score = 0;

  return (
    <div className="game-screen">
      <GameHeader difficulty={difficulty} timeLeft={timeLeft} score={score} />

      <h1 className="game-title">Game Started 🎮</h1>

      <div className="game-info">
        <p>
          👤 <strong>Player:</strong> {playerName}
        </p>
        <p>
          🎯 <strong>Difficulty:</strong> {difficulty}
        </p>
      </div>

      <p className="game-placeholder">
        (Game rules and password input will appear here)
      </p>

      <button className="exit-button" onClick={onExit}>
        Exit Game
      </button>
    </div>
  );
}

export default Game;
