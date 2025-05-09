import { AppDispatch, RootState, store, useSelector } from "./store";
import gameSlice from "./game/gameSlice";
import { useDispatch } from "react-redux";

export const gameActions = gameSlice.actions

export { store, useSelector, useDispatch };
export type { RootState, AppDispatch };