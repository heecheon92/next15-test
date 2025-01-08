"use client";

import { Button } from "@/app/components/shadcn/button";
import { useRenderCount } from "@/app/util/render";
import { useAtom } from "jotai";
import { objectAtom } from "../atoms";

export default function JotaiSelector() {
  const renderCount = useRenderCount();
  const [object, setObject] = useAtom(objectAtom);

  return (
    <div className="flex flex-col space-y-4 w-full h-full p-4 bg-gray-100 border-2 rounded-md">
      <header className="text-lg font-bold">{`Selector (rendered ${renderCount} times)`}</header>

      <div className="flex flex-col space-y-2">
        <span className="font-bold">Object:</span>
        <pre>{JSON.stringify(object, null, 2)}</pre>
      </div>
      <div className="flex flex-row space-x-4">
        <Button
          onClick={() =>
            setObject((o) => ({
              greeting: o.greeting === "Hello" ? "Bye" : "Hello",
              name: o.name === "Jotai" ? "React" : "Jotai",
            }))
          }
        >
          Change Object Fields
        </Button>
      </div>
    </div>
  );
}