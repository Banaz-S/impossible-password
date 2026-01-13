import "./Game.css";
import { useState, useRef, useEffect } from "react";

import GameHeader from "./GameHeader/GameHeader";
import PasswordInput from "./PasswordInput/PasswordInput";
import RulesBoard from "./RulesBoard/RulesBoard";
import WinScreen from "../WinScreen/WinScreen";
import { playRuleBreakSound } from "../../utils/sound";
import { playGameOverSound } from "../../utils/sound";
import { playGameWinSound } from "../../utils/sound";
// import { saveScore } from "../../utils/ranking";
import CountdownOverlay from "./CountdownOverlay/CountdownOverlay";
import GameOverScreen from "../GameOverScreen/GameOverScreen";
import ExitConfirmModal from "../ExitConfirmModal/ExitConfirmModal";
import { saveScoreToSupabase } from "../../services/rankingService";
import { calculateFinalScore } from "../../utils/score";
import { RULES } from "../../data/rules";

function Game({ playerName, difficulty, onExit }) {
  // --------------------
  // STATE
  // --------------------
  const [password, setPassword] = useState("");
  const [hasWon, setHasWon] = useState(false);
  const [score, setScore] = useState(0);
  const breakSoundCooldownRef = useRef(false);
  const [hasLost, setHasLost] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const getInitialTime = () => {
    if (difficulty === "medium") return 90; // seconds
    if (difficulty === "evil") return 120;
    return null; // easy = unlimited
  };

  const [countdownDone, setCountdownDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getInitialTime());
  const passwordInputRef = useRef(null);

  const formatTime = (seconds) => {
    if (seconds === null) return "Unlimite";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // --------------------
  // RULE STATES
  // --------------------
  const [ruleStates, setRuleStates] = useState(() =>
    RULES[difficulty].map((rule) => ({
      ...rule,
      state: "failed", // failed | satisfied-visible | satisfied-hidden
    }))
  );

  // --------------------
  // TIMER FOR MEDIUM/EVIL DIFFICULTY
  // --------------------
  useEffect(() => {
    if (!countdownDone) return;
    if (timeLeft === null) return; // easy mode

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setHasLost(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownDone]);

  //---------------------
  // PLAY GAME OVER SOUND ON LOSS
  //---------------------
  useEffect(() => {
    if (hasLost) {
      playGameOverSound();
      saveScoreToSupabase({
        name: playerName,
        difficulty,
        score,
        timeLeft: 0,
      });
    }
  }, [hasLost]);

  //---------------------
  // PLAY WIN SOUND ON VICTORY
  //---------------------
  useEffect(() => {
    if (!hasWon) return;

    const satisfiedRules = ruleStates.filter(
      (r) => r.state !== "failed"
    ).length;

    const finalScore = calculateFinalScore({
      satisfiedRules,
      difficulty,
      timeLeft,
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScore(finalScore);

    playGameWinSound();

    saveScoreToSupabase({
      name: playerName,
      difficulty,
      score: finalScore,
      timeLeft,
    });
  }, [hasWon]);

  //---------------------
  // FOCUS PASSWORD INPUT ON GAME START
  // --------------------
  useEffect(() => {
    passwordInputRef.current?.focus();
  }, []);

  // --------------------
  // UPDATE RULE STATES BASED ON PASSWORD
  // --------------------
  useEffect(
    () => {
      // ⛔ Stop rule updates after game over
      if (hasLost) return;

      setRuleStates((prevRules) => {
        const updatedRules = prevRules.map((rule) => {
          const isValid = rule.validate(password);

          if (isValid && rule.state === "failed") {
            return { ...rule, state: "satisfied-visible" };
          }

          if (!isValid && rule.state !== "failed") {
            return { ...rule, state: "failed" };
          }

          return rule;
        });

        // 🔊 debounced break sound
        if (!breakSoundCooldownRef.current) {
          const hasBrokenRule = prevRules.some((prevRule, index) => {
            const nextRule = updatedRules[index];
            return prevRule.state !== "failed" && nextRule.state === "failed";
          });

          if (hasBrokenRule) {
            playRuleBreakSound();
            breakSoundCooldownRef.current = true;

            setTimeout(() => {
              breakSoundCooldownRef.current = false;
            }, 300);
          }
        }

        return updatedRules;
      });
    },
    [password],
    hasLost
  );

  // --------------------
  // HIDE RULE AFTER ANIMATION DELAY
  // --------------------
  useEffect(() => {
    const timers = [];

    ruleStates.forEach((rule) => {
      if (rule.state === "satisfied-visible") {
        const timer = setTimeout(() => {
          setRuleStates((prev) =>
            prev.map((r) =>
              r.id === rule.id ? { ...r, state: "satisfied-hidden" } : r
            )
          );
        }, 1000); // visible for 1 second

        timers.push(timer);
      }
    });

    return () => timers.forEach(clearTimeout);
  }, [ruleStates]);

  // --------------------
  // SCORE & WIN CONDITION
  // --------------------
  useEffect(() => {
    const satisfiedCount = ruleStates.filter(
      (r) => r.state !== "failed"
    ).length;

    let multiplier = 1;
    if (difficulty === "medium") multiplier = 1.5;
    if (difficulty === "evil") multiplier = 2;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScore(Math.floor(satisfiedCount * 10 * multiplier));

    if (
      ruleStates.length > 0 &&
      ruleStates.every((r) => r.state !== "failed")
    ) {
      setHasWon(true);
    }
  }, [ruleStates, difficulty]);

  //---------------------
  // GAME OVER SCREEN
  //---------------------
  if (hasLost) {
    return (
      <GameOverScreen
        playerName={playerName}
        score={score}
        onRestart={onExit}
      />
    );
  }

  // --------------------
  // WIN SCREEN
  // --------------------
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

  // --------------------
  // GAME UI
  // --------------------
  return (
    <>
      {showExitConfirm && (
        <ExitConfirmModal
          onConfirm={onExit}
          onCancel={() => setShowExitConfirm(false)}
        />
      )}

      <div
        className={`game-screen ${
          !countdownDone || showExitConfirm ? "game-locked" : ""
        }`}
      >
        {/* 🔒 Countdown overlay — MUST BE FIRST */}
        {!countdownDone && (
          <CountdownOverlay
            onFinish={() => {
              setCountdownDone(true);
              setTimeout(() => {
                passwordInputRef.current?.focus();
              }, 100);
            }}
          />
        )}

        <GameHeader
          playerName={playerName}
          difficulty={difficulty}
          timeLeft={formatTime(timeLeft)}
          score={score}
        />

        <PasswordInput
          ref={passwordInputRef}
          password={password}
          setPassword={setPassword}
          disabled={!countdownDone || hasLost}
        />

        <RulesBoard rules={ruleStates} />

        <button
          className="exit-button"
          onClick={() => setShowExitConfirm(true)}
        >
          Exit Game
        </button>
      </div>
    </>
  );
}

export default Game;
