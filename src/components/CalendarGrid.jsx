import React from "react";
import dayjs from "dayjs";
import DayCell from "./DayCell";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarGrid({
  events,
  selectedDate,
  setSelectedDate,
}) {
  const startOfMonth = dayjs(selectedDate).startOf("month");
  const endOfMonth = dayjs(selectedDate).endOf("month");
  const startDay = startOfMonth.day();
  const totalDays = endOfMonth.date();

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    const date = dayjs(selectedDate).date(d);
    days.push(date);
  }

  return (
    <div className="cal-cont">
      <div className="calendar-grid2">
        {dayNames.map((day) => (
          <div key={day} className="day-header">
            {day.toUpperCase()}
          </div>
        ))}
      </div>
      <div className="calendar-grid">
        {days.map((date, idx) => (
          <DayCell
            key={idx}
            date={date}
            events={events}
            isSelected={date && dayjs(date).isSame(selectedDate, "day")}
            currentMonth={selectedDate}
            onClick={() => {
              date && setSelectedDate(date.toDate());
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        ))}
      </div>
    </div>
  );
}
