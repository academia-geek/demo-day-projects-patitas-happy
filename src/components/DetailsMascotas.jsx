import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Grid } from '@mui/material'
import { Tag, Spin } from 'antd';
import Footer from "./Footer";
import { ButtonMa, Item, TitleDog } from '../Styles/StylesDetalle';
import SchedulingForm from './SchedulingForm';
import { addRequestAsync, errorSync, fillSolicitudesUsuarioAsync } from '../Redux/actions/actionsRequest';
import Swal from 'sweetalert2';
import BtnFloat from './BtnFloat';
import { ClockCircleOutlined } from '@ant-design/icons';
import { fillMascotaAsync } from '../Redux/actions/actionsMascota';
import moment from 'moment';


const DetailsMascotas = () => {

  const navigate = useNavigate()

  const { firestoreId } = useParams();
  const dispatch = useDispatch();
  const { mascotas } = useSelector(store => store.mascotasStore);
  const { id } = useSelector(store => store.UserStore);
 

  const [showTimeForm, setShowTimeForm] = useState(true);

  const mascota = mascotas.find(m => m.firestoreId === firestoreId);
  
  // const others1 = mascota.condiciones ? mascota.condiciones.some(condition => condition === "otros") : null;
  // const condiciones1 = others ? mascota.condiciones.filter(c => c !== "otros") : mascota.condiciones;
  
  const { error, solicitudesUsuario } = useSelector(store => store.solicitudesStore);

  useEffect(() => {
    if (firestoreId) {
      dispatch(fillMascotaAsync(firestoreId));
      if (id) {
        dispatch(fillSolicitudesUsuarioAsync(firestoreId, id));
      }
    }
  }, [dispatch, firestoreId, id]);

  const onFinish = (fieldsValue, idMascota, idUser) => {
    // Should format date value before submit.

    const solicitud = {
      idUser: idUser,
      idMascota: idMascota,
      fecha: fieldsValue['fecha'].format('YYYY-MM-DD'),
      hora: fieldsValue['hora'].format('HH:mm:ss'),
      tipoSolicitud: 'visita',
      status: 'pendienteRevision',
      fechaCreacion: moment().format('YYYY-MM-DD')
    };
    console.log('Received values of form: ', solicitud);
    dispatch(addRequestAsync(solicitud));

  }

  const handleAdopcion = () => {
    navigate('/adopcion')
  }
  const handleApadrinar = () => {
    navigate('/apadrinar')
  }

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
      });
    }
  }

  const others = mascota && mascota.condiciones ? mascota.condiciones.some(condition => condition === "otros") : [];
  const condiciones = others && mascota ? mascota.condiciones.filter(c => c !== "otros") : [];

  if (!mascota) return <><Spin /></>;

  return (
    <>
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent='center'
      >
        <Grid
          padding='30px'
        >
          <div style={{ width: '540px', height: '580px'}}>
            <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={mascota.imagen} alt={mascota.nombre} />
          </div>
        </Grid>
        <Grid
          textTransform='capitalize'
          padding='30px'
        >
          <TitleDog>{mascota.nombre}</TitleDog>
          <div style={{ display: 'flex' }}>
            <div>
              <ul style={{ listStyle: 'none', fontWeight: 'bolder' }}>
                <Item>Mascota:</Item>
                <Item>Género:</Item>
                <Item>Edad:</Item>
                <Item>Tamaño:</Item>
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
                <Item>Personalidad:</Item>
                <Item>Vacunas</Item>
                {
                  condiciones.length ? (
                    <Item>Condiciones físicas</Item>
                  ) : null
                }
                {mascota.otrasCondiciones && (
                  <Item>Otras condiciones</Item>
                )}
              </ul>
            </div>
            <div>
              <ul style={{ listStyle: 'none' }}>
                <Item>{mascota.tipo}</Item>
                <Item>{mascota.genero}</Item>
                <Item>{mascota.edad} años</Item>
                <Item>{mascota && Object.keys(mascota).length && (
                  <Tag color="orange">{mascota.tamano}</Tag>
                )}
                </Item>
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
                <Item>{mascota && Object.keys(mascota).length && mascota.personalidad.map((item, index) => (
                  <Tag color="lime" key={index}>{item}</Tag>
                ))}
                </Item>
                <Item>{mascota && Object.keys(mascota).length && mascota.vacunas.map((item, index) => (
                  <Tag color="cyan" key={index}>{item}</Tag>
                ))}
                </Item>
                {
                  condiciones && condiciones.length ? (
                    <Item>{condiciones.map((item, index) => (
                      <Tag color="gold" key={index}>{item}</Tag>
                    ))}
                    </Item>
                  ) : null
                }
                {
                  mascota.otrasCondiciones && (
                    <Item>{mascota.otrasCondiciones}</Item>
                  )
                }
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
              <Button sx={{ background: '#F5CEC7', border: '2px solid #47525E', borderRadius: '5px', color: '#47525E' }}
                onClick={handleAdopcion}
              >ADOPTAR</Button>
              <Button sx={{ background: '#F5CEC7', border: '2px solid #47525E', borderRadius: '5px', color: '#47525E' }}
                onClick={handleApadrinar}
              >APADRINAR</Button>
            </ButtonGroup>
          </div>
          <div>

            {
              !solicitudesUsuario || solicitudesUsuario.length === 0 ? (
                <SchedulingForm onFinish={(fieldsValue) => {
                  onFinish(fieldsValue, firestoreId, id)
                }} />
              ) : (
                <BtnFloat
                  screenHeight={200}
                  iconBtn={<ClockCircleOutlined />}
                  onClick={() => { }}
                  titletooltip={`Visita agendada para ${solicitudesUsuario[0].fecha} ${solicitudesUsuario[0].hora}`}
                  btnStyle={{ borderColor: '#1ed0d0', color: '#25a2a2', backgroundColor: '#ceffff' }}
                  affixStyle={{ marginLeft: '100%' }}
                />
              )
            }

          </div>
        </Grid>
        <Footer />
      </Grid>
    </>
  )
}


export default DetailsMascotas