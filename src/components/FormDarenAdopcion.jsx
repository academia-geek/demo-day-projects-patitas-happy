import React from "react";
import Swal from "sweetalert2";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FileUpload } from "../helpers/FileUpload";
import useForm from "../hooks/useForm";
import { AddAdopcionAsync } from "../Redux/actions/actionsForm";

const FormDarenAdopcion = () => {
  const dispatch = useDispatch();
  const [formValue, handleInputChange, reset] = useForm({
    nombre: "",
    edad: "",
    sexo: "",
    vacunas: "",
    location: "",
    enfermedad: "",
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
    dispatch(AddAdopcionAsync(formValue)).then(() => {
      Swal.fire({
        icon: "success",
        title: "Congratulations.",
        text: "Información registrada, te llamaremos!",
      });
    });
    reset();
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        {" "}
        <h3>¿No puedes cuidar de tu mascota?</h3>
        <p>
          Aquí te ayudamos a encontrarle un nuevo hogar a tu mejor amigo. Es
          importante que nos brindes toda la información para encontrarle una
          nueva familia a tu compañero.
        </p>
        <h1
          style={{ textAlign: "center", color: "#47525E", fontFamily: "Lato" }}
        >
          Formulario para dar en Adopción
        </h1>
        <hr />
        <Form.Group className="mb-2" controlId="formHorizontalEmail">
          <Form.Label>Nombre de la mascota: *</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formValue.nombre}
            placeholder="Ingresa  nombre"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHorizontalInput1">
          <Form.Label>Edad: *</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingresa la edad"
            name="edad"
            value={formValue.edad}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Sexo: *</Form.Label>
          <Form.Select
            name="sexo"
            value={formValue.sexo}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Vacunas: *</Form.Label>
          <Form.Control
            type="textarea"
            name="vacunas"
            value={formValue.vacunas}
            placeholder="Ingresa las vacunas que tiene tu mascota"
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
          <Form.Label>¿Presenta alguna enfermedad o alergia?: *</Form.Label>
          <Form.Control
            type="text"
            name="enfermedad"
            value={formValue.enfermedad}
            placeholder="Ingresa  enfermedades o alergias"
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

export default FormDarenAdopcion;
