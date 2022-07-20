import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import useForm from '../hooks/useForm';
import { addApadrinarSync } from '../Redux/actions/actionsSolicitudes';
import { Paff, TitleC } from '../Styles/StyleInfo';
import Footer from './Footer';
import { useDispatch } from 'react-redux';



const SolicitudApadrinamiento = () => {

    const dispatch = useDispatch()

    const [formValue, handleInputChange] = useForm({
        opcion: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formValue)
        dispatch(addApadrinarSync(formValue))

    }

    return (
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent="center">
            <Grid>
                <img width='600px' src="https://res.cloudinary.com/kellycamayo/image/upload/v1658272239/imagenesDemoday/_92169543_thinkstockphotos-492735396_tncy3i.jpg" alt="" />
            </Grid>
            <Grid >
                <TitleC>Apadrinamiento</TitleC>
                <Paff style={{ padding: '20px' }}>
                    El apadrinamiento es un medio importante mediante el cual podemos garantizar la manutencion de nuestros rescatados, escoge la forma en que te facilite patrocinar a la mascota que te necesita.
                    Ayudas mucho aportando tu grano de arena, muchas gracias.
                </Paff>
                <h5>¡Si no puedes tener una mascota en casa, puedes ser un buen padrino!</h5>
            </Grid>
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }} justifyContent='center' >
                <Grid>
                    <h1>¿Como deseas patrocinar a la mascota?</h1>
                    <form onSubmit={handleSubmit}>
                        <RadioGroup
                            style={{ justifyContent: 'center', margin: '20px 0' }}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="opcion"
                            value={formValue.opcion}
                            onChange={handleInputChange}
                        >
                            <FormControlLabel value="materiales" control={<Radio />} label="Materiales" />
                            <FormControlLabel value="dinero" control={<Radio />} label="Dinero" />
                            <FormControlLabel value="otro" control={<Radio />} label="Otro" />
                        </RadioGroup>
                        <button type='submit'>Enviar</button>
                    </form>
                </Grid>
            </Grid>
            <Footer />
        </Grid>
    );
};

export default SolicitudApadrinamiento;