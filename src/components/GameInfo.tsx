import React from "react";
import WordDisplay from "./WordDisplay";
import Keyboard from "./Keyboard/Keyboard";
import "./GameInfo.css";

interface GameInfoProps {
  currentRound: number;
  totalRounds: number;
  word: string;
  guessedLetters: string[];
  incorrectGuesses: number;
  maxAttempts: number;
  timeLeft: number;
  isGameWon: boolean;
  gameOver: boolean;
  handleGuess: (letter: string) => void;
  restart: () => void;
}

const GameInfo = ({
  currentRound,
  totalRounds,
  word,
  guessedLetters,
  incorrectGuesses,
  maxAttempts,
  timeLeft,
  isGameWon,
  gameOver,
  handleGuess,
  restart
}: GameInfoProps) => {
  return (
    <div className="game-info">
      <h2>Раунд: {currentRound} / {totalRounds}</h2>
      <WordDisplay word={word} guessedLetters={guessedLetters} />
      <p>Помилки: {incorrectGuesses} / {maxAttempts}</p>
      <p>Час: {timeLeft} сек</p>
      {!gameOver && !isGameWon && (
        <Keyboard guessedLetters={guessedLetters} onGuess={handleGuess} />
      )}
      {isGameWon && <p className="result success">Слово вгадано!</p>}
      {gameOver && !isGameWon && <p className="result failure">Гру завершено</p>}
      {gameOver && <button className="restart-btn" onClick={restart}>Почати заново</button>}
    </div>
  );
};

export default GameInfo;
