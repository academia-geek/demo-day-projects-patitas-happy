import React from 'react';
import { Button, Grid } from '@mui/material';
import { MapContainer, Marker, Popup, TileLayer, } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import '../Styles/StyleMap.css'
import { TitleC } from '../Styles/StyleInfo';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const DondeEncontrar = () => {
    return (
        <Grid
            margin='80px 0'
        >

            <Grid paddingBottom='50px' textAlign='center'>
                <TitleC>Donde encontrar...</TitleC>
            </Grid>
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }}
            >
                <Grid
                    display='flex'
                    flexDirection='column'
                    marginRight='20px'
                    justifyContent='center'
                >

                    <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                        Veterinarias
                    </Button>
                    <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                        Pets Shop
                    </Button>
                    <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                        Centros de entrenamiento
                    </Button>

                </Grid>
                <Grid

                >

                    <MapContainer center={{ lat: '3.9897551538255724', lng: '-73.75832465129854' }} zoom={13}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={{ lat: '3.9897551538255724', lng: '-73.75832465129854' }} >
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