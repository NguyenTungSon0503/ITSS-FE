import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { withAuth } from "../authentication/Login";


const Recommend = withAuth((props) => {
  const location = useLocation();
  const { invitationId, date, startTime, endTime } = location.state || {};

  const [formData, setFormData] = useState({
    food_recommend: "",
    meal_price: "",
    description: "",

  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async () => {
    let requestData = {
      invitation_id: invitationId,
      ...formData
    }
    console.log(requestData)
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

  return (
    <div>
      {date && (

      <Stack direction="column">
        <Stack direction="row" marginTop={5}>

          
          {/* <p>Date: {date}</p>
          <p>Start Time: {startTime}</p>
          <p>End Time: {endTime}</p>
          <p>{invitationId}</p> */}
          <Box flex={2} sx={{backgroundColor: "red"}}>

          </Box>

          <Stack direction="column" flex={3} spacing={2}> 
            <Stack direction="row">
              <Typography>name</Typography>
              <TextField variant="standard"></TextField>
            </Stack>

            <Stack direction="row">
              <Typography>age</Typography>
              <TextField variant="standard"></TextField>
            </Stack>

            <Stack direction="row">
              <Typography>sex</Typography>
              <TextField variant="standard"></TextField>
            </Stack>

            <Stack direction="row">
              <Typography>location</Typography>
              <TextField variant="standard"></TextField>
            </Stack>

            <Stack direction="row">
              <Typography>food_recommend</Typography>
              <TextField variant="standard" onChange={handleInputChange} name="food_recommend" value={formData.food_recommend}></TextField>
            </Stack>

            <Stack direction="row">
              <Typography>meal_price</Typography>
              <TextField variant="standard" onChange={handleInputChange} name= "meal_price" value={formData.meal_price}></TextField>
            </Stack>

            <Stack direction="row">
              <Typography>description</Typography>
              <TextField variant="standard" onChange={handleInputChange} name="description" value={formData.description}></TextField>
            </Stack>
          </Stack>

          <Stack direction="column" flex={3} sx={{}} spacing={2}>
            <Stack direction="row">
              <Typography>time</Typography>
              <TextField disabled variant="standard" value={startTime + "~" + endTime} />
            </Stack>

            <Stack direction="row">
              <Typography>date</Typography>
              <TextField disabled variant="standard" value={date.split("T")[0]} />
            </Stack>
          </Stack>
        </Stack>
        
        <Stack direction="row" justifyContent="center" marginTop={5} spacing={20}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Send</Button>
        </Stack>
      </Stack>
      )}
    </div>
  );
});

export default Recommend;
