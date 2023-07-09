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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { withAuth } from "../authentication/Login";
import DateMUI from "./dateMUI";
import Stack from "@mui/material/Stack";
import CustomAlert from "../authentication/alert";

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
  const navigate = useNavigate();
  const [alertData, setAlert] = useState({
    open: false,
    message: " ",
    type: "success",
  });
  // initialize state for CustomAlert  const navigate= useNavigate()
  // console.log(formData);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // console.log(typeof formData.hour_start);
  };
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

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
      navigate("/");
    } else {
      alert("キャンセルしますか？");
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
      validateTime(formData.hour_start, formData.hour_end, formData.date) === 1
    ) {
      try {
        const res = await axios.post(
          "http://20.189.73.135:5000/api/offers",
          formData,
          {
            headers: {
              authorization: `Bearer ${props.accessToken}`,
            },
            withCredentials: true,
          }
        );
        setAlert({
          open: true,
          message: "オファーを作りました",
          type: "success",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    }
  };
  // startTime < endTime
  // startTime > timeNow
  //handle when startTime > endTime

  function validateTime(startTime, endTime, originalDate) {
    var date = new Date(originalDate);
    date.setUTCHours(date.getUTCHours() + 7);
    let updatedIsoDate = date.toISOString();
    const dayMonthYear = updatedIsoDate.split("T")[0];
    const timeStartString = `${dayMonthYear}T${startTime}:00.000Z`;
    const timeStart = new Date(timeStartString);
    const timeStartEpoch = timeStart.getTime();
    const arrayStart = startTime.split(":");
    const arrayEnd = endTime.split(":");
    const startTimeSecond = arrayStart[0] * 3600 + arrayStart[1] * 60;
    const endTimeSecond = arrayEnd[0] * 3600 + arrayEnd[1] * 60;
    const timeNow = new Date();
    const timeNowEpoch = timeNow.getTime();
    if (timeStartEpoch < timeNowEpoch) {
      alert("開始時刻は現在時刻以上でなければなりません。");
      return 0;
    } else {
      if (startTimeSecond > endTimeSecond) {
        alert("終了時刻は開始時刻以上でなければなりません。");
        return 0;
      } else {
        return 1;
      }
    }
  }

  //handle when date > now

  return (
    <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
      <CustomAlert alertData={alertData} />
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
                から
              </Typography>
              <TextField
                variant="standard"
                type="time"
                name="hour_end"
                value={formData.hour_end}
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
              onKeyDown={blockInvalidChar}
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
            onKeyDown={blockInvalidChar}
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
          <Button
            variant="contained"
            onClick={handleSubmit}
            style={{ backgroundColor: "#FA7015", width: "20%", minWidth: 100 }}
            size="large"
          >
            送信
          </Button>
        </Stack>
      </Box>
    </div>
  );
});
export default Offer;
