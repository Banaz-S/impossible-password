import "./GameOverScreen.css";
import RankingBoard from "../RankingBoard/RankingBoard";

function GameOverScreen({ playerName, score, onRestart, rankingVersion }) {
  return (
    <div className="game-over-screen">
      <h1>💀 GAME OVER 💀</h1>
      <p>{playerName}, time's up!</p>
      <p className="final-score">Score: {score}</p>
      <RankingBoard refreshKey={rankingVersion} />
      <button onClick={onRestart}>Try Again</button>
    </div>
  );
}

export default GameOverScreen;
