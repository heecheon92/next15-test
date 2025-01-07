"use client";

import { Button } from "@/app/components/shadcn/button";
import { log } from "@/app/util/logger";
import { atom, useAtom } from "jotai";
import { countAtom } from "../atoms";

const readwriteCountAtom = atom(
  (get) => get(countAtom),
  (_get, set, arg: number) => {
    set(countAtom, arg);
  }
);

export default function JotaiReadWrite() {
  const [readwriteCount, setReadwriteCount] = useAtom(readwriteCountAtom);
  const [count, setCount] = useAtom(countAtom);

  log("JotaiReadWrite rerendered");

  return (
    <div className="flex flex-col space-y-4 w-full h-full p-4 bg-gray-100 border-2 rounded-md">
      <header className="text-lg font-bold">Read Write</header>

      <div className="flex flex-col space-y-2">
        <span className="font-bold">Readwrite Count:</span> {readwriteCount}
        <Button onClick={() => setReadwriteCount(count + 1)}>
          Increment Readwrite Count
        </Button>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="font-bold">Count:</span> {count}
        <Button onClick={() => setCount(count + 1)}>Increment Count</Button>
      </div>
    </div>
  );
}
