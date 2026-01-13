import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { playRuleSuccessSound, playRuleBreakSound } from "../../../utils/sound";

function RuleItem({ text, state }) {
  const prevState = useRef(state);
  const isSatisfied = state === "satisfied-visible";

  useEffect(() => {
    // ❌ → ✅ (rule fulfilled)
    if (prevState.current === "failed" && state === "satisfied-visible") {
      playRuleSuccessSound();
    }

    // ✅ → ❌ (rule broken again)
    if (prevState.current !== "failed" && state === "failed") {
      playRuleBreakSound();
    }

    prevState.current = state;
  }, [state]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 0, scale: 1 }}
      animate={{
        opacity: 1,
        y: isSatisfied ? -40 : 0,
        scale: isSatisfied ? 1.05 : 1,
      }}
      transition={{
        y: { duration: 0.8, ease: "easeOut" },
        scale: { duration: 0.2, ease: "easeOut" },
        opacity: { duration: 0.4 },
      }}
      exit={{ opacity: 0 }}
      className={`rule-item ${isSatisfied ? "rule-ok" : "rule-fail"}`}
    >
      {isSatisfied ? "✅" : "❌"} {text}
    </motion.div>
  );
}

export default RuleItem;
