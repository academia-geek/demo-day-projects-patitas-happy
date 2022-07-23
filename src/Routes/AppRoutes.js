import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import PublicRouters from "../Routes/PublicRoutes";
import PrivateRouters from "../Routes/PrivateRoute";
import DashboardRouters from "../Routes/DashboardRoutes";
import { useDispatch, useSelector } from "react-redux";
import { authentication } from "../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Spinner from "../components/Spinner";
import '../Styles/stylesAntdD.css';
import Landing from "../components/LandingPage";
import { actionUserDataLoadAsync } from "../Redux/actions/actionsLogin";


const AppRoutes = () => {

  const dispatch = useDispatch();

  const [cheking, setCheking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const { authenticated } = useSelector(store => store.UserStore);

  const auth = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : false;

  useEffect(() => {
    onAuthStateChanged(authentication, user => {
      if (user?.uid && (auth)) {
        setIsLoggedIn(true);

        if (!authenticated) {
          dispatch(actionUserDataLoadAsync(user.email));
        }

        user.getIdToken().then(token => { });
      } else {
        setIsLoggedIn(false);
      }
    });

    setTimeout(() => {
      setCheking(false);
    }, 1500);

  }, [dispatch, authenticated, auth, setIsLoggedIn, setCheking]);

  if (cheking) {
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
