import { useEffect, useState } from "react";
import { playCountdownSound } from "../../../utils/sound";
import "./CountdownOverlay.css";

function CountdownOverlay({ onFinish }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    // ▶️ play the full countdown sound ONCE
    playCountdownSound();

    const interval = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      onFinish();
    }, 4000); // 3,2,1,START = 4 seconds total

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onFinish]);

  return (
    <div className="countdown-overlay">
      <div className="countdown-number">{count > 0 ? count : "START!"}</div>
    </div>
  );
}

export default CountdownOverlay;
