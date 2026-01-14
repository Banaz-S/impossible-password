export function pickRandomRules(pool, count) {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, count);
}
