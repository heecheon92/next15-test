"use client";

import { Button } from "@/app/components/shadcn/button";
import { log } from "@/app/util/logger";
import { useAtom, useAtomValue } from "jotai";
import { countAtom, objectAtom, textAtom } from "../atoms";

export default function JotaiPrimitive() {
  const [count, setCount] = useAtom(countAtom);
  const [text, setText] = useAtom(textAtom);
  const [object, setObject] = useAtom(objectAtom);

  log("Primitive rerendered");

  return (
    <div className="flex flex-col space-y-4 w-full h-full p-4 bg-gray-100 border-2 rounded-md">
      <header className="text-lg font-bold">Primitive</header>

      <div className="flex flex-col space-y-2">
        <div>
          <span className="font-bold">Count:</span> {count}
        </div>
        <div className="flex flex-row space-x-4">
          <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
          <Button onClick={() => setCount((c) => c - 1)}>Decrement</Button>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <div>
          <span className="font-bold">Text:</span> {text}
        </div>
        <div className="flex flex-row space-x-4">
          <Button
            onClick={() =>
              setText((t) => {
                let result = "";
                for (let i = t.length - 1; i >= 0; --i) result += t[i];
                return result;
              })
            }
          >
            Reverse text
          </Button>
        </div>

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

      <PrimitiveSummary />
    </div>
  );
}

function PrimitiveSummary() {
  const count = useAtomValue(countAtom);
  const text = useAtomValue(textAtom);
  const object = useAtomValue(objectAtom);

  return (
    <div className="flex flex-col space-y-4 w-full p-4 bg-gray-100">
      <header className="text-2xl font-bold">
        Summary (This is a child component)
      </header>
      <div className="flex flex-row w-full justify-between">
        <div>
          <span className="font-bold">Count:</span> {count}
        </div>
        <div>
          <span className="font-bold">Text:</span> {text}
        </div>
        <div>
          <span className="font-bold">Object:</span>
          <pre>{JSON.stringify(object, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
