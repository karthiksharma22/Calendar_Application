import React from "react";
import EventViewer from "./EventViewer";
import CalendarGrid from "./CalendarGrid";
import MonthNavigator from "./MonthNavigator";

export default function MainContent({ events, selectedDate, setSelectedDate }) {
  return (
    <div className="main-content">
      <EventViewer events={events} selectedDate={selectedDate} />
      <div className="calendar-container">
        <MonthNavigator
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <CalendarGrid
          events={events}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
}
