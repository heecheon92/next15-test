"use client";

import { buttonVariants } from "@/app/components/shadcn/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import {
  DayFlag,
  DayPicker,
  DayProps,
  DropdownProps,
  PropsBase,
  SelectionState,
  UI,
} from "react-day-picker";

import { ScrollArea } from "./scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

/* Example Usage
import { Calendar } from "@/components/ui/calendar"

const [date, setDate] = React.useState<Date | undefined>(new Date())

return (
  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="border rounded-md"
  />
)
*/

export type CalendarProps = React.ComponentProps<typeof DayPicker>;
function isDropdownLayout(arg: PropsBase["captionLayout"]) {
  return (
    arg === "dropdown" || arg === "dropdown-months" || arg === "dropdown-years"
  );
}
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        [UI.Months]:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        [UI.Month]: "space-y-4",
        [UI.MonthCaption]: "flex justify-center pt-1 relative items-center",
        [UI.CaptionLabel]: cn(
          "text-sm font-medium",
          isDropdownLayout(props.captionLayout) && "hidden"
        ),
        [UI.Dropdowns]: cn(
          "flex justify-center pt-1 relative items-center",
          isDropdownLayout(props.captionLayout) &&
            "flex-row flex-row-reverse space-x-2"
        ),
        [UI.Nav]: cn("space-x-1 flex items-center", classNames?.nav),
        [UI.PreviousMonthButton]: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          classNames?.button_previous
        ),
        [UI.NextMonthButton]: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          classNames?.button_next
        ),
        [UI.MonthGrid]: cn(
          "w-full border-collapse space-y-1",
          classNames?.month_grid
        ),
        [UI.Weekdays]: cn("flex text-center", classNames?.weekdays),
        [UI.Weekday]: cn(
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          classNames?.weekday
        ),
        [UI.Week]: cn("flex w-full mt-2", classNames?.week),
        [UI.Day]: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-100/30 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          classNames?.day
        ),
        [SelectionState.selected]: cn(
          "bg-blue-300 text-primary-foreground hover:bg-blue-300 hover:text-primary-foreground focus:bg-blue-300 focus:text-primary-foreground",
          classNames?.selected
        ),
        [SelectionState.range_middle]: cn(
          "aria-selected:bg-blue-100/30 aria-selected:text-accent-foreground",
          classNames?.range_middle
        ),
        [DayFlag.today]: cn(
          "bg-blue-100/30 text-accent-foreground",
          classNames?.today
        ),
        [DayFlag.outside]: cn(
          "text-muted-foreground opacity-50",
          classNames?.outside
        ),
        [DayFlag.disabled]: cn(
          "text-muted-foreground opacity-50",
          classNames?.disabled
        ),
        [DayFlag.hidden]: cn("invisible", classNames?.hidden),
      }}
      components={{
        // Dropdown: components?.Dropdown ?? CalendarDropdown,
        // PreviousMonthButton:
        //   components?.PreviousMonthButton ?? CalendarLeftIcon,
        // NextMonthButton: components?.NextMonthButton ?? CalendarRightIcon,
        Day: CalendarDayContent,
        ...components,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

/**
 * Custom Modifier 핸들링 컴포넌트.
 * 만약 modifiers에 events가 있으면, event에 해당하는 날짜 아래에 점이 표시됩니다.
 */
function CalendarDayContent({ day, modifiers, ...restProps }: DayProps) {
  return (
    <td {...restProps}>
      {restProps.children}
      {modifiers?.events && (
        <div className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-S-600"></div>
      )}
    </td>
  );
}

function CalendarDropdown({
  value,
  onChange,
  options = [],
  ...props
}: DropdownProps) {
  const selected = options?.find((option) => option.value === value);
  const handleChange = (value: string) => {
    const changeEvent = {
      target: { value },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange?.(changeEvent);
  };

  return (
    <Select
      value={value?.toString()}
      onValueChange={(value) => {
        handleChange(value);
      }}
    >
      <SelectTrigger className="space-x-2 border-none pr-1.5 hover:bg-[#f1f0f0cc] focus:ring-0">
        <SelectValue>{selected?.label}</SelectValue>
      </SelectTrigger>
      <SelectContent position="popper" className="bg-white">
        <ScrollArea
          classNames={{
            root: "max-h-80",
            viewport: "max-h-80",
          }}
        >
          {options.map((option, id: number) => (
            <SelectItem
              key={`${option.value}-${id}`}
              value={option.value?.toString() ?? ""}
              className="justify-start pl-2 text-start focus:bg-[#f1f0f0cc]"
            >
              {option.label}
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}

function CalendarLeftIcon() {
  return <ChevronLeft className="h-4 w-4" />;
}

function CalendarRightIcon() {
  return <ChevronRight className="h-4 w-4" />;
}

export { Calendar };
