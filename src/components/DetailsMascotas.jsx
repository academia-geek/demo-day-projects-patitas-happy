import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Grid } from '@mui/material'
import { Tag, Spin } from 'antd';
import Footer from "./Footer";
import { Item, TitleDog, ButtonMa } from '../Styles/StylesDetalle';
import SchedulingForm from './SchedulingForm';
import { addRequestAsync, errorSync, fillSolicitudesUsuarioAsync } from '../Redux/actions/actionsRequest';
import Swal from 'sweetalert2';
import BtnFloat from './BtnFloat';
import { ClockCircleOutlined, RedditOutlined } from '@ant-design/icons';
import { fillMascotaAsync } from '../Redux/actions/actionsMascota';
import moment from 'moment';
import { statusVisita, tipoSolicitudes } from '../assets/DatosMascotas';


const DetailsMascotas = () => {
  const navigate = useNavigate()
  const { firestoreId } = useParams();
  const dispatch = useDispatch();
  const { mascota } = useSelector(store => store.mascotasStore);
  const { id } = useSelector(store => store.userStore);
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

    const solicitud = {
      idUser: idUser,
      idMascota: idMascota,
      fecha: fieldsValue['fecha'].format('YYYY-MM-DD'),
      hora: fieldsValue['hora'].format('HH:mm:ss'),
      tipoSolicitud: tipoSolicitudes.VISITA,
      status: statusVisita.AGENDADA,
      fechaCreacion: moment().format('YYYY-MM-DD')
    };
    console.log('Received values of form: ', solicitud);
    dispatch(addRequestAsync(solicitud));

  }

  const handleAdopcion = (firestoreId) => {
    navigate(`/adopcion/${firestoreId}`)
  }
  const handleApadrinar = (firestoreId) => {
    navigate(`/apadrinar/${firestoreId}`)
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

  if (!mascota || Object.keys(mascota).length === 0) return <><Spin /></>;


  const renderFloatButton = (solicitudesUsuario, firestoreId, id) => {
    if (!solicitudesUsuario || solicitudesUsuario.length === 0) {
      return (
        <SchedulingForm onFinish={(fieldsValue) => {
          onFinish(fieldsValue, firestoreId, id)
        }} />
      );
    }

    const current = solicitudesUsuario.find(su => su.status === 'Agendada');

    if (current) {
      return (
        <BtnFloat
          screenHeight={200}
          iconBtn={<ClockCircleOutlined />}
          onClick={() => { navigate(`/solicitudes/${current.idSolicitudes}`) }}
          titletooltip={`Visita agendada para ${current.fecha} ${current.hora}`}
          btnStyle={{ borderColor: '#1ed0d0', color: '#25a2a2', backgroundColor: '#ceffff' }}
          affixStyle={{ marginLeft: '100%' }}
        />
      )
    } else {
      return (
        <SchedulingForm onFinish={(fieldsValue) => {
          onFinish(fieldsValue, firestoreId, id)
        }} />
      );
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
          <div style={{ width: '540px', height: '580px' }}>
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
                {mascota.personalidad && (<Item>Personalidad:</Item>)}
                {mascota.vacunas && (<Item>Vacunas</Item>)}
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
                <Item>{mascota.tamano ? (
                  <Tag color="orange">{mascota.tamano}</Tag>
                ) : '-'}
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
                <Item>{mascota.personalidad && mascota.personalidad.map((item, index) => (
                  <Tag color="lime" key={index}>{item}</Tag>
                ))}
                </Item>
                <Item>{mascota.vacunas && mascota.vacunas.map((item, index) => (
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

              }//F95F62                  F5CEC7 clarito
            >
              <ButtonMa sx={{ background: '#F95F62', border: 'none', borderRadius: '3px', color: 'white' }}
                onClick={() => { handleAdopcion(firestoreId) }}
              >Adoptar</ButtonMa>
              <ButtonMa sx={{ background: '#F95F62', border: 'none', borderRadius: '3px', color: 'white', hover:'background:red' }}
                onClick={() => { handleApadrinar(firestoreId) }}
              >Apadrinar</ButtonMa>
            </ButtonGroup>
          </div>
          <div>
            {renderFloatButton(solicitudesUsuario, firestoreId, id)}
          </div>
        </Grid>
        <Footer />
      </Grid>
    </>
  )
}


export default DetailsMascotas