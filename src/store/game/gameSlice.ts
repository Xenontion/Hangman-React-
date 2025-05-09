import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from './types';

const initialState: GameState = {
  word: '',
  hint: '',
  guessedLetters: [],
  incorrectGuesses: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setWord(state, action: PayloadAction<{ word: string; hint: string }>) {
      state.word = action.payload.word;
      state.hint = action.payload.hint;
      state.guessedLetters = [];
      state.incorrectGuesses = 0;
    },
    guessLetter(state, action: PayloadAction<string>) {
      const letter = action.payload;
      if (!state.guessedLetters.includes(letter)) {
        state.guessedLetters.push(letter);
        if (!state.word.includes(letter)) {
          state.incorrectGuesses++;
        }
      }
    },
    resetGame(state) {
      state.word = '';
      state.hint = '';
      state.guessedLetters = [];
      state.incorrectGuesses = 0;
    },
  },
});

export default gameSlice;
