import React from "react";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DateMUI = ({ name, value, onDateChange }) => {
  const handleDateChange = (date) => {
    onDateChange({ target: { name, value: date.format('YYYY-MM-DD') } });
  };

  const datePickerStyle = {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'black',
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        onChange={(date) => handleDateChange(date)}
        style={datePickerStyle}
      />
    </LocalizationProvider>
  );
};

export default DateMUI;
