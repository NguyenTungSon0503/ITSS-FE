import React, { useState } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

function CustomAlert({ alertData }) {
  const [alert, setAlert] = useState({
    open: false,
    message: " ",
    type: "success",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };

  // Update the alert state when alertData prop changes
  React.useEffect(() => {
    setAlert(alertData);
  }, [alertData]);

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
}

export default CustomAlert;
