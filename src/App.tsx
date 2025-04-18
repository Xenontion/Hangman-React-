import { useState, useEffect } from "react";
import WordDisplay from "./components/WordDisplay";
import Keyboard from "./components/Keyboard/Keyboard";
import GameSetup from "./components/GameSetup";
import GameInfo from "./components/GameInfo";
import "./styles.css";

const words = ["реакція", "програмування", "розробник", "алгоритм", "інтерфейс"];
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];
const maxAttempts = 6;
const baseTimeLimit = 30;
const bonusTime = 30;
const penaltyTime = 5; 

const Hangman = () => {
  const [totalRounds, setTotalRounds] = useState<number | null>(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [word, setWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(baseTimeLimit);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const isGameWon = word.split('').every(letter => guessedLetters.includes(letter));

  useEffect(() => {
    if (timeLeft > 0 && !gameOver && gameStarted) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver, gameStarted]);

  useEffect(() => {
    if (isGameWon) {
      if (currentRound < (totalRounds || 0)) {
        setTimeout(() => {
          setWord(getRandomWord());
          setGuessedLetters([]);
          setIncorrectGuesses(0);
          setTimeLeft(prev => prev + bonusTime);
          setCurrentRound(prev => prev + 1);
        }, 1000);
      } else {
        setGameOver(true);
      }
    } else if (incorrectGuesses >= maxAttempts) {
      setGameOver(true);
    }
  }, [isGameWon, incorrectGuesses]);

  const handleGuess = (letter: string) => {
    if (gameOver || guessedLetters.includes(letter)) return;

    setGuessedLetters(prev => [...prev, letter]);

    if (!word.includes(letter)) {
      setIncorrectGuesses(prev => prev + 1);
      setTimeLeft(prev => Math.max(prev - penaltyTime, 0)); 
    }
  };

  const startGame = (rounds: number) => {
    setTotalRounds(rounds);
    setGameStarted(true);
    setGameOver(false);
    setCurrentRound(1);
    setWord(getRandomWord());
    setGuessedLetters([]);
    setIncorrectGuesses(0);
    setTimeLeft(baseTimeLimit);
  };

  const restart = () => {
    setGameStarted(false);
    setTotalRounds(null);
    setCurrentRound(1);
    setGameOver(false);
    setTimeLeft(baseTimeLimit);
  };

  return (
    <div className="container">
      <h1>Гра Вгадай Слово (Кілька Раундів)</h1>
      {!gameStarted ? (
        <GameSetup totalRounds={totalRounds} setTotalRounds={setTotalRounds} startGame={startGame} />
      ) : (
        <GameInfo
          currentRound={currentRound}
          totalRounds={totalRounds!}
          word={word}
          guessedLetters={guessedLetters}
          incorrectGuesses={incorrectGuesses}
          maxAttempts={maxAttempts}
          timeLeft={timeLeft}
          isGameWon={isGameWon}
          gameOver={gameOver}
          handleGuess={handleGuess}
          restart={restart}
        />
      )}
    </div>
  );
};

export default Hangman;
