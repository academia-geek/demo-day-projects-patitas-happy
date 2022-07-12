// import { TextField } from '@mui/material';
import React from 'react';
import {  Div1, Div2, TitleR } from '../Styles/Styles';
import fb from "../img/fb.png"
import go from "../img/go.png"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { registerUserAsync } from '../Redux/actions/actionsUser';
import { Link } from 'react-router-dom';


const SignupSchema = Yup.object().shape({
    nombre: Yup.string().min(2, 'Nombre muy corto').max(20, 'Nombre muy Largo').required("Este nombre es requerido"),
    email: Yup.string().email('debe ser del tipo ana@ana.com').required("Este email se requiere"),
    fecha: Yup.date().required("Este campo es requiere"),
    telefono: Yup.string().min(2,'muy corto').max(12, 'Telefono muy largo').required("Este campo se requiere"),
    pass1: Yup.string().min(6, 'Password muy corto').max(20, 'Password muy Largo').required("este campo es obligatorio").oneOf([Yup.ref('pass2')], 'Los Password No coinciden'),
    pass2: Yup.string().min(6, 'Password muy corto').max(20, 'Password muy Largo').required("este campo es obligatorio").oneOf([Yup.ref('pass1')], 'Los Password No coinciden')
})

const Register = () => {
    const dispatch = useDispatch()

    return (
        <Div1>
            <Div2>
                <TitleR>Register</TitleR>
                <p>Registrate con tus datos para poder iniciar sesión.</p>
                <Formik

                    initialValues={
                        {
                            nombre: '',
                            email: '',
                            fecha: '',
                            telefono: '',
                            pass1: '',
                            pass2: ''
                        }
                    }
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        console.log(values.nombre, values.email, values.fecha, values.telefono, values.pass1)
                        dispatch(registerUserAsync(values.nombre, values.email, values.fecha, values.telefono, values.pass1))
                    }}
                >
                    {({ errors, touched }) => (

                        <Form style={{ display: 'flex', flexDirection: 'column' }}>
                            <Field type="texto" placeholder="Nombre" name="nombre" style={{ margin: "2%" }} />
                            {errors.nombre && touched.nombre ?
                                (<div>{errors.nombre}</div>) : null}

                            <Field type="email" placeholder="Email" name="email" style={{ margin: "2%" }} />
                            {errors.email && touched.email ?
                                (<div>{errors.email}</div>) : null}

                            <Field type="date" placeholder="Fecha Nacimiento" name="fecha" style={{ margin: "2%" }} />
                            {errors.fecha && touched.fecha ?
                                (<div>{errors.fecha}</div>) : null}

                            <Field type="texto" placeholder="Telefono/Celular" name="telefono" style={{ margin: "2%" }} />
                            {errors.telefono && touched.telefono ?
                                (<div>{errors.telefono}</div>) : null}

                            <Field type="password" placeholder="Password 1" name="pass1" style={{ margin: "2%" }} />
                            {errors.pass1 && touched.pass1 ?
                                (<div>{errors.pass1}</div>) : null}

                            <Field type="password" placeholder="Password 2" name="pass2" style={{ margin: "2%" }} />
                            {errors.pass2 && touched.pass2 ?
                                (<div>{errors.pass1}</div>) : null}

                            <button type="submit" style={{ margin: "2%" }}>
                                Registrar
                            </button>


                        </Form>
                    )}

                </Formik>

               
                <span>¿Ya tienes cuenta? <Link to="/">Ingresa aquí.</Link></span>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                    <img width={90} height={50} src={fb} alt="" />
                    <img width={50} height={50} src={go} alt="" />

                </div>
            </Div2>
        </Div1>
    );
};

export default Register;