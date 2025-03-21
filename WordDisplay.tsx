import { useMemo } from "react";

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
}



function WordDisplay({ word, guessedLetters }: WordDisplayProps) {
    

    const res = useMemo(()=> {
        const letters = word.split("");

        const replaceLetter = (letter: string) => guessedLetters.includes(letter) ? letter : "_";
        return letters.map(replaceLetter).join(" ")
    }, [word, guessedLetters])

  return (
    <p className="word-display">
      {res}
    </p>
  );
}

export default WordDisplay;
