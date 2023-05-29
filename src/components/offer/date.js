import React, { useState } from "react";
import DatePicker from "react-datepicker";

// import required css from library
import "react-datepicker/dist/react-datepicker.css";

// time-picker component. using showTimeSelect as a main props and works with basic functionality on react-datepicker that explained above
const TestDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  //need function handle time
  let testDate = JSON.stringify(startDate);
  let convertedDate = JSON.parse(testDate);
  let timeString = convertedDate.split("T")[0];
  let timeArray = timeString.split("-");
  console.log(timeArray);
  const year = timeArray[0];
  const month = timeArray[1];
  const day = timeArray[2];
  let formattedDay = parseInt(day);
  let trueDay;
  //need handle when month have 30 days
  if (formattedDay === 31) {
    trueDay = 1;
  } else trueDay = formattedDay + 1;
  const stringDay = `${trueDay}`
  const doneDay = stringDay.padStart(2, '0')
  const doneTime = `${year}-${month}-${doneDay}`
  console.log(doneTime);
  console.log(year, month, day, doneDay);

  console.log(testDate);
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="dd/MM/yyyy"
    />
  );
};
export default TestDate;
