import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Radio, Input, InputNumber, DatePicker, Select, Button } from 'antd';
import { vacunasPerro, condiciones, optionsMascotas, vacunasGatos } from '../assets/DatosMascotas';
import UploadImage from './UploadImage';
import { addMascotaAsync, fillMascotasAsync } from "../Redux/actions/actionsMascota";
import { divForm, radioButtons, submitButton, titleForm } from '../Styles/StylesAddMascotas';

const { Option } = Select;

const AddMascotas = () => {
    const dispatch = useDispatch();
    const dateFormat = "MM-DD-YYYY";
    const [url, setUrl] = useState("");
    const [children, setChildren] = useState([]);
    const [showMoreConditions, setShowMoreConditions] = useState(false);

    useEffect(() => {
        dispatch(fillMascotasAsync());
    }, [dispatch]);

    const onUpload = (url) => {
        setUrl(url);
    }

    const onFinish = (values) => {
        dispatch(addMascotaAsync({
            tipo: values.mascota,
            nombre: values.nombre,
            edad: values.edad,
            fechaNacimiento: values.nacimiento.format(dateFormat),
            genero: values.genero,
            vacunas: values.vacunas,
            ultimaDesparasitacion: values.desparasitacion.format(dateFormat),
            ubicacion: values.ubicacion,
            enfermedad: values.enfermedad,
            condiciones: values.condiciones,
            otrasCondiciones: values.otrasCondiciones ? values.otrasCondiciones : "",
            imagen: url,
        }));
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
        console.log(values);
        if (values.some(value => value === "otros")) {
            setShowMoreConditions(true);
        } else {
            setShowMoreConditions(false);
        }
    }

    return (
        <div style={divForm}>
            <h1 style={titleForm}>Agregue una nueva mascota</h1>
            <Form
                name="Add"
                labelCol={{
                    span: 11,
                }}
                wrapperCol={{
                    span: 12,
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
                    <Radio.Group style={radioButtons} optionType="button" buttonStyle="solid">
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
                    <Select>
                        <Select.Option value="masculino">Masculino</Select.Option>
                        <Select.Option value="femenino">Femenino</Select.Option>
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
                        placeholder="Please select"
                    >{children.map((item) => (<Option key={item}>{item}</Option>))}
                    </Select>
                </Form.Item>
                <Form.Item label="Última desparasitación" name="desparasitacion">
                    <DatePicker format={dateFormat} />
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
                    <Input placeholder='Ingrese dirección, barrio, ciudad' />
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
                    <Input.TextArea showCount maxLength={2000} placeholder='Ingrese aquí la enfermedad o enfermedades que padece la mascota' />
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
                        placeholder="Please select"
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
                <Form.Item label='Comparte una foto' name="foto">
                    <UploadImage onUpload={onUpload} />
                </Form.Item>
                <Form.Item style={submitButton}>
                    <Button type="primary" htmlType="submit">
                        Publicar!
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default AddMascotas