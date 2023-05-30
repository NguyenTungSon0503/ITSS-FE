import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("vi",vi);

// time-picker component. using showTimeSelect as a main props and works with basic functionality on react-datepicker that explained above
const TestDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  let testDate = JSON.stringify(startDate);
  let convertedDate = JSON.parse(testDate);
  console.log(convertedDate);
  // console.log(year, month, day, doneDay);

  // console.log(testDate);
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="dd/MM/yyyy"
      locale="vi"
    />
  );
};
export default TestDate;
