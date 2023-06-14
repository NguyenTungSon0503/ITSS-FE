import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { Login } from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import ShowToken from "./components/authentication/showToken";
import { Cookies } from "react-cookie";
import GetUser from "./components/authentication/GetUser";
import Upload from "./components/image/Upload";
import Home from "./components/image/Home";
import Offer from "./components/offer/CreateOffer";
import GetOffer from "./components/offer/AllOffer";
import GetOfferTest from "./components/offer/Invitations_NoSort";
import HomePage from "./components/HomePage";
import Invitations from "./components/offer/Invitations";

import ResponsiveAppBar from "./components/Navbar/Navbar";
import Recommend from "./components/offer/Recommend";

const cookies = new Cookies();
const accessToken = cookies.get("accessToken");
const App = () => {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/show_token"
          element={<ShowToken accessToken={accessToken} />}
        />
        <Route path="/get_user" element={<GetUser />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/home" element={<Home />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/partner_offer_test" element={<GetOfferTest />} />
        <Route path="/partner_offer" element={<GetOffer />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/invitations" element={<Invitations />} />
        <Route path="/recommend/:invitationId" element={<Recommend />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
