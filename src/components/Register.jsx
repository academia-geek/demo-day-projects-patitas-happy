import React from 'react';
import { Button, Div1, Div2, Span, TitleR } from '../Styles/Styles';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { registerUserAsync } from '../Redux/actions/actionsRegister';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { registerUserAsync } from '../Redux/actions/actionsLogin';


const SignupSchema = Yup.object().shape({
    fullname: Yup.string().min(2, 'Nombre muy corto').max(20, 'Nombre muy Largo').required("Este nombre es requerido"),
    email: Yup.string().email('debe ser del tipo ana@ana.com').required("Este email es requerido"),
    fecha: Yup.date().required("Este campo es requiere"),
    phoneNumber: Yup.string().min(2, 'muy corto').max(12, 'Telefono muy largo').required("Este campo es requerido"),
    password: Yup.string().min(6, 'Password muy corto').max(20, 'Password muy Largo').required("este campo es obligatorio").oneOf([Yup.ref('pass2')], 'Los Password No coinciden'),
    pass2: Yup.string().min(6, 'Password muy corto').max(20, 'Password muy Largo').required("este campo es obligatorio").oneOf([Yup.ref('password')], 'Los Password No coinciden')
})

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error: registerError } = useSelector(store => store.userStore);


    //--Función para cantidad de caracteres digitados para número celular
    const validatePhoneNumber = (str, validStringLength) => {
        if (!str) return false;
        const value = str.replace(/\D/g, '');
        const stringLenght = value.length;
        return { isValid: stringLenght === validStringLength, value };
    }

    const onSubmit = (values) => {
        console.log(values);
        const { fullname, email, fecha, phoneNumber, password } = values;

        const { isValid, value: validPhoneNumber } = validatePhoneNumber(phoneNumber, 10);
        if (!isValid) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor verifique el numero teléfonico'
            });

            return;
        }

        dispatch(registerUserAsync(fullname, email, fecha, password, validPhoneNumber));
    }

    if (registerError) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error, por favor intente más tardes.'
        });
    } else {
        if (registerError === false) {
            Swal.fire({
                icon: 'success',
                title: 'Congratulations!',
                text: 'Se ha creado exitosamente su cuenta!'
            }).then(() => {
                navigate("/login");
            });
        }
    }

    return (
        <Div1>
            <Div2>
                <TitleR>Register</TitleR>
                <p style={{ fontFamily: 'Fira mono', width: '300px', textAlign: 'center' }}>Registrate con tus datos para poder iniciar sesión.</p>
                <Formik

                    initialValues={
                        {
                            fullname: '',
                            email: '',
                            fecha: '',
                            phoneNumber: '',
                            password: '',
                            pass2: ''
                        }
                    }
                    validationSchema={SignupSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched }) => (

                        <Form style={{ display: 'flex', flexDirection: 'column' }}>
                            <Field type="texto" placeholder="Name" name="fullname" style={{ margin: "2% 0", width: '220px', height: '45px', paddingLeft: '10px', border:'1px solid #8492A6', borderRadius:'5px'  }} />
                            {errors.fullname && touched.fullname ?
                                (<div>{errors.fullname}</div>) : null}

                            <Field type="email" placeholder="Email" name="email" style={{ margin: "2% 0", width: '220px', height: '45px', paddingLeft: '10px', border:'1px solid #8492A6', borderRadius:'5px'  }} />
                            {errors.email && touched.email ?
                                (<div>{errors.email}</div>) : null}

                            <Field type="date" placeholder="Fecha Nacimiento" name="fecha" style={{ margin: "2% 0", width: '220px', height: '45px', paddingLeft: '10px', border:'1px solid #8492A6', borderRadius:'5px'  }} />
                            {errors.fecha && touched.fecha ?
                                (<div>{errors.fecha}</div>) : null}

                            <Field type="texto" placeholder="Telefono/Celular" name="phoneNumber" style={{ margin: "2% 0", width: '220px', height: '45px', paddingLeft: '10px', border:'1px solid #8492A6', borderRadius:'5px'  }} />
                            {errors.phoneNumber && touched.phoneNumber ?
                                (<div>{errors.phoneNumber}</div>) : null}

                            <Field type="password" placeholder="Password 1" name="password" style={{ margin: "2% 0", width: '220px', height: '45px', paddingLeft: '10px', border:'1px solid #8492A6', borderRadius:'5px' }} />
                            {errors.password && touched.password ?
                                (<div>{errors.password}</div>) : null}

                            <Field type="password" placeholder="Password 2" name="pass2" style={{ margin: "2% 0", width: '220px', height: '45px', paddingLeft: '10px',border:'1px solid #8492A6', borderRadius:'5px'  }} />
                            {errors.pass2 && touched.pass2 ?
                                (<div>{errors.password}</div>) : null}
                            <div style={{margin:' 10px auto'}}>

                            
                            <Button type="submit" style={{ margin: "2%" }}>
                                Registrar
                            </Button>
                            </div>

                        </Form>
                    )}

                </Formik>


                <Span>¿Ya tienes cuenta? <Link to="/login">Ingresa aquí.</Link></Span>
            </Div2>
        </Div1>
    );
};

export default Register;