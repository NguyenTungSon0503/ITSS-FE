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
import InvitationItem from "./InvitationItem";
import Overlay from "./Overlay";

const Invitations = withAuth((props) => {
  const [invitationsData, setInvitationsData] = useState([]);
  const [selectedInvitation, setSelectedInvitation] = useState(null);
  useEffect(() => {
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
  }, [props.accessToken]);

  const handleInvitationClick = (invitation) => {
    setSelectedInvitation(invitation);
  };

  const handleCloseOverlay = () => {
    setSelectedInvitation(null);
  };

  return (
    <div>
      <Typography variant="h5" paddingLeft={5} paddingTop={3} paddingBottom={4}>
        受け入れ可能なお誘いは次のとおりです。
      </Typography>
      <div style={{ margin: "0 5%", borderBlockColor: "red" }}>
        <TableContainer>
          <Table>
            <TableHead></TableHead>
            <TableBody>
              {invitationsData.map((invitation) => (
                <InvitationItem
                  key={invitation.invitationInfor.id}
                  invitation={invitation}
                  onClick={() => handleInvitationClick(invitation)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Overlay invitation={selectedInvitation} onClose={handleCloseOverlay} />
    </div>
  );
});

export default Invitations;
