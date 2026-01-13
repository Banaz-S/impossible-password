function RuleItem({ text, satisfied = false }) {
  return (
    <div className={`rule-item ${satisfied ? "rule-ok" : "rule-fail"}`}>
      {satisfied ? "✅" : "❌"} {text}
    </div>
  );
}

export default RuleItem;
