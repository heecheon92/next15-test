import { useRenderCount } from "@/app/util/render";
import { cn } from "@/lib/utils";
import { calculateStatus, calculateTurns, calculateWinner } from "../util";

export type BoardMark = "O" | "X" | null;
export type BoardRow = BoardMark[];
export type BoardProps = {
  xIsNext: boolean;
  squares: BoardRow;
  onPlay: (nextSquares: BoardRow) => void;
};
type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
};

export function Board({ xIsNext, squares, onPlay }: BoardProps) {
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
