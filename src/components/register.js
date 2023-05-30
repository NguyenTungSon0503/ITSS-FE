import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import CustomAlert from "./alert";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    // confirmPassword: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [alert, setAlert] = useState({
    open: false,
    message: " ",
    type: "success",
  }); // initialize state for CustomAlert

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChange = (event) => {
    setConfirmPassword(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (confirmPassword !== "" && formData.password !== "") {
      if (confirmPassword !== formData.password) {
        // alert("Password and confirm password must be the same");
        setAlert({
          open: true,
          message: "Password and confirm password must be the same",
          type: "error",
        });
        return;
      } else {
        setAlert({
          open: true,
          message: "Sign up successfully",
          type: "success",
        });
      }
    } else {
      setAlert({
        open: true,
        message: "Please fill in the blank",
        type: "error",
      })
    }

    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:5000/api/users",
        formData
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <CustomAlert alertData={alert} />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <FormControl style={{ width: "10%" }} fullWidth>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <MenuItem value="partner">Vietnamese</MenuItem>
            <MenuItem value="user">Japanese</MenuItem>
          </Select>
        </FormControl>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Register</button>
        <button type="button" onClick={() => navigate("/login")}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Register;
