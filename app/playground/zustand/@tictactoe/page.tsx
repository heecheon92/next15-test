"use client";

import { useRenderCount } from "@/app/util/render";

import { Board, BoardRow } from "./components/Board";
import {
  ControlPanelFullStore,
  ControlPanelStoreSelector,
} from "./components/ControlPanel";
import { History } from "./components/History";
import { useGameStore } from "./store";

export default function TicTacToe() {
  const renderCount = useRenderCount();
  return (
    <div className="flex flex-col space-y-4 w-full h-full p-4 bg-gray-100 border-2 rounded-md">
      <header className="text-lg font-bold">{`TicTacToe (rendered ${renderCount} times)`}</header>

      <Game />
    </div>
  );
}

function Game() {
  const renderCount = useRenderCount();
  const { history, setHistory, currentMove, setCurrentMove } = useGameStore();
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: BoardRow) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <div className="flex flex-col border-2 rounded-md border-rose-600 p-4 space-y-4">
      <header className="font-semibold">{`Game (rendered ${renderCount} times)`}</header>

      <div className="flex flex-row space-x-4">
        <div>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div>
          <History />
        </div>
      </div>

      <div className="flex flex-row space-x-4">
        <ControlPanelFullStore />

        <ControlPanelStoreSelector />
      </div>
    </div>
  );
}
