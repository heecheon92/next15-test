import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-4 min-h-screen p-8 pb-20">
      <Link href="/playground/shadcn">Shadcn</Link>
      <Link href="/playground/jotai">Jotai</Link>
      <Link href="/playground/automemo">Auto Memo (React Compiler)</Link>
      <Link href="/playground/zustand">Zustand</Link>
    </div>
  );
}
