import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import TestDate from "./date";
import { useNavigate } from "react-router";
import axios from "axios";
import { withAuth } from "../authentication/login";
import DateMUI from "./dateMUI";

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

  // console.log(formData);

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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <div style={{ width: "70%", marginTop: "5%" }}>
        {/* <form onSubmit={handleSubmit}> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Typography>
              Hours: <br />
            </Typography>
            <Typography>from  <br /></Typography>
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
          </div>

          <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Typography>Date</Typography>
            {/* <TestDate /> */}
            <DateMUI
              name="date"
              value={formData.date}
              onDateChange={handleInputChange}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <FormControl style={{ width: "10%" }}>
              <Typography>Sex</Typography>
            </FormControl>
            <FormControl variant="standard" style={{ width: "30%" }}>
              <Select
                labelId="sex-label"
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Typography>Age:</Typography>
            <TextField
              variant="standard"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography>Meal Price:</Typography>
          <TextField
            variant="standard"
            type="number"
            name="meal_price"
            value={formData.meal_price}
            onChange={handleInputChange}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography>Location:</Typography>
          <TextField
            variant="standard"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography>Note:</Typography>
          <TextField
            variant="standard"
            type="text"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
          />
        </div>

        {/* <button type="submit">Send</button> */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            style={{ backgroundColor: "#FA7015" }}
          >
            Send
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/home")}
            style={{ borderColor: "#FA7015", color: "#FA7015" }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
});
export default Offer;
