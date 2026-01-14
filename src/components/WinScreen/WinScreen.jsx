import "./WinScreen.css";
import RankingBoard from "../RankingBoard/RankingBoard";

function WinScreen({
  playerName,
  difficulty,
  password,
  score,
  rankingVersion,
  onRestart,
}) {
  return (
    <div className="win-screen">
      <h1 className="win-title">🎉YOU WIN🎉</h1>

      <p className="win-text">
        Well done <strong>{playerName}</strong>!
      </p>

      <p className="win-text">
        Difficulty: <strong>{difficulty.toUpperCase()}</strong>
      </p>

      <p className="win-text">
        Final Score: <strong>{score}</strong>
      </p>
      <RankingBoard refreshKey={rankingVersion} />

      <p className="win-password">
        Final Password:
        <br />
        <span>{password}</span>
      </p>

      <button className="restart-button" onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
}

export default WinScreen;
