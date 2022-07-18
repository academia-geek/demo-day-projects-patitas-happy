import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup, Grid } from '@mui/material'
import { Tag } from 'antd';
import Footer from "./Footer";
import { Item, TitleAgendarV, TitleDog, TitleHyF } from '../Styles/StylesDetalle';


const DetailsMascotas = () => {
  const { firestoreId } = useParams();
  const navigate = useNavigate();
  const { mascotas } = useSelector(store => store.mascotasStore);

  const mascota = mascotas.find(m => m.firestoreId === firestoreId);
  const others = mascota.condiciones.some(condition => condition === "otros");
  const condiciones = others ? mascota.condiciones.filter(c => c !== "otros") : mascota.condiciones;

  return (
    <>
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent='center'
      >
        <Grid
          padding='30px'
        >
          <div style={{ width: '540px', height: '580px', background: 'red' }}>
            <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={mascota.imagen} alt={mascota.nombre} />
          </div>
        </Grid>
        <Grid
          padding='30px'
        >
          <TitleDog>{mascota.nombre}</TitleDog>
          <div style={{ display: 'flex', textTransform: 'capitalize' }}>
            <div>
              <ul style={{ listStyle: 'none', fontWeight: 'bolder' }}>
                <Item>Mascota:</Item>
                <Item>Género:</Item>
                <Item>Edad:</Item>
                <Item>Enfermedades:</Item>
                {
                  mascota.fechaNacimiento ? (
                  <Item>Fecha de nacimiento:</Item>
                  ) : ""
                }
                {
                  mascota.ultimaDesparasitacion ? (
                  <Item>Última desparasitación:</Item>
                  ) : ""
                }
                
                <Item>Ciudad:</Item>
                <Item>Dirección:</Item>
                <Item>Vacunas</Item>
                {
                  condiciones.length ? (
                    <Item>Condiciones físicas</Item>
                  ) : null
                }
                {others && (
                  <Item>Otras condiciones</Item>
                )}
              </ul>
            </div>
            <div>
              <ul style={{ listStyle: 'none' }}>
                <Item>{mascota.tipo}</Item>
                <Item>{mascota.genero}</Item>
                <Item>{mascota.edad} años</Item>
                <Item>{mascota.enfermedad}</Item>
                {
                  mascota.fechaNacimiento ? (
                  <Item>{mascota.fechaNacimiento}</Item>
                  ) : ""
                }
                {
                  mascota.ultimaDesparasitacion ? (
                  <Item>{mascota.ultimaDesparasitacion}</Item>
                  ) : ""
                }                
                <Item>{mascota.ciudad}</Item>
                <Item>{mascota.ubicacion}</Item>
                <Item>{mascota.vacunas.map((item, index) => (
                  <Tag color="cyan" key={index}>{item}</Tag>
                ))}
                </Item>
                {
                  condiciones.length ? (
                    <Item>{mascota.condiciones.filter(c => c !== "otros").map((item, index) => (
                      <Tag color="gold" key={index}>{item}</Tag>
                    ))}
                    </Item>
                  ) : null
                }
                <Item>{mascota.otrasCondiciones}</Item>
              </ul>
            </div>
          </div>
          <div>
            <ButtonGroup aria-label="outlined primary button group"
              sx={{
                display: 'flex',
                justifyContent: 'center',

              }

              }
            >
              <Button sx={{ background: '#F5CEC7', border: '2px solid #47525E', borderRadius: '5px', color: '#47525E' }}>ADOPTAR</Button>
              <Button sx={{ background: '#F5CEC7', border: '2px solid #47525E', borderRadius: '5px', color: '#47525E' }}>APADRINAR</Button>
            </ButtonGroup>
          </div>
          <div>
            <TitleAgendarV>Agendar Visita</TitleAgendarV>
            <TitleHyF>Hora</TitleHyF>
            <input type="text" />
            <TitleHyF>Fecha</TitleHyF>
            <input type="text" />
          </div>
        </Grid>
        <Footer />
      </Grid>
    </>
  )
}

export default DetailsMascotas