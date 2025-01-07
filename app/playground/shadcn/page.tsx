import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/shadcn/dialog";
import { Input } from "@/app/components/shadcn/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/shadcn/popover";
import { AlertDialogContent } from "@radix-ui/react-alert-dialog";

export default function ShadcnMain() {
  return (
    <div className="flex flex-col space-y-4 w-full min-h-screen p-4 bg-gray-100">
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
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
