import React, { useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/login", formData)
      .then((response) => {
        setData([...data, response.data]);
        setFormData({});
        // set cookies accessToken
        cookies.set("accessToken", response.data.accessToken, { path: "/" });
        cookies.set("refreshToken", response.data.refreshToken, { path: "/" });
        console.log("Login successful");
        navigate("/get_user");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function withAuth(WrappedComponent) {
  return function Authenticated(props) {
    const cookies = new Cookies();
    const accessToken = cookies.get("accessToken");

    return <WrappedComponent accessToken={accessToken} {...props} />;
  };
}

export { Login, withAuth };
