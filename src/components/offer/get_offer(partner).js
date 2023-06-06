import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "../authentication/login";
import {
  Box,
  Stack,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Typography,
  TableCell,
  Button,
} from "@mui/material";

const GetOffer = withAuth((props) => {
  const [offerData, setOfferData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/offers/partner_offer", {
        headers: {
          authorization: `Bearer ${props.accessToken}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setOfferData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log("Unauthorized");
        }
        console.error(error);
      });
  }, [props.accessToken]);

  let rows = [];

  if (offerData && offerData.offers && offerData.offers.offerInfo) {
    // Mapping the offerInfo array to create rows with the required data structure
    rows = offerData.offers.offerInfo.map((offer) => ({
      id: offer.id,
      inviter_id: offer.inviter_id,
      start_time: offer.start_time,
      end_time: offer.end_time,
      date: offer.date,
      sex: offer.sex,
      age: offer.age,
      location: offer.location,
      meal_price_range: offer.meal_price_range,
      description: offer.description,
      created_at: offer.created_at,
    }));
  }

  return (
    <div>
      {/* <ul>
        <pre>{JSON.stringify(offerData, null, 2)}</pre>
      </ul> */}
      <Typography>hhhhhhhhhhhhhhhhhhhhhhhhhhh</Typography>
    <div style={{margin: "0 5%", borderBlockColor: "red"}}>
      <TableContainer >
        <Table>
          <TableHead>
            {/* <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Info Basic</TableCell>
              <TableCell>Meal Info</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow> */}
          </TableHead>
          <TableBody>
            {rows.map((row) => (
                <>
              <TableRow key={row.id} sx={{border: 1, borderRadius: 50}}>
                <TableCell align="center">
                    <Typography>{row.date.split("T")[0]}</Typography>
                    <Stack direction={"row"} justifyContent="center">
                        <Typography>{row.start_time}</Typography>
                        <Typography>~</Typography>
                        <Typography>{row.end_time}</Typography>
                    </Stack>
                    <Box style={{ minHeight: '5%', backgroundColor:"lightblue" }}></Box>
                </TableCell>

                <TableCell>
                    <Typography>This is an avatar</Typography>
                    <Typography>This is rating</Typography>
                </TableCell>

                <TableCell>
                    <Typography>Name: </Typography>
                    <Typography>Age: {row.age}</Typography>
                    <Typography>Sex: {row.sex}</Typography>
                </TableCell>

                <TableCell>
                    <Typography>Meal price: {row.meal_price_range}</Typography>
                    <Typography>Note: {row.description}</Typography>
                </TableCell>

                <TableCell>
                    <Stack direction={"column"} spacing={2}>
                        <Button variant="contained" style={{borderRadius: 50, width: '100%', backgroundColor: "#14FED4"}}>Accept</Button>
                        <Button variant="contained" style={{borderRadius: 50, width: '100%', backgroundColor: "#FF9A6E"}}>Reject</Button>
                    </Stack>
                </TableCell>

              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>

              </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  );
});

export default GetOffer;
