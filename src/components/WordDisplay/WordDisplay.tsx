import { useMemo, memo } from "react";
import styles from "./WordDisplay.module.css";

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
}

function WordDisplay({ word, guessedLetters }: WordDisplayProps) {
  const res = useMemo(() => {
    const letters = word.split("");
    const replaceLetter = (letter: string) => guessedLetters.includes(letter) ? letter : "_";
    return letters.map(replaceLetter).join(" ");
  }, [word, guessedLetters]);

  return <p className={styles.root}>{res}</p>;
}

export default memo(WordDisplay);