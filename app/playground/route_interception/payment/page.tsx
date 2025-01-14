"use client";

import { useRouter } from "next/navigation";

export default function PaymentMain() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full h-full items-center justify-center font-bold">
      This is a payment page for route interception
      <button
        className="p-2 bg-blue-600 text-white rounded-md"
        onClick={() => router.push("/playground/route_interception/progress")}
      >
        Make Payment
      </button>
    </div>
  );
}
