import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Grid } from '@mui/material'
import { Tag } from 'antd';
import Footer from "./Footer";
import { Item, TitleDog } from '../Styles/StylesDetalle';
import SchedulingForm from './SchedulingForm';
import { addRequestAsync, errorSync } from '../Redux/actions/actionsRequest';
import Swal from 'sweetalert2';
import BtnFloat from './BtnFloat';
import { ClockCircleOutlined } from '@ant-design/icons';


const DetailsMascotas = () => {

  const { firestoreId } = useParams();
  const dispatch = useDispatch();
  const { mascotas } = useSelector(store => store.mascotasStore);
  const { id } = useSelector(store => store.loginStore);
  const { error } = useSelector(store => store.solicitudesStore);

  const [showTimeForm, setShowTimeForm] = useState(true);

  const mascota = mascotas.find(m => m.firestoreId === firestoreId);
  const others = mascota.condiciones ? mascota.condiciones.some(condition => condition === "otros") : null;
  const condiciones = others ? mascota.condiciones.filter(c => c !== "otros") : mascota.condiciones;




  const onFinish = (fieldsValue, idMascota, idUser) => {
    // Should format date value before submit.

    const solicitud = {
      idUser: idUser,
      idMascota: idMascota,
      fecha: fieldsValue['fecha'].format('YYYY-MM-DD'),
      hora: fieldsValue['hora'].format('HH:mm:ss'),
      tipoSolicitud: 'visita',
      status: 'pendienteRevision'
    };
    console.log('Received values of form: ', solicitud);
    dispatch(addRequestAsync(solicitud));

  };

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor verifique los datos!",
    }).then(() => {
      dispatch(errorSync({ error: undefined }));
    });
  } else {
    if (error === false) {
      Swal.fire({
        icon: "success",
        title: "Excelente.",
        text: "¡Has agendado una visita exitosamente!",
      }).then(() => {
        dispatch(errorSync({ error: undefined }));
        setShowTimeForm(false);
      });
    }
  }

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
                  mascota.fechaNacimiento && mascota.fechaNacimiento !== "Invalid date" ? (
                    <Item>Fecha de nacimiento:</Item>
                  ) : ""
                }
                {
                  mascota.ultimaDesparasitacion && mascota.ultimaDesparasitacion !== "Invalid date" ? (
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
                  mascota.fechaNacimiento && mascota.fechaNacimiento !== "Invalid date" ? (
                    <Item>{mascota.fechaNacimiento}</Item>
                  ) : ""
                }
                {
                  mascota.ultimaDesparasitacion && mascota.ultimaDesparasitacion !== "Invalid date" ? (
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
            {/* <TitleAgendarV>Agendar Visita</TitleAgendarV>
            <TitleHyF>Hora</TitleHyF>
            <input type="text" />
            <TitleHyF>Fecha</TitleHyF>
            <input type="text" /> */}
            {
              showTimeForm ? (<SchedulingForm onFinish={(fieldsValue) => {
                onFinish(fieldsValue, firestoreId, id)
              }} />) : (<BtnFloat 
                screenHeight= {200}
                iconBtn = {<ClockCircleOutlined />}
                onClick={()=>{}}
                titletooltip= 'Visita agendada'
                btnStyle={{borderColor: '#1ed0d0', color: '#25a2a2', backgroundColor: '#ceffff'}}
                affixStyle={{marginLeft:'100'}}
                />)
            }

          </div>
        </Grid>
        <Footer />
      </Grid>
    </>
  )
}

export default DetailsMascotas