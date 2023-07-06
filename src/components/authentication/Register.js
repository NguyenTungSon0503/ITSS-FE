import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Stack,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import CustomAlert from "./alert";
import Logo from "../logo/Logo";

function Register() {
  const [formData, setFormData] = useState({
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
      });
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
    // <div>
    //   <CustomAlert alertData={alert} />
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="name">Name:</label>
    //       <input
    //         type="text"
    //         id="name"
    //         name="name"
    //         value={formData.name}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="email">Email:</label>
    //       <input
    //         type="text"
    //         id="email"
    //         name="email"
    //         value={formData.email}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <FormControl style={{ width: "10%" }} fullWidth>
    //       <InputLabel id="role-label">Role</InputLabel>
    //       <Select
    //         labelId="role-label"
    //         name="role"
    //         value={formData.role}
    //         onChange={handleChange}
    //       >
    //         <MenuItem value="partner">Vietnamese</MenuItem>
    //         <MenuItem value="user">Japanese</MenuItem>
    //       </Select>
    //     </FormControl>
    //     <div>
    //       <label htmlFor="password">Password:</label>
    //       <input
    //         type="password"
    //         id="password"
    //         name="password"
    //         value={formData.password}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="confirmPassword">Confirm Password:</label>
    //       <input
    //         type="password"
    //         id="confirmPassword"
    //         name="confirmPassword"
    //         value={confirmPassword}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <button type="submit">Register</button>
    //     <button type="button" onClick={() => navigate("/login")}>
    //       Login
    //     </button>
    //   </form>
    // </div>

    <Stack direction="row" sx={{ backgroundColor: "#FFF8F8", height: "100vh" }}>
      <Box flex={2}></Box>

      <Box flex={1} bgcolor="#FF6C02"></Box>

      <Stack
        direction="row"
        sx={{
          position: "absolute",
          top: 120,
          left: 200,
          right: 150,
          bottom: 80,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          border: 1,
        }}
      >
        <Box flex={4}>
          <Stack direction="column" margin={5} spacing={1}>
            <Box>
              <Logo />
            </Box>
            <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>
              サインアップ
            </Typography>

            <Stack direction="row">
              <Box flex={1}>
                <Typography>国籍</Typography>
              </Box>

              <Box flex={1}>
                <FormControl fullWidth>
                  <InputLabel id="role-label">国籍</InputLabel>
                  <Select
                    labelId="role-label"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <MenuItem value="user">日本</MenuItem>
                    <MenuItem value="partner">Vietnamese</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>

            <Typography>メールアドレス</Typography>
            <TextField
              variant="standard"
              type="text"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
            />

            <Typography>パスワード</Typography>
            <TextField
              variant="standard"
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
            />

            <Typography>パスワード確認</Typography>
            <TextField
              variant="standard"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />

            <Button
              style={{
                backgroundColor: "#FF6C02",
                color: "white",
                marginTop: 20,
              }}
              onClick={handleSubmit}
            >
              登録
            </Button>
          </Stack>
        </Box>

        <Stack flex={5} bgcolor="rgba(242, 240, 240, 0.5)">
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", margin: 5 }}
          >
            <Box
              flex={1}
              sx={{
                // backgroundColor: "#8F21AF",
                marginRight: "8rem",
                marginBottom: 5,
                minWidth: 30,
                height: "100%",
                minHeight: 400,
                borderRadius: 50,
                background: "linear-gradient(to right, #8F21AF, #A82BA1)",
              }}
            ></Box>
            <Box
              flex={1}
              sx={{
                background: "linear-gradient(to right, #ED4974, #F84E6D)",
                marginRight: "8rem",
                marginTop: 10,
                marginBottom: 10,
                minWidth: 30,
                height: 100,
                minHeight: 300,
                borderRadius: 50,
              }}
            ></Box>
            <Box
              flex={1}
              sx={{
                background: "linear-gradient(to right, #EE4A74, #F74D6D)",
                marginRight: "8rem",
                marginTop: 10,
                marginBottom: 10,
                minWidth: 30,
                height: 100,
                minHeight: 300,
                borderRadius: 50,
              }}
            ></Box>
            <Box
              flex={1}
              sx={{
                color: "#8F21AF",
                background: "linear-gradient(to right, #FC9435, #FDA12A)",
                minWidth: 30,
                height: "100%",
                borderRadius: 50,
              }}
            ></Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Register;
