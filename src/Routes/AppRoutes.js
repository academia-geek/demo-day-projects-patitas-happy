import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
