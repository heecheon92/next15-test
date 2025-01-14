"use client";

import { Progress } from "@/app/components/shadcn/progress";
import { useEffect, useState } from "react";

export default function ProgressPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 10;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center font-bold">
      This is a progress page
      <Progress value={progress} className="w-[60%]" />
    </div>
  );
}
