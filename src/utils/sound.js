let successAudio;
let breakAudio;

export const playRuleSuccessSound = () => {
  if (!successAudio) {
    successAudio = new Audio("/src/assets/sounds/rule-success.mp3");
    successAudio.volume = 0.4;
  }

  successAudio.currentTime = 0;
  successAudio.play().catch(() => {});
};

export const playRuleBreakSound = () => {
  if (!breakAudio) {
    breakAudio = new Audio("/src/assets/sounds/rule-break.mp3");
    breakAudio.volume = 0.35;
  }

  breakAudio.currentTime = 0;
  breakAudio.play().catch(() => {});
};
