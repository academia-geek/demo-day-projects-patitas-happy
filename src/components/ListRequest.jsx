import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Tag, Button, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fillRequestsAsync } from '../Redux/actions/actionsRequest';
import { fillUsersAsync } from '../Redux/actions/actionsUser';
import { fillMascotasAsync } from '../Redux/actions/actionsMascota';
import { tiposSolicitudes, tipoSolicitudes } from '../assets/DatosMascotas';
import moment from 'moment';

const ListRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, id, admin, photoURL } = useSelector(store => store.userStore);
  const { solicitudes } = useSelector(store => store.solicitudesStore);
  const { mascotas } = useSelector(store => store.mascotasStore);
  const [orders, setOrders] = useState([]);

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
              <span>{tipoDeSolicitud.value === tipoSolicitudes.VISITA ? `Quiere ${tipoDeSolicitud.accion} ${mascota.nombre} en ${moment(new Date(`${solicitud.fecha} ${solicitud.hora}`)).format('LLL')}`: `Quiere ${tipoDeSolicitud.accion} ${mascota.nombre}`}</span>
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
      const mascota = mascotas.find(m => m.firestoreId === solicitud.idMascota);
      const user = users.find(u => u.idUser === solicitud.idUser);
      list.push({
        solicitud,
        mascota,
        usuario: {
          fullname: user.fullname,
          displayName: user.displayName,
          photoURL: user.photoURL
        }
      });
    }

    return list;
  }

  // const IconText = ({ icon, text }) => (
  //   <Space>
  //     {React.createElement(icon)}
  //     {text}
  //   </Space>
  // );

  return (
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
          // actions={[
          //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          // ]}
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
  )
};

export default ListRequest;
