import React, { useState } from "react";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getTodayDate } from "@mui/x-date-pickers/internals";

const DateMUI = ({ name, value, onDateChange }) => {
    const handleDateChange = (date) => {
      onDateChange({ target: { name, value: date.format('YYYY-MM-DD') } });
    };
  
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={value}
          onChange={(date) => handleDateChange(date)}
        />
      </LocalizationProvider>
    );
  };

export default DateMUI;
