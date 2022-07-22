import React from 'react';
import { Grid } from '@mui/material';
import { MapContainer, Marker, Popup, TileLayer,  } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import '../Styles/StyleMap.css'
// import IconLocation from './IconLocation';

const DondeEncontrar = () => {
    return (
        <Grid
        margin='80px 0'
        >
        
            <h1>Donde Encontrar...</h1>
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }}
            >
                <Grid 
                    display='flex'
                    flexDirection='column'
                >
                    <button>Veterinarias</button>
                    <button>Pets Shop</button>
                    <button>Centros de entrenamiento</button>
                </Grid>
                <Grid 

                >
                   
                    <MapContainer center={{ lat: '3.9897551538255724', lng: '-73.75832465129854' }} zoom={13}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={{lat: '3.9897551538255724', lng: '-73.75832465129854' }} >
                            <Popup>

                            </Popup>
                        </Marker>
                    </MapContainer>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DondeEncontrar;