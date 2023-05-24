import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "./login";

const GetUser = withAuth((props) => {
  const [userData, setUserData] = useState({});
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
        console.error(error);
      });
  }, [props.accessToken]);

  return (
    <div>
      <h2>User Data:</h2>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
});

export default GetUser;
