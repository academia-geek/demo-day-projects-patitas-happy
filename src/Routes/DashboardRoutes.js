import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddMascotas from '../components/AddMascotas';
import DetailsMascotas from '../components/DetailsMascotas';
import Home from '../components/Home';
import ListMascotas from '../components/ListMascotas';
import Contactanos from "../components/Contactanos";
import NavBars from '../components/NavBars';
import Profile from '../components/Profile';

const DashboardRoutes = () => {
    return (
        <div> <NavBars/>
            <Routes>               
                <Route path="/home" element={<Home />} />
                <Route path="/mascotas" element={<ListMascotas/>} />
                <Route path="/addMascotas" element={<AddMascotas />} />
                <Route path="/detailsMascotas/:firestoreId" element={<DetailsMascotas />} />
                <Route path="/contactanos" element={<Contactanos />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            
        </div>
    );
};

export default DashboardRoutes;
