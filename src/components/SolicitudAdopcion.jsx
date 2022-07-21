import React, { useState } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { TitleC } from '../Styles/StyleInfo';
import { FormAdop, ParrafoAdop } from '../Styles/StyleDonar';
import Footer from './Footer';
import useForm from '../hooks/useForm';
import { useDispatch } from 'react-redux';
import { addAdopcionSync } from '../Redux/actions/actionsSolicitudes';

// import Select, { SelectChangeEvent } from '@mui/material/Select';



const SolicitudAdopcion = () => {

    const dispatch = useDispatch()

    const [formValue, handleInputChange] = useForm({
        ciudad: '',
        direccion: '',
        genero: '',
        estabilidad: '',
        descripcion: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formValue)
        dispatch(addAdopcionSync(formValue))
    }

    return (
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent="center" alignContent='center' alignItems='center'>
            <Grid padding='50px'>
                <TitleC>Solicitud de Adopción - Patitas Happy</TitleC>
                <ParrafoAdop>
                    Agradecemos que estes pensando en adoptar una mascota que te hará muy feliz. Nos emociona que algunos de nuestros mascotas encuentren un lugar ideal para darles una oportunidad de mucho amor y cariño de tu parte.
                    Por favor llena todos los campos para comenzar la solicitud de adopción.
                </ParrafoAdop>

                <FormAdop onSubmit={handleSubmit}>

                    <section style={{ display: 'flex' }}>
                        <h3 style={{ width: '50%' }}>Ciudad</h3>
                        <TextField
                            id="outlined-basic"
                            label="Outlined"
                            variant="outlined"
                            name="ciudad"
                            value={formValue.ciudad}
                            onChange={handleInputChange}
                        />
                    </section>

                    <section style={{ display: 'flex' }}>
                        <h3 style={{ width: '50%' }}>Dirección </h3>
                        <TextField
                            id="outlined-basic" 
                            label="Outlined" 
                            variant="outlined"
                            name="direccion" 
                            value={formValue.direccion} 
                            onChange={handleInputChange}
                        />
                    </section>

                    <section style={{ display: 'flex' }}>
                        <h3 style={{ width: '50%' }}>Genero</h3>
                        <FormControl sx={{ my: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-label">Selecciona Genero</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="genero"
                                value={formValue.genero}
                                label="Selecciona Genero"
                                onChange={handleInputChange}
                            >
                                <MenuItem value='masculino'>Masculino</MenuItem>
                                <MenuItem value='femenino'>Femenino</MenuItem>

                            </Select>
                        </FormControl>
                    </section>

                    <section style={{ display: 'flex' }}>
                        <h3 style={{ width: '50%' }}>¿Cuentas con estabilidad econimica?</h3>
                        <FormControl sx={{ my: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-label">Selecciona</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="estabilidad"
                                value={formValue.estabilidad}
                                onChange={handleInputChange}
                                label="Selecciona"
                            >
                                <MenuItem value='si'>Si</MenuItem>
                                <MenuItem value='no'>No</MenuItem>

                            </Select>
                        </FormControl>
                    </section>

                    <section style={{ display: 'flex' }}>
                        <h3 style={{ width: '50%' }}>¿Por qué quieres adoptar?</h3>
                        <TextField
                            id="outlined-multiline-static"
                            label="Multiline"
                            multiline
                            rows={4}
                            // defaultValue="Default Value"
                            name="descripcion" value={formValue.descripcion} onChange={handleInputChange}
                        />
                    </section>

                    <button>Solicitud de Adopción</button>
                </FormAdop>

            </Grid>
            <Footer />
        </Grid>
    );
};

export default SolicitudAdopcion;