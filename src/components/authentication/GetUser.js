import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "./Login";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const GetUser = withAuth((props) => {
  const [userData, setUserData] = useState({});
   const navigate = useNavigate();
   const cookies = new Cookies();

  useEffect(() => {
    axios
      .get("http://20.189.73.135:5000/api/users", {
        headers: {
          authorization: `Bearer ${props.accessToken}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setUserData(response.data);
        cookies.set('role', response.data.users.role)
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
