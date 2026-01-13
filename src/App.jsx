import { useState } from "react";
import StartScreen from "./components/StartScreen/StartScreen";
import Game from "./components/Game/Game";

function App() {
  const [screen, setScreen] = useState("start");
  const [playerName, setPlayerName] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  if (screen === "game") {
    return (
      <Game
        playerName={playerName}
        difficulty={difficulty}
        onExit={() => setScreen("start")}
      />
    );
  }

  return (
    <StartScreen
      playerName={playerName}
      setPlayerName={setPlayerName}
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      onStart={() => setScreen("game")}
    />
  );
}

export default App;
