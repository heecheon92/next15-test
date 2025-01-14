"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/shadcn/alert-dialog";

import { Progress } from "@/app/components/shadcn/progress";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentProgress() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 30) {
          return 30;
        } else if (prev < 80) {
          return 85;
        }
        return 100;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="flex flex-col items-center justify-center">
        <AlertDialogTitle>
          {`This progress page has been implemented with NextJS' parallel routing and intercepting routing technique.`}
        </AlertDialogTitle>

        <AlertDialogHeader>
          You are viewing this page because you came from payment page
        </AlertDialogHeader>

        <Progress value={progress} className="w-[60%]" />
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              router.back();
            }}
          >
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
