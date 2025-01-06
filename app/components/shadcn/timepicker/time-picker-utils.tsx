import { TimePickerInputRange } from "./time-picker-input";

/**
 * regular expression to check for valid hour format (01-23)
 */
export function isValidHour(value: string, range?: TimePickerInputRange) {
  if (range) {
    const hour = parseInt(value, 10);
    return hour >= range.start && hour <= range.end;
  }
  return /^(0[0-9]|1[0-9]|2[0-3])$/.test(value);
}

/**
 * regular expression to check for valid 12 hour format (01-12)
 */
export function isValid12Hour(value: string, range?: TimePickerInputRange) {
  if (range) {
    const hour = parseInt(value, 10);
    return hour >= range.start && hour <= range.end;
  }
  return /^(0[1-9]|1[0-2])$/.test(value);
}

/**
 * regular expression to check for valid minute format (00-59)
 */
export function isValidMinuteOrSecond(
  value: string,
  range?: TimePickerInputRange,
) {
  if (range) {
    const hour = parseInt(value, 10);
    return hour >= range.start && hour <= range.end;
  }
  return /^[0-5][0-9]$/.test(value);
}

type GetValidNumberConfig = { max: number; min?: number; loop?: boolean };

export function getValidNumber(
  value: string,
  { max, min = 0, loop = false }: GetValidNumberConfig,
) {
  let numericValue = parseInt(value, 10);

  if (!isNaN(numericValue)) {
    if (!loop) {
      if (numericValue > max) numericValue = max;
      if (numericValue < min) numericValue = min;
    } else {
      if (numericValue > max) numericValue = min;
      if (numericValue < min) numericValue = max;
    }
    return numericValue.toString().padStart(2, "0");
  }

  return "00";
}

export function getValidHour(value: string, range?: TimePickerInputRange) {
  if (range) {
    return getValidNumber(value, { min: range.start, max: range.end });
  } else {
    if (isValidHour(value, range)) return value;
    return getValidNumber(value, { max: 23 });
  }
}

// export function getValid12Hour(value: string, range?: TimePickerInputRange) {
//   if (isValid12Hour(value)) return value;
//   return getValidNumber(value, { max: 12 });
// }

export function getValidMinuteOrSecond(
  value: string,
  range?: TimePickerInputRange,
) {
  if (range) {
    return getValidNumber(value, { min: range.start, max: range.end });
  } else {
    if (isValidMinuteOrSecond(value, range)) return value;
    return getValidNumber(value, { max: 59 });
  }
}

type GetValidArrowNumberConfig = {
  min: number;
  max: number;
  step: number;
};

export function getValidArrowNumber(
  value: string,
  { min, max, step }: GetValidArrowNumberConfig,
) {
  let numericValue = parseInt(value, 10);
  if (!isNaN(numericValue)) {
    numericValue += step;
    return getValidNumber(String(numericValue), { min, max, loop: true });
  }
  return "00";
}

export function getValidArrowHour(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 23, step });
}

export function getValidArrowMinuteOrSecond(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 59, step });
}

export function setHours(
  date: Date,
  value: string,
  range?: TimePickerInputRange,
) {
  const hours = getValidHour(value, range);
  date.setHours(parseInt(hours, 10));
  return date;
}

export function setMinutes(date: Date, value: string) {
  const minutes = getValidMinuteOrSecond(value);
  date.setMinutes(parseInt(minutes, 10));
  return date;
}

export function setSeconds(date: Date, value: string) {
  const seconds = getValidMinuteOrSecond(value);
  date.setSeconds(parseInt(seconds, 10));
  return date;
}

export type TimePickerType = "hh" | "hhmm" | "hhmmss";

export type TimePickerInputType = "minutes" | "seconds" | "hours"; // | "12hours";

export function setDateByType(
  date: Date,
  value: string,
  type: TimePickerInputType,
  range?: TimePickerInputRange,
) {
  switch (type) {
    case "minutes":
      return setMinutes(date, value);
    case "seconds":
      return setSeconds(date, value);
    case "hours":
      return setHours(date, value, range);
    default:
      return date;
  }
}

export function getDateByType(
  date: Date,
  type: TimePickerInputType,
  range?: TimePickerInputRange,
) {
  switch (type) {
    case "minutes":
      return getValidMinuteOrSecond(String(date.getMinutes()), range);
    case "seconds":
      return getValidMinuteOrSecond(String(date.getSeconds()), range);
    case "hours":
      return getValidHour(String(date.getHours()), range);
    default:
      return "00";
  }
}

export function getArrowByType(
  value: string,
  step: number,
  type: TimePickerInputType,
) {
  switch (type) {
    case "minutes":
      return getValidArrowMinuteOrSecond(value, step);
    case "seconds":
      return getValidArrowMinuteOrSecond(value, step);
    case "hours":
      return getValidArrowHour(value, step);
    default:
      return "00";
  }
}

export function createRangeArray(start: number, end: number): number[] {
  const rangeArray: number[] = [];
  for (let i = start; i <= end; i++) {
    rangeArray.push(i);
  }

  return rangeArray;
}
