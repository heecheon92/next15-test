"use client";

/**
 * Example
 */

/*
  const [date, setDate] = useState<Date>();
  
  <TimePicker label="Time" setDate={setDate} date={date} />
*/

import { useOnMount } from "@/app/common/hooks/useLifecycle";
import useLocalization from "@/app/common/hooks/useLocalization";
import SesameUtil from "@/app/common/SesameUtil";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/shadcn/dropdown-menu";
import { cn } from "@/lib/utils";
import React, { ReactNode, useImperativeHandle, useRef, useState } from "react";
import { IoMdTime } from "react-icons/io/index.esm.js";

import { ScrollArea } from "../scroll-area";
import { TimePickerInput, TimePickerInputRange } from "./time-picker-input";
import { TimePickerType, createRangeArray } from "./time-picker-utils";

export type TimePickerRange = {
  hh?: TimePickerInputRange;
  mm?: TimePickerInputRange;
  ss?: TimePickerInputRange;
};

export interface TimePickerProps {
  label?: ReactNode;
  classNames?: {
    container?: string;
    innerContainer?: string;
    label?: string;
    input?: string;
  };
  range?: TimePickerRange;
  date: Date | undefined;
  disabled?: boolean;
  timePickerType?: TimePickerType;
  setDate: (date: Date | undefined) => void;
}

export function TimePicker({
  label,
  classNames,
  range,
  date,
  disabled,
  setDate,
  timePickerType = "hhmm",
}: TimePickerProps) {
  const [inputFocus, setInputFocus] = useState(false);
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);

  if (range) {
    if (range.hh) {
      if (range.hh.start > 23) {
        console.error("Invalid input: range.hh.start must be smaller than 24.");
        return null;
      }

      if (range.hh.end > 23) {
        console.error("Invalid input: range.hh.end must be smaller than 24.");
        return null;
      }

      if (range.hh.start >= range.hh.end) {
        console.error(
          "Invalid input: range.hh.start must be smaller than range.hh.end.",
        );
        return null;
      }
    }

    if (range.mm) {
      if (range.mm.start > 59) {
        console.error("Invalid input: range.hh.start must be smaller than 60.");
        return null;
      }

      if (range.mm.end > 59) {
        console.error("Invalid input: range.hh.end must be smaller than 60.");
        return null;
      }

      if (range.mm.start >= range.mm.end) {
        console.error(
          "Invalid input: range.hh.start must be smaller than range.hh.end.",
        );
        return null;
      }
    }

    if (range.ss) {
      if (range.ss.start > 59) {
        console.error("Invalid input: range.ss.start must be smaller than 60.");
        return null;
      }

      if (range.ss.end > 59) {
        console.error("Invalid input: range.ss.end must be smaller than 60.");
        return null;
      }

      if (range.ss.start >= range.ss.end) {
        console.error(
          "Invalid input: range.ss.start must be smaller than range.ss.end.",
        );
        return null;
      }
    }
  }

  return (
    <section
      className={cn(
        "flex flex-1 flex-col items-start space-y-[6px]",
        disabled && "cursor-not-allowed",
        classNames?.container,
      )}
    >
      {label && (
        <span
          className={cn(
            "text-[14px] font-[500] text-NS-20",
            classNames?.label,
            disabled && "opacity-50",
          )}
        >
          {label}
        </span>
      )}
      <div
        className={cn(
          "flex h-[36px] w-[154px] flex-row rounded-[6px] py-[8px] pl-[12px] pr-[10px]",
          inputFocus
            ? "outline outline-[1.5px] outline-S-600"
            : "outline outline-1 outline-NS-4 focus:outline-[1.5px]",
          disabled && "bg-[#efefef4d] opacity-50",
          classNames?.innerContainer,
        )}
      >
        {(timePickerType === "hh" ||
          timePickerType === "hhmm" ||
          timePickerType === "hhmmss") && (
          <>
            <TimePickerInput
              className={cn("w-[26px] disabled:opacity-100", classNames?.input)}
              picker="hours"
              date={date}
              setDate={setDate}
              placeholder={date ? undefined : "hh"}
              ref={hourRef}
              onRightFocus={() => minuteRef.current?.focus()}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              disabled={disabled}
              range={range?.hh}
            />
          </>
        )}
        {(timePickerType === "hhmm" || timePickerType === "hhmmss") && (
          <>
            <div
              className={cn(
                `flex h-full items-center text-[14px] font-[400] leading-[20px]`,
                date ? "text-NS-20" : "pr-1 text-NS-4",
                classNames?.input,
              )}
            >
              {":"}
            </div>
            <TimePickerInput
              className={cn("w-[26px] disabled:opacity-100", classNames?.input)}
              picker="minutes"
              date={date}
              setDate={setDate}
              placeholder={date ? undefined : "mm"}
              ref={minuteRef}
              onLeftFocus={() => hourRef.current?.focus()}
              onRightFocus={() => secondRef.current?.focus()}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              disabled={disabled}
              range={range?.mm}
            />
          </>
        )}
        {timePickerType === "hhmmss" && (
          <>
            <div
              className={cn(
                `flex h-full items-center text-[14px] font-[400] leading-[20px]`,
                date ? "text-NS-20" : "pl-1 text-NS-4",
                classNames?.input,
              )}
            >
              {":"}
            </div>
            <TimePickerInput
              className="w-[26px]"
              picker="seconds"
              date={date}
              setDate={setDate}
              placeholder={date ? undefined : "ss"}
              ref={secondRef}
              onLeftFocus={() => minuteRef.current?.focus()}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              disabled={disabled}
              range={range?.ss}
            />
          </>
        )}
        <button
          className="flex w-full disabled:cursor-not-allowed"
          onClick={() => {
            hourRef.current?.focus();
          }}
          disabled={disabled}
        />
        <TimePickerButton
          date={date}
          timePickerType={timePickerType}
          disabled={disabled}
          setDate={setDate}
          range={range}
        />
      </div>
    </section>
  );
}

function TimePickerButton({
  date,
  timePickerType,
  disabled,
  setDate,
  range,
}: {
  date: Date | undefined;
  timePickerType?: TimePickerType;
  disabled?: boolean;
  setDate: (date: Date | undefined) => void;
  range?: TimePickerRange;
}) {
  const { dictionary } = useLocalization();
  const hourArray = createRangeArray(
    range?.hh?.start ? range?.hh?.start : 0,
    range?.hh?.end ? range?.hh?.end : 23,
  );
  const minuteArray = createRangeArray(
    range?.mm?.start ? range?.mm?.start : 0,
    range?.mm?.end ? range?.mm?.end : 59,
  );
  const secondsArray = createRangeArray(
    range?.ss?.start ? range?.ss?.start : 0,
    range?.ss?.end ? range?.ss?.end : 59,
  );

  const [hover, setHover] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        asChild
        className="outline-none "
        disabled={disabled}
      >
        <button
          className={`flex h-[22px] w-[22px] rounded-full disabled:cursor-not-allowed ${
            hover && "bg-NS-2"
          } `}
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          disabled={disabled}
        >
          <IoMdTime className={"fill-Gr-600"} size="20" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className=" flex min-w-[49px] flex-col p-0"
      >
        <div className="flex max-h-[165px] min-h-[74px]">
          {(timePickerType === "hh" ||
            timePickerType === "hhmm" ||
            timePickerType === "hhmmss") && (
            <div className="flex flex-1">
              <TimePickerDropdownMenuContent
                id={"hh"}
                numbers={hourArray}
                onTimeClick={(hh) => {
                  if (date) {
                    const tempDate = new Date(date);
                    tempDate.setHours(hh);
                    setDate(tempDate);
                  } else {
                    const tempDate = new Date(new Date().setHours(hh, 0, 0, 0));
                    setDate(tempDate);
                  }
                }}
                selectedIndex={date?.getHours()}
              />
              <div className="flex w-[1px] bg-Gr-200" />
            </div>
          )}

          {(timePickerType === "hhmm" || timePickerType === "hhmmss") && (
            <div className="flex flex-1">
              <TimePickerDropdownMenuContent
                id={"mm"}
                numbers={minuteArray}
                onTimeClick={(mm) => {
                  if (date) {
                    const tempDate = new Date(date);
                    tempDate.setMinutes(mm);
                    setDate(tempDate);
                  } else {
                    const tempDate = new Date(new Date().setHours(0, mm, 0, 0));
                    setDate(tempDate);
                  }
                }}
                selectedIndex={date?.getMinutes()}
              />
              <div className="flex w-[1px] bg-Gr-200" />
            </div>
          )}

          {timePickerType === "hhmmss" && (
            <TimePickerDropdownMenuContent
              id="ss"
              numbers={secondsArray}
              onTimeClick={(ss) => {
                if (date) {
                  const tempDate = new Date(date);
                  tempDate.setSeconds(ss);
                  setDate(tempDate);
                } else {
                  const tempDate = new Date(new Date().setHours(0, 0, ss, 0));
                  setDate(tempDate);
                }
              }}
              selectedIndex={date?.getSeconds()}
            />
          )}
        </div>
        <button
          className="flex h-[42px] w-full items-center justify-center border-t-[1px] border-Gr-200 text-[14px] font-[500] text-NS-20"
          onClick={() => setIsOpen(false)}
        >
          {dictionary.common.confirm}
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const updateDropdownMenuContent = (
  scrollAreaRef: React.MutableRefObject<
    TimePickerDropdownMenuContentButtonRef[]
  >,
  value: number,
) => {
  scrollAreaRef?.current?.forEach((el, index) => {
    if (index === value) {
      el?.setSelected(true);
    } else {
      el?.setSelected(false);
    }
  });
};

function TimePickerDropdownMenuContent({
  numbers,
  onTimeClick,
  id,
  selectedIndex,
}: {
  numbers: number[];
  onTimeClick: (value: number) => void;
  id: string;
  selectedIndex?: number;
}) {
  const scrollAreaRef = useRef<TimePickerDropdownMenuContentButtonRef[]>([]);

  useOnMount(() => {
    if (selectedIndex !== undefined) {
      scrollAreaRef?.current[selectedIndex]?.scrollIntoView();
      scrollAreaRef?.current[selectedIndex]?.setSelected(true);
    }
  });

  return (
    <ScrollArea
      classNames={{
        root: "flex h-full w-[49px] flex-col overflow-hidden hover:overflow-auto",
        scrollBar: {
          thumb: "bg-Gr-200/50",
        },
      }}
      scrollHideDelay={0}
    >
      {numbers.map((num, index) => (
        <TimePickerDropdownMenuContentButton
          ref={(el) => (scrollAreaRef.current[index] = el!)}
          number={num}
          onTimeClick={(value: number) => {
            onTimeClick(value);
            updateDropdownMenuContent(scrollAreaRef, value);
          }}
          key={`${id}_${index.toString()}}`}
        />
      ))}
    </ScrollArea>
  );
}

interface TimePickerDropdownMenuContentButtonRef {
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
}

const TimePickerDropdownMenuContentButton = React.forwardRef<
  TimePickerDropdownMenuContentButtonRef,
  { number: number; onTimeClick: (value: number) => void }
>(({ number, onTimeClick }, ref) => {
  const [selected, setSelected] = useState(false);
  const [hover, setHover] = useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => ({
    setSelected,
    scrollIntoView: () => {
      buttonRef.current?.scrollIntoView();
    },
  }));

  return (
    <button
      ref={buttonRef}
      className={cn(`flex h-[32px] w-full`)}
      onClick={() => {
        onTimeClick(number);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={cn(
          "mx-[6px] my-[5px] flex h-full w-full items-center justify-center rounded-[6px] text-[14px] font-[400] text-NS-20",
          selected ? "bg-NS-3" : hover && "bg-NS-1",
        )}
      >
        {SesameUtil.leadingZero(String(number), 2)}
      </div>
    </button>
  );
});

TimePickerDropdownMenuContentButton.displayName =
  "TimePickerDropdownMenuContentButton";
