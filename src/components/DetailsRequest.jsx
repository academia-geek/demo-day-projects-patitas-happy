import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DatePicker, Form, TimePicker, Avatar, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';

import { fillRequestAsync } from '../Redux/actions/actionsRequest';
import { fillUserAsync } from '../Redux/actions/actionsUser';
import { fillMascotaAsync } from '../Redux/actions/actionsMascota';
import { tipoSolicitudes, statusSolicitudes } from '../assets/DatosMascotas';


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Por favor seleccione!',
        },
    ],
};

const DetailsRequest = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { solicitud } = useSelector(store => store.solicitudesStore);
    const { user } = useSelector(store => store.userStore);
    const { mascota } = useSelector(store => store.mascotasStore);

    useEffect(() => {
        dispatch(fillRequestAsync(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (solicitud) {
            dispatch(fillUserAsync(solicitud.idUser));
            dispatch(fillMascotaAsync(solicitud.idMascota));
        }
    }, [dispatch, solicitud]);

    if (!solicitud) return <>Loading...</>;
    if (!mascota) return <>Loading...</>;

    const tipoDeSolicitud = tipoSolicitudes.find(ts => ts.value === solicitud.tipoSolicitud);
    const statusSolicitud = statusSolicitudes.find(ss => ss.value === solicitud.status);

    return (
        <div style={{ display: 'flex' }}>
            <div>
                <div style={{ margin: '3em', display: 'flex' }}>
                    {
                        user && user.photoURL ? (
                            <Avatar size={64} src={user.photoURL} />
                        ) : (
                            <Avatar size={64} icon={<UserOutlined />} />
                        )
                    }
                    <div style={{ margin: '1em' }}>
                        <h2>{user.fullname || user.displayName} </h2>
                        <span>Agendó una visita para estar con {mascota.nombre}</span>
                        <div style={{ marginTop: 5 }}>
                            <Tag color={tipoDeSolicitud.color}>{tipoDeSolicitud.label}</Tag>
                            <Tag icon={statusSolicitud.icon} color={statusSolicitud.color}>{statusSolicitud.label}</Tag>
                            <span>{solicitud.fechaCreacion ? moment(solicitud.fechaCreacion) : ''}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <Form
                        name="time_related_controls" {...formItemLayout}
                        layout="horizontal"
                        initialValues={{
                            fecha: moment(solicitud.fecha),
                            hora: moment(solicitud.hora, 'HH:mm:ss')
                        }}
                        onFinish={() => { }}>
                        <Form.Item name="fecha" label="Fecha" {...config}>
                            <DatePicker />
                        </Form.Item>
                        <Form.Item name="hora" label="Hora" {...config}>
                            <TimePicker />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                xs: {
                                    span: 24,
                                    offset: 0,
                                },
                                sm: {
                                    span: 16,
                                    offset: 8,
                                },
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <div style={{ width: '35%' }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={mascota.imagen} alt={mascota.nombre} />
            </div>
        </div>
    )
}

export default DetailsRequest