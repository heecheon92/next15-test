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
import { useEffect, useMemo, useState } from "react";
import { DayPickerProps } from "react-day-picker";

export interface SingleDatePickerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  triggerCn?: string;
  date?: Date;
  placeholder?: string;
  disabled?: boolean;
  disabledDays?: DayPickerProps["disabled"];
  setDate?: (date: Date | undefined) => void;
  autoClose?: boolean;
}

export function SingleDatePicker({
  triggerCn,
  date,
  placeholder,
  disabled,
  setDate,
  className,
  autoClose,
  ...props
}: SingleDatePickerProps & CalendarProps) {
  const { lang } = useLocalization();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
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

  useEffect(() => {
    if (autoClose) setIsCalendarOpen(false);
  }, [date, autoClose]);

  return (
    <div
      className={cn(
        "flex h-[36px] w-full flex-row justify-start rounded-md pl-[2px] pr-2 text-left text-base font-normal",
        disabled && "cursor-not-allowed bg-[#efefef4d]",
        isCalendarOpen
          ? "outline outline-[1.5px] outline-S-600"
          : "outline outline-1 outline-NS-4 focus:outline-[1.5px]",
        className
      )}
    >
      <Popover open={isCalendarOpen} onOpenChange={(o) => setIsCalendarOpen(o)}>
        <PopoverTrigger
          asChild
          disabled={disabled !== undefined ? disabled : false}
        >
          <button
            className={cn(
              "flex w-full min-w-[157px] flex-1 flex-row items-center justify-between pl-2 text-start text-sm font-normal text-NS-20 disabled:cursor-not-allowed disabled:text-NS-6",
              !date && "text-muted-foreground",
              triggerCn
            )}
          >
            {date ? (
              format(date, "y/LL/dd")
            ) : (
              <span>{`${
                placeholder === undefined ? "Pick a day" : placeholder
              }`}</span>
            )}
            <CalendarIcon className="h-5 w-5 stroke-Gr-600" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto bg-white p-0" align="start">
          <Calendar
            {...props}
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={locale}
            fixedWeeks
            initialFocus
            captionLayout={props.captionLayout} // requires fromDate and toDate || fromYear and toYear
            fromYear={props?.fromYear ? props.fromYear : 2000}
            toYear={props?.toYear ? props.toYear : 2100}
            disabled={props?.disabledDays}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
