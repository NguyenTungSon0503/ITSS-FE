import React from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Overlay = ({ invitation, onClose }) => {
    console.log(invitation)
  return (
    <Dialog open={!!invitation} onClose={onClose}>
      <DialogTitle>
        Invitation Details
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {invitation && (
          <div>
            <Typography variant="h6">
              {invitation.invitationInfor.start_time}
            </Typography>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Overlay;
