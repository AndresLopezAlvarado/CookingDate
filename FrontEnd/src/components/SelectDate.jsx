import { useState } from "react";
import DatePicker from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const range = (start, end, step = 1) => {
  const result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
};

const SelectDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  const years = range(1950, getYear(new Date()), 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayStyles = (date) => {
    return "text-lime-400";
  };

  const weekDayStyles = (date) => {
    return "bg-lime-900 text-lime-400 rounded-md";
  };

  return (
    <DatePicker
      className="bg-lime-300 text-orange-400 placeholder-orange-400 w-full px-4 py-2 mb-4 rounded-md"
      calendarClassName="bg-transparent"
      dayClassName={dayStyles}
      weekDayClassName={weekDayStyles}
      popperClassName="bg-lime-900"
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          className="gap-x-1"
        >
          <button
            className="bg-lime-700 hover:bg-lime-600 text-lime-500 hover:text-lime-900 px-1 rounded-md"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            {"<"}
          </button>

          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
            className="bg-lime-300 text-orange-400 p-1 rounded-md"
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
            className="bg-lime-300 text-orange-400 p-1 rounded-md"
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="bg-lime-700 hover:bg-lime-600 text-lime-500 hover:text-lime-900 px-1 rounded-md"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            {">"}
          </button>
        </div>
      )}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  );
};

export default SelectDate;
