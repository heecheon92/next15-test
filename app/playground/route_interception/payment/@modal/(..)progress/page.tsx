"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/app/components/shadcn/alert-dialog";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProgressPage from "../../../progress/page";

export default function PaymentProgress() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) router.replace("/playground/route_interception/payment");
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="flex flex-col items-center justify-center">
        <AlertDialogTitle>
          You are viewing this page because you came from payment page
        </AlertDialogTitle>
        <ProgressPage />
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
