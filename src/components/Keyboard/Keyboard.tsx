import { useEffect } from "react";
import { RootState } from "../../store/store";
import { gameActions, useDispatch, useSelector } from "../../store";

const letters = "абвгґдеєжзиіїйклмнопрстуфхцчшщьюя".split("");

function Keyboard() {
  const dispatch = useDispatch();
  const guessedLetters = useSelector((state: RootState) => state.game.guessedLetters);

  const handleKeyDown = (event: KeyboardEvent) => {
    const letter = event.key.toLowerCase();
    if (letters.includes(letter) && !guessedLetters.includes(letter)) {
      dispatch(gameActions.guessLetter(letter));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="keyboard">
      {letters.map((letter: string) => (
        <button
          key={letter}
          onClick={() => dispatch(gameActions.guessLetter(letter))}
          disabled={guessedLetters.includes(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default Keyboard;
