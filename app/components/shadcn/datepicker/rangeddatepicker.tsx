"use client";

import useLocalization from "@/app/common/hooks/useLocalization";
import { Calendar, CalendarProps } from "@/app/components/shadcn/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/shadcn/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { enUS, ja, ko } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { useMemo, useState } from "react";
import { DateRange, DayPickerProps } from "react-day-picker";

export function RangedDatePicker({
  className,
  dateRange,
  setDateRange,
  disabled,
  onDayClick,
  disabledDays,
  modifiersClassNames,
}: React.HTMLAttributes<HTMLDivElement> & {
  dateRange?: DateRange;
  setDateRange?: (dateRange: DateRange | undefined) => void;
  disabled?: boolean;
  disabledDays?: DayPickerProps["disabled"];
} & CalendarProps) {
  /* Initial value sample
    const [date, setDate] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 20),
    });
  */

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { lang } = useLocalization();
  const locale = useMemo(() => {
    switch (lang) {
      case "ko":
        return ko;
      case "ja":
        return ja;
      default:
        return enUS;
    }
  }, [lang]);

  return (
    <div
      className={cn(
        "flex h-[36px] w-full flex-row justify-start rounded-md px-2 text-left text-base font-normal",
        disabled && "cursor-not-allowed bg-[#efefef4d]",
        !dateRange && "text-muted-foreground",
        isCalendarOpen
          ? "outline outline-[1.5px] outline-[#4987FF]"
          : "outline outline-1 outline-NS-4 focus:outline-[1.5px]",
        className
      )}
    >
      <Popover onOpenChange={(o) => setIsCalendarOpen(o)}>
        <PopoverTrigger asChild disabled={disabled}>
          <button
            className={cn(
              "flex w-full flex-row items-center justify-between text-start text-sm font-normal text-NS-20 disabled:cursor-not-allowed disabled:text-NS-6",
              !dateRange && "text-muted-foreground"
            )}
          >
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "y/LL/dd")} -{" "}
                  {format(dateRange.to, "y/LL/dd")}
                </>
              ) : (
                format(dateRange.from, "y/LL/dd")
              )
            ) : (
              <div className="w-full" />
            )}
            <CalendarIcon className="h-5 w-5 stroke-Gr-600" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto bg-white p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            locale={locale}
            onDayClick={onDayClick}
            disabled={disabledDays}
            modifiersClassNames={modifiersClassNames}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
