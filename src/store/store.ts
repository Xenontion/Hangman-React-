import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as useBaseSelector, useDispatch as useBaseDispatch } from "react-redux";
import gameSlice from './game/gameSlice';

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useBaseSelector
export const useDispatch = useBaseDispatch<AppDispatch>;  