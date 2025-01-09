import { Calendar } from "@/app/components/shadcn/calendar";
import { useState } from "react";

export function CalendarComponent() {
  const [date, setDate] = useState(new Date());

  return <Calendar mode="single" selected={date} onSelect={setDate} required />;
}
