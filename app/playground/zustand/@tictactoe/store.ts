import { create } from "zustand";
import { combine } from "zustand/middleware";
import { StateOrUpdater } from "../type";
import { BoardRow } from "./components/Board";

type GameState = {
  history: BoardRow[];
  currentMove: number;
};

type GameActions = {
  setHistory: (nextHistory: StateOrUpdater<BoardRow[]>) => void;
  resetGame: () => void;
  setCurrentMove: (nextCurrentMove: StateOrUpdater<number>) => void;
  jumpTo: (nextMove: number) => void;
};

export const useGameStore = create(
  combine<GameState, GameActions>(
    {
      history: [Array(9).fill(null)],
      currentMove: 0,
    },
    (set, _get) => ({
      setHistory: (nextHistory) => {
        set((state) => ({
          history:
            typeof nextHistory === "function"
              ? nextHistory(state.history)
              : nextHistory,
        }));
      },
      resetGame: () => {
        set({ history: [Array(9).fill(null)], currentMove: 0 });
      },
      setCurrentMove: (nextCurrentMove) => {
        set((state) => ({
          currentMove:
            typeof nextCurrentMove === "function"
              ? nextCurrentMove(state.currentMove)
              : nextCurrentMove,
        }));
      },
      jumpTo: (nextMove) => {
        if (nextMove === 0)
          set({ history: [Array(9).fill(null)], currentMove: 0 });
        else set({ currentMove: nextMove });
      },
    })
  )
);
