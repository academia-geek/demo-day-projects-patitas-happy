import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FormMascotas from '../components/FormMascotas';
import DetailsMascotas from '../components/DetailsMascotas';
import Home from '../components/Home';
import ListMascotas from '../components/ListMascotas';
import Contactanos from "../components/Contactanos";
import NavBars from '../components/NavBars';
import Profile from '../components/Profile';
import InfoMascotas from '../components/InfoMascotas';

const DashboardRoutes = () => {
    return (
        <div> <NavBars/>
            <Routes>               
                <Route path="/home" element={<Home />} />
                <Route path="/mascotas" element={<ListMascotas/>} />
                <Route path="/mascotas/add" element={<FormMascotas />} />
                <Route path="/mascotas/:firestoreId/edit" element={<FormMascotas />} />
                <Route path="/mascotas/:firestoreId" element={<DetailsMascotas />} />
                <Route path="/contactanos" element={<Contactanos />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/info" element={<InfoMascotas/>}/>
            </Routes>
            
        </div>
    );
};

export default DashboardRoutes;
