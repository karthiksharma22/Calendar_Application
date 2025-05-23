import React from "react";
import dayjs from "dayjs";

function darkenColor(hex, amount = 20) {
  let color = hex.replace("#", "");
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const num = parseInt(color, 16);
  const r = Math.max((num >> 16) - amount, 0);
  const g = Math.max(((num >> 8) & 0x00ff) - amount, 0);
  const b = Math.max((num & 0x0000ff) - amount, 0);

  return `rgb(${r}, ${g}, ${b})`;
}

export default function DayCell({
  date,
  events,
  isSelected,
  onClick,
  currentMonth,
}) {
  if (!date) {
    return <div className="empty-cell bg-gray-200 dark:bg-gray-700"></div>;
  }

  const todayStr = dayjs().format("YYYY-MM-DD");
  const dateStr = dayjs(date).format("YYYY-MM-DD");
  const sameMonth = date.month() === dayjs(currentMonth).month();
  const isToday = dateStr === todayStr;

  const dayEvents = events.filter((e) => e.date === dateStr);
  const cellColor =
    sameMonth && dayEvents.length > 0 ? dayEvents[0].color : "transparent";
  const backgroundColor =
    sameMonth && dayEvents.length > 0 ? `${cellColor}33` : "transparent";

  return (
    <div
      onClick={onClick}
      className={`day-cell relative p-2 cursor-pointer
        bg-white dark:bg-gray-900
        ${isSelected ? "ring-2 ring-blue-500" : ""}
        ${isToday ? "today border border-red-500" : ""}
      `}
      style={{
        backgroundColor:
          backgroundColor !== "transparent" ? backgroundColor : undefined,
        borderLeft:
          sameMonth && dayEvents.length > 0
            ? `4px solid ${cellColor}`
            : "4px solid transparent",
      }}
      data-date={dateStr}
    >
      <div className="day-number text-sm font-medium">{dayjs(date).date()}</div>

      {sameMonth && dayEvents.length > 0 && (
        <div className="categories mt-1 space-y-0.5">
          {dayEvents.map((event, index) => (
            <div
              key={index}
              title="Click"
              className="cell text-[10px] truncate rounded px-1 py-0.5"
              style={{
                backgroundColor: darkenColor(event.color, 30),
                color: "white",
              }}
            >
              {event.category}
            </div>
          ))}
        </div>
      )}

      {sameMonth && dayEvents.length > 0 && (
        <span className="event-badge text-xs bg-red-500 text-white px-2 py-0.5 rounded-full absolute top-1 right-1">
          {dayEvents.length}
        </span>
      )}
    </div>
  );
}
