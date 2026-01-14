let successAudio;
let breakAudio;
let countdownAudio;
let gameOverAudio;
let gameWinAudio;

// Optional: unlock audio after user interaction
export const unlockAudio = () => {
  const audio = new Audio();
  audio.muted = true;
  audio.play().catch(() => {});
};

// ✅ Rule success
export const playRuleSuccessSound = () => {
  if (!successAudio) {
    successAudio = new Audio("/sounds/rule-success.mp3");
    successAudio.volume = 0.4;
  }

  successAudio.currentTime = 0;
  successAudio.play().catch(() => {});
};

// ✅ Rule break
export const playRuleBreakSound = () => {
  if (!breakAudio) {
    breakAudio = new Audio("/sounds/rule-break.mp3");
    breakAudio.volume = 0.35;
  }

  breakAudio.currentTime = 0;
  breakAudio.play().catch(() => {});
};

// ✅ Countdown (beep beep beep BEEEEEP)
export const playCountdownSound = () => {
  if (!countdownAudio) {
    countdownAudio = new Audio("/sounds/countdown.mp3");
    countdownAudio.volume = 0.5;
  }

  countdownAudio.currentTime = 0;
  countdownAudio.play().catch(() => {});
};

// ✅ Game over
export const playGameOverSound = () => {
  if (!gameOverAudio) {
    gameOverAudio = new Audio("/sounds/game-over.mp3");
    gameOverAudio.volume = 0.5;
  }

  gameOverAudio.currentTime = 0;
  gameOverAudio.play().catch(() => {});
};

// ✅ Game win
export const playGameWinSound = () => {
  if (!gameWinAudio) {
    gameWinAudio = new Audio("/sounds/game-win.mp3");
    gameWinAudio.volume = 0.6;
  }

  gameWinAudio.currentTime = 0;
  gameWinAudio.play().catch(() => {});
};
