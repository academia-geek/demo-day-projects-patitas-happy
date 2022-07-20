import { Layout, Col, Row, Card } from "antd";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "../assets/logo.png";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import "../Styles/LandingPage.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo Invalido, debe ser youremail@example.com")
    .required("Ingrese un Correo Electronico Valido"),
});
const onSubmit = values => {
  Swal.fire({
    icon: "success",
    title: `Congratulations.
     ${values.email}`,
    text: "You has been subscribed to Newsletter.",
  });
};

const { Content } = Layout;
const Landing = () => (
  <>
    <Layout style={{ background: "white" }}>
      <Row>
        <Col span={24}>
          <AppBar component="nav">
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                <img src={logo} alt="logo" className="logo" />
              </Typography>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Button sx={{ color: "#000000" }}>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "#343f4b" }}
                  >
                    LOGIN IN{" "}
                  </Link>
                </Button>
                <Button sx={{ color: "#000000" }}>
                  <Link
                    to="/register"
                    style={{ textDecoration: "none", color: "#343f4b" }}
                  >
                    {" "}
                    REGISTER
                  </Link>
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
        </Col>
      </Row>

      <Content className="content-top">
        <p>Adoptar una mascota nunca fue más facil, rápido y seguro.</p>
        <h3>
          En Patitas Happy estamos para ayudarte a hacerlo, descubre como:
        </h3>
        <button>
          {" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#343f4b" }}
          >
            Comenzar
          </Link>
        </button>
      </Content>

      <Content className="content-center">
        <h2>RESEÑAS Y CASOS DE ÉXITO</h2>
        <div className="site-card-wrapper section">
          <Card
            bordered={false}
            hoverable
            style={{
              width: "240px",
              margin: '0 30px'
            }}
            cover={<div className="cover1" />}
          >
            <h3>Roki</h3>
            Cuando vi esas orejas supe que sería el mejor compañero de
            aventuras, luego de cuatro semanas con roki, se que no me equivoqué.
          </Card>

          <Card
            bordered={false}
            hoverable
            style={{
              width: "240px",
              margin: '0 30px'
            }}
            cover={<div className="cover2" />}
          >
            <h3>Rin</h3>
            En Patitas Happy en realidad no encuentras una mascota para cuidar,
            sino mas bien un amigo incondicional que a veces te cuida más a ti,
            asi me pasó con rin.
          </Card>

          <Card
            bordered={false}
            hoverable
            style={{
              width: "240px",
              margin: '0 30px'
            }}
            cover={<div className="cover3" />}
          >
            <h3>Kaneki</h3>
            Kaneki se ha adaptado muy bien a su nuevo hogar y su familia,
            incluso tiene amigos en el barrio, gracias Patitas Happy.
          </Card>
        </div>
      </Content>
      <div className="info">
        <h2 style={{ margin: "3% 0 0 10%", color: "#47525e" }}>
          ENCUENTRA INFORMACIÓN DE INTERÉS,
        </h2>
        <h2 style={{ margin: "3% 0 0 50%", color: "#47525e85" }}>
          TODOS LOS DÍAS,
        </h2>
        <h2 style={{ margin: "2% 0 0 65%", color: "#47525e4a" }}>
          TODO EL AÑO.
        </h2>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="site-card-wrapper section details">
        <Card
          title="¿CÓMO ADOPTAR?"
          bordered={false}
          hoverable
          style={{
            width: "240px",
          }}
        >
          Encuentra información sobre cómo puedes adoptar una mascota y empezar
          a vivir muchas aventuras a su lado.
        </Card>
        <Card
          title="¿CÓMO APADRINAR O DONAR?"
          bordered={false}
          hoverable
          style={{
            width: "240px",
            marginTop: "40px",
          }}
        >
          ¿No puedes tener mascotas pero te gustaría poder apoyar a la fundación
          en su labor?, te contamos como puedes hacerlo.
        </Card>
        <Card
          title="ALIADOS"
          bordered={false}
          hoverable
          style={{
            width: "240px",
            marginTop: "80px",
          }}
        >
          Encuentra marcas de diferentes recursos que pueden ayudarte con el
          cuidado de tu mascota una vez vaya contigo a casa.
        </Card>
      </div>
      <div className="newsletter">
        <h2>RECIBE NOVEDADES CADA SEMANA</h2>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="formikform">
              <Field
                name="email"
                type="email"
                placeholder="youremail@example.com"
              />
              {errors.email && touched.email ? (
                <div className="errors">{errors.email}</div>
              ) : null}
              <button type="submit">SUBSCRIBE</button>
            </Form>
          )}
        </Formik>
      </div>
      <footer>
        <Footer />
      </footer>
    </Layout>
  </>
);

export default Landing;
