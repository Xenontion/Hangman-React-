import React, { useState } from "react";
import "./styles.css";

const words = ["react", "typescript", "javascript", "programming", "developer"];

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const Hangman: React.FC = () => {
  const [word, setWord] = useState<string>(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState<number>(0);

  const maxAttempts = 6;

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || incorrectGuesses >= maxAttempts) return;

    setGuessedLetters([...guessedLetters, letter]);
    if (!word.includes(letter)) {
      setIncorrectGuesses(incorrectGuesses + 1);
    }
  };

  const displayWord = word
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  const isGameWon = displayWord.replace(/ /g, "") === word;
  const isGameOver = incorrectGuesses >= maxAttempts;

  return (
    <div className="container">
      <h1>Игра Вешалка</h1>
      <p className="word-display">{displayWord}</p>
      <p>Ошибки: {incorrectGuesses} / {maxAttempts}</p>
      {!isGameOver && !isGameWon && (
        <div className="keyboard">
          {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
            <button key={letter} onClick={() => handleGuess(letter)} disabled={guessedLetters.includes(letter)}>
              {letter}
            </button>
          ))}
        </div>
      )}
      {isGameWon && <p className="result" style={{ color: "green" }}>Вітаю ви перемогли!</p>}
      {isGameOver && <p className="result" style={{ color: "red" }}>Ви програли. Загадане слово: {word}</p>}
      <button className="restart-btn" onClick={() => {
        setWord(getRandomWord());
        setGuessedLetters([]);
        setIncorrectGuesses(0);
      }}>Начать заново</button>
    </div>
  );
};

export default Hangman;
