import { Box, Button, Stack, TextField, Typography, TextareaAutosize} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import { useLocation, useNavigate } from "react-router-dom";
import { withAuth } from "../authentication/Login";

const Recommend = withAuth((props) => {
  const location = useLocation();
  const [userData, setUserData] = useState({});
  const { invitationId, date, startTime, endTime } = location.state || {};
  const navigate = useNavigate();

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
        // console.log(response.data);
      });
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
    // console.log(requestData);
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
      navigate(-1)
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelButton = (event) => {
    if (
      formData.food_recommend === "" &&
      formData.meal_price === "" &&
      formData.description === ""
    ) {
      setFormData({
        food_recommend: "",
        meal_price: "",
        description: "",
      });
      navigate(-1);
    } else {
      alert("キャンセルしますか？");
      setFormData({
        food_recommend: "",
        meal_price: "",
        description: "",
      });
    }
  };
  return (
    <div>
      {date && (
        <Stack direction="column" paddingLeft={10} paddingRight={10}>
          <Stack direction="row" marginTop={5}>
            {userData.users && (
              <Box flex={2} sx={{}}>
                <Image
                  cloudName="dul81x4pq"
                  publicId={userData.users.avatar}
                  width="150"
                  crop="scale"
                />
              </Box>
            )}
            {userData.users && (
              <Stack direction="column" flex={3} spacing={2} marginLeft={5}>
                <Stack direction="row">
                  <Typography flex={1} sx={{ fontSize: 24 }}>
                    名前
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
                    年齢
                  </Typography>
                  <TextField
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "center", fontSize: 20 },
                      },
                    }}
                    value={userData.users.age}
                    disabled
                    variant="standard"
                  ></TextField>
                </Stack>

                <Stack direction="row">
                  <Typography flex={1} sx={{ fontSize: 24 }}>
                    性別
                  </Typography>
                  <TextField
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "center", fontSize: 20 },
                      },
                    }}
                    value={
                      userData.users.sex === "male"
                        ? "男性"
                        : userData.users.sex === "female"
                        ? "女性"
                        : "その他"
                    }
                    disabled
                    variant="standard"
                  ></TextField>
                </Stack>

                <Stack direction="row">
                  <Typography flex={1} sx={{ fontSize: 24 }}>
                    場所
                  </Typography>
                  <TextField
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "center", fontSize: 20 },
                      },
                    }}
                    value={userData.users.location}
                    disabled
                    variant="standard"
                  ></TextField>
                </Stack>

                <Stack direction="row">
                  <Typography flex={1} sx={{ fontSize: 24 }}>
                    食べ物の提案
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
                    価格
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
                    その他
                  </Typography>
                  <TextField
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "center", fontSize: 20 },
                      },
                    }}
                    rows={3}
                    multiline={true}
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
                <Typography flex={1} sx={{ fontSize: 24 }}>
                  時間
                </Typography>
                <TextField
                  sx={{ flex: 2 }}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: 20 },
                    },
                  }}
                  disabled
                  variant="standard"
                  value={startTime + "~" + endTime}
                />
              </Stack>

              <Stack direction="row">
                <Typography flex={1} sx={{ fontSize: 24 }}>
                  日付
                </Typography>
                <TextField
                  sx={{ flex: 2 }}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: 20 },
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
            <Button
              variant="outlined"
              sx={{ minWidth: 150 }}
              onClick={handleCancelButton}
            >
              キャンセル
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ minWidth: 150 }}
            >
              送信
            </Button>
          </Stack>
        </Stack>
      )}
    </div>
  );
});

export default Recommend;
