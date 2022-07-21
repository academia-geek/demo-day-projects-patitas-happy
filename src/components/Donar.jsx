import { Grid } from '@mui/material';
import React from 'react';
import { GridDonar } from '../Styles/StyleDonar';
import { DivN, H1, Paff, TitleC } from '../Styles/StyleInfo';
import Footer from './Footer';


const Donar = () => {


    const handleWhatsapp = () => {
        window.location.href = 'https://web.whatsapp.com/'
    }

    const handleNequi = () => {
        window.location.href = 'https://recarga.nequi.com.co/bdigitalpsl/#!/'
    }
    return (
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent="center">
            <GridDonar>
                <DivN>
                    <H1>Haz parte del cambio de vidas...</H1>
                </DivN>
            </GridDonar>

            <Grid margin='50px 0'>
                <TitleC>Necesitamos de ti</TitleC>
            </Grid>
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }} justifyContent='center' textAlign='center'>
                <Grid item xs={6}>
                    <Paff>Con tu ayuda podemos cambiar la vida de miles de animales en Colombia que han sufrido maltrato, abandono e indiferencia. Cada aporte cuenta para sus procesos de rescate, traslado, recuperación, tratamientos veterinarios, transportes, medicamentos, recuperación de traumas y terapias de conducta. Alimentación, esterilizaciones, insumos médicos, servicios de guardería, empleados, manutención en sus hogares de paso e impresión de materiales de difusión.
                    </Paff>
                </Grid>
                <Grid item xs={5} textAlign='center'>
                    <img src="https://res.cloudinary.com/kellycamayo/image/upload/v1658262446/imagenesDemoday/3_iniciar_la_convivencia_desde_la_primera_etapa_de_vida_7407_2_600_wn2d8z.jpg" alt="" />
                </Grid>
            </Grid>
            <Grid item sx={12} margin='50px 0'> <TitleC>Puedes aportar de diferentes formas: </TitleC></Grid>
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }} justifyContent='center' alignItems='center' textAlign='center'>

                <Grid item xs={6} paddingLeft='20px'>
                    <Paff style={{textAlign:'center'}}>Contactanos si quieres aportar materiales</Paff>
                    <img width={150} height={150} onClick={handleWhatsapp} src="https://res.cloudinary.com/kellycamayo/image/upload/v1658263565/imagenesDemoday/WhatsApp_y7h4c1.webp" alt="" />
                </Grid>
                <Grid item xs={6}>
                    <Paff style={{marginTop:'40px',marginBottom:'0', textAlign:'center'}}>Aportando con dinero: 3132134758</Paff>
                    <img onClick={handleNequi} width='410px'  src="https://res.cloudinary.com/kellycamayo/image/upload/v1658263570/imagenesDemoday/nequi_gsmzuf.jpg" alt="" />

                </Grid>
            </Grid>



            <Footer />
        </Grid>
    );
};

export default Donar;