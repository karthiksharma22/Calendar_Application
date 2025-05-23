import React, { useState } from "react";
import dayjs from "dayjs";

export default function EventViewer({ events, selectedDate, setSelectedDate }) {
  const [searchTerm, setSearchTerm] = useState("");
  const selectedDay = dayjs(selectedDate).format("YYYY-MM-DD");

  const filteredEvents = searchTerm
    ? events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : events;

  const dayEvents = filteredEvents.filter(
    (event) => event.date === selectedDay
  );

  const isOverlapping = (event1, event2) => {
    return (
      dayjs(event1.startTime).isBefore(dayjs(event2.endTime)) &&
      dayjs(event2.startTime).isBefore(dayjs(event1.endTime))
    );
  };

  const conflicts = new Set();
  dayEvents.forEach((event, i) => {
    for (let j = i + 1; j < dayEvents.length; j++) {
      if (isOverlapping(event, dayEvents[j])) {
        conflicts.add(i);
        conflicts.add(j);
      }
    }
  });

  return (
    <div className="event-viewer">
      <h3>Events on {selectedDay}</h3>

      <div className="event-summary flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="text-info">
          <p>Total events: {dayEvents.length}</p>
          {conflicts.size > 0 && <p>Conflicting events: {conflicts.size}</p>}
        </div>
        <div className="search-container flex items-center gap-2">
          <input
            type="text"
            placeholder="Search from events"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input border px-3 py-1 rounded"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="clear-search text-sm px-2 py-1 bg-gray-200 rounded"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {dayEvents.length === 0 ? (
        <p className="no-events">
          {searchTerm
            ? `No events matching "${searchTerm}" on this day`
            : "No events scheduled for this day, Click on any date to view more."}
        </p>
      ) : (
        <ul className="event-list">
          {dayEvents.map((event, index) => (
            <li
              key={index}
              className={`event-item ${conflicts.has(index) ? "conflict" : ""}`}
              style={{
                backgroundColor: `${event.color}20`,
                borderLeft: `4px solid ${event.color}`,
                color: getContrastingTextColor(event.color),
              }}
            >
              <strong>{event.title}</strong>
              <span className="event-time">
                <i
                  class="fa-regular fa-clock"
                  style={{ marginRight: "5px" }}
                ></i>
                {dayjs(event.startTime).format("HH:mm")} -{" "}
                {dayjs(event.endTime).format("HH:mm")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function getContrastingTextColor(hexColor) {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}
