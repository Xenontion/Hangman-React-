import { ReactNode, useState } from "react";
import { GameContext, letters } from "./GameContext";

interface GameProviderProps {
  children: ReactNode;
}

const GameProvider = ({ children }: GameProviderProps) => {
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const handleOnGuess = (letter: string) => {
    if (letters.includes(letter) && !guessedLetters.includes(letter)) {
      setGuessedLetters(prev => [...prev, letter]);
    }
  };

  const clearGuessedLetters = () => {
    setGuessedLetters([]);
  };

  return (
    <GameContext.Provider value={{ guessedLetters, onGuess: handleOnGuess, clearGuessedLetters }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
