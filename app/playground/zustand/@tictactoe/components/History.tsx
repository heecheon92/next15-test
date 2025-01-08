import { useRenderCount } from "@/app/util/render";
import { useGameStore } from "../store";

export function History() {
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
