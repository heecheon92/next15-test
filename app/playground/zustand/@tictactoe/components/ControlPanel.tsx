import { Button } from "@/app/components/shadcn/button";
import { useRenderCount } from "@/app/util/render";
import { useGameStore } from "../store";

export function ControlPanelFullStore() {
  const renderCount = useRenderCount();
  const { resetGame } = useGameStore();
  return (
    <section className="flex flex-col space-y-4 border-2 rounded-md p-4 border-green-300 w-[400px]">
      <header className="font-semibold">{`ControlPanel (rendered ${renderCount} times)`}</header>
      <p className="font-semibold">{`const { resetGame } = useGameStore();`}</p>
      <Button onClick={resetGame}>Reset Game</Button>
      <footer className="text-sm font-bold whitespace-pre-wrap">
        {
          "This component re-renders even though it is not directly referencing the state object. This is a problem because a developer may not be aware that a component is re-rendering unnecessarily."
        }
      </footer>
    </section>
  );
}

export function ControlPanelStoreSelector() {
  const renderCount = useRenderCount();
  const resetGame = useGameStore((state) => state.resetGame);
  return (
    <section className="flex flex-col space-y-4 border-2 rounded-md p-4 border-green-300 w-[600px]">
      <header className="font-semibold">{`ControlPanel (rendered ${renderCount} times)`}</header>
      <p className="font-semibold">{`const resetGame = useGameStore((state) => state.resetGame);`}</p>
      <Button onClick={resetGame}>Reset Game</Button>
      <footer className="text-sm font-bold whitespace-pre-wrap">
        {
          "Luckily, Zustand provides a way to avoid this problem by using a selector-like behavior. This way, the component will only re-render when the selected state changes."
        }
      </footer>
    </section>
  );
}
