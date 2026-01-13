import "./Game.css";

function Game({ playerName, difficulty, onExit }) {
  return (
    <div className="game-screen">
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
