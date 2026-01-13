import "./GameHeader.css";

function GameHeader({ difficulty, timeLeft, score }) {
  return (
    <div className="game-header">
      <div className="header-item">
        ⏱ <strong>Time:</strong> {timeLeft}
      </div>

      <div className="header-item">
        ⭐ <strong>Score:</strong> {score}
      </div>

      <div className={`header-item difficulty ${difficulty}`}>
        🎯 {difficulty.toUpperCase()}
      </div>
    </div>
  );
}

export default GameHeader;
