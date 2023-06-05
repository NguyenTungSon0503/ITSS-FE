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
import TestDate from "./date";
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // console.log(typeof formData.hour_start);
  };

  console.log(formData);

  const navigate = useNavigate();
  const handleSubmit = async () => {
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
  };

  return (
    <div style={{width: "100%", }} >
      <Box mt={5}>
        <Typography variant="h5" paddingLeft={5}  paddingTop={3}>Make Offer</Typography>
        <Stack direction='row' justifyContent='space-between' paddingLeft={5} paddingRight={5} flexWrap='wrap'>
          <Box flex={1}>
            <Typography variant="h6">Hours:</Typography>
            <Stack direction='row'>
            <Typography>from</Typography>
            <TextField
              variant="standard"
              type="time"
              name="hour_start"
              value={formData.hour_start}
              onChange={handleInputChange}
            />
            <Typography>to</Typography>
            <TextField
              variant="standard"
              type="time"
              name="hour_end"
              value={formData.hour_end}
              onChange={handleInputChange}
            />
            </Stack>
          </Box>

          <Box flex={1} sx={{minWidth: "50%"}}>
            <Typography variant="h6">Date</Typography>
            {/* <TestDate /> */}
            <DateMUI
              name="date"
              value={formData.date}
              onDateChange={handleInputChange}
            />
          </Box>
        </Stack>

        <Typography variant="h5" paddingLeft={5} paddingTop={3}>Request</Typography>
        <Stack direction='row' justifyContent='space-between' paddingLeft={5} paddingRight={5} >
          <Box flex={1}>
            <Typography variant="h6">Sex</Typography>
              <Select
                variant="standard"
                labelId="sex-label"
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                style={{minWidth: "50%"}}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
          </Box>

          <Box flex={1} >
            <Typography variant="h6">Age:</Typography>
            <TextField
              variant="standard"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
          </Box>
        </Stack>

        <Box flex={1} padding={5} paddingTop={2}>
          <Typography>Meal Price:</Typography>
          <TextField
            fullWidth
            variant="standard"
            type="number"
            name="meal_price"
            value={formData.meal_price}
            onChange={handleInputChange}
          />
        </Box>

        <Box padding={5} paddingTop={2}>
          <Typography>Location:</Typography>
          <TextField
            fullWidth
            variant="standard"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </Box>

        <Box padding={5} paddingTop={2}>
          <Typography>Note:</Typography>
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
        <Stack direction='row' justifyContent='space-around' >
        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{ backgroundColor: "#FA7015", width: "20%", minWidth: 100}}
          size="large"
        >
          Send
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/home")}
          style={{ borderColor: "#FA7015", color: "#FA7015", width: "20%", minWidth: 100}}
          size="large"
        >
          Cancel
        </Button>
        </Stack>
      </Box>
    </div>
  );
});
export default Offer;
