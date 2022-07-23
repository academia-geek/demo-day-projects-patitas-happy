import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Radio, Input, InputNumber, DatePicker, Select, Button } from 'antd';
import { vacunasPerro, condiciones, optionsMascotas, vacunasGatos, sizesMascotas, personalidadMascotas } from '../assets/DatosMascotas';
import UploadImage from './UploadImage';
import { addMascotaAsync, errorSync, fillMascotasAsync, updateMascotaAsync } from "../Redux/actions/actionsMascota";
import { divForm, radioButtons, submitButton, titleForm } from '../Styles/StylesAddMascotas';
import Swal from 'sweetalert2';
import moment from 'moment';

const { Option } = Select;

const FormMascotas = () => {
    const [form] = Form.useForm();
    const { firestoreId } = useParams();
    const dispatch = useDispatch();
    const { error, mascotas } = useSelector(store => store.mascotasStore);
    const dateFormat = "MM-DD-YYYY";
    const [url, setUrl] = useState("");
    const [titleFor, setTitleFor] = useState("Agregue una nueva mascota");
    const [imageInitialValue, setImageInitialValue] = useState({});
    const [children, setChildren] = useState([]);
    const [showMoreConditions, setShowMoreConditions] = useState(false);

    useEffect(() => {
        dispatch(fillMascotasAsync());
    }, [dispatch]);

    useEffect(() => {
        if (firestoreId) {
            const mascota = mascotas.find(mascota => mascota.firestoreId === firestoreId);
            if (mascota) {
                const showConditions = mascota.condiciones && mascota.condiciones.some(value => value === "otros");
                form.setFieldsValue({
                    mascota: mascota.tipo,
                    nombre: mascota.nombre,
                    edad: mascota.edad,
                    tamano: mascota.tamano,
                    rescate: moment(mascota.fechaRescate, dateFormat),
                    nacimiento: moment(mascota.fechaNacimiento, dateFormat),
                    genero: mascota.genero,
                    personalidad: mascota.personalidad,
                    vacunas: mascota.vacunas,
                    desparasitacion: moment(mascota.ultimaDesparasitacion, dateFormat),
                    ciudad: mascota.ciudad,
                    ubicacion: mascota.ubicacion,
                    enfermedad: mascota.enfermedad,
                    condiciones: mascota.condiciones,
                    otrasCondiciones: mascota.otrasCondiciones,
                });

                if (mascota.tipo === "Gato") {
                    setChildren(vacunasGatos);
                }

                if (mascota.tipo === "Perro") {
                    setChildren(vacunasPerro);
                }

                setShowMoreConditions(showConditions);
                setTitleFor(`Puede editar los datos de ${mascota.nombre}`)

                setUrl(mascota.imagen);
                setImageInitialValue({
                    uid: '-1',
                    name: mascota.nombre,
                    status: 'done',
                    url: mascota.imagen
                });
            }
        } else {
            form.setFieldsValue({
                mascota: "Perro"
            });

            setChildren(vacunasPerro);
        }
    }, [form, firestoreId, mascotas]);

    const onUpload = (url) => {
        setUrl(url);
    }

    const onFinish = (values) => {
        const mascota = {
            tipo: values.mascota,
            nombre: values.nombre,
            edad: values.edad,
            tamano: values.tamano,
            fechaRescate: values.rescate.format(dateFormat),
            fechaNacimiento: values.nacimiento ? values.nacimiento.format(dateFormat) : null,
            genero: values.genero,
            personalidad: values.personalidad,
            vacunas: values.vacunas,
            ultimaDesparasitacion: values.desparasitacion ? values.desparasitacion.format(dateFormat) : null,
            ciudad: values.ciudad,
            ubicacion: values.ubicacion,
            enfermedad: values.enfermedad,
            condiciones: values.condiciones,
            otrasCondiciones: values.otrasCondiciones ? values.otrasCondiciones : "",
            imagen: url,
        }

        if (firestoreId) {
            dispatch(updateMascotaAsync({ firestoreId, ...mascota }));
        } else {
            dispatch(addMascotaAsync(mascota));
        }
    }

    const onChange = (event) => {
        if (event.target.value === "Gato") {
            setChildren(vacunasGatos);
        }

        if (event.target.value === "Perro") {
            setChildren(vacunasPerro);
        }
    }

    const handleConditions = (values) => {
        if (values.some(value => value === "otros")) {
            setShowMoreConditions(true);
        } else {
            setShowMoreConditions(false);
        }
    }

    if (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor verifique los datos!",
        }).then(() => {
            dispatch(errorSync({ error: undefined }));
        });
    } else {
        if (error === false) {
            const message = firestoreId ? "Has actualizado esta mascota!" : "Has agregado una nueva mascota!"
            Swal.fire({
                icon: "success",
                title: "Excelente.",
                text: message,
            }).then(() => {
                if (!firestoreId) {
                    form.resetFields();
                }
                dispatch(errorSync({ error: undefined }));
            });
        }
    }



    return (
        <div style={divForm}>
            <h1 style={titleForm}>{titleFor}</h1>
            <Form
                form={form}
                name="Add"
                labelCol={{
                    span: 14,
                }}
                wrapperCol={{
                    span: 20,
                }}
                layout="horizontal"
                initialValues={{}}
                size={'default'}
                onFinish={onFinish}
                onChange={onChange}
            >
                <Form.Item
                    name="mascota"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor indique tipo de mascota',
                        },
                    ]}
                >
                    <Radio.Group style={radioButtons} optionType="button" buttonStyle="solid" danger size='large'>
                        {
                            optionsMascotas.map((item, index) => (
                                <Radio.Button key={index} value={item.value}><img style={{ width: '35px', height: 'auto', margin: 'auto' }} src={item.src} alt={item.label} />{item.label}</Radio.Button>
                            ))
                        }
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="Nombre"
                    name="nombre"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor indique el nombre de la mascota',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Edad"
                    name="edad"
                    tooltip='Indique la edad de la mascota en años'
                    rules={[
                        {
                            required: true,
                            message: 'Por favor indique la edad de la mascota en años',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Tamaño"
                    name="tamano"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor indique el tamaño de la mascota',
                        },
                    ]}
                >
                    <Select
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Por favor seleccione"
                    >{sizesMascotas.map((item) => (<Option key={item}>{item}</Option>))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Fecha de rescate"
                    name="rescate"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor indique la fecha de rescate',
                        },
                    ]}
                    tooltip='Indique la fecha en que fue ingresada al albergue la mascota o rescatada'
                >
                    <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item label="Fecha de nacimiento" name="nacimiento">
                    <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item
                    label="Género"
                    name="genero"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor indique el sexo de la mascota',
                        },
                    ]}
                >
                    <Select placeholder="Por favor seleccione">
                        <Select.Option value="masculino">Masculino</Select.Option>
                        <Select.Option value="femenino">Femenino</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Personalidad"
                    name="personalidad"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor indique las caracteristicas o gustos de la mascota',
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Por favor seleccione"
                    >{personalidadMascotas.map((item) => (<Option key={item}>{item}</Option>))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Vacunas"
                    name="vacunas"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor indique las vacunas o seleccione la opción Ninguna en caso de no contar con esta información',
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Por favor seleccione"
                    >{children.map((item) => (<Option key={item}>{item}</Option>))}
                    </Select>
                </Form.Item>
                <Form.Item label="Última desparasitación" name="desparasitacion">
                    <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item
                    label="Ciudad"
                    name="ciudad"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor indique la ciudad',
                        },
                    ]}>
                    <Input placeholder='Ingrese ciudad' />
                </Form.Item>
                <Form.Item
                    label="Ubicación"
                    name="ubicacion"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor indique la ubicación exacta de la mascota',
                        },
                    ]}>
                    <Input placeholder='Ingrese dirección completa' />
                </Form.Item>
                <Form.Item
                    label="¿Presenta alguna enfermedad?"
                    name="enfermedad"
                    tooltip='Digite No en caso de que la mascota no padezca de ninguna enfermedad'
                    rules={[
                        {
                            required: true,
                            message: 'Por favor indique si presenta alguna enfermedad',
                        },
                    ]}
                >
                    <Input.TextArea showCount maxLength={2000} placeholder='Ingrese enfermedad o enfermedades' />
                </Form.Item>
                <Form.Item
                    label="Condiciones de la mascota"
                    name="condiciones"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor indique la condición o condiciones físicas de la mascota',
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Por favor seleccione"
                        onChange={handleConditions}
                    >{condiciones.map((item) => (<Option key={item}>{item}</Option>))}
                    </Select>
                </Form.Item>
                {showMoreConditions && (
                    <Form.Item
                        label="Otras condiciones"
                        name="otrasCondiciones"
                        rules={[
                            {
                                required: showMoreConditions,
                                message: 'Por favor indique otras condiciones aquí',
                            },
                        ]}>
                        <Input placeholder='Por favor indique otras condiciones aquí' />
                    </Form.Item>
                )}
                {/* Cargar imágenes */}
                <Form.Item
                    label='Comparte una foto'
                    name="foto"
                    rules={!url ? [
                        {
                            required: true,
                            message: 'Por favor cargue una foto',
                        },
                    ] : []}
                >
                    <UploadImage onUpload={onUpload} initialValue={imageInitialValue} />
                </Form.Item>
                <Form.Item style={submitButton}>
                    <Button type="primary" htmlType="submit" size='large'>
                        Publicar!
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default FormMascotas