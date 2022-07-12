import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import "../Styles/LoginStyle.css";
import facebookIcon from "../assets/fb.png";
import googleIcon from "../assets/go.png";
import { actionAuthenticatedSync, actionLoginAsync, actionLoginSync } from "../Redux/actions/actionsLogin";
import { useNavigate } from "react-router-dom";
import { authentication } from "../Firebase/firebaseConfig";
import Swal from "sweetalert2";

authentication.useDeviceLanguage();

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo Invalido, debe ser email@example.com")
    .required("Ingrese un Correo Electronico Valido"),
  password: Yup.string()
    .min(6, "Password debe ser minimo 6 caracteres")
    .max(20, "Password  debe ser maximo 20 caracteres")
    .required("Los datos ingresados no son validos"),
});

const Login = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error: loginError } = useSelector(store => store.loginStore);

  const onSubmit = (values) => {
    const { email, password } = values;
    dispatch(actionLoginAsync(email, password));
  };

  if (loginError) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Por favor verifique sus datos!"
    }).then(() => {
      dispatch(actionLoginSync({ error: undefined }));
    });
  } else {
    if (loginError === false) {
      Swal.fire({
        icon: 'success',
        title: 'Congratulations.',
        text: "Bienvenido a Patitas Happy!"
      }).then(() => {
        dispatch(actionAuthenticatedSync());
        navigate('/home');
      });
    }
  }

  return (
    <div className="backg">
      <div className="Container">
        <Formik
          initialValues={{
            password: "",
            email: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="formik-form">
              <h2>Login</h2>
              <h3>Inicia sesión para poder adoptar una mascota.</h3>

              <Field name="email" type="email" placeholder="Email" />
              {errors.email && touched.email ? (
                <div className="errors">{errors.email}</div>
              ) : null}
              <Field name="password" type="password" placeholder="Password" />
              {errors.password && touched.password ? (
                <div className="errors">{errors.password}</div>
              ) : null}
              <button type="submit">Login</button>
              <span>¿No tienes cuenta? Registrate aquí.</span>
              <div>
                <img src={facebookIcon} alt="fbicon" id="fb" />
                <img src={googleIcon} alt="goicon" id="go" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Login;
