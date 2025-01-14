"use client";

import { Progress } from "@/app/components/shadcn/progress";
import { useEffect, useState } from "react";

export default function ProgressPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 30) {
          return prev + 30;
        } else if (prev < 80) {
          return 95;
        }
        return 100;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center font-bold space-y-4">
      <span>This is a progress page</span>

      <Progress value={progress} className="w-[60%]" />

      {progress >= 100 && (
        <span>{`Now, visit "Payment" tab, and re-visit this page`}</span>
      )}
    </div>
  );
}
