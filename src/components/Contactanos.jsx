import React from "react";
import "../Styles/ContactoStyle.css";
import "../Styles/FormDarenAdopcion.css";
import Footer from "./Footer";
import ModalForm from "./ModalFormAdoptar";
import ModalFormPerdidas from "./ModalFormPerdidas";
const Contactanos = () => {
  return (
    <div>
      <div className="portada">
        <button>Contáctanos</button>
      </div>
      <div className="contactcontain">
        <div>
          <h3>¿No puedes seguir cuidando de tu mascota?</h3>
          <ModalFormPerdidas />
        </div>

        <div>
          <h3>¿Encontraste una mascota perdida o en estado de abandono?</h3>
          <ModalForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contactanos;
