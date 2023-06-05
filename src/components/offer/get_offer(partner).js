import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "../authentication/login";
import { Box, Stack, Typography } from "@mui/material";
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
        if(error.response.status === 401){
          console.log("Unauthorized")
        }
        console.error(error);
      });
  }, [props.accessToken]);

  return (
    <div>
      <ul>
      <pre>{JSON.stringify(offerData, null, 2)}</pre>
      </ul>

    <Stack>
        
    </Stack>

    </div>
  );
});

export default GetOffer;