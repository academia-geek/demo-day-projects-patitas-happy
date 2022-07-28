import React from "react";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../hooks/useForm";
import { FileUpload } from "../helpers/FileUpload";
import { IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { Input, Space, Tooltip } from "antd";
import {
  EditOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import {
  BtnRosa,
  PafChange,
  SectionE,
  SectionImg,
  TitleProfile,
  TitleYour,
} from "../Styles/StyleProfile";
import { editUserAsync } from "../Redux/actions/actionsLogin";

const Profile = () => {
  const dispatch = useDispatch();

  const user = useSelector(store => store.userStore);
  console.log(user);

  const [formValue, handleInputChange] = useForm({
    displayName: user.displayName ? user.displayName : user.fullname,
    fullname: user.displayName ? user.displayName : user.fullname,
    email: user.email,
    password: user.password ? user.password : "",
    phoneNumber: user.phoneNumber,
    fecha: user.fecha,
    photoURL: user.photoURL
  });

  const { displayName, email, photoURL, phoneNumber, fecha, password } =
    formValue;

  const handleSubmit = e => {
    e.preventDefault();
    console.log(displayName, email, photoURL, phoneNumber, fecha, password);
    dispatch(
      editUserAsync(displayName, email, photoURL, phoneNumber, fecha, password)
    );
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    //llamar a la configuracion de Cloudinary
    FileUpload(file)
      .then(resp => {
        formValue.photoURL = resp;
        console.log(resp);
      })
      .catch(error => {
        console.warn(error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TitleProfile>Perfil</TitleProfile>
      <PafChange>Cambia o actualiza tu información de usuario.</PafChange>

      {
        <form onSubmit={handleSubmit} style={{ flexDirection: "column" }}>
          <SectionImg>
            <img
              width={120}
              height={120}
              src={user.photoURL}
              alt=""
              style={{ borderRadius: "100%" }}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                name="photoURL"
                onChange={handleFileChange}
              />
              <PhotoCamera />
            </IconButton>
          </SectionImg>
          <p><span style={{color: 'red'}}> Nota Importante: </span>  Antes de actualizar la información, por favor cerrar sesión e iniciar sesión nuevamente.</p>

          <SectionE>
            <TitleYour>Nombre</TitleYour>
            <Input
              style={{ width: "100%", fontSize: "18px", margin: "10px" }}
              type="text"
              name="displayName"
              value={formValue.displayName}
              onChange={handleInputChange}
              suffix={
                <Tooltip title="Extra information">
                  <EditOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
          </SectionE>

          <SectionE>
            <TitleYour>Correo</TitleYour>
            <Input
              style={{ width: "100%", fontSize: "18px", margin: "10px" }}
              type="text"
              name="email"
              value={formValue.email}
              onChange={handleInputChange}
              suffix={
                <Tooltip title="Extra information">
                  <EditOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
          </SectionE>

          <SectionE>
            <TitleYour>Teléfono</TitleYour>
            <Input
              style={{ width: "100%", fontSize: "18px", margin: "10px" }}
              type="text"
              name="phoneNumber"
              value={formValue.phoneNumber}
              onChange={handleInputChange}
              suffix={
                <Tooltip title="Extra information">
                  <EditOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
          </SectionE>

          <SectionE style={{ display: "flex" }}>
            <TitleYour style={{ width: "31%" }}>Fecha de cumpleaños</TitleYour>
            <input
              style={{
                width: "288px",
                fontSize: "15px",
                margin: "10px",
                height: "38px",
                border: "1px solid #d9d9d9",
                borderRadius: "2px",
                padding: "10px",
              }}
              type="date"
              name="fecha"
              value={formValue.fecha}
              onChange={handleInputChange}
            />
          </SectionE>

          <SectionE>
            <TitleYour style={{ width: "33%" }}>Contraseña</TitleYour>
            <Space direction="vertical">
              <Input.Password
                style={{ width: "290px", fontSize: "18px" }}
                type="password"
                name="password"
                value={formValue.password}
                onChange={handleInputChange}
                placeholder="input password"
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Space>
          </SectionE>
          <div style={{ display: "flex" }}>
            <BtnRosa>Actualizar</BtnRosa>
          </div>
        </form>
      }

      <div>
        <span>Eliminar Cuenta</span>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
