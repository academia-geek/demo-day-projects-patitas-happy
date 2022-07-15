import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddMascotas from '../components/AddMascotas';
import DetailsMascotas from '../components/DetailsMascotas';
import Home from '../components/Home';
import ListMascotas from '../components/ListMascotas';

const DashboardRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/mascotas" element={<ListMascotas/>} />
                <Route path="/addMascotas" element={<AddMascotas />} />
                <Route path="/detailsMascotas/:firestoreId" element={<DetailsMascotas />} />
            </Routes>
            
        </div>
    );
};

export default DashboardRoutes;