import "./GameHeader.css";

function GameHeader({ playerName, difficulty, timeLeft, score }) {
  return (
    <div className="game-header">
      <div className="header-item player">
        👤 {playerName[0].toUpperCase() + playerName.slice(1)}
      </div>

      <div className={`header-item difficulty ${difficulty}`}>
        🎯 {difficulty.toUpperCase()}
      </div>

      <div className="header-item">⏱ {timeLeft}</div>

      <div className="header-item">⭐ {score}</div>
    </div>
  );
}

export default GameHeader;
