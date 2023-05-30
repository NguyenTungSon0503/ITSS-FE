import React, { useState, useEffect } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import TestDate from "./date";
import { useNavigate } from "react-router";
import axios from "axios";
import { withAuth } from "../authentication/login";
const Offer = withAuth((props) => {
  const [formData, setFormData] = useState({
    hour_start: "",
    hour_end: "",
    sex: "",
    age: "",
    meal_price: "",
    location: "",
    note: "",
    // confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(typeof formData.hour_start);
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Hours:</label>
          <label>from</label>
          <input
            type="time"
            name="hour_start"
            value={formData.hour_start}
            onChange={handleInputChange}
          />
          <label>to</label>
          <input
            type="time"
            name="hour_end"
            value={formData.hour_end}
            onChange={handleInputChange}
          />
        </div>

        <div>
          Date
          <TestDate />
        </div>

        <FormControl style={{ width: "10%" }} fullWidth>
          <InputLabel id="sex-label">Sex</InputLabel>
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

        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Meal Price:</label>
          <input
            type="number"
            name="meal_price"
            value={formData.meal_price}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Note:</label>
          <input
            type="text"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Send</button>
      </form>
      <button onClick={() => navigate("/home")}>Cancel</button>
    </div>
  );
});
export default Offer;
