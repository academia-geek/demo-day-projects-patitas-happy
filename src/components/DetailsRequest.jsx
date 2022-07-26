import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Avatar, Tag, Modal, Form, Input, Steps, Divider } from 'antd';
import { UserOutlined, LoadingOutlined, SmileOutlined, SolutionOutlined } from '@ant-design/icons';
import moment from 'moment';

import Notas from './Notas';

import { fillRequestAsync, updateRequestAsync } from '../Redux/actions/actionsRequest';
import { fillUserAsync } from '../Redux/actions/actionsUser';
import { fillMascotaAsync } from '../Redux/actions/actionsMascota';
import { tiposSolicitudes, statusVisita, tipoSolicitudes, statusesAdopciones, statusAdopciones } from '../assets/DatosMascotas';

const { Step } = Steps;

const DetailsRequest = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { solicitud } = useSelector(store => store.solicitudesStore);
    const { user, id: userId, admin, fullname, photoURL } = useSelector(store => store.userStore);
    const { mascota } = useSelector(store => store.mascotasStore);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);

    const [form] = Form.useForm();

    const statusAdopcionesDisponibles = statusesAdopciones.filter(item => (![
        statusAdopciones.ACEPTADA,
        statusAdopciones.CANCELADA,
        statusAdopciones.RECHAZADA
    ].includes(item.value)));

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


    const tipoDeSolicitud = tiposSolicitudes.find(ts => ts.value === solicitud.tipoSolicitud);
    const statuses = tipoDeSolicitud && tipoDeSolicitud.statuses ? tipoDeSolicitud.statuses.find(status => status.value === solicitud.status) : null;

    const onFinishCancelar = (values) => {
        dispatch(updateRequestAsync({
            firestoreId: id, status: statusVisita.CANCELADA, causasCancelacion: values.causasCancelacion, canceledBy: {
                id: userId,
                fullname
            }
        }));
        setIsCancelModalVisible(false);
    }

    const onFinishCambiarStatus = (values) => {
        const status = document.getElementById('statusValue').value;
        dispatch(updateRequestAsync({ firestoreId: id, status }));
        setIsStatusModalVisible(false);
    }

    const renderStepper = (lista, solicitud) => {
        if (!lista || lista.length === 0) return null;

        const current = lista.findIndex(nl => nl.value === solicitud.status);

        const processItem = [];
        return lista.map((item, index) => {
            const isProcess = index === current && current + 1 <= lista.length - 1 ? current + 1 : -1;
            if (isProcess > 0) {
                processItem.push(isProcess);
            }

            let status = 'finish';
            let icon = item.icon;

            if (item.value === solicitud.status) {
                status = 'finish'
            }

            if (processItem.length && index === processItem[0]) {
                status = 'process';
                icon = <LoadingOutlined />;
            }

            if(index > processItem[0]) {
                status = 'wait';
            }

            return (
                <Step key={index} status={status} title={item.label} icon={icon} />
            );
        });
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
                <div>
                    <input id='statusValue' type='hidden' />
                    <div>
                        <Modal
                            title="Cancelar visita"
                            visible={isCancelModalVisible}
                            footer={null}
                            closable={false}
                        >
                            <Form
                                form={form}
                                name="Cancelar"
                                layout="vertical"
                                size="middle"
                                onFinish={onFinishCancelar}
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
                                        <Button onClick={() => setIsCancelModalVisible(false)} type="secundary" htmlType="button" size='large'>
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
                    <div>
                        <Modal
                            title="Modificar estado"
                            visible={isStatusModalVisible}
                            footer={null}
                            closable={false}
                        >
                            <Form
                                form={form}
                                name="Modificar"
                                layout="vertical"
                                size="middle"
                                onFinish={onFinishCambiarStatus}
                            >
                                <Form.Item
                                    label="Status"
                                    name="status"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Por favor indique el status de la solicitud',
                                        },
                                    ]}
                                >
                                    <Input readOnly />
                                </Form.Item>
                                <Form.Item>
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <Button onClick={() => setIsStatusModalVisible(false)} type="secundary" htmlType="button" size='large'>
                                            Cancelar
                                        </Button>
                                        <Button type="primary" htmlType="submit" size='large'>
                                            Completar
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
                            <span>{tipoDeSolicitud.description(mascota.nombre)}</span>
                            <div style={{ marginTop: 10, marginBottom: 10 }}>
                                <Tag color={tipoDeSolicitud.color}>{tipoDeSolicitud.label}</Tag>
                                {statuses && (
                                    <Tag icon={statuses.icon} color={statuses.color}>{statuses.label}</Tag>
                                )}
                            </div>
                            <p><strong>Fecha creación:</strong> {solicitud.fechaCreacion ? moment(solicitud.fechaCreacion).format('LLL') : ''}</p>
                            {tipoSolicitudes && tipoSolicitudes.VISITA === solicitud.tipoSolicitud && (
                                <p><strong>Fecha visita:</strong> {solicitud.fecha ? moment(`${solicitud.fecha} ${solicitud.hora}`).format('LLL') : ''}</p>
                            )}
                            {solicitud.causasCancelacion && (
                                <>
                                    <hr></hr>
                                    <p><strong>Causas de la cancelación</strong></p>
                                    <p>{solicitud.causasCancelacion}</p>
                                    <p><strong>Cancelado por: </strong>{solicitud.canceledBy.fullname}</p>
                                </>
                            )}
                            {(statuses && statuses.label === statusVisita.AGENDADA) || (tipoSolicitudes && tipoSolicitudes.ADOPCION === solicitud.tipoSolicitud) && (
                                <div style={{ display: 'flex', gap: 5 }}>
                                    <Button onClick={() => {
                                        setIsCancelModalVisible(true);
                                    }} type="secundary" htmlType="button">Cancelar</Button>
                                    {admin && (
                                        <Button onClick={() => {
                                            if (tipoSolicitudes && tipoSolicitudes.ADOPCION === solicitud.tipoSolicitud) {
                                                const current = statusAdopcionesDisponibles.findIndex(nl => nl.value === solicitud.status);
                                                let processItem = null;
                                                for (let index = 0; index < statusAdopcionesDisponibles.length; index++) {
                                                    const isProcess = index === current && current + 1 <= statusAdopcionesDisponibles.length - 1 ? current + 1 : -1;
                                                    if (isProcess > 0) {
                                                        processItem = statusAdopcionesDisponibles[isProcess];
                                                        break;
                                                    }
                                                }

                                                if (processItem) {
                                                    const hiddenElement = document.getElementById('statusValue');
                                                    hiddenElement.value = processItem ? processItem.value : null;
                                                    form.setFieldsValue({
                                                        status: processItem.label
                                                    });
                                                }
                                            }
                                            setIsStatusModalVisible(true);
                                        }} type="primary" htmlType="button">Completar</Button>
                                    )}
                                </div>
                            )}
                            {tipoSolicitudes && tipoSolicitudes.ADOPCION === solicitud.tipoSolicitud && (
                                <div style={{ marginTop: 40 }}>
                                    <Divider orientation="center" plain>
                                        <strong>Progreso de la solicitud de adopción</strong>
                                    </Divider>
                                    <Steps direction='vertical'>
                                        {renderStepper(statusAdopcionesDisponibles, solicitud)}
                                    </Steps>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div style={{ width: '35%' }}>
                    <img style={{ width: '100%', height: 400, objectFit: 'cover' }} src={mascota.imagen} alt={mascota.nombre} />
                </div>
            </div>
            <div style={{ width: '70%', margin: '3em' }}>
                <Divider orientation="left" plain>
                    <strong>Comentarios</strong>
                </Divider>
                <Notas idSolicitud={id} />
            </div>
        </div>
    )
}

export default DetailsRequest