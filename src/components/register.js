import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

function Register() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/users", formData)
      .then((response) => {
        setData([...data, response.data]);
        console.log(response.data);
        setFormData({});
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleButton = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  //react-select role

  const [role, setRole] = useState("");

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
          />
        </div>
      {/* select role */}
      <FormControl style={{ width: "10%" }} fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Roleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
          onChange={handleChange}
        >
          <MenuItem value={"vietnamese"}>Vietnamese</MenuItem>
          <MenuItem value={"japanese"}>Japanese</MenuItem>
        </Select>
        </FormControl>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Register</button>
        <button type="button" onClick={handleButton}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Register;
