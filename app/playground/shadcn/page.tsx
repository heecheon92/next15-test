"use client";

import { Checkbox } from "@/app/components/shadcn/checkbox";

import { Input } from "@/app/components/shadcn/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/shadcn/popover";

import { AlertDialogComponent } from "./items/AlertDialogComponent";
import { CalendarComponent } from "./items/CalendarComponent";
import { ChartComponent } from "./items/ChartComponent";
import { CommandComponent } from "./items/CommandComponent";
import { DialogComponent } from "./items/DialogComponent";
import { DrawerComponent } from "./items/DrawerComponent";

export default function ShadcnMain() {
  return (
    <div className="flex flex-col space-y-4 w-full min-h-screen p-4 bg-gray-100">
      <header className="text-2xl font-bold">Shadcn</header>
      <ComponentSection title="Input">
        <Input />
      </ComponentSection>

      <ComponentSection title="Calendar">
        <CalendarComponent />
      </ComponentSection>

      <ComponentSection title="Checkbox">
        <Checkbox />
      </ComponentSection>

      <ComponentSection title="Popover">
        <Popover>
          <PopoverTrigger>click me to see popover</PopoverTrigger>
          <PopoverContent>popover content</PopoverContent>
        </Popover>
      </ComponentSection>

      <ComponentSection title="Dialog">
        <DialogComponent />
      </ComponentSection>

      <ComponentSection title="AlertDialog">
        <AlertDialogComponent />
      </ComponentSection>

      <ComponentSection title="Drawer">
        <DrawerComponent />
      </ComponentSection>

      <ComponentSection title="Command">
        <CommandComponent keyboardKey="k" />
      </ComponentSection>

      <ComponentSection title="Chart">
        <ChartComponent />
      </ComponentSection>
    </div>
  );
}

function ComponentSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col space-y-2 w-full">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}
