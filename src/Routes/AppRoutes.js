import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import PublicRouters from "../Routes/PublicRoutes"
import PrivateRouters from "../Routes/PrivateRoute"
import DashboardRouters from "../Routes/DashboardRoutes"
import { useSelector } from "react-redux";
import { authentication } from "../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const AppRoutes = () => {

  const [cheking, setCheking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const { authenticated } = useSelector(store => store.loginStore);

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
        if (user?.uid && authenticated) {
            setIsLoggedIn(true);

            user.getIdToken()
                .then((token) => {
                })
        } else {
            setIsLoggedIn(false);
        }
    })
    setCheking(false);
}, [authenticated, setIsLoggedIn, setCheking])

if (cheking) {
    return (
        <h1>Espere....</h1>
    )
}

  return (
    <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <PublicRouters isAutentication={isLoggedIn}>
                        <Login />
                    </PublicRouters>

                } />

                <Route path="/register" element={
                    <PublicRouters isAutentication={isLoggedIn}>
                        <Register />
                    </PublicRouters>

                } />

                <Route path="/*" element={
                    <PrivateRouters isAutentication={isLoggedIn}>
                        <DashboardRouters />
                    </PrivateRouters>
                } />

            </Routes>
        </BrowserRouter >
  );
};

export default AppRoutes;
