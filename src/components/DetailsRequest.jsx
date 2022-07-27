import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Avatar, Tag, Modal, Form, Input, Steps, Divider } from 'antd';
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';

import Notas from './Notas';

import { fillRequestAsync, updateRequestAsync } from '../Redux/actions/actionsRequest';
import { fillUserAsync } from '../Redux/actions/actionsUser';
import { fillMascotaAsync } from '../Redux/actions/actionsMascota';
import {
    tiposSolicitudes,
    statusVisita,
    tipoSolicitudes,
    statusesAdopciones,
    statusAdopciones,
    statusesDarEnAdopcion,
    statusDarEnAdopcion,
    statusApadrinamiento,
    statusesApadrinamiento
} from '../assets/DatosMascotas';
import Swal from 'sweetalert2';

const { Step } = Steps;

const DetailsRequest = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { solicitud } = useSelector(store => store.solicitudesStore);
    const { user, id: userId, admin, fullname } = useSelector(store => store.userStore);
    const mascotaStore = useSelector(store => store.mascotasStore);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
    const [mascota, setMascota] = useState(null);

    const [form] = Form.useForm();

    const statusAdopcionesDisponibles = statusesAdopciones.filter(item => (![
        statusAdopciones.ACEPTADA,
        statusAdopciones.CANCELADA,
        statusAdopciones.RECHAZADA
    ].includes(item.value)));

    const statusDarEnAdopcionDisponibles = statusesDarEnAdopcion.filter(item => (![
        statusDarEnAdopcion.ACEPTADA,
        statusDarEnAdopcion.CANCELADA
    ].includes(item.value)));

    const statusApadrinamientoDisponibles = statusesApadrinamiento.filter(item => ([
        statusApadrinamiento.SOLICITADA,
        statusApadrinamiento.REVISION
    ].includes(item.value)));


    useEffect(() => {
        dispatch(fillRequestAsync(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (solicitud) {
            dispatch(fillUserAsync(solicitud.idUser));
            if (solicitud.idMascota) {
                dispatch(fillMascotaAsync(solicitud.idMascota));
            } else {
                if (solicitud.tipoSolicitud === tipoSolicitudes.DAR_ADOPCION) {
                    setMascota(solicitud.mascota);
                }
            }
        }
    }, [dispatch, solicitud]);

    useEffect(() => {
        if (mascotaStore && Object.keys(mascotaStore)) {
            setMascota(mascotaStore.mascota);
        }
    }, [mascotaStore])

    if (!solicitud || !user || !mascota) return <>Loading...</>;


    const tipoDeSolicitud = tiposSolicitudes.find(ts => ts.value === solicitud.tipoSolicitud);
    const statuses = tipoDeSolicitud && tipoDeSolicitud.statuses ? tipoDeSolicitud.statuses.find(status => status.value.toLowerCase() === solicitud.status.toLowerCase()) : null;

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

    const findNextStatus = (list, status) => {
        if (!list || list.length === 0) return null;

        const current = list.findIndex(nl => nl.value === status);
        if (current < 0) return null;

        let itemFound = null;
        for (let index = 0; index < list.length; index++) {
            const isProcess = index === current && current + 1 <= list.length - 1 ? current + 1 : -1;
            if (isProcess > 0) {
                itemFound = list[isProcess];
            }
        }

        return itemFound;
    }

    const renderStepper = (solicitud) => {
        let lista = [];
        let statusSolicitud = solicitud.status;
        if (solicitud.tipoSolicitud === tipoSolicitudes.ADOPCION) {
            lista = statusAdopcionesDisponibles;

            if (statusSolicitud === statusAdopciones.ACEPTADA) {
                statusSolicitud = statusAdopciones.VISITA;
            }
        }

        if (solicitud.tipoSolicitud === tipoSolicitudes.DAR_ADOPCION) {
            lista = statusDarEnAdopcionDisponibles;

            if (statusSolicitud === statusDarEnAdopcion.ACEPTADA) {
                statusSolicitud = statusDarEnAdopcion.GESTIONANDO;
            }
        }

        if (solicitud.tipoSolicitud === tipoSolicitudes.APADRINAMIENTO) {
            lista = statusApadrinamientoDisponibles;
        }

        const current = lista.findIndex(nl => nl.value === statusSolicitud);

        const processItem = [];
        return lista.map((item, index) => {
            const isProcess = index === current && current + 1 <= lista.length - 1 ? current + 1 : -1;
            if (isProcess > 0) {
                processItem.push(isProcess);
            }

            let status = 'finish';
            let icon = item.iconSteps;

            if (item.value === statusSolicitud) {
                status = 'finish'
            }

            if (processItem.length && index === processItem[0]) {
                status = 'process';
                icon = <LoadingOutlined />;
            }

            if (index > processItem[0]) {
                status = 'wait';
            }

            if (solicitud.tipoSolicitud === tipoSolicitudes.ADOPCION &&
                (statusSolicitud === statusAdopciones.CANCELADA ||
                    statusSolicitud === statusAdopciones.RECHAZADA)) {
                status = 'wait';
            }

            if (solicitud.tipoSolicitud === tipoSolicitudes.DAR_ADOPCION &&
                statusSolicitud === statusDarEnAdopcion.CANCELADA) {
                status = 'wait';
            }

            return (
                <Step key={index} status={status} title={item.label} icon={icon} />
            );
        });
    }

    const askForDesition = async ({ title, confirmButtonText, denyButtonText, statusSolicitud }) => {
        const result = await Swal.fire({
            title,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText,
            denyButtonText
        });

        let status = statusSolicitud;
        if (result.isConfirmed) {
            status = confirmButtonText;
        } else if (result.isDenied) {
            status = denyButtonText;
        }

        return status;
    }

    const renderActionButtons = (statusSolicitud, tipoSolicitud) => {
        if (!tipoSolicitud || !statusSolicitud) return null;

        let shouldDisplayCancelButton = false;
        let shouldDisplayCompleteButton = statusSolicitud.value.toLowerCase() !== 'cancelada';

        if (tipoSolicitud === tipoSolicitudes.VISITA && [
            statusVisita.AGENDADA,
        ].includes(statusSolicitud.value)) {
            shouldDisplayCancelButton = true;
        }

        if (tipoSolicitud === tipoSolicitudes.ADOPCION && [
            statusAdopciones.SOLICITADA,
            statusAdopciones.REVISION,
            statusAdopciones.VISITA,
        ].includes(statusSolicitud.value)) {
            shouldDisplayCancelButton = true;
        }

        if (tipoSolicitud === tipoSolicitudes.DAR_ADOPCION && [
            statusDarEnAdopcion.POSTULADA,
            statusDarEnAdopcion.REVISION,
            statusDarEnAdopcion.PUBLICADA,
            statusDarEnAdopcion.SOLICITADA,
            statusDarEnAdopcion.GESTIONANDO,
        ].includes(statusSolicitud.value)) {
            shouldDisplayCancelButton = true;
        }

        if (tipoSolicitud === tipoSolicitudes.APADRINAMIENTO && [
            statusApadrinamiento.SOLICITADA,
            statusApadrinamiento.REVISION
        ].includes(statusSolicitud.value)) {
            shouldDisplayCancelButton = true;
        }

        if (tipoSolicitud === tipoSolicitudes.ADOPCION &&
            (statusSolicitud.value === statusAdopciones.CANCELADA ||
                statusSolicitud.value === statusAdopciones.RECHAZADA ||
                statusSolicitud.value === statusAdopciones.ENTREGADA)) {
            shouldDisplayCompleteButton = false;
        }

        if (tipoSolicitud === tipoSolicitudes.DAR_ADOPCION &&
            (statusSolicitud.value === statusDarEnAdopcion.CANCELADA ||
                statusSolicitud.value === statusDarEnAdopcion.ADOPTADA)) {
            shouldDisplayCompleteButton = false;
        }

        if (tipoSolicitud === tipoSolicitudes.APADRINAMIENTO &&
            (statusSolicitud.value === statusApadrinamiento.ACEPTADA ||
            statusSolicitud.value === statusApadrinamiento.RECHAZADA)) {
                shouldDisplayCompleteButton = false;
        }

        if (tipoSolicitud === tipoSolicitudes.VISITA &&
            (statusSolicitud.value === statusVisita.CUMPLIDA ||
            statusSolicitud.value === statusVisita.CANCELADA)) {
                shouldDisplayCompleteButton = false;
        }

        return (
            <div style={{ display: 'flex', gap: 5 }}>
                {shouldDisplayCancelButton && (
                    <Button onClick={() => {
                        setIsCancelModalVisible(true);
                    }} type="secundary" htmlType="button">
                        Cancelar Solicitud
                    </Button>
                )}
                {admin && shouldDisplayCompleteButton && (
                    <Button onClick={async () => {
                        if ([
                            tipoSolicitudes.ADOPCION,
                            tipoSolicitudes.DAR_ADOPCION,
                            tipoSolicitudes.VISITA,
                            tipoSolicitudes.APADRINAMIENTO
                        ].includes(tipoSolicitud)) {
                            const hiddenElement = document.getElementById('statusValue');
                            let statusSolicitud = solicitud.status;
                            let list = [];
                            if (tipoSolicitud === tipoSolicitudes.ADOPCION) {
                                list = statusAdopcionesDisponibles;

                                if (statusSolicitud === statusAdopciones.VISITA) {
                                    const status = await askForDesition({
                                        title: 'Desea aprobar la solicitud de adopción ?',
                                        confirmButtonText: statusAdopciones.ACEPTADA,
                                        denyButtonText: statusAdopciones.RECHAZADA,
                                        statusSolicitud
                                    });

                                    dispatch(updateRequestAsync({ firestoreId: id, status }));
                                    return;
                                }

                                if ([
                                    statusAdopciones.ACEPTADA,
                                    statusAdopciones.RECHAZADA,
                                    statusAdopciones.CANCELADA
                                ].includes(statusSolicitud)) {
                                    statusSolicitud = statusAdopciones.VISITA;
                                }
                            }

                            if (tipoSolicitud === tipoSolicitudes.DAR_ADOPCION) {
                                list = statusDarEnAdopcionDisponibles;

                                if (statusSolicitud === statusDarEnAdopcion.GESTIONANDO) {
                                    const status = await askForDesition({
                                        title: 'Ha sido exitosa la gestion de la adopción ?',
                                        confirmButtonText: statusDarEnAdopcion.ACEPTADA,
                                        denyButtonText: statusDarEnAdopcion.CANCELADA,
                                        statusSolicitud
                                    });

                                    dispatch(updateRequestAsync({ firestoreId: id, status }));
                                    return;
                                }

                                if ([
                                    statusDarEnAdopcion.ACEPTADA,
                                    statusDarEnAdopcion.CANCELADA,
                                ].includes(statusSolicitud)) {
                                    statusSolicitud = statusDarEnAdopcion.GESTIONANDO;
                                }
                            }

                            if (tipoSolicitud === tipoSolicitudes.APADRINAMIENTO) {
                                list = statusApadrinamientoDisponibles;

                                if (statusSolicitud === statusApadrinamiento.REVISION) {
                                    const status = await askForDesition({
                                        title: 'Desea aprobar la solicitud de apadrinamiento ?',
                                        confirmButtonText: statusApadrinamiento.ACEPTADA,
                                        denyButtonText: statusApadrinamiento.RECHAZADA,
                                        statusSolicitud: statusSolicitud
                                    });

                                    dispatch(updateRequestAsync({ firestoreId: id, status }));
                                    return;
                                }
                            }

                            if (tipoSolicitud === tipoSolicitudes.VISITA) {
                                hiddenElement.value = statusVisita.CUMPLIDA;
                                form.setFieldsValue({
                                    status: statusVisita.CUMPLIDA
                                });
                            } else {
                                const processItem = findNextStatus(list, statusSolicitud)

                                if (processItem) {
                                    hiddenElement.value = processItem ? processItem.value : null;
                                    form.setFieldsValue({
                                        status: processItem.label
                                    });
                                }
                            }

                        }
                        setIsStatusModalVisible(true);
                    }} type="primary" htmlType="button">Actualizar status</Button>
                )}
            </div>
        )
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
                                            Actualizar
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
                            <p><strong>Fecha creación:</strong> {solicitud.fechaCreacion ? moment(new Date(solicitud.fechaCreacion)).format('LLL') : ''}</p>
                            {tipoSolicitudes.APADRINAMIENTO === solicitud.tipoSolicitud && (<p><strong>Opción de apadrinamiento:</strong> {solicitud.opcionApadrinamiento || ''}</p>)}
                            {tipoSolicitudes.ADOPCION === solicitud.tipoSolicitud && (
                                <>
                                    <p><strong>¿Tiene niños?:</strong><br/>{solicitud.ninos || ''}</p>
                                    <p><strong>¿Presenta o está a cargo de discapacitados?:</strong><br/>{solicitud.discapacitado || ''}</p>
                                    <p><strong>Presupuesto disponible:</strong><br/>{solicitud.presupuesto || ''}</p>
                                    <p><strong>Tipo de vivienda:</strong><br/>{solicitud.vivienda || ''}</p>
                                    <p><strong>Entrenamiento o educación:</strong><br/>{solicitud.entrenamiento || ''}</p>
                                    <p><strong>Motivos para adoptar:</strong><br/>{solicitud.motivos || ''}</p>
                                    <p><strong>Ubicación:</strong><br/>{`${solicitud.direccion} - ${solicitud.ciudad}` || ''}</p>
                                </>
                            )}
                            {tipoSolicitudes.DAR_ADOPCION === solicitud.tipoSolicitud && (
                                <>
                                    <p><strong>Nombre:</strong><br/>{solicitud.mascota.nombre || ''}</p>
                                    <p><strong>Edad:</strong><br/>{`${solicitud.mascota.edad } años`|| ''}</p>
                                    <p><strong>Sexo:</strong><br/>{solicitud.mascota.genero || ''}</p>
                                    <p><strong>Vacunas:</strong><br/>{solicitud.mascota.vacunas || ''}</p>
                                    <p><strong>Enfermedad:</strong><br/>{solicitud.mascota.enfermedad || ''}</p>
                                    <p><strong>Condiciones y/o personalidad:</strong><br/>{solicitud.mascota.condiciones || ''}</p>
                                    <p><strong>Ciudad:</strong><br/>{solicitud.mascota.ciudad  || ''}</p>
                                </>
                            )}
                            {tipoSolicitudes.VISITA === solicitud.tipoSolicitud && (
                                <p><strong>Fecha visita:</strong> {solicitud.fecha ? moment(new Date(`${solicitud.fecha} ${solicitud.hora}`)).format('LLL') : ''}</p>
                            )}
                            {solicitud.causasCancelacion && (
                                <>
                                    <hr></hr>
                                    <p><strong>Causas de la cancelación</strong></p>
                                    <p>{solicitud.causasCancelacion}</p>
                                    <p><strong>Cancelado por: </strong>{solicitud.canceledBy.fullname}</p>
                                </>
                            )}
                            {renderActionButtons(statuses, solicitud.tipoSolicitud)}
                            {[
                                tipoSolicitudes.ADOPCION,
                                tipoSolicitudes.DAR_ADOPCION,
                                tipoSolicitudes.APADRINAMIENTO
                            ].includes(solicitud.tipoSolicitud) && (
                                    <div style={{ marginTop: 40 }}>
                                        <Divider orientation="center" plain>
                                            <strong>Progreso de la solicitud</strong>
                                        </Divider>
                                        <Steps direction='vertical'>
                                            {renderStepper(solicitud)}
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