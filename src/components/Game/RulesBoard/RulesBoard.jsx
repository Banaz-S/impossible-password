import RuleItem from "./RuleItem";
import "./RulesBoard.css";

function RulesBoard({ rules, password }) {
  return (
    <div className="rules-list">
      {rules.map((rule) => (
        <RuleItem
          key={rule.id}
          text={rule.text}
          satisfied={rule.validate(password)}
        />
      ))}
    </div>
  );
}

export default RulesBoard;
