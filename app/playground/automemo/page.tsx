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

      <div className="min-w-full min-h-[70dvh] relative">
        <iframe
          src="https://playground.react.dev/#N4Igzg9grgTgxgUxALhASwLYAcIwC4AEwBANhAOYEC+BAZjBBgQDogACA9AIZZYdR40JDmXLkEMVgG5mAO0w58RAlDAIAyni54E1OgyasYCLnDzS5chAA9FhACYJaXKCUK0oss2giyCAQQEIAFkEDBCuNFkACgBKIjkCAjhfMEIAbRTPPAAaAjU8AGFoWTwAXQIAXhU1TW0EaIAGWJlZRIJjPFg-aPakgB57NAA3ZJIuMDAAOS4MBErWWhIbOmXrAFoUknysUwR1gE91gBYCAHd1jxJtjCj1gAt1sDhjBD8sE4IAI3J18hguEcAIyNRqsAB8fSSBH69xMjhgYwm01m81YOmseHWACZrNtaL4sV8ICR7BDAngIARQuF+hw4VwEZC2n5oQMvgJKX5fIUSGg4ABrSrAOJVcH5BBFEp4aLRODxSriuAEADUBCBsSozLZbN5-IFCHsRCypRogjmYChAw4HLwXOZVphFJCYQgaAAXobCvchPZithfG9CBwHay2f1vb7-ThZEGAOpoPD3AAKDCwYGS0uFJrwNBDULpQ2G2oILTkVEssg8XkEvgCQRpbs9fp9pOjgdKouA7Q4ACpe31ewQACo+jMpAOx0oEewQBAZ2QQQjGYyyBHnOHvLirvAAcgzaXqyXuXFk4ktYaHXwQcBcagIACUTGYCNGhBICC5KRhtPyuNcDgIOZwg9ecCETAA6QcOHaURehAdRGAQSM20YGMgw6N4EUNVgy1ZTpuhhItwUQuZj19TNJyDQsRnBVoKxZatvDrFC-TQjs8ATJNUwgdNomIHNqGQZQc2E2QoAwa9ESoeJu1ZPsB0vEcx0o9Dp1nMCVywj8zk3Ahdh3fd8i0HRj1Pc9B2+G8710RNMNoCQ3kQDMDKDIzDx0KDLxg1k4NYVj2ynTjExTNMM1XbCyRAPCkgImA-EGWjWNUjjzhC-SwuE4AcyoGji3ouQQCoIA"
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
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
