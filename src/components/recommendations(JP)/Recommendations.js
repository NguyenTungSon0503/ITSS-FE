import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "../authentication/Login";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  TableCell,
  Typography,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Button,
} from "@mui/material";

import { Image } from "cloudinary-react";
import TextRating from "../emoji/Rating";

const Recuit = withAuth((props) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [selectedInvitation, setSelectedInvitation] = useState(null);

  const handleInvitationClick = (invitationId) => {
    setSelectedInvitation(invitationId);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/recommendations", {
        headers: {
          authorization: `Bearer ${props.accessToken}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);

        const firstInvitationId = Object.keys(response.data)[0];
        setSelectedInvitation(firstInvitationId);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login");
        }
        console.error(error);
      });
  }, [props.accessToken, navigate]);

  return (
    <div>
      {/* <ul>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </ul> */}

      <Stack direction="row" sx={{ border: 1 }}>
        <Box flex={1} sx={{ border: 1 }}>
          {/* Left sidebar: List of invitations */}
          {Object.keys(data).map((invitationId) => (
            <div
              key={invitationId}
              onClick={() => handleInvitationClick(invitationId)}
            >
              {/* <Typography> Invitation {invitationId} </Typography> */}
              {data[invitationId] && (
                <Box
                  paddingBottom={3}
                  paddingTop={3}
                  sx={{ textAlign: "center" }}
                >
                  {/* <Typography> Invitation {data[invitationId].invitationInfo.id} </Typography> */}
                  <Typography>
                    {" "}
                    {data[invitationId].invitationInfo.date.split("T")[0]}{" "}
                  </Typography>
                  <Typography>
                    {" "}
                    {data[invitationId].invitationInfo.start_time} ~{" "}
                    {data[invitationId].invitationInfo.start_time}{" "}
                  </Typography>
                </Box>
              )}
            </div>
          ))}
        </Box>
        <Box flex={4} sx={{ border: 1 }}>
          {/* Right side: List of users who accepted the selected invitation */}
          {selectedInvitation && (
            // <div>
            //   {data[selectedInvitation].recommendations.map((recommendation) => (
            //     <div key={recommendation.recommendationInfo.id}>
            //       User: {recommendation.userInfo.user_name}
            //     </div>
            //   ))}
            // </div>

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
                  {data[selectedInvitation].recommendations.map(
                    (recommendation) => (
                      <React.Fragment
                        key={recommendation.recommendationInfo.id}
                      >
                        <TableRow>
                          {/* <TableCell width={"10%"} align="center">
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
                        </TableCell> */}

                          <TableCell align="center">
                            <Stack direction="column" alignItems="center">
                              <Image
                                cloudName="dul81x4pq"
                                publicId={recommendation.userInfo.avatar}
                                width="150"
                                crop="scale"
                              />
                              <TextRating />
                            </Stack>
                          </TableCell>

                          <TableCell>
                            <Typography>
                              名前　{recommendation.userInfo.user_name}
                            </Typography>
                            <Typography>
                              年齢　{recommendation.userInfo.age}
                            </Typography>
                            <Typography>
                              性別　{recommendation.userInfo.sex}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography>
                              食事の価格帯{" "}
                              {recommendation.recommendationInfo.food_recommend}
                            </Typography>
                            <Typography>
                              説明{" "}
                              {recommendation.recommendationInfo.description}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography>
                              説明{" "}
                              {recommendation.recommendationInfo.meal_price}
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
                                // onClick={() =>
                                //   handleAccept(
                                //     invitation.invitationInfor.id,
                                //     invitation.invitationInfor.date,
                                //     invitation.invitationInfor.start_time,
                                //     invitation.invitationInfor.end_time
                                //   )
                                // }
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
                                // onClick={() => handleRejectButton(invitation)}
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
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Stack>
    </div>
  );
});

export default Recuit;
