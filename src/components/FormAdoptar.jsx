import React from "react";
import Swal from "sweetalert2";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FileUpload } from "../helpers/FileUpload";
import useForm from "../hooks/useForm";
import { AddEcontradoAsync } from "../Redux/actions/actionsForm";

const FormAdoptar = () => {
  const dispatch = useDispatch();
  const [formValue, handleInputChange, reset] = useForm({
    nombre: "",
    email: "",
    telefono: "",
    location: "",
    detaillocation: "",
    fecha: "",
    hora: "",
    condicion: "",
    imagen: "",
  });

  const handleFileChange = e => {
    const file = e.target.files[0];
    //llamar a la configuracion de Cloudinary
    FileUpload(file)
      .then(resp => {
        formValue.imagen = resp;
      })
      .catch(error => {
        console.warn(error);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(AddEcontradoAsync(formValue)).then(() => {
      Swal.fire({
        icon: "success",
        title: "Congratulations.",
        text: "Información registrada, te contactaremos en el menor tiempo posible!",
      });
    });
    reset();
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <h3>¿Has encontrado una mascota abandonada o perdida?</h3>
        <p>
          Es muy importante que nos brindes toda la información de manera
          honesta y oportuna para poder asistir efectivamente a nuestro amigo
          peludo.
        </p>
        <h1
          style={{ textAlign: "center", color: "#47525E", fontFamily: "Lato" }}
        >
          Formulario de Contacto
        </h1>
        <hr />
        <Form.Group className="mb-2" controlId="formHorizontalEmail">
          <Form.Label>Nombre completo de contacto: *</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formValue.nombre}
            placeholder="Ingresa  nombre completo"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHorizontalInput1">
          <Form.Label>Email de contacto</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa email de contacto"
            name="email"
            value={formValue.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Telefono de Contacto</Form.Label>
          <Form.Control
            type="number"
            name="telefono"
            value={formValue.telefono}
            placeholder="Ingrese telefono de contacto"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>¿Dónde se encuentran?: *</Form.Label>
          <Form.Select
            name="location"
            value={formValue.location}
            onChange={handleInputChange}
            required
          >
            <option value="">-</option>
            <option value="Arauca">Arauca</option>
            <option value="Armenia">Armenia</option>
            <option value="Barranquilla">Barranquilla</option>
            <option value="Bogotá">Bogotá</option>
            <option value="Bucaramanga">Bucaramanga</option>
            <option value="Cali">Cali</option>
            <option value="Cartagena">Cartagena</option>
            <option value="Cúcuta">Cúcuta</option>
            <option value="Florencia">Florencia</option>
            <option value="Ibagué">Ibagué</option>
            <option value="Leticia">Leticia</option>
            <option value="Manizales">Manizales</option>
            <option value="Medellín">Medellín</option>
            <option value="Mitú">Mitú</option>
            <option value="Mocoa">Mocoa</option>
            <option value="Montería">Montería</option>
            <option value="Neiva">Neiva</option>
            <option value="Pasto">Pasto</option>
            <option value="Pereira">Pereira</option>
            <option value="Popayán">Popayán</option>
            <option value="Puerto Carreño">Puerto Carreño</option>
            <option value="Puerto Inírida">Puerto Inírida</option>
            <option value="Quibdó">Quibdó</option>
            <option value="Riohacha">Riohacha</option>
            <option value="San Andrés">San Andrés</option>
            <option value="San José del Guaviare">San José del Guaviare</option>
            <option value="Santa Marta">Santa Marta</option>
            <option value="Sincelejo">Sincelejo</option>
            <option value="Tunja">Tunja</option>
            <option value="Valledupar">Valledupar</option>
            <option value="Villavicencio">Villavicencio</option>
            <option value="Yopal">Yopal</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>¿Dónde encontraste al peludito?: *</Form.Label>
          <Form.Control
            type="text"
            name="detaillocation"
            value={formValue.detaillocation}
            placeholder="Ingresa la ubicación exacta"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="date"
            name="fecha"
            value={formValue.fecha}
            onChange={handleInputChange}
            required
          />
          <Form.Label>Hora</Form.Label>
          <Form.Control
            type="time"
            name="hora"
            value={formValue.hora}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>¿Condición de la mascota?: *</Form.Label>
          <Form.Control
            type="text"
            name="condicion"
            value={formValue.condicion}
            placeholder="Ingresa  condiciones fisicas o de comportamiento relevantes"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Comparte una foto!: *</Form.Label>
          <Form.Control
            type="file"
            name="imagen"
            onChange={handleFileChange}
            required
          />
        </Form.Group>
        <Button
          type="submit"
          style={{
            backgroundColor: "#F5CEC7",
            color: "#47525E",
            fontSize: "24px",
          }}
        >
          Enviar
        </Button>
      </Form>
    </div>
  );
};

export default FormAdoptar;
