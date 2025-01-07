"use client";

import { Button } from "@/app/components/shadcn/button";
import { log } from "@/app/util/logger";
import { useState } from "react";

export default function AutoMemoMain() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col space-y-4 w-full min-h-screen p-4 bg-gray-100">
      <header className="text-2xl font-bold">Auto Memo</header>

      <Button onClick={() => setCount((c) => c + 1)}>
        Clicked {count} times
      </Button>

      <AutoMemoizedChildComponent />

      <ChildComponentWithProps count={count} />
    </div>
  );
}

function AutoMemoizedChildComponent() {
  /**
   * This component does not rerender when parent's state changes
   * because React Compiler automatically memoizes it.
   */
  log("SomeChildComponent rendered");
  return <div>Some child component</div>;
}

function ChildComponentWithProps({ count }: { count: number }) {
  /**
   * This component does rerender when parent's state changes
   * because it references parent's state.
   */
  log("ChildComponentWithProps rendered");
  return <div>Child component with props: {count}</div>;
}
