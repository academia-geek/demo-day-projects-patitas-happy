import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { Form, Radio, Button } from 'antd';
import { Paff, TitleC } from '../Styles/StyleInfo';
import Footer from './Footer';
import { opcionesApadrinamiento, statusApadrinamiento, tipoSolicitudes } from '../assets/DatosMascotas';
import moment from 'moment';
import { addRequestAsync, errorSync } from '../Redux/actions/actionsRequest';
import Swal from 'sweetalert2';



const SolicitudApadrinamiento = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { firestoreId } = useParams();

    const { id } = useSelector(store => store.userStore);
    const { error } = useSelector(store => store.solicitudesStore);

    const onFinish =(values, idUser, idMascota)=>{
        
        const solicitud ={
            idUser: idUser,
            idMascota: idMascota,
            fechaCreacion: moment().format('YYYY-MM-DD'),
            tipoSolicitud: tipoSolicitudes.APADRINAMIENTO,
            opcionApadrinamiento: values.opciones,
            status: statusApadrinamiento.SOLICITADA
        }

        console.log(solicitud)
        dispatch(addRequestAsync(solicitud))
    }

    if (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor verifique que todos los campos esten debidamente diligenciados",
        }).then(() => {
            dispatch(errorSync({ error: undefined }));
        });
    } else {
        if (error === false) {
            Swal.fire({
                icon: "success",
                title: "Excelente.",
                text: "¡Ha enviado la solicitud de adopción correctamente!",
            }).then(() => {
                form.resetFields();
                dispatch(errorSync({ error: undefined }));
            });
        }
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
                    <Form
                        form={form}
                        name='apadrimaniento'
                        onFinish={(values)=>{onFinish(values, id, firestoreId )}}
                    >
                        <Form.Item
                            label='Con '
                            tooltip='Por favor seleccione una opción'
                            name="opciones"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor indique de qué forma apadrinará a nuestra mascota',
                                },
                            ]}
                        >
                            <Radio.Group
                                optionType="button"
                                buttonStyle="solid"
                                danger
                                size='large'>
                                {
                                    opcionesApadrinamiento.map((item, index) => (
                                        <Radio.Button key={index} value={item}>{item}</Radio.Button>
                                    ))
                                }
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            style={{ width: '100%', alignItems: 'center', textAlign: 'center', justifyContent: 'center', justifyItems: 'center' }}
                        >
                            <Button type="primary" htmlType="submit" size='large'

                            >
                                Solicitar
                            </Button>
                        </Form.Item>

                    </Form>
                  
                </Grid>
            </Grid>
            <Footer />
        </Grid>
    );
};

export default SolicitudApadrinamiento;