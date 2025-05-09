import { createContext, useContext, useEffect } from "react";

export const letters = "абвгґдеєжзиіїйклмнопрстуфхцчшщьюя".split("");

interface GameContextType {
  guessedLetters: string[];
  onGuess: (letter: string) => void;
  clearGuessedLetters?: () => void;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  return context;
};

export const useKeyboardHandler = () => {
  const context = useGame();

  useEffect(() => {
    if (!context) return;
    const { guessedLetters, onGuess } = context;

    const handleKeyDown = (event: KeyboardEvent) => {
      const letter = event.key.toLowerCase();
      if (letters.includes(letter) && !guessedLetters.includes(letter)) {
        onGuess(letter);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [context]);
};