import { useState } from "react";
import "../styles/GameSetup.css";

interface GameSetupProps {
  totalRounds: number | null;
  setTotalRounds: (rounds: number) => void;
  startGame: (rounds: number) => void;
}

const GameSetup = ({ totalRounds, setTotalRounds, startGame }: GameSetupProps) => {
  const [inputRounds, setInputRounds] = useState(totalRounds || 1);
  const [error, setError] = useState("");

  const handleStartGame = () => {
    if (inputRounds <= 0) {
      setError("Ви ввели 0 раундів, ви автоматично ПРОГРАЛИ");
    } else {
      setError("");
      setTotalRounds(inputRounds);
      startGame(inputRounds);
    }
  };

  return (
    <div className="game-setup">
      <label>Скільки слів потрібно вгадати?</label>
      <input
        type="number"
        min="0"
        value={inputRounds}
        onChange={(e) => setInputRounds(Number(e.target.value))}
      />
      <button onClick={handleStartGame}>Почати гру</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default GameSetup;