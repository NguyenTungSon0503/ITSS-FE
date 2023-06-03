import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "../authentication/login";
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
        if(error.response.status === 403){
        }
        console.error(error);
      });
  }, [props.accessToken]);

  return (
    <div>
      <ul>
      <pre>{JSON.stringify(offerData, null, 2)}</pre>
      </ul>
    </div>
  );
});

export default GetOffer;
