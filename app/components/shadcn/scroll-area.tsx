"use client";

import { cn } from "@/lib/utils";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as React from "react";

interface ScrollAreaViewportProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  horizontalScrollBarVisible?: boolean;
  scrollRef?: {
    viewportRef?: React.RefObject<HTMLDivElement>;
  };
  classNames?: {
    root?: string;
    viewport?: string;
    scrollBar?: ScrollBarProps["classNames"];
  };
  viewportId?: string;
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaViewportProps
>(
  (
    {
      viewportId,
      className,
      classNames,
      horizontalScrollBarVisible = true,
      scrollRef,
      children,
      ...props
    },
    ref,
  ) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className, classNames?.root)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={scrollRef?.viewportRef}
        className={cn("h-full w-full rounded-[inherit]", classNames?.viewport)}
        id={viewportId}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation="vertical" classNames={classNames?.scrollBar} />
      {horizontalScrollBarVisible && (
        <ScrollBar
          orientation="horizontal"
          classNames={classNames?.scrollBar}
        />
      )}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  ),
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

interface ScrollBarProps
  extends React.ComponentPropsWithoutRef<
    typeof ScrollAreaPrimitive.ScrollAreaScrollbar
  > {
  classNames?: {
    bar?: string;
    thumb?: string;
  };
}

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  Omit<ScrollBarProps, "className">
>(({ classNames, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    data-orientation={orientation}
    className={cn(
      "flex touch-none select-none bg-white transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      classNames?.bar,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={cn(
        "relative flex-1 rounded-full bg-color-fade-gray",
        classNames?.thumb,
      )}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
