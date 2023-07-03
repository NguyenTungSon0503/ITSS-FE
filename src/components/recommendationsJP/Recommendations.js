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
  Modal,
} from "@mui/material";

import { Image } from "cloudinary-react";
import TextRating from "../emoji/Rating";

const Recuit = withAuth((props) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [selectedInvitation, setSelectedInvitation] = useState(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (recommendation) => {
    setSelectedRecommendation(recommendation);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    // p: 4,
  };

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

  const handleAccept = (recommendation_id) => {
    const sendData = { recommendation_id };
    axios
      .post("http://localhost:5000/api/contracts", sendData, {
        headers: {
          authorization: `Bearer ${props.accessToken}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 403) {
        }
        console.error(error);
      });
    navigate("/contracts");
  };

  return (
    <div>
      {/* <ul>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </ul> */}

      <Stack direction="row" margin={5} sx={{ border: 1, minHeight: 800 }}>
        <Box flex={1} sx={{ borderRight: 1 }}>
          {/* Left sidebar: List of invitations */}
          {Object.keys(data).map((invitationId) => (
            <div
              key={invitationId}
              onClick={() => handleInvitationClick(invitationId)}
              className={
                invitationId === selectedInvitation ? "selected-invitation" : ""
              }
            >
              {/* <Typography> Invitation {invitationId} </Typography> */}
              {data[invitationId] && (
                <Box
                  paddingBottom={3}
                  paddingTop={3}
                  sx={{
                    textAlign: "center",
                    borderBottom: 1,
                    // borderTopLeftRadius: 20,
                    backgroundColor:
                      invitationId === selectedInvitation
                        ? "lightblue"
                        : "transparent",

                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#E8E8E8",
                    },
                  }}
                >
                  {/* <Typography> Invitation {data[invitationId].invitationInfo.id} </Typography> */}
                  <Typography>
                    {data[invitationId].invitationInfo.date.split("T")[0]}
                  </Typography>
                  <Typography>
                    {" "}
                    {data[invitationId].invitationInfo.start_time} ~
                    {data[invitationId].invitationInfo.end_time}
                  </Typography>
                </Box>
              )}
            </div>
          ))}
        </Box>
        <Box flex={4}>
          {/* Right side: List of users who accepted the selected invitation */}
          {selectedInvitation && (
            <TableContainer>
              <Table>
                <TableHead></TableHead>
                <TableBody>
                  {data[selectedInvitation].recommendations.map(
                    (recommendation) => (
                      <React.Fragment
                        key={recommendation.recommendationInfo.id}
                      >
                        {/*  */}
                        <TableRow
                          onClick={() => handleOpen(recommendation)}
                          sx={{
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "#E8E8E8",
                            },
                          }}
                        >
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
                            <Typography sx={{ marginBottom: 1 }}>
                              名前　{recommendation.userInfo.user_name}
                            </Typography>
                            <Typography sx={{ marginBottom: 1 }}>
                              年齢　{recommendation.userInfo.age}
                            </Typography>
                            <Typography>
                              性別　
                              {recommendation.userInfo.sex === "male"
                                ? "男性"
                                : recommendation.userInfo.sex === "female"
                                ? "女性"
                                : "その他"}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography>
                              食事の価格帯　
                              {recommendation.recommendationInfo.food_recommend}
                            </Typography>
                            <Typography>
                              説明　 <br />
                              {recommendation.recommendationInfo.description}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography sx={{ textAlign: "center" }}>
                              説明 <br />
                              {recommendation.recommendationInfo.meal_price}
                            </Typography>
                          </TableCell>

                          <TableCell onClick={(e) => e.stopPropagation()}>
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
                                    recommendation.recommendationInfo.id
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
                                // onClick={() => handleRejectButton(recommendation.recommendationInfo.id)}
                              >
                                リジェクト
                              </Button>
                            </Stack>
                          </TableCell>
                        </TableRow>
                        {/* <TableRow>
                          <TableCell colSpan={5}></TableCell>
                        </TableRow> */}
                      </React.Fragment>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Stack>

      {selectedRecommendation && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              Recommendation Details
            </Typography> */}
            <Typography id="modal-modal-description">
              <Stack direction="column" sx={{ marginBottom: 5, border: 1 }}>
                <Stack direction="row" sx={{ margin: 5 }}>
                  <Image
                    cloudName="dul81x4pq"
                    publicId={selectedRecommendation.userInfo.avatar}
                    width="150"
                    crop="scale"
                  />
                  <Box marginLeft={5}>
                    <Typography sx={{ marginBottom: 1 }}>
                      名前　{selectedRecommendation.userInfo.user_name}
                    </Typography>
                    <Typography sx={{ marginBottom: 1 }}>
                      年齢　{selectedRecommendation.userInfo.age}
                    </Typography>
                    <Typography>
                      性別　
                      {selectedRecommendation.userInfo.sex === "male"
                        ? "男性"
                        : selectedRecommendation.userInfo.sex === "female"
                        ? "女性"
                        : "その他"}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" marginBottom={5} marginLeft={5}>
                  <Typography variant="h4">平均評価　　</Typography>
                  <TextRating />
                </Stack>
              </Stack>
              <Stack direction="column">
                <Stack direction="row" sx={{ marginBottom: 5, marginLeft: 5 }}>
                  <Stack direction="column">
                    <TextRating />
                    <Typography>評価した人の名</Typography>
                    <Typography>評価した時間</Typography>
                  </Stack>
                  <Stack>コメント</Stack>
                </Stack>
                <Stack direction="row" sx={{ marginBottom: 5, marginLeft: 5 }}>
                  <Stack direction="column">
                    <TextRating />
                    <Typography>評価した人の名</Typography>
                    <Typography>評価した時間</Typography>
                  </Stack>
                  <Stack>コメント</Stack>
                </Stack>
              </Stack>
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
});

export default Recuit;
