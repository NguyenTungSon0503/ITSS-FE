import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "../authentication/Login";
import { useNavigate } from "react-router-dom";
const Recuit = withAuth((props) => {
  const [data, setData] = useState({});
   const navigate = useNavigate();

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
      })
      .catch((error) => {
        if(error.response.status === 403){
          navigate("/login");
        }
        console.error(error);
      });
  }, [props.accessToken, navigate]);

  return (
    <div>
      <ul>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      </ul>
    </div>
  );
});

export default Recuit;
