import { AnimatePresence } from "framer-motion";
import RuleItem from "./RuleItem";
import "./RulesBoard.css";

function RulesBoard({ rules }) {
  return (
    <div className="rules-list">
      {rules
        .filter((r) => r.state !== "satisfied-hidden")
        .map((rule) => (
          <RuleItem key={rule.id} text={rule.text} state={rule.state} />
        ))}
    </div>
  );
}

export default RulesBoard;
