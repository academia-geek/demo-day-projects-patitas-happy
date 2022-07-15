import React from "react";
import { Route, Routes } from "react-router-dom";
import Contactanos from "../components/Contactanos";
import Home from "../components/Home";
import NavBars from "../components/NavBars";
import Profile from "../components/Profile";

const DashboardRoutes = () => {
  return (
    <div>
      <NavBars />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contactanos" element={<Contactanos />} />
      </Routes>
    </div>
  );
};

export default DashboardRoutes;
