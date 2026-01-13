export const getDifficultyMultiplier = (difficulty) => {
  if (difficulty === "medium") return 1.5;
  if (difficulty === "evil") return 2;
  return 1;
};

export const calculateFinalScore = ({
  satisfiedRules,
  difficulty,
  timeLeft, // seconds or null
}) => {
  const multiplier = getDifficultyMultiplier(difficulty);

  const baseScore = Math.floor(satisfiedRules * 10 * multiplier);

  // Easy has unlimited time → no time bonus
  if (timeLeft === null) {
    return baseScore;
  }

  const timeBonus = Math.floor(timeLeft * multiplier);

  return baseScore + timeBonus;
};
