import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import {Login} from './components/authentication/login';
import Register from './components/authentication/register';
import ShowToken from "./components/authentication/showToken";
import { Cookies } from "react-cookie";
import GetUser from "./components/authentication/get_user";
import Upload from './components/image/Upload';
import Home from './components/image/Home';
import Offer from "./components/offer/offer";
const cookies = new Cookies()
const accessToken = cookies.get("accessToken");
const App = () => {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/show_token" element={<ShowToken accessToken={accessToken} />} />
        <Route path="/get_user" element={<GetUser />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/home" element={<Home />} />
        <Route path="/offer" element={<Offer   />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
