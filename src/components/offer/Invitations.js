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
import { useNavigate } from "react-router-dom";

const Invitations = withAuth((props) => {
  const [invitationsData, setInvitationsData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchInvitationsData();
  }, [props.accessToken]);
  const fetchInvitationsData = () => {
    axios
      .get("http://localhost:5000/api/offers/invitations", {
        headers: {
          authorization: `Bearer ${props.accessToken}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setInvitationsData(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log("Unauthorized");
        }
        console.error(error);
      });
  };
  const handleRejectButton = async (invitation) => {
    const data = { invitation_id: invitation.invitationInfor.id };
    const res = await axios.post(
      "http://localhost:5000/api/offers/reject",
      data,
      {
        headers: {
          authorization: `Bearer ${props.accessToken}`,
        },
        withCredentials: true,
      }
    );
    // Fetch the updated invitations data after rejecting an invitation
    fetchInvitationsData();
  };

  const handleAccept = (invitationId, date, startTime, endTime) => {
    navigate(`/recommend/${invitationId}`, {
      state: { invitationId, date, startTime, endTime },
    });
  };

  return (
    <div>
      {/* <ul>
        <pre>{JSON.stringify(offerData, null, 2)}</pre>
      </ul> */}
      <Typography variant="h5" paddingLeft={5} paddingTop={3} paddingBottom={4}>
        受け入れ可能なお誘いは次のとおりです。
      </Typography>
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
              {invitationsData.map((invitation) => (
                <React.Fragment key={invitation.invitationInfor.id}>
                  <TableRow>
                    <TableCell width={"10%"} align="center">
                      <Typography>
                        {invitation.invitationInfor.date.split("T")[0]}
                      </Typography>
                      <Stack direction={"row"} justifyContent="center">
                        <Typography>
                          {invitation.invitationInfor.start_time}
                        </Typography>
                        <Typography>~</Typography>
                        <Typography>
                          {invitation.invitationInfor.end_time}
                        </Typography>
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
                          publicId={invitation.userInfo.avatar}
                          width="150"
                          crop="scale"
                        />
                        <TextRating />
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ marginBottom: 4 }}>
                        名前　{invitation.userInfo.user_name}
                      </Typography>
                      <Typography sx={{ marginBottom: 4 }}>
                        年齢　{invitation.userInfo.age}
                      </Typography>
                      <Typography>
                        性別　
                        {invitation.userInfo.sex === "male"
                          ? "男性"
                          : invitation.userInfo.sex === "female"
                          ? "女性"
                          : "その他"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ marginBottom: 4 }}>
                        欲しい年齢　{invitation.invitationInfor.age}
                      </Typography>
                      <Typography sx={{ marginBottom: 4 }}>
                        欲しい性別　
                        {invitation.invitationInfor.sex === "male"
                          ? "男性"
                          : invitation.invitationInfor.sex === "female"
                          ? "女性"
                          : "その他"}
                      </Typography>
                      <Typography>
                        欲しい場所　{invitation.invitationInfor.location}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ marginBottom: 5 }}>
                        食事の価格帯{" "}
                        {invitation.invitationInfor.meal_price_range}
                      </Typography>
                      <Typography>
                        説明 {invitation.invitationInfor.description}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Stack direction={"column"} spacing={2}>
                        <Button
                          variant="contained"
                          style={{
                            borderRadius: 50,
                            width: "100%",
                            backgroundColor: "#14FED4",
                            color: "black",
                          }}
                          onClick={() =>
                            handleAccept(
                              invitation.invitationInfor.id,
                              invitation.invitationInfor.date,
                              invitation.invitationInfor.start_time,
                              invitation.invitationInfor.end_time
                            )
                          }
                        >
                          アクセプト
                        </Button>
                        <Button
                          variant="contained"
                          style={{
                            borderRadius: 50,
                            width: "100%",
                            backgroundColor: "#FF9A6E",
                            color: "black",
                          }}
                          onClick={() => handleRejectButton(invitation)}
                        >
                          リジェクト
                        </Button>
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

export default Invitations;
