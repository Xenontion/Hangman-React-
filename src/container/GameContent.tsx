import { useEffect, useState } from "react";
import GameSetup from "../components/GameSetup";
import GameInfo from "../components/GameInfo/GameInfo";
import { useSelector,gameActions, useDispatch } from "../store";
import data from "../data/data.json";

const getRandomEntry = () => data[Math.floor(Math.random() * data.length)];
const baseTime = 30;
const maxAttempts = 6;

const GameContent = () => {
  const dispatch = useDispatch();
  const { word, hint, guessedLetters, incorrectGuesses } = useSelector(state => state.game);

  const [timeLeft, setTimeLeft] = useState(baseTime);
  const [gameStarted, setGameStarted] = useState(false);
  const [rounds, setRounds] = useState<number | null>(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    if (!gameStarted || timeLeft === 0 || gameOver) return;
    const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, gameOver]);

  useEffect(() => {
    if (timeLeft === 0 && gameStarted) {
      setGameOver(true);
      setGameStarted(false);
    }
  }, [timeLeft, gameStarted]);

  useEffect(() => {
    if (guessedLetters.length) {
      const wordGuessed = word.split('').every(letter => guessedLetters.includes(letter));

      if (incorrectGuesses >= maxAttempts) {
        setGameOver(true);
        setGameStarted(false);
      }

      if (wordGuessed) {
        setIsGameWon(true);
        // Зберігаємо статистику
        const prev = Number(localStorage.getItem("guessedWords") || 0);
        localStorage.setItem("guessedWords", String(prev + 1));
        if (rounds && currentRound < rounds) {
          setTimeout(() => {
            const newWord = getRandomEntry();
            dispatch(gameActions.setWord(newWord));
            setTimeLeft(baseTime);
            setCurrentRound(prev => prev + 1);
            setIsGameWon(false);
          }, 1000);
        } else {
          setGameOver(true);
          setGameStarted(false);
        }
      }
    }
  }, [guessedLetters]);

  const restartGame = () => {
    dispatch(gameActions.resetGame());
    const newWord = getRandomEntry();
    dispatch(gameActions.setWord(newWord));
    setGameStarted(false);
    setGameOver(false);
    setRounds(null);
    setCurrentRound(1);
    setTimeLeft(baseTime);
    setIsGameWon(false);
  };

  if (!gameStarted) {
    return (
      <GameSetup
        totalRounds={rounds}
        setTotalRounds={setRounds}
        startGame={(count) => {
          setRounds(count);
          setGameStarted(true);
          dispatch(gameActions.setWord(getRandomEntry()));
          setTimeLeft(baseTime);
          setCurrentRound(1);
          setGameOver(false);
          setIsGameWon(false);
        }}
      />
    );
  }

  return (
    <GameInfo
      currentRound={currentRound}
      totalRounds={rounds ?? 1}
      word={word}
      hint={hint}
      incorrectGuesses={incorrectGuesses}
      maxAttempts={maxAttempts}
      timeLeft={timeLeft}
      isGameWon={isGameWon}
      gameOver={gameOver}
      restart={restartGame}
    />
  );
};

export default GameContent;
