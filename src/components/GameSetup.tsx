import React, { useState } from "react";
import "./../styles/GameSetup.css";

interface GameSetupProps {
  totalRounds: number | null;
  setTotalRounds: (rounds: number) => void;
  startGame: (rounds: number) => void;
}

const GameSetup = ({ totalRounds, setTotalRounds, startGame }: GameSetupProps) => {
  const [inputRounds, setInputRounds] = useState(totalRounds || 1);

  const handleStartGame = () => {
    startGame(inputRounds);
  };

  return (
    <div className="game-setup">
      <label>Скільки слів потрібно вгадати?</label>
      <input
        type="number"
        min="1"
        value={inputRounds}
        onChange={(e) => setInputRounds(Number(e.target.value))}
      />
      <button onClick={handleStartGame}>Почати гру</button>
    </div>
  );
};

export default GameSetup;
