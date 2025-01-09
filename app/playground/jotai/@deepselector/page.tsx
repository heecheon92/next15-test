"use client";

import { Button } from "@/app/components/shadcn/button";
import { useRenderCount } from "@/app/util/render";
import { produce } from "immer";
import { atom, useAtom } from "jotai";
import { deepObjectAtom } from "../atoms";

export default function JotaiSelector() {
  const renderCount = useRenderCount();
  const [object, setObject] = useAtom(deepObjectAtom);

  return (
    <div
      className="flex flex-col space-y-4 w-full h-full p-4 bg-gray-100 border-2 rounded-md border-black"
      id="deep-selector"
    >
      <header className="text-lg font-bold">{`Deep Selector (rendered ${renderCount} times)`}</header>

      <div className="flex flex-col space-y-2">
        <span className="font-bold">Object:</span>
        <pre>{JSON.stringify(object, null, 2)}</pre>
      </div>
      <div className="flex flex-row space-x-4">
        <Button
          onClick={() =>
            setObject((o) => ({
              name: {
                firstName: o.name.firstName === "John" ? "Jane" : "John",
                lastName: o.name.lastName === "Doe" ? "Smith" : "Doe",
              },
              age: {
                legalAge: o.age.legalAge === 21 ? 18 : 21,
                displayAge: o.age.displayAge === 21 ? 19 : 22,
              },
            }))
          }
        >
          Change Object Fields
        </Button>
      </div>
      <footer className="flex flex-row justify-evenly">
        <ObjectNameSelector />
        <ObjectAgeSelector />
      </footer>
    </div>
  );
}

const nameAtom = atom(
  (get) => get(deepObjectAtom).name,
  (_get, set, arg: { firstName: string; lastName: string }) => {
    set(deepObjectAtom, (prev) => ({ ...prev, name: arg }));
  }
);

function ObjectNameSelector() {
  const renderCount = useRenderCount();
  const [name, setName] = useAtom(nameAtom);

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 border-2 border-rose-600 rounded-md">
      <header className="text-xl font-bold">{`Object Name (child / rendered ${renderCount} times)`}</header>
      <div className="flex flex-row space-x-4">
        <span className="font-bold">First Name:</span>
        <input
          value={name.firstName}
          onChange={(e) => {
            setName({ ...name, firstName: e.target.value });
          }}
        />
      </div>
      <div className="flex flex-row space-x-4">
        <span className="font-bold">Last Name:</span>
        <input
          value={name.lastName}
          onChange={(e) => {
            setName({ ...name, lastName: e.target.value });
          }}
        />
      </div>

      <footer className="flex flex-col space-y-4">
        <ObjectFirstNameSelector />

        <ObjectLastNameSelector />
      </footer>
    </div>
  );
}

const firstNameAtom = atom(
  (get) => get(deepObjectAtom).name.firstName,
  (_get, set, arg: string) => {
    set(deepObjectAtom, (prev) => ({
      ...prev,
      name: { ...prev.name, firstName: arg },
    }));
  }
);
const lastNameAtom = atom(
  (get) => get(deepObjectAtom).name.lastName,
  (_get, set, arg: string) => {
    set(deepObjectAtom, (prev) => ({
      ...prev,
      name: { ...prev.name, lastName: arg },
    }));
  }
);

function ObjectFirstNameSelector() {
  const renderCount = useRenderCount();
  const [firstName, setFirstName] = useAtom(firstNameAtom);

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 border-2 border-green-300 rounded-md">
      <header className="text-xl font-bold">{`Object First Name (child / rendered ${renderCount} times)`}</header>
      <div className="flex flex-row space-x-4">
        <span className="font-bold">First Name:</span>
        <input
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

function ObjectLastNameSelector() {
  const renderCount = useRenderCount();
  const [lastName, setLastName] = useAtom(lastNameAtom);

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 border-2 border-green-300 rounded-md">
      <header className="text-xl font-bold">{`Object Last Name (child / rendered ${renderCount} times)`}</header>
      <div className="flex flex-row space-x-4">
        <span className="font-bold">Last Name:</span>
        <input
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

const ageAtom = atom(
  (get) => get(deepObjectAtom).age,
  (get, set, arg: { legalAge: number; displayAge: number }) => {
    set(
      deepObjectAtom,
      produce(get(deepObjectAtom), (draft) => {
        draft.age = arg;
      })
    );
  }
);

const legalAgeAtom = atom(
  (get) => get(deepObjectAtom).age.legalAge,
  (get, set, arg: number) => {
    set(
      deepObjectAtom,
      produce(get(deepObjectAtom), (draft) => {
        draft.age.legalAge = arg;
      })
    );
  }
);

const displayAgeAtom = atom(
  (get) => get(deepObjectAtom).age.displayAge,
  (get, set, arg: number) => {
    set(
      deepObjectAtom,
      produce(get(deepObjectAtom), (draft) => {
        draft.age.displayAge = arg;
      })
    );
  }
);

function ObjectAgeSelector() {
  const renderCount = useRenderCount();
  const [age, setAge] = useAtom(ageAtom);

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 border-2 border-rose-600 rounded-md">
      <header className="text-xl font-bold">{`Object Age (child / rendered ${renderCount} times)`}</header>
      <div className="flex flex-row space-x-4">
        <span className="font-bold">Legal Age:</span>
        <input
          type="number"
          value={age.legalAge}
          onChange={(e) => {
            setAge({ ...age, legalAge: parseInt(e.target.value) });
          }}
        />
      </div>
      <div className="flex flex-row space-x-4">
        <span className="font-bold">Display Age:</span>
        <input
          type="number"
          value={age.displayAge}
          onChange={(e) => {
            setAge({ ...age, displayAge: parseInt(e.target.value) });
          }}
        />
      </div>

      <footer className="flex flex-col space-y-4">
        <ObjectLegalAgeSelector />

        <ObjectDisplayAgeSelector />
      </footer>
    </div>
  );
}

function ObjectLegalAgeSelector() {
  const renderCount = useRenderCount();
  const [legalAge, setLegalAge] = useAtom(legalAgeAtom);

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 border-2 border-green-300 rounded-md">
      <header className="text-xl font-bold">{`Object Legal Age (child / rendered ${renderCount} times)`}</header>
      <div className="flex flex-row space-x-4">
        <span className="font-bold">Legal Age:</span>
        <input
          type="number"
          value={legalAge}
          onChange={(e) => {
            setLegalAge(parseInt(e.target.value));
          }}
        />
      </div>
    </div>
  );
}

function ObjectDisplayAgeSelector() {
  const renderCount = useRenderCount();
  const [display, setDisplayAge] = useAtom(displayAgeAtom);

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 border-2 border-green-300 rounded-md">
      <header className="text-xl font-bold">{`Object Display Age (child / rendered ${renderCount} times)`}</header>
      <div className="flex flex-row space-x-4">
        <span className="font-bold">Legal Age:</span>
        <input
          type="number"
          value={display}
          onChange={(e) => {
            setDisplayAge(parseInt(e.target.value));
          }}
        />
      </div>
    </div>
  );
}
