import Link from "next/link";

const linkClassname = "p-2 bg-blue-600 text-white rounded-md";
export default function Home() {
  return (
    <div className="flex flex-col items-start space-y-4 min-h-screen p-8 pb-20">
      <Link href="/playground/shadcn" className={linkClassname}>
        Shadcn
      </Link>
      <Link href="/playground/jotai" className={linkClassname}>
        Jotai
      </Link>
      <Link href="/playground/automemo" className={linkClassname}>
        Auto Memo (React Compiler)
      </Link>
      <Link href="/playground/zustand" className={linkClassname}>
        Zustand
      </Link>
      <Link href="/playground/tanstack" className={linkClassname}>
        Tanstack
      </Link>
    </div>
  );
}
