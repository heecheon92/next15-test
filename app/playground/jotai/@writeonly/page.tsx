"use client";

import { Button } from "@/app/components/shadcn/button";
import { log } from "@/app/util/logger";
import { atom, useAtom, useSetAtom } from "jotai";
import { countAtom } from "../atoms";

const writeonlyCountAtom = atom(null, (get, set) => {
  set(countAtom, get(countAtom) + 1);
});

export default function JotaiWriteonly() {
  /**
   * roles of the following two state setters are virtually identical.
   * Setting states with following functions will not trigger rerender of this component.
   */
  const [, setWriteonlyCount] = useAtom(writeonlyCountAtom);
  const setAnotherWriteonlyCount = useSetAtom(countAtom);

  log("Writeonly rerendered");

  return (
    <div className="flex flex-col space-y-4 w-full h-full p-4 bg-gray-100 border-2 rounded-md">
      <header className="text-lg font-bold">Write Only</header>

      <Button onClick={() => setWriteonlyCount()}>
        Increment Writeonly Count
      </Button>

      <Button
        onClick={() =>
          setAnotherWriteonlyCount((prev) => {
            return prev > 0 ? 0 : prev + 10;
          })
        }
      >
        Increment Another Writeonly Count
      </Button>
    </div>
  );
}
