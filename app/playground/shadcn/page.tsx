"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/shadcn/alert-dialog";
import { Button } from "@/app/components/shadcn/button";
import { Calendar } from "@/app/components/shadcn/calendar";
import { Checkbox } from "@/app/components/shadcn/checkbox";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/app/components/shadcn/command";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/shadcn/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/shadcn/drawer";
import { Input } from "@/app/components/shadcn/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/shadcn/popover";
import { cn } from "@/lib/utils";
import {
  Calculator,
  Calendar as CalendarIcon,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function ShadcnMain() {
  return (
    <div className="flex flex-col space-y-4 w-full min-h-screen p-4 bg-gray-100">
      <header className="text-2xl font-bold">Shadcn</header>
      <ComponentSection title="Input">
        <Input />
      </ComponentSection>

      <ComponentSection title="Calendar">
        <Calendar />
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
        <Dialog>
          <DialogTrigger>click me to see dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>

            <span>Some content</span>

            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ComponentSection>

      <ComponentSection title="AlertDialog">
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <span>Some content</span>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ComponentSection>

      <ComponentSection title="Drawer">
        <Drawer>
          <DrawerTrigger>Open Drawer</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </ComponentSection>

      <ComponentSection title="Command">
        <CommandMenu keyboardKey="k" />
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

export function CommandMenu({ keyboardKey }: { keyboardKey: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === keyboardKey && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [keyboardKey]);

  return (
    <div className="text-center">
      <p className="text-sm text-black">
        <span>{"Press "}</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
          <span className="text-xs">⌘</span>
          {keyboardKey.toUpperCase()}
        </kbd>
      </p>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        contentProps={{
          className: cn("w-[400px] p-0"),
        }}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <CalendarIcon />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
