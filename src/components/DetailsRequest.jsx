import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Avatar, Tag, Modal, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';

import { fillRequestAsync, updateRequestAsync } from '../Redux/actions/actionsRequest';
import { fillUserAsync } from '../Redux/actions/actionsUser';
import { fillMascotaAsync } from '../Redux/actions/actionsMascota';
import { tipoSolicitudes, statusVisitas } from '../assets/DatosMascotas';

const DetailsRequest = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { solicitud } = useSelector(store => store.solicitudesStore);
    const { user } = useSelector(store => store.userStore);
    const { mascota } = useSelector(store => store.mascotasStore);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(fillRequestAsync(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (solicitud) {
            dispatch(fillUserAsync(solicitud.idUser));
            dispatch(fillMascotaAsync(solicitud.idMascota));
        }
    }, [dispatch, solicitud]);

    if (!solicitud || !user || !mascota) return <>Loading...</>;

    const tipoDeSolicitud = tipoSolicitudes.find(ts => ts.value === solicitud.tipoSolicitud);
    const statusVisita = statusVisitas.find(ss => ss.value === solicitud.status);

    const onFinish = (values) => {
        const newStatus = statusVisitas.find(ss => ss.value === 'Cancelada');
        dispatch(updateRequestAsync({ firestoreId: id, status: newStatus.value, causasCancelacion: values.causasCancelacion }));
        setIsModalVisible(false);
    }

    return (
        <div style={{ display: 'flex' }}>
            <div>
                <div>
                    <Modal
                        title="Cancelar visita"
                        visible={isModalVisible}
                        footer={null}
                        closable={false}
                    >
                        <Form
                            form={form}
                            name="Cancelar"
                            layout="vertical"
                            size="middle"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="¿Causas de la cancelación?"
                                name="causasCancelacion"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor indique las causas de la cancelación.',
                                    },
                                ]}
                            >
                                <Input.TextArea showCount maxLength={2000} placeholder='Ingrese aqui las causas' />
                            </Form.Item>
                            <Form.Item>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <Button onClick={() => setIsModalVisible(false)} type="secundary" htmlType="button" size='large'>
                                        Cancelar
                                    </Button>
                                    <Button type="primary" htmlType="submit" size='large'>
                                        Enviar
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
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
                        <div style={{ marginTop: 10, marginBottom: 10 }}>
                            <Tag color={tipoDeSolicitud.color}>{tipoDeSolicitud.label}</Tag>
                            <Tag icon={statusVisita.icon} color={statusVisita.color}>{statusVisita.label}</Tag>
                        </div>
                        <p><strong>Fecha creación:</strong> {solicitud.fechaCreacion ? moment(solicitud.fechaCreacion).format('LLL') : ''}</p>
                        <p><strong>Fecha visita:</strong> {solicitud.fecha ? moment(`${solicitud.fecha} ${solicitud.hora}`).format('LLL') : ''}</p>
                        {solicitud.causasCancelacion && (
                            <>
                                <hr></hr>
                                <p><strong>Causas de la cancelación</strong></p>
                                <p>{solicitud.causasCancelacion}</p>
                            </>
                        )}
                        {statusVisita.label === 'Agendada' && (
                            <div style={{ display: 'flex', gap: 5 }}>
                                <Button onClick={() => {
                                    setIsModalVisible(true);
                                }} type="secundary" htmlType="button">Cancelar visita</Button>
                                <Button onClick={() => {
                                    const newStatus = statusVisitas.find(ss => ss.value === 'Cumplida');
                                    dispatch(updateRequestAsync({ firestoreId: id, status: newStatus.value }));
                                }} type="primary" htmlType="button">Completar visita</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div style={{ width: '35%' }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={mascota.imagen} alt={mascota.nombre} />
            </div>
        </div>
    )
}

export default DetailsRequest