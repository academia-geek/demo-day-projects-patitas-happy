import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, List, Tag, Button, Badge, Tooltip, Form, Select, Modal } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fillRequestsAsync, appliedFilter as appliedFilterAction, filterRequestsAsync, removeAppliedFilter } from '../Redux/actions/actionsRequest';
import { fillUsersAsync } from '../Redux/actions/actionsUser';
import { fillMascotasAsync } from '../Redux/actions/actionsMascota';
import { tiposSolicitudes, tipoSolicitudes } from '../assets/DatosMascotas';
import moment from 'moment';

const { Option } = Select;

const ListRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, id, admin, photoURL } = useSelector(store => store.userStore);
  const { solicitudes, appliedFilter } = useSelector(store => store.solicitudesStore);
  const { mascotas } = useSelector(store => store.mascotasStore);
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);

  const [form] = Form.useForm();
  const filters = tiposSolicitudes.filter(f => ![
    tipoSolicitudes.ATENCION_HALLAZGO,
    tipoSolicitudes.DONACION
  ].includes(f.value)).map(f => ({ label: f.label, value: f.value }));

  useEffect(() => {
    dispatch(fillRequestsAsync());
    dispatch(fillUsersAsync());
    dispatch(fillMascotasAsync());
  }, [dispatch]);

  useEffect(() => {
    if (users && users.length && solicitudes && solicitudes.length && mascotas && mascotas.length) {
      const source = buildList(users, solicitudes, mascotas, { id, admin, photoURL });
      const data = source.map(({ usuario, mascota, solicitud }) => {
        const tipoDeSolicitud = tiposSolicitudes.find(ts => ts.value === solicitud.tipoSolicitud);
        const status = tipoDeSolicitud && tipoDeSolicitud.statuses ? tipoDeSolicitud.statuses.find(status => status.value === solicitud.status) : null;

        return {
          key: solicitud.idSolicitud,
          title: `${usuario.fullname ? usuario.fullname : usuario.displayName}`,
          avatar: usuario.photoURL,
          pet: mascota.imagen,
          description: (
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <span>{`Solicitud generada en ${moment(new Date(solicitud.fechaCreacion)).format('LLL')}`}</span>
              <div>
                <Tag color={tipoDeSolicitud.color}>{tipoDeSolicitud.label}</Tag>
                {status && (
                  <Tag icon={status.icon} color={status.color}>{status.label}</Tag>
                )}
              </div>
            </div>
          ),
          content: (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 50, flexWrap: 'wrap', gap: 10 }}>
              <span>{tipoDeSolicitud.value === tipoSolicitudes.VISITA ? `Quiere ${tipoDeSolicitud.accion} ${mascota.nombre} en ${moment(new Date(`${solicitud.fecha} ${solicitud.hora}`)).format('LLL')}` : `Quiere ${tipoDeSolicitud.accion} ${mascota.nombre}`}</span>
              <Button onClick={() => {
                navigate(`/solicitudes/${solicitud.idSolicitud}`)
              }} type='primary'>Ver detalle</Button>
            </div>
          )

        }
      });

      setOrders(data);
    }
  }, [solicitudes, mascotas, users, id, admin, photoURL, navigate]);

  const buildList = (users, solicitudes, mascotas, loggedUser) => {
    const list = [];
    const filteredByUser = !loggedUser.admin ? solicitudes.filter(solicitud => solicitud.idUser === loggedUser.id) : solicitudes;
    for (const solicitud of filteredByUser) {
      let mascota = {};
      if (solicitud.tipoSolicitud === tipoSolicitudes.DAR_ADOPCION) {
        mascota = solicitud.mascota;
      } else {
        mascota = mascotas.find(m => m.firestoreId === solicitud.idMascota);
      }

      const usuario = users.find(u => u.idUser === solicitud.idUser);
      list.push({
        solicitud,
        mascota,
        usuario
      });
    }

    return list;
  }

  const handleFilterChange = (value) => {
    console.log(value);
    dispatch(appliedFilterAction({ tipoSolicitud: value }));
    // form.setFieldsValue({
    //   filtro: []
    // });
    // dispatch(selectedFilter({ category: value }));
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 20, margin: '3em' }}>
        <Badge dot={badgeCount}>
          <Tooltip title="Filtrar">
            <Button onClick={() => {
              if (badgeCount === 0) {
                form.resetFields();
              }
              setIsModalVisible(true)
            }} icon={<FilterOutlined />} shape="circle" size="large" />
          </Tooltip>
        </Badge>
      </div>
      <div>
        <Modal title="Filtrar" visible={isModalVisible}
          onOk={() => {
            dispatch(filterRequestsAsync({ filter: appliedFilter }));
            setBadgeCount(!!appliedFilter);
            setIsModalVisible(false);
          }}
          onCancel={() => setIsModalVisible(false)}>
          <Form
            form={form}
            name="filtrar"
            layout="horizontal"
            size={'default'}
          >
            <Form.Item
              label="Filtros"
              name="filtro"
            >
              <Select
                allowClear
                style={{
                  width: '100%',
                }}
                onClear={() => {
                  dispatch(removeAppliedFilter());
                }}
                onSelect={handleFilterChange}
                placeholder="Por favor seleccione"
              >{filters && filters.map((item) => (<Option key={item.value}>{item.label}</Option>))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            // console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={orders}
        renderItem={(item) => (
          <List.Item
            key={item.key}
            extra={
              <img
                width={272}
                height={215}
                style={{ objectFit: 'cover' }}
                alt="logo"
                src={item.pet}
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.title}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  )
};

export default ListRequest;
