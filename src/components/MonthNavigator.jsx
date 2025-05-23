import React from "react";
import dayjs from "dayjs";

export default function MonthNavigator({ selectedDate, setSelectedDate }) {
  const changeMonth = (offset) => {
    setSelectedDate(dayjs(selectedDate).add(offset, "month").toDate());
  };

  return (
    <div className="month-navigator">
      <button onClick={() => changeMonth(-1)}>&larr;</button>
      <h2>{dayjs(selectedDate).format("MMMM YYYY")}</h2>
      <button onClick={() => changeMonth(1)}>&rarr;</button>
    </div>
  );
}
