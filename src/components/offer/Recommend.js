import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { withAuth } from "../authentication/Login";

const Recommend = withAuth((props) => {
  const location = useLocation();
  const [userData, setUserData] = useState({});
  const { invitationId, date, startTime, endTime } = location.state || {};

  const [formData, setFormData] = useState({
    food_recommend: "",
    meal_price: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users", {
        headers: {
          authorization: `Bearer ${props.accessToken}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
      })

  }, [props.accessToken]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const requestData = {
      invitation_id: invitationId,
      ...formData,
    };
    console.log(requestData);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/recommendations",
        requestData,
        {
          headers: {
            authorization: `Bearer ${props.accessToken}`,
          },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  console.log(userData);

  return (
    <div>
      {date && (
        <Stack direction="column" paddingLeft={10} paddingRight={10}>
          <Stack direction="row" marginTop={5}>
            {/* <p>Date: {date}</p>
          <p>Start Time: {startTime}</p>
          <p>End Time: {endTime}</p>
          <p>{invitationId}</p> */}
            <Box flex={2} sx={{}}></Box>
            {userData.users &&(
            <Stack direction="column" flex={3} spacing={2} marginLeft={5}>
              <Stack direction="row">
                <Typography flex={1} sx={{ fontSize: 24 }}>
                  name
                </Typography>
                <TextField
                  // sx={{ flex: 2 }}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: 20 },
                    },
                  }}
                  value={userData.users.name}
                  disabled
                  variant="standard"
                ></TextField>
              </Stack>

              <Stack direction="row">
                <Typography flex={1} sx={{ fontSize: 24 }}>
                  age
                </Typography>
                <TextField
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: 20 },
                    },
                  }}
                  value="21"
                  disabled
                  variant="standard"
                ></TextField>
              </Stack>

              <Stack direction="row">
                <Typography flex={1} sx={{ fontSize: 24 }}>
                  sex
                </Typography>
                <TextField
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: 20 },
                    },
                  }}
                  value="male"
                  disabled
                  variant="standard"
                ></TextField>
              </Stack>

              <Stack direction="row">
                <Typography flex={1} sx={{ fontSize: 24 }}>
                  location
                </Typography>
                <TextField
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: 20 },
                    },
                  }}
                  value="name"
                  disabled
                  variant="standard"
                ></TextField>
              </Stack>

              <Stack direction="row">
                <Typography flex={1} sx={{ fontSize: 24 }}>
                  food_recommend
                </Typography>
                <TextField
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: 20 },
                    },
                  }}
                  variant="standard"
                  onChange={handleInputChange}
                  name="food_recommend"
                  value={formData.food_recommend}
                ></TextField>
              </Stack>

              <Stack direction="row">
                <Typography flex={1} sx={{ fontSize: 24 }}>
                  meal_price
                </Typography>
                <TextField
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: 20 },
                    },
                  }}
                  variant="standard"
                  onChange={handleInputChange}
                  name="meal_price"
                  value={formData.meal_price}
                ></TextField>
              </Stack>

              <Stack direction="row">
                <Typography flex={1} sx={{ fontSize: 24 }}>
                  description
                </Typography>
                <TextField
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: 20 },
                    },
                  }}
                  variant="standard"
                  onChange={handleInputChange}
                  name="description"
                  value={formData.description}
                ></TextField>
              </Stack>
            </Stack>
            )}

            <Stack
              direction="column"
              flex={3}
              sx={{}}
              spacing={2}
              marginLeft={5}
            >
              <Stack direction="row">
                <Typography flex={1} sx={{ fontSize: 24 }}>time</Typography>
                <TextField
                  sx={{ flex: 2 }}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: 20  },
                    },
                  }}
                  disabled
                  variant="standard"
                  value={startTime + "~" + endTime}
                />
              </Stack>

              <Stack direction="row">
                <Typography flex={1} sx={{ fontSize: 24 }}>date</Typography>
                <TextField
                  sx={{ flex: 2 }}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: 20  },
                    },
                  }}
                  disabled
                  variant="standard"
                  value={date.split("T")[0]}
                />
              </Stack>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            justifyContent="center"
            marginTop={5}
            spacing={20}
          >
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Send
            </Button>
          </Stack>
        </Stack>
      )}
    </div>
  );
});

export default Recommend;
