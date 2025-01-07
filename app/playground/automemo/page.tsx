"use client";

import { Button } from "@/app/components/shadcn/button";
import { log } from "@/app/util/logger";
import { Fragment, useState } from "react";

export default function AutoMemoMain() {
  const [count, setCount] = useState(0);

  return (
    <Fragment>
      <header className="text-2xl font-bold">Auto Memo (React Compiler)</header>

      <Button onClick={() => setCount((c) => c + 1)}>
        Clicked {count} times
      </Button>

      <AutoMemoizedChildComponent />

      <ChildComponentWithProps count={count} />
    </Fragment>
  );
}

function AutoMemoizedChildComponent() {
  /**
   * This component does not rerender when parent's state changes
   * because React Compiler automatically memoizes it.
   */
  log("SomeChildComponent rendered");
  return (
    <div>{`Some child component (<- this component does not rerender)`}</div>
  );
}

function ChildComponentWithProps({ count }: { count: number }) {
  /**
   * This component does rerender when parent's state changes
   * because it references parent's state.
   */
  log("ChildComponentWithProps rendered");
  return (
    <div>{`Child component with props: ${count} (<- this component does rerender)`}</div>
  );
}
