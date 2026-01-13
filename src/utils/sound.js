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

let countdownAudio;

export const playCountdownSound = () => {
  if (!countdownAudio) {
    countdownAudio = new Audio("/src/assets/sounds/countdown.mp3");
    countdownAudio.volume = 0.5;
  }

  countdownAudio.currentTime = 0;
  countdownAudio.play().catch(() => {});
};

let gameOverAudio;

export const playGameOverSound = () => {
  if (!gameOverAudio) {
    gameOverAudio = new Audio("/src/assets/sounds/game-over.mp3");
    gameOverAudio.volume = 0.5;
  }

  gameOverAudio.currentTime = 0;
  gameOverAudio.play().catch(() => {});
};

let gameWinAudio;

export const playGameWinSound = () => {
  if (!gameWinAudio) {
    gameWinAudio = new Audio("/src/assets/sounds/game-win.mp3");
    gameWinAudio.volume = 0.6;
  }

  gameWinAudio.currentTime = 0;
  gameWinAudio.play().catch(() => {});
};
