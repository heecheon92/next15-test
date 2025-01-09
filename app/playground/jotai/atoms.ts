"use client"
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export const countAtom = atom(0);
export const textAtom = atom("Hello, Jotai!");
export const objectAtom = atom<{
  greeting: "Hello" | "Bye";
  name: "Jotai" | "React";
}>({ greeting: "Hello", name: "Jotai" });
export const deepObjectAtom = atom<{
  name: { firstName: string; lastName: string; };
  age: { legalAge: number; displayAge: number };
}>({
  name: { firstName: "John", lastName: "Doe" },
  age: { legalAge: 21, displayAge: 22 }
})
export const darkModeAtom = atomWithStorage("darkMode", false, {
  ...createJSONStorage(() => localStorage),
}, { getOnInit: false });