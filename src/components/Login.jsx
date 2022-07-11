import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../Styles/LoginStyle.css";
import facebookIcon from "../assets/fb.png";
import googleIcon from "../assets/go.png";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo Invalido, debe ser email@example.com")
    .required("Ingrese un Correo Electronico Valido"),
  pass: Yup.string()
    .min(6, "Password debe ser minimo 6 caracteres")
    .max(20, "Password  debe ser maximo 20 caracteres")
    .required("Los datos ingresados no son validos"),
});

export const Login = () => (
  <div className="backg">
    <div className="Container">
      <Formik
        initialValues={{
          Pass: "",
          email: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          // same shape as initial values
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ errors, touched }) => (
          <Form className="formik-form">
            <h2>Login</h2>
            <h3>Inicia sesión para poder adoptar una mascota.</h3>

            <Field name="email" type="email" placeholder="Email" />
            {errors.email && touched.email ? (
              <div className="errors">{errors.email}</div>
            ) : null}
            <Field name="pass" type="password" placeholder="Password" />
            {errors.pass && touched.pass ? (
              <div className="errors">{errors.pass}</div>
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
export default Login;
