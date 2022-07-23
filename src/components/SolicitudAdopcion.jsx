import React from 'react';
import { FormControl, Grid, InputLabel, MenuItem } from '@mui/material';
import { TitleC } from '../Styles/StyleInfo';
import { ParrafoAdop } from '../Styles/StyleDonar';
import Footer from './Footer';
import useForm from '../hooks/useForm';
import { useDispatch } from 'react-redux';
import { addAdopcionSync } from '../Redux/actions/actionsSolicitudes';
import { Form, Input, Button, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';


const { Option } = Select;

const SolicitudAdopcion = () => {

    const dispatch = useDispatch()

    const [formValue, handleInputChange] = useForm({
        ciudad: '',
        direccion: '',
        genero: '',
        estabilidad: '',
        descripcion: ''
    })

    const handleSubmit = () => {

        console.log(formValue)
        dispatch(addAdopcionSync(formValue))
    }

    return (
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent="center" alignContent='center' alignItems='center'>
            <Grid padding='50px'>
                <TitleC>Solicitud de Adopción - Patitas Happy</TitleC>
                <ParrafoAdop>
                    Agradecemos que estes pensando en adoptar una mascota que te hará muy feliz. Nos emociona que algunos de nuestros mascotas encuentren un lugar ideal para darles una oportunidad de mucho amor y cariño de tu parte.
                    Por favor llena todos los campos para comenzar la solicitud de adopción.
                </ParrafoAdop>

                <Form onFinish={handleSubmit}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                >
                    <Form.Item
                        label="Ciudad"
                        name="ciudad"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input
                            name="ciudad"
                            value={formValue.ciudad}
                            onChange={handleInputChange}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Direccion"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input
                            name="direccion"
                            value={formValue.direccion}
                            onChange={handleInputChange}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Genero"
                        name="genero"
                        value={formValue.genero}
                        onChange={handleInputChange}
                        rules={[
                            {
                                required: false,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Select placeholder="Por favor seleccione"

                            value={formValue.genero}
                            onChange={handleInputChange}
                        >
                            <Option value='masculino'>Masculino</Option>
                            <Option value='femenino'>Femenino</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Estabilidad"
                        name="estabilidad"

                        rules={[
                            {
                                required: false,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Select placeholder="Por favor seleccione"

                            value={formValue.estabilidad}
                            onChange={handleInputChange}
                        >
                            <Option value='masculino'>Masculino</Option>
                            <Option value='femenino'>Femenino</Option>
                        </Select>
                    </Form.Item>

                    {/* <section style={{ display: 'flex' }}>
                        <h3 style={{ width: '50%' }}>¿Cuentas con estabilidad econimica?</h3>
                        <FormControl sx={{ my: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-label">Selecciona</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="estabilidad"
                                value={formValue.estabilidad}
                                onChange={handleInputChange}
                                label="Selecciona"
                            >
                                <MenuItem value='si'>Si</MenuItem>
                                <MenuItem value='no'>No</MenuItem>

                            </Select>
                        </FormControl>
                    </section> */}

                    <Form.Item
                        label="¿Por qué quieres adoptar?"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <TextArea rows={4} placeholder="Describelo aquí"
                            name="descripcion"
                            value={formValue.descripcion}
                            onChange={handleInputChange}
                        />

                    </Form.Item>

                    <Form.Item
                    style={{width:'100%', alignItems:'center', textAlign:'center', justifyContent:'center', justifyItems:'center'}}
                    >
                        <Button type="primary" htmlType="submit" size='large'
                        
                        >
                            Solicitar
                        </Button>
                    </Form.Item>
                </Form>

            </Grid>
            <Footer />
        </Grid>
    );
};

export default SolicitudAdopcion;