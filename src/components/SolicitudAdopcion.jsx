import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { TitleC } from '../Styles/StyleInfo';
import { ParrafoAdop } from '../Styles/StyleDonar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Select, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { opciones, presupuestoMascota, statusAdopciones, tipoSolicitudes, tipoVivienda } from '../assets/DatosMascotas';
import moment from 'moment';
import { addRequestAsync, errorSync } from '../Redux/actions/actionsRequest';
import Swal from 'sweetalert2';


const { Option } = Select;

const SolicitudAdopcion = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { firestoreId } = useParams();

    const { id } = useSelector(store => store.userStore);
    const { error } = useSelector(store => store.solicitudesStore);


    const handleSubmit = (values, idUser, idMascota) => {
        const statusAdopcion = statusAdopciones.find(sv => sv.value === "solicitada");
        const tipoSolicitud = tipoSolicitudes.find(sv => sv.value === "adopcion");

        const solicitud = {
            idUser: idUser,
            idMascota: idMascota,
            fechaCreacion: moment().format('YYYY-MM-DD'),
            ciudad: values.ciudad,
            direccion: values.direccion,
            vivienda: values.vivienda,
            ninos: values.ninos,
            discapacitado: values.discapacitado,
            presupuesto: values.presupuesto,
            entrenamiento: values.entrenamiento,
            motivos: values.motivos,
            tipoSolicitud: tipoSolicitud.value,
            status: statusAdopcion.value
        }
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
            justifyContent="center" alignContent='center' alignItems='center'>
            <Grid padding='50px'>
                <TitleC>Solicitud de Adopción - Patitas Happy</TitleC>
                <ParrafoAdop>
                    Agradecemos que estes pensando en adoptar una mascota que te hará muy feliz. Nos emociona que algunos de nuestros mascotas encuentren un lugar ideal para darles una oportunidad de mucho amor y cariño de tu parte.
                    Por favor llena todos los campos para comenzar la solicitud de adopción.
                </ParrafoAdop>

                <Form
                    form={form}
                    onFinish={(values) => { handleSubmit(values, id, firestoreId) }}
                    name="adopcion"
                    labelCol={{
                        span: 14,
                    }}
                    wrapperCol={{
                        span: 15,
                    }}
                >
                    <Form.Item
                        label="Ciudad"
                        name="ciudad"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese la ciudad donde se encuentra',
                            },
                        ]}
                    >
                        <Input
                            placeholder={'Ingrese la ciudad en donde se encuentra'}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Dirección"
                        name="direccion"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su dirección completa',
                            },
                        ]}
                    >
                        <Input
                            placeholder='Ingrese su dirección completa'
                        />
                    </Form.Item>

                    <Form.Item
                        label="Tipo de vivienda"
                        name="vivienda"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor indique el tipo de vivienda que habita',
                            },
                        ]}
                    >
                        <Select
                            style={{
                                width: '100%',
                            }}
                            placeholder="Por favor seleccione"
                        >{tipoVivienda.map((item) => (<Option key={item}>{item}</Option>))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label='¿Cuenta con niños?'
                        name="ninos"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor indique tipo de mascota',
                            },
                        ]}
                    >
                        <Radio.Group
                            optionType="button"
                            buttonStyle="solid"
                            danger
                            size='large'>
                            {
                                opciones.map((item, index) => (
                                    <Radio.Button key={index} value={item}>{item}</Radio.Button>
                                ))
                            }
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label='¿Presenta o tiene a su cargo persona(s) con discapacidad?'
                        name="discapacitado"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor indique tipo de mascota',
                            },
                        ]}
                    >
                        <Radio.Group
                            optionType="button"
                            buttonStyle="solid"
                            danger
                            size='large'>
                            {
                                opciones.map((item, index) => (
                                    <Radio.Button key={index} value={item}>{item}</Radio.Button>
                                ))
                            }
                        </Radio.Group>
                    </Form.Item>


                    <Form.Item
                        label="Presupuesto mensual para la mascota"
                        name="presupuesto"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor indique el rango de presupuesto disponible para mantener a su mascota',
                            },
                        ]}
                    >
                        <Select
                            style={{
                                width: '100%',
                            }}
                            placeholder="Por favor seleccione"
                        >{presupuestoMascota.map((item) => (<Option key={item}>{item}</Option>))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="¿Cómo entrenará o educará a su mascota?"
                        name="entrenamiento"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor indique el plan de educación para su mascota',
                            },
                        ]}
                    >
                        <TextArea rows={4}
                            placeholder="Describa como educará a su mascota"
                        />

                    </Form.Item>

                    <Form.Item
                        label="¿Por qué quieres adoptar?"
                        name="motivos"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor indique sus motivaciones para adoptar',
                            },
                        ]}
                    >
                        <TextArea rows={4}
                            placeholder="Describa sus motivaciones para adoptar"
                        />

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
            <Footer />
        </Grid>
    );
};

export default SolicitudAdopcion;