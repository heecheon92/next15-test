"use client";

import { Button } from "@/app/components/shadcn/button";
import { useRenderCount } from "@/app/util/render";
import { atom, useAtom } from "jotai";
import { objectAtom } from "../atoms";

export default function JotaiSelector() {
  const renderCount = useRenderCount();
  const [object, setObject] = useAtom(objectAtom);

  return (
    <div className="flex flex-col space-y-4 w-full h-full p-4 bg-gray-100 border-2 rounded-md border-black">
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
      <footer className="flex flex-row justify-evenly">
        <ObjectGreetingSelector />
        <ObjectNameSelector />
      </footer>
    </div>
  );
}

const greetingAtom = atom(
  (get) => get(objectAtom).greeting,
  (_get, set, arg: "Hello" | "Bye") => {
    set(objectAtom, (prev) => ({ ...prev, greeting: arg }));
  }
);
function ObjectGreetingSelector() {
  const renderCount = useRenderCount();
  const [greeting, setGreeting] = useAtom(greetingAtom);

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 border-2 border-green-300 rounded-md">
      <header className="text-xl font-bold">{`Object Greeting (child / rendered ${renderCount} times)`}</header>
      <div>
        <span className="font-bold">Greeting:</span> {greeting}
      </div>
      <Button
        onClick={() => setGreeting(greeting === "Hello" ? "Bye" : "Hello")}
      >
        Set Greeting
      </Button>
      <footer className="text-sm">
        {"Setting 'greeting' does not affect ObjectName component on the right"}
      </footer>
    </div>
  );
}

const nameAtom = atom(
  (get) => get(objectAtom).name,
  (_get, set, arg: "React" | "Jotai") => {
    set(objectAtom, (prev) => ({ ...prev, name: arg }));
  }
);
function ObjectNameSelector() {
  const renderCount = useRenderCount();
  const [name, setName] = useAtom(nameAtom);

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 border-2 border-green-300 rounded-md">
      <header className="text-xl font-bold">{`Object Name (child / rendered ${renderCount} times)`}</header>
      <div>
        <span className="font-bold">Name:</span> {name}
      </div>
      <Button onClick={() => setName(name === "React" ? "Jotai" : "React")}>
        Set Name
      </Button>
      <footer className="text-sm">
        {"Setting 'name' does not affect ObjectGreeting component on the left"}
      </footer>
    </div>
  );
}
