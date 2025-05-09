export interface GameState {
    word: string;
    hint: string;
    guessedLetters: string[];
    incorrectGuesses: number;
  }