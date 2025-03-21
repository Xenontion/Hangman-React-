import { useState, useEffect } from "react";
import WordDisplay from "./WordDisplay";
import Keyboard from "./Keyboard";
import "./styles.css";

const words = ["реакція", "програмування", "розробник", "алгоритм", "інтерфейс"];
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];
const maxAttempts = 6;
const timeLimit = 30;

const Hangman = () => {
  const [word, setWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [gameOver, setGameOver] = useState(false);

  const isGameWon = word.split('').every(letter => guessedLetters.includes(letter));
  const isGameOver = incorrectGuesses >= maxAttempts || gameOver;

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver && !isGameWon) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => {
        clearTimeout(timer);
      };
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, isGameOver, isGameWon]);

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || isGameOver) return;
    setGuessedLetters(prev => [...prev, letter]);
    if (!word.includes(letter)) {
      setIncorrectGuesses(prev => prev + 1);
    }
  };

  const restartGame = () => {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setIncorrectGuesses(0);
    setTimeLeft(timeLimit);
    setGameOver(false);
  };

  return (
    <div className="container">
      <h1>Гра Повішання(Вгадай Слово)</h1>
      <WordDisplay word={word} guessedLetters={guessedLetters} />
      <p>Помилки: {incorrectGuesses} / {maxAttempts}</p>
      <p>Час: {timeLeft} сек</p>
      {!isGameOver && !isGameWon && <Keyboard guessedLetters={guessedLetters} onGuess={handleGuess} />}
      {isGameWon && <p className="result" style={{ color: "green" }}>Вітаю, ви перемогли!</p>}
      {isGameOver && <p className="result" style={{ color: "red" }}>Ви програли. Загадане слово: {word}</p>}
      <button className="restart-btn" onClick={restartGame}>Почати заново</button>
    </div>
  );
};

export default Hangman;
