import React from "react";
import {
  TableRow,
  TableCell,
  Typography,
  Stack,
  Button,
  Box,
} from "@mui/material";
import { Image } from "cloudinary-react";
import TextRating from "../emoji/Rating";

const InvitationItem = ({ invitation, onClick }) => {
  return (
    <React.Fragment key={invitation.invitationInfor.id}>
      <TableRow onClick={onClick}>
        <TableCell width={"10%"} align="center">
          <Typography>
            {invitation.invitationInfor.date.split("T")[0]}
          </Typography>
          <Stack direction={"row"} justifyContent="center">
            <Typography>{invitation.invitationInfor.start_time}</Typography>
            <Typography>~</Typography>
            <Typography>{invitation.invitationInfor.end_time}</Typography>
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
          <Typography>名前　{invitation.userInfo.user_name}</Typography>
          <Typography>年齢　{invitation.invitationInfor.age}</Typography>
          <Typography>性別　{invitation.invitationInfor.sex}</Typography>
        </TableCell>
        <TableCell>
          <Typography>
            食事の価格帯 {invitation.invitationInfor.meal_price_range}
          </Typography>
          <Typography>説明 {invitation.invitationInfor.description}</Typography>
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
            >
              リジェクト
            </Button>
          </Stack>
        </TableCell>
        <TableRow>
          <TableCell colSpan={5}></TableCell>
        </TableRow>{" "}
      </TableRow>
      <TableRow>
        <TableCell colSpan={5}></TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default InvitationItem;
