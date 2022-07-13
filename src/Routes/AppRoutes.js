import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import PublicRouters from "../Routes/PublicRoutes";
import PrivateRouters from "../Routes/PrivateRoute";
import DashboardRouters from "../Routes/DashboardRoutes";
import { useSelector } from "react-redux";
import { authentication } from "../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Spinner from "../components/Spinner";
import Landing from "../components/LandingPage";

const AppRoutes = () => {
  const [cheking, setCheking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const { authenticated } = useSelector(store => store.loginStore);

  useEffect(() => {
    onAuthStateChanged(authentication, user => {
      if (user?.uid && authenticated) {
        setIsLoggedIn(true);

        user.getIdToken().then(token => {});
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [authenticated, setIsLoggedIn, setCheking]);

  if (cheking) {
    setTimeout(() => {
      setCheking(false);
    }, 1500);
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRouters isAutentication={isLoggedIn}>
              <Login />
            </PublicRouters>
          }
        />
        <Route
          path="/"
          element={
            <PublicRouters isAutentication={isLoggedIn}>
              <Landing />
            </PublicRouters>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRouters isAutentication={isLoggedIn}>
              <Register />
            </PublicRouters>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRouters isAutentication={isLoggedIn}>
              <DashboardRouters />
            </PrivateRouters>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
