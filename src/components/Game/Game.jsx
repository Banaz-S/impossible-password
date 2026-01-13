import "./Game.css";
import { useState, useRef, useEffect } from "react";

import GameHeader from "./GameHeader/GameHeader";
import PasswordInput from "./PasswordInput/PasswordInput";
import RulesBoard from "./RulesBoard/RulesBoard";
import WinScreen from "../WinScreen/WinScreen";
import { playRuleBreakSound } from "../../utils/sound";

import { RULES } from "../../data/rules";

function Game({ playerName, difficulty, onExit }) {
  // --------------------
  // STATE
  // --------------------
  const [password, setPassword] = useState("");
  const [hasWon, setHasWon] = useState(false);
  const [score, setScore] = useState(0);
  const prevRuleStatesRef = useRef([]);
  const breakSoundCooldownRef = useRef(false);

  const passwordInputRef = useRef(null);

  // --------------------
  // TIME (placeholder)
  // --------------------
  const timeLeft =
    difficulty === "easy" ? "∞" : difficulty === "medium" ? "01:30" : "01:00";

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
  // FOCUS PASSWORD INPUT ON GAME START
  // --------------------
  useEffect(() => {
    passwordInputRef.current?.focus();
  }, []);

  // --------------------
  // UPDATE RULE STATES BASED ON PASSWORD
  // --------------------
  useEffect(() => {
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
  }, [password]);

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

    setScore(Math.floor(satisfiedCount * 10 * multiplier));

    if (
      ruleStates.length > 0 &&
      ruleStates.every((r) => r.state !== "failed")
    ) {
      setHasWon(true);
    }
  }, [ruleStates, difficulty]);

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
    <div className="game-screen">
      <GameHeader
        playerName={playerName}
        difficulty={difficulty}
        timeLeft={timeLeft}
        score={score}
      />

      <PasswordInput
        ref={passwordInputRef}
        password={password}
        setPassword={setPassword}
        disabled={false}
      />

      <RulesBoard rules={ruleStates} />

      <button className="exit-button" onClick={onExit}>
        Exit Game
      </button>
    </div>
  );
}

export default Game;
