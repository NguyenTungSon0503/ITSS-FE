import React, { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "./authentication/Login";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const  HomePage = withAuth((props) =>{
  const navigate = useNavigate();
  const cookies = new Cookies();

 useEffect(() => {
   axios
     .get("http://localhost:5000/api/users", {
       headers: {
         authorization: `Bearer ${props.accessToken}`,
       },
       withCredentials: true,
     })
     .then((response) => {
       cookies.set('role', response.data.users.role)
     })
     .catch((error) => {
       if(error.response.status === 403){
         navigate("/login");
       }
       console.error(error);
     });
 }, [props.accessToken]);

  return (
    <div>
      <img src = "358779078_972465944039502_9183095949839393663_n.png" ></img>
    </div>
  );
})

export default HomePage;
