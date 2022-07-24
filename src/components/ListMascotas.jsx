import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Card, Tooltip, Empty, Affix, Modal, Form, Select, Tag, Badge } from 'antd';
import { DeleteOutlined, EditOutlined, FilterOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMascotaAsync, fillMascotasAsync, selectedFilter, appliedFilters as appliedFiltersAction, filterMascotasAsync, removeAppliedFilter } from '../Redux/actions/actionsMascota';
import { divCards, divListMascotas, styleNombreMascota, stylesBtnCards, stylesDivDescriptions, stylesImgesCards, stytlesiconos } from '../Styles/StylesAddMascotas';
import { pastel, ubicacion } from '../assets/iconos';
import Swal from 'sweetalert2';

const { Meta } = Card;
const { Option } = Select;

const ListMascotas = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { admin } = useSelector(store => store.loginStore);
    const { mascotas, filters, selectedFilters, appliedFilters } = useSelector((store) => store.mascotasStore);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [badgeCount, setBadgeCount] = useState(0);

    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(fillMascotasAsync());
    }, [dispatch]);

    const handleCategoryChange = (value) => {
        form.setFieldsValue({
            filtros: []
        });
        dispatch(selectedFilter({ category: value }));
    }

    const handleFilterChange = (selectedValue) => {
        dispatch(appliedFiltersAction({ category: selectedFilters.key, selectedValue }));
    }

    const mapAppliedFilters = (list) => {
        if (!list || list.length === 0) return [];
        return list.map((item) => {
            const key = Object.keys(item)[0];
            const values = item[key].values;
            const color = item[key].color;
            const isMultiple = !!item[key].isMultiple
            return {
                key,
                values,
                color,
                isMultiple
            }
        });
    }

    const renderAppliedFilters = (list) => {
        if (!list || list.length === 0) return null;
        const items = mapAppliedFilters(list);

        return items.map(({ key, values, color, isMultiple }) => {
            return values.map((value) => <Tag color={color} style={{ marginTop: 10 }} onClose={() => {
                dispatch(removeAppliedFilter({ filter: { key, value, isMultiple } }));
            }} key={value} closable={!isMultiple}>{value}</Tag>)
        });
    }

    return (
        <div style={divListMascotas}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 20, margin: '3em' }}>
                <Badge count={badgeCount}>
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
                        const items = mapAppliedFilters(appliedFilters);
                        const counter = items.filter(af => af.values.length).length;
                        dispatch(filterMascotasAsync({ filters: items }));
                        setBadgeCount(counter);
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
                            label="Categorias"
                            name="categorias"
                        >
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                onChange={handleCategoryChange}
                                placeholder="Por favor seleccione"
                            >{filters && Object.keys(filters).map((item) => (<Option key={item}>{item}</Option>))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Filtros"
                            name="filtros"
                        >
                            <Select
                                mode={selectedFilters && selectedFilters.isMultiple ? "multiple" : ""}
                                style={{
                                    width: '100%',
                                }}
                                onChange={handleFilterChange}
                                placeholder="Por favor seleccione"
                            >{selectedFilters && selectedFilters.values.map((item) => (<Option key={item}>{item}</Option>))}
                            </Select>
                        </Form.Item>
                    </Form>
                    <div>
                        {renderAppliedFilters(appliedFilters)}
                    </div>
                </Modal>
            </div>
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
                                actions={!admin ? [] : [
                                    <EditOutlined key={'edit'} onClick={() => navigate(`/mascotas/${item.firestoreId}/edit`)} />,
                                    <DeleteOutlined
                                        onClick={() => {
                                            Swal.fire({
                                                title: "Esta seguro de eliminar esta mascota del listado ?",
                                                showCancelButton: true,
                                                confirmButtonText: "Yes",
                                                cancelButtonText: "No",
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    dispatch(deleteMascotaAsync({ id: item.firestoreId }));
                                                    Swal.fire("Mascota eliminada!", "", "success");
                                                }
                                            });
                                        }}
                                        key="remove"
                                    />,
                                ]}
                            >
                                <Meta
                                    title={
                                        <span style={styleNombreMascota}>{item.nombre}</span>
                                    }
                                    description={
                                        <div style={stylesDivDescriptions}>
                                            <span><img src={pastel} style={stytlesiconos} alt="edad" />{`${item.edad} años`}</span>
                                            <span><img src={ubicacion} style={stytlesiconos} alt="ubicacion" />{item.ciudad}</span>
                                        </div>}
                                />
                                <Button
                                    type="primary"
                                    style={stylesBtnCards}
                                    onClick={() => navigate(`/mascotas/${item.firestoreId}`)}
                                    danger>Conóceme!</Button>
                            </Card>
                        ))
                    ) :
                        (
                            <Empty />
                        )
                }

            </div>
            {admin && (
                <Affix offsetBottom={50}
                // onChange={affixed => console.log(affixed)}
                >
                    <Tooltip title="Agrega nueva mascota">
                        <Button shape="circle" icon={<PlusCircleOutlined />} size="large" style={{ border: 'none', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px', marginLeft: '55px' }} onClick={() => navigate("/mascotas/add")} />
                    </Tooltip>
                </Affix>
            )}

        </div>
    );
};

export default ListMascotas;