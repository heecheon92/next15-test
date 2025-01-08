"use client";

import { Button } from "@/app/components/shadcn/button";
import { useRenderCount } from "@/app/util/render";
import { cn } from "@/lib/utils";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export default function TicTacToe() {
  const renderCount = useRenderCount();
  return (
    <div className="flex flex-col space-y-4 w-full h-full p-4 bg-gray-100 border-2 rounded-md">
      <header className="text-lg font-bold">{`TicTacToe (rendered ${renderCount} times)`}</header>

      <Game />
    </div>
  );
}

type BoardMark = "O" | "X" | null;
type BoardRow = BoardMark[];

type GameState = {
  history: Array<BoardRow>;
  currentMove: number;
};

type GameActions = {
  setHistory: (
    nextHistory:
      | Array<BoardRow>
      | ((prevHistory: Array<BoardRow>) => Array<BoardRow>)
  ) => void;
  resetGame: () => void;
  setCurrentMove: (
    nextCurrentMove: number | ((prevMove: number) => number)
  ) => void;
  jumpTo: (nextMove: number) => void;
};

const useGameStore = create(
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

type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
};

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center",
        "p-0 bg-white border-[1px solid #999] outline-none",
        "text-[1rem] font-bold"
      )}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

type BoardProps = {
  xIsNext: boolean;
  squares: BoardRow;
  onPlay: (nextSquares: BoardRow) => void;
};

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  const renderCount = useRenderCount();
  const winner = calculateWinner(squares);
  const turns = calculateTurns(squares);
  const player = xIsNext ? "X" : "O";
  const status = calculateStatus(winner, turns, player);

  function handleClick(i: number) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = player;
    onPlay(nextSquares);
  }

  return (
    <section className="flex flex-col space-y-4 border-2 rounded-md p-4 border-green-300">
      <header className="font-semibold">{`Board (rendered ${renderCount} times)`}</header>
      <div className="mb-[0.5rem]">{status}</div>
      <div
        className={cn(
          "grid grid-cols-3 grid-rows-3 gap-0.5",
          "w-[calc(3*2.5rem)] h-[calc(3*2.5rem)] border-[1px solid #999]"
        )}
      >
        {squares.map((squareValue, i) => (
          <Square
            key={`square-${i}`}
            value={squareValue}
            onSquareClick={() => handleClick(i)}
          />
        ))}
      </div>
    </section>
  );
}

function History() {
  const renderCount = useRenderCount();
  const { history, jumpTo } = useGameStore();
  return (
    <section className="flex flex-col space-y-4 border-2 rounded-md p-4 border-green-300">
      <header className="font-semibold">{`History (rendered ${renderCount} times)`}</header>
      <ol>
        {history.map((_, historyIndex) => {
          const description =
            historyIndex > 0
              ? `Go to move #${historyIndex}`
              : "Go to game start";

          return (
            <li key={historyIndex}>
              <button onClick={() => jumpTo(historyIndex)}>
                {description}
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function ControlPanelFullStore() {
  const renderCount = useRenderCount();
  const { resetGame } = useGameStore();
  return (
    <section className="flex flex-col space-y-4 border-2 rounded-md p-4 border-green-300 w-[300px]">
      <header className="font-semibold">{`ControlPanel (rendered ${renderCount} times)`}</header>
      <p className="font-semibold">{`useGameStore()`}</p>
      <Button onClick={resetGame}>Reset Game</Button>
      <footer className="text-sm font-bold whitespace-pre-wrap">
        {
          "This component re-renders even though it is not directly referencing the state object. This is a problem because a developer may not be aware that a component is re-rendering unnecessarily."
        }
      </footer>
    </section>
  );
}

function ControlPanelFullStoreWithSelector() {
  const renderCount = useRenderCount();
  const resetGame = useGameStore((state) => state.resetGame);
  return (
    <section className="flex flex-col space-y-4 border-2 rounded-md p-4 border-green-300 w-[400px]">
      <header className="font-semibold">{`ControlPanel (rendered ${renderCount} times)`}</header>
      <p className="font-semibold">{`useGameStore(state => state.resetGame)`}</p>
      <Button onClick={resetGame}>Reset Game</Button>
      <footer className="text-sm font-bold whitespace-pre-wrap">
        {
          "Luckily, Zustand provides a way to avoid this problem by using a selector-like behavior. This way, the component will only re-render when the selected state changes."
        }
      </footer>
    </section>
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

        <ControlPanelFullStoreWithSelector />
      </div>
    </div>
  );
}

function calculateWinner(squares: BoardRow): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculateTurns(squares: BoardRow): number {
  return squares.filter((square) => !square).length;
}

function calculateStatus(
  winner: string | null,
  turns: number,
  player: string
): string {
  if (!winner && !turns) return "Draw";
  if (winner) return `Winner ${winner}`;
  return `Next player: ${player}`;
}
