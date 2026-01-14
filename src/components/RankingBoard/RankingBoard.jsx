import "./RankingBoard.css";
import { useEffect, useState } from "react";
import { getRankingFromSupabase } from "../../services/rankingService";

function RankingBoard({ refreshKey = 0 }) {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadRanking = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await getRankingFromSupabase();
        if (isMounted) {
          setRanking(data || []);
        }
      } catch (e) {
        console.error("Failed to load ranking:", e);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadRanking();

    return () => {
      isMounted = false;
    };
  }, [refreshKey]); // 🔥 refetch when refreshKey changes

  return (
    <div className="ranking-board">
      <h2>🏆 Ranking Board</h2>

      {loading && <p className="empty">Loading scores...</p>}

      {!loading && error && (
        <p className="empty error">
          Failed to load ranking. Please try again later.
        </p>
      )}

      {!loading && !error && ranking.length === 0 && (
        <p className="empty">No heroes yet. Be the first! 🎮</p>
      )}

      {!loading && !error && ranking.length > 0 && (
        <ul>
          <li className="ranking-header">
            <span>#</span>
            <span>Name</span>
            <span>Level</span>
            <span>Score</span>
            <span>Time</span>
          </li>

          {ranking.map((entry, index) => (
            <li key={entry.id}>
              <span className="rank">#{index + 1}</span>

              <span className="name">{entry.name}</span>

              <span className={`diff ${entry.difficulty}`}>
                {entry.difficulty}
              </span>

              <span className="score">{entry.score}</span>

              <span className="time">
                {entry.time_left === null
                  ? "∞"
                  : `${Math.floor(entry.time_left / 60)
                      .toString()
                      .padStart(2, "0")}:${(entry.time_left % 60)
                      .toString()
                      .padStart(2, "0")}`}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RankingBoard;
