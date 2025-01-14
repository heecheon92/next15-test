"use client";
import { log } from "@/app/util/logger";
import { useRenderCount } from "@/app/util/render";
import { atom, useAtom, useAtomValue } from "jotai";
import { countAtom } from "../atoms";

const readonlyCountAtom = atom((get) => get(countAtom));

export default function JotaiReadonly() {
  const renderCount = useRenderCount();
  /**
   * roles of the following two states are virtually identical
   */
  const [readonlyCount] = useAtom(readonlyCountAtom);
  const anotherReadonlyCount = useAtomValue(countAtom);

  log("Readonly rerendered");

  return (
    <div className="flex flex-col space-y-4 w-full h-full p-4 bg-gray-100 border-2 rounded-md">
      <header className="text-lg font-bold">{`Readonly (rendered ${renderCount} times)`}</header>

      <div>
        <span className="font-bold">Readonly Count:</span> {readonlyCount}
      </div>
      <div>
        <span className="font-bold">Another Readonly Count:</span>{" "}
        {anotherReadonlyCount}
      </div>
    </div>
  );
}
