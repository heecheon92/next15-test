"use client";
import { Button } from "@/app/components/shadcn/button";
import { useSesameRouter } from "@/app/hooks/useSesameRouter";
import { useRenderCount } from "@/app/util/render";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { darkModeAtom } from "../atoms";

export default function JotaiPersistence() {
  const renderCount = useRenderCount();
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const router = useSesameRouter();

  return (
    <div
      className={cn(
        "flex flex-col space-y-4 w-full h-full p-4 border-2 rounded-md",
        darkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      )}
    >
      <header className="text-lg font-bold">{`Persistence (rendered ${renderCount} times)`}</header>

      <div>
        <span className="font-bold">Is DarkMode:</span> {darkMode}
      </div>
      <Button
        onClick={() => setDarkMode((prev) => !prev)}
        className={cn(
          darkMode && "bg-yellow-300 hover:bg-yellow-500 text-black"
        )}
      >
        {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
      </Button>

      <Button
        onClick={() => router.refresh()}
        className={cn(
          darkMode && "bg-yellow-300 hover:bg-yellow-500 text-black"
        )}
      >
        Reload Page
      </Button>
    </div>
  );
}
