"use client";

import { Button } from "@/app/components/shadcn/button";
import { useRenderCount } from "@/app/util/render";
import { useAtom, useAtomValue } from "jotai";
import { countAtom, objectAtom, textAtom } from "../atoms";

export default function JotaiPrimitive() {
  const renderCount = useRenderCount();
  const [count, setCount] = useAtom(countAtom);
  const [text, setText] = useAtom(textAtom);
  const [object, setObject] = useAtom(objectAtom);

  return (
    <div className="flex flex-col space-y-4 w-full h-full p-4 bg-gray-100 border-2 rounded-md border-black">
      <header className="text-lg font-bold">{`Primitive (rendered ${renderCount} times)`}</header>

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
  const renderCount = useRenderCount();

  return (
    <div className="flex flex-col space-y-4 w-full p-4 bg-gray-100 border-2 border-red-300 rounded-md">
      <header className="text-2xl font-bold">{`Summary (top level child / rendered ${renderCount} times)`}</header>
      <div className="flex flex-row w-full justify-between">
        <PrimitiveCount />
        <PrimitiveText />
        <PrimitiveObject />
      </div>
    </div>
  );
}

function PrimitiveCount() {
  const renderCount = useRenderCount();
  const count = useAtomValue(countAtom);

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 border-2 border-green-300 rounded-md">
      <header className="text-xl font-bold">{`Count (inner child / rendered ${renderCount} times)`}</header>
      <div>
        <span className="font-bold">Count:</span> {count}
      </div>
    </div>
  );
}

function PrimitiveText() {
  const renderCount = useRenderCount();
  const text = useAtomValue(textAtom);

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 border-2 border-green-300 rounded-md">
      <header className="text-xl font-bold">{`Text (inner child / rendered ${renderCount} times)`}</header>
      <div>
        <span className="font-bold">Text:</span> {text}
      </div>
    </div>
  );
}

function PrimitiveObject() {
  const renderCount = useRenderCount();
  const object = useAtomValue(objectAtom);

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 border-2 border-green-300 rounded-md">
      <header className="text-xl font-bold">{`Object (inner child / rendered ${renderCount} times)`}</header>
      <div>
        <span className="font-bold">Object:</span>
        <pre>{JSON.stringify(object, null, 2)}</pre>
      </div>
    </div>
  );
}
