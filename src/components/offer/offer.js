import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import { withAuth } from "../authentication/login";
import DateMUI from "./dateMUI";
import Stack from "@mui/material/Stack";

const Offer = withAuth((props) => {
  const [formData, setFormData] = useState({
    hour_start: "",
    hour_end: "",
    date: "",
    sex: "",
    age: "",
    meal_price: "",
    location: "",
    note: "",
  });
console.log(formData);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // console.log(typeof formData.hour_start);
  };

  const navigate = useNavigate();
  const handleCancelButton = (event) => {
    if (
      formData.hour_start === "" &&
      formData.hour_end === "" &&
      formData.date === "" &&
      formData.sex === "" &&
      formData.age === "" &&
      formData.meal_price === "" &&
      formData.location === "" &&
      formData.note === ""
    ) {
      setFormData({
        hour_start: "",
        hour_end: "",
        date: "",
        sex: "",
        age: "",
        meal_price: "",
        location: "",
        note: "",
      });
    } else {
      alert("Are you sure you want to cancel");
      setFormData({
        hour_start: "",
        hour_end: "",
        date: "",
        sex: "",
        age: "",
        meal_price: "",
        location: "",
        note: "",
      });
    }
  };
  const handleSubmit = async () => {
    if (
      validateTime(formData.hour_start, formData.hour_end) === 1 &&
      validateDate(formData.date) === 1
    ) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/offers",
          formData,
          {
            headers: {
              authorization: `Bearer ${props.accessToken}`,
            },
            withCredentials: true,
          }
        );
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    }
  };
  // startTime < endTime
  // startTime > timeNow

  //handle when startTime > endTime
  function validateTime(startTime, endTime) {
    const arrayStart = startTime.split(":");
    const arrayEnd = endTime.split(":");
    const startTimeSecond = arrayStart[0] * 3600 + arrayStart[1] * 60;
    const endTimeSecond = arrayEnd[0] * 3600 + arrayEnd[1] * 60;
    const timeNow = new Date();
    const timeNowSecond =
      parseInt(timeNow.getHours() * 3600) + parseInt(timeNow.getMinutes() * 60);
    if (startTimeSecond < timeNowSecond) {
      alert("Start time must be greater than or equal to Time Now");
      return 0;
    } else {
      if (startTimeSecond > endTimeSecond) {
        alert("End time must be greater than or equal to Start time");
        return 0;
      } else {
        return 1;
      }
    }
  }

  //handle when date > now

  function validateDate(date) {
    const dateTime = new Date(date);
    const epochTime = dateTime.getTime();
    const timeNow = new Date();
    const epochNow = timeNow.getTime();
    if (epochTime < epochNow) {
      alert("Date should be greater or equal to Today");
      return 0;
    } else {
      return 1;
    }
  }
  return (
    <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
      <Box paddingLeft={"5%"} paddingRight={"5%"} paddingTop={5}>
        <Typography variant="h4" paddingLeft={5} paddingTop={3}>
          オファー作り
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          paddingLeft={5}
          paddingRight={5}
          flexWrap="wrap"
        >
          <Box flex={1}>
            <Typography variant="h6" paddingTop={"2%"}>
              時間
            </Typography>
            <Stack direction="row">
              <TextField
                variant="standard"
                type="time"
                name="hour_start"
                value={formData.hour_start}
                onChange={handleInputChange}
              />
              <Typography
                paddingLeft={2}
                paddingRight={2}
                paddingTop={1}
                fontWeight={700}
                fontSize={20}
              >
                まで
              </Typography>
              <TextField
                variant="standard"
                type="time"
                name="hour_end"
                value={formData.hour_end}
                onChange={handleInputChange}
              />
            </Stack>
          </Box>

          <Box flex={1} sx={{ minWidth: "50%" }}>
            <Typography variant="h6">年月日</Typography>
            {/* <TestDate /> */}
            <DateMUI
              name="date"
              value={formData.date}
              onDateChange={handleInputChange}
            />
          </Box>
        </Stack>

        <Typography variant="h4" paddingLeft={5} paddingTop={3}>
          リクエスト
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          paddingLeft={5}
          paddingRight={5}
        >
          <Box flex={1}>
            <Typography variant="h6" paddingTop={"5%"}>
              性別
            </Typography>
            <Select
              variant="standard"
              labelId="sex-label"
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
              style={{ minWidth: "25%" }}
            >
              <MenuItem value="male">男性</MenuItem>
              <MenuItem value="female">女性</MenuItem>
              <MenuItem value="other">その他</MenuItem>
            </Select>
          </Box>

          <Box flex={1}>
            <Typography variant="h6" paddingTop={"5%"}>
              年齢
            </Typography>
            <TextField
              variant="standard"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
          </Box>
        </Stack>

        <Box flex={1} padding={5}>
          <Typography variant="h6">希望食事の費</Typography>
          <TextField
            fullWidth
            variant="standard"
            type="number"
            name="meal_price"
            value={formData.meal_price}
            onChange={handleInputChange}
          />
        </Box>

        <Box padding={5} paddingTop={1}>
          <Typography variant="h6">希望食事の住所</Typography>
          <TextField
            fullWidth
            variant="standard"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </Box>

        <Box padding={5} paddingTop={"0.5%"}>
          <Typography variant="h6">その他</Typography>
          <TextField
            fullWidth
            variant="standard"
            type="text"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
          />
        </Box>

        {/* <button type="submit">Send</button> */}
        <Stack direction="row" justifyContent="space-around" paddingBottom={8}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            style={{ backgroundColor: "#FA7015", width: "20%", minWidth: 100 }}
            size="large"
          >
            送信
          </Button>

          <Button
            variant="outlined"
            onClick={handleCancelButton}
            style={{
              borderColor: "#FA7015",
              color: "#FA7015",
              width: "20%",
              minWidth: 100,
            }}
            size="large"
          >
            キャセル
          </Button>
        </Stack>
      </Box>
    </div>
  );
});
export default Offer;
