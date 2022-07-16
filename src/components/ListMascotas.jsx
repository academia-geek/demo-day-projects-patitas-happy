import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Card, Tooltip, Empty, Affix } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fillMascotasAsync } from '../Redux/actions/actionsMascota';
import { divCards, divListMascotas, styleNombreMascota, stylesBtnCards, stylesDivDescriptions, stylesImgesCards, stytlesiconos } from '../Styles/StylesAddMascotas';
import { pastel, ubicacion } from '../assets/iconos';

const { Meta } = Card;

const ListMascotas = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mascotas = useSelector((store) => store.mascotasStore.mascotas);

    useEffect(() => {
        if (!mascotas || mascotas.length === 0) {
            dispatch(fillMascotasAsync());
        }
    }, [mascotas, dispatch]);



    return (
        <div style={divListMascotas}>
            <div style={divCards}>
                {

                    mascotas && mascotas.length ? (
                        mascotas.map((item, index) => (
                            <Card
                                key={index}
                                hoverable
                                style={{
                                    width: 240,
                                }}
                                cover={<img alt="example" src={item.imagen} style={stylesImgesCards} />}
                            >
                                <Meta
                                    title={
                                        <span style={styleNombreMascota}>{item.nombre}</span>
                                    }
                                    description={
                                        <div style={stylesDivDescriptions}>
                                            <span><img src={pastel} style={stytlesiconos} alt="edad"/>{`${item.edad} años`}</span>
                                            <span><img src={ubicacion} style={stytlesiconos} alt="ubicacion" />{item.ubicacion}</span>
                                        </div>}
                                />
                                <Button
                                    type="primary"
                                    style={stylesBtnCards}
                                    onClick={() => navigate(`/detailsMascotas/${item.firestoreId}`)}
                                    danger>Conóceme!</Button>
                            </Card>
                        ))
                    ) :
                        (
                            <Empty />
                        )
                }

            </div>
            <Affix offsetBottom={50} onChange={affixed => console.log(affixed)}>
                <Tooltip title="Agrega nueva mascota">
                    <Button shape="circle" icon={<PlusCircleOutlined />} size="large" style={{ border: 'none', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px', marginLeft: '55px' }} onClick={() => navigate("/addMascotas")} />
                </Tooltip>
            </Affix>

        </div>
    );
};

export default ListMascotas;