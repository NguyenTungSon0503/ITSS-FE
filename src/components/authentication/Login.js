import React, { useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Logo from "../logo/Logo";

function Login() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/login", formData)
      .then((response) => {
        setData([...data, response.data]);
        setFormData({});
        // set cookies accessToken
        cookies.set("accessToken", response.data.accessToken, { path: "/" });
        cookies.set("refreshToken", response.data.refreshToken, { path: "/" });
        console.log("Login successful");
        navigate("/get_user");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
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
          <Stack direction="column" spacing={4} margin={5}>
          <Box sx={{marginLeft: 23}}><Logo/></Box>
            <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>
              サインイン
            </Typography>
            <Typography>ログインしてウェブサイトを続ける</Typography>
            <TextField
              variant="standard"
              type="text"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              placeholder="メールアドレス"
            />
            <TextField
              variant="standard"
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleInputChange}
              placeholder="パスワード"
            />

            <Button
              style={{ backgroundColor: "#FF6C02", color: "white" }}
              onClick={handleSubmit}
            >
              サインイン
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
            >
              
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

function withAuth(WrappedComponent) {
  return function Authenticated(props) {
    const cookies = new Cookies();
    const accessToken = cookies.get("accessToken");

    return <WrappedComponent accessToken={accessToken} {...props} />;
  };
}

export { Login, withAuth };
