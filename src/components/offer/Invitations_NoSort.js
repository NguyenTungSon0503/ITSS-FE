import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "../authentication/Login";
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
import { Image } from "cloudinary-react";
import TextRating from "../emoji/Rating";

const GetOfferTest = withAuth((props) => {
  const [offerData, setOfferData] = useState([]);

  useEffect(() => {
    axios
      .get("http://20.189.73.135:5000/api/offers/partner_offer", {
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

  if (
    Array.isArray(offerData) &&
    offerData.length > 0 &&
    offerData[0].invitations
  ) {
    // Mapping the offerInfo array to create rows with the required data structure
    rows = offerData.flatMap((offer) =>
      offer.invitations.map((invitation) => ({
        id: invitation.invitation_id,
        start_time: invitation.start_time,
        end_time: invitation.end_time,
        date: invitation.date,
        sex: invitation.sex,
        age: invitation.age,
        location: invitation.location,
        meal_price_range: invitation.meal_price,
        description: invitation.description,
        created_at: offer.created_at,
        invitedSenderInfo: offer.invitedSenderInfo,
      }))
    );
  }

  return (
    <div>
      {/* <ul>
        <pre>{JSON.stringify(offerData, null, 2)}</pre>
      </ul> */}
      <Typography variant="h5" paddingLeft={5} paddingTop={3} paddingBottom={4}>受け入れ可能なお誘いは次のとおりです。</Typography>
      <div style={{ margin: "0 5%", borderBlockColor: "red" }}>
        <TableContainer>
          <Table>
            <TableHead>
              {/* <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Info Basic</TableCell>
                <TableCell>Meal Info</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow> */}
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow>
                    <TableCell width={"10%"} align="center">
                      <Typography>{row.date.split("T")[0]}</Typography>
                      <Stack direction={"row"} justifyContent="center">
                        <Typography>{row.start_time}</Typography>
                        <Typography>~</Typography>
                        <Typography>{row.end_time}</Typography>
                      </Stack>
                      <Box
                        style={{
                          minHeight: "5%",
                          backgroundColor: "lightblue",
                        }}
                      ></Box>
                    </TableCell>

                    <TableCell align="center">
                      <Stack direction="column" alignItems="center">
                        <Image
                          cloudName="dul81x4pq"
                          publicId={row.invitedSenderInfo.avatar}
                          width="150"
                          crop="scale"
                        />
                        <TextRating />
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Typography>
                        名前　{row.invitedSenderInfo.user_name}
                      </Typography>
                      <Typography>年齢　{row.age}</Typography>
                      <Typography>性別　{row.sex}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography>
                      食事の価格帯 {row.meal_price_range}
                      </Typography>
                      <Typography>説明 {row.description}</Typography>
                    </TableCell>

                    <TableCell>
                    <Stack direction={"column"} spacing={2}>
                        <Button variant="contained" style={{borderRadius: 50, width: '100%', backgroundColor: "#14FED4", color: "black"}}>アクセプト</Button>
                        <Button variant="contained" style={{borderRadius: 50, width: '100%', backgroundColor: "#FF9A6E", color: "black"}}>リジェクト</Button>
                    </Stack>
                </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={5}></TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
});

export default GetOfferTest;
