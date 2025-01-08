"use client"

import { useEffect, useRef } from "react";

export function useRenderCount() {
  const renderCounter = useRef(1);

  useEffect(() => {
    renderCounter.current = renderCounter.current + 1;
  })
  return renderCounter.current;
}