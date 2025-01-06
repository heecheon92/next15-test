"use client";

import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

import { Input } from "../input";
import {
  TimePickerInputType,
  getArrowByType,
  getDateByType,
  setDateByType,
} from "./time-picker-utils";

export type TimePickerInputRange = {
  start: number;
  end: number;
};

export interface TimePickerInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  picker: TimePickerInputType;
  date: Date | undefined;
  placeholder: string | undefined;
  setDate: (date: Date | undefined) => void;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
  range?: TimePickerInputRange;
}

const TimePickerInput = React.forwardRef<
  HTMLInputElement,
  TimePickerInputProps
>(
  (
    {
      className,
      type = "tel",
      value,
      id,
      name,
      date = new Date(new Date().setHours(0, 0, 0, 0)),
      placeholder,
      setDate,
      onChange,
      onKeyDown,
      picker,
      onLeftFocus,
      onRightFocus,
      range,
      ...props
    },
    ref
  ) => {
    const [flag, setFlag] = React.useState<boolean>(false);

    /**
     * allow the user to enter the second digit within 2 seconds
     * otherwise start again with entering first digit
     */
    useEffect(() => {
      if (flag) {
        const timer = setTimeout(() => {
          setFlag(false);
        }, 2000);

        return () => clearTimeout(timer);
      }
    }, [flag]);

    const calculatedValue = React.useMemo(
      () => getDateByType(date, picker, range),
      [date, picker, range]
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      //   if (e.key === "Tab") return;
      e.preventDefault();
      if (e.key === "ArrowRight") onRightFocus?.();
      if (e.key === "ArrowLeft") onLeftFocus?.();
      if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        const step = e.key === "ArrowUp" ? 1 : -1;
        const newValue = getArrowByType(calculatedValue, step, picker);
        if (flag) setFlag(false);
        const tempDate = new Date(date);
        setDate(setDateByType(tempDate, newValue, picker));
      }

      if (e.key >= "0" && e.key <= "9") {
        const newValue = !flag
          ? "0" + e.key
          : calculatedValue.slice(1, 2) + e.key;
        if (flag) onRightFocus?.();
        setFlag((prev) => !prev);
        const tempDate = new Date(date);
        setDate(setDateByType(tempDate, newValue, picker));
      }
    };

    return (
      <Input
        ref={ref}
        id={id || picker}
        name={name || picker}
        className={cn(
          "flex h-full border-none px-0 text-center text-[14px] font-[400] leading-[20px] shadow-none outline-none focus:outline-none disabled:cursor-not-allowed disabled:text-NS-6 [&::-webkit-inner-spin-button]:appearance-none ",
          placeholder ? "text-NS-4" : "text-NS-20",
          className
        )}
        value={placeholder ? placeholder : value || calculatedValue}
        onChange={(e) => {
          e.preventDefault();
          onChange?.(e);
        }}
        type={type}
        inputMode={placeholder ? "text" : "decimal"}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          handleKeyDown(e);
        }}
        disabled={props.disabled}
        {...props}
      />
    );
  }
);

TimePickerInput.displayName = "TimePickerInput";

export { TimePickerInput };
