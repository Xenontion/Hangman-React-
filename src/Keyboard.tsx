import React, { useEffect } from "react";

interface KeyboardProps {
  guessedLetters: string[];
  onGuess: (letter: string) => void;
}

function Keyboard({ guessedLetters, onGuess }: KeyboardProps) {
  const letters = "абвгґдеєжзиіїйклмнопрстуфхцчшщьюя".split("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const letter = event.key.toLowerCase();
      if (letters.includes(letter) && !guessedLetters.includes(letter)) {
        onGuess(letter);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [guessedLetters, onGuess]);

  return (
    <div className="keyboard">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onGuess(letter)}
          disabled={guessedLetters.includes(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default Keyboard;
