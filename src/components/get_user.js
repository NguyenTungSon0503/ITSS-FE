import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "./login";
import { useNavigate } from "react-router-dom";
const GetUser = withAuth((props) => {
  const [userData, setUserData] = useState({});
   const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users", {
        headers: {
          authorization: `Bearer ${props.accessToken}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setUserData(response.data);
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
      <pre>{JSON.stringify(userData.users, null, 2)}</pre>
      </ul>
    </div>
  );
});

export default GetUser;
