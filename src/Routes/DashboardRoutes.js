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

import Donar from '../components/Donar';
import SolicitudAdopcion from '../components/SolicitudAdopcion';
import SolicitudApadrinamiento from '../components/SolicitudApadrinamiento';

import ListRequest from '../components/ListRequest';


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

                <Route path="/donar" element={<Donar/>}/>
                <Route path='/adopcion' element={<SolicitudAdopcion/>}/>
                <Route path='/apadrinar' element={<SolicitudApadrinamiento/>}/>

                <Route path="/solicitudes" element={<ListRequest/>}/>

            </Routes>
            
        </div>
    );
};

export default DashboardRoutes;
