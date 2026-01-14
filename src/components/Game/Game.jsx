import "./Game.css";
import { useState, useRef, useEffect, useMemo } from "react";

import GameHeader from "./GameHeader/GameHeader";
import PasswordInput from "./PasswordInput/PasswordInput";
import RulesBoard from "./RulesBoard/RulesBoard";
import WinScreen from "../WinScreen/WinScreen";
import GameOverScreen from "../GameOverScreen/GameOverScreen";
import ExitConfirmModal from "../ExitConfirmModal/ExitConfirmModal";
import CountdownOverlay from "./CountdownOverlay/CountdownOverlay";

import { playRuleBreakSound } from "../../utils/sound";
import { playGameOverSound, playGameWinSound } from "../../utils/sound";
import { calculateFinalScore } from "../../utils/score";

import { RULE_POOLS } from "../../data/rules";
import { pickRandomRules } from "../../utils/pickRandomRules";

import { saveScoreToSupabase } from "../../services/rankingService";
import { saveFailedAttempt } from "../../services/attemptsService";

const RULE_COUNT = {
  easy: 7,
  medium: 10,
  evil: 14,
};

function Game({ playerName, difficulty, onExit }) {
  // --------------------
  // BASIC STATE
  // --------------------
  const [password, setPassword] = useState("");
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [score, setScore] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [rankingVersion, setRankingVersion] = useState(0);

  const passwordInputRef = useRef(null);
  const breakSoundCooldownRef = useRef(false);
  const lossSavedRef = useRef(false);

  // --------------------
  // TIMER
  // --------------------
  const getInitialTime = () => {
    if (difficulty === "medium") return 90;
    if (difficulty === "evil") return 120;
    return null;
  };

  const [timeLeft, setTimeLeft] = useState(getInitialTime);
  const [countdownDone, setCountdownDone] = useState(false);

  const formatTime = (seconds) => {
    if (seconds === null) return "∞";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // --------------------
  // RANDOM RULES (ONCE)
  // --------------------
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const initialRules = useMemo(() => {
    return pickRandomRules(RULE_POOLS[difficulty], RULE_COUNT[difficulty]).map(
      (rule) => ({
        ...rule,
        state: "failed",
      })
    );
  }, []);

  const [ruleStates, setRuleStates] = useState(initialRules);

  // --------------------
  // TIMER EFFECT
  // --------------------
  useEffect(() => {
    if (!countdownDone || timeLeft === null || hasWon || hasLost) return;

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
  }, [countdownDone, hasWon, hasLost]);

  // --------------------
  // PASSWORD INPUT FOCUS
  // --------------------
  useEffect(() => {
    passwordInputRef.current?.focus();
  }, []);

  // --------------------
  // RULE VALIDATION
  // --------------------
  useEffect(() => {
    if (hasWon || hasLost) return;

    setRuleStates((prevRules) => {
      const updated = prevRules.map((rule) => {
        const valid = rule.validate(password);

        if (valid && rule.state === "failed") {
          return { ...rule, state: "satisfied-visible" };
        }

        if (!valid && rule.state !== "failed") {
          return { ...rule, state: "failed" };
        }

        return rule;
      });

      if (!breakSoundCooldownRef.current) {
        const broken = prevRules.some(
          (r, i) => r.state !== "failed" && updated[i].state === "failed"
        );

        if (broken) {
          playRuleBreakSound();
          breakSoundCooldownRef.current = true;
          setTimeout(() => (breakSoundCooldownRef.current = false), 300);
        }
      }

      return updated;
    });
  }, [password]);

  // --------------------
  // HIDE SATISFIED RULES
  // --------------------
  useEffect(() => {
    const timers = [];

    ruleStates.forEach((rule) => {
      if (rule.state === "satisfied-visible") {
        timers.push(
          setTimeout(() => {
            setRuleStates((prev) =>
              prev.map((r) =>
                r.id === rule.id ? { ...r, state: "satisfied-hidden" } : r
              )
            );
          }, 1000)
        );
      }
    });

    return () => timers.forEach(clearTimeout);
  }, [ruleStates]);

  // --------------------
  // SCORE + WIN CHECK
  // --------------------
  useEffect(() => {
    if (hasWon || hasLost) return;

    const satisfied = ruleStates.filter((r) => r.state !== "failed").length;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScore(
      Math.floor(
        satisfied *
          10 *
          (difficulty === "medium" ? 1.5 : difficulty === "evil" ? 2 : 1)
      )
    );

    if (
      ruleStates.length > 0 &&
      ruleStates.every((r) => r.state !== "failed")
    ) {
      setHasWon(true);
    }
  }, [ruleStates, difficulty]);

  // --------------------
  // WIN HANDLER
  // --------------------
  useEffect(() => {
    if (!hasWon) return;

    const satisfied = ruleStates.length;
    const finalScore = calculateFinalScore({
      satisfiedRules: satisfied,
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
    }).then(() => setRankingVersion((v) => v + 1));
  }, [hasWon]);

  // --------------------
  // LOSS HANDLER
  // --------------------
  useEffect(() => {
    if (!hasLost || lossSavedRef.current) return;

    lossSavedRef.current = true;
    playGameOverSound();

    saveFailedAttempt({
      name: playerName,
      difficulty,
      score,
      timeLeft,
      reason: "time_up",
    });
  }, [hasLost]);

  // --------------------
  // SCREENS
  // --------------------
  if (hasLost) {
    return (
      <GameOverScreen
        playerName={playerName}
        score={score}
        onRestart={onExit}
      />
    );
  }

  if (hasWon) {
    return (
      <WinScreen
        playerName={playerName}
        difficulty={difficulty}
        password={password}
        score={score}
        rankingVersion={rankingVersion}
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
        {!countdownDone && (
          <CountdownOverlay
            onFinish={() => {
              setCountdownDone(true);
              setTimeout(() => passwordInputRef.current?.focus(), 100);
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
          disabled={!countdownDone}
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
