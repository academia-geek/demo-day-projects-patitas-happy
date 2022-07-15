import React, { useState } from "react";
import "../Styles/ContactoStyle.css";
import "../Styles/FormDarenAdopcion.css";
import Footer from "./Footer";
import FormAdoptar from "./FormAdoptar";
import FormDarenAdopcion from "./FormDarenAdopcion";
const Contactanos = () => {
  const [showPerdida, setShowPerdida] = useState(false);
  const [showAdopcion, setShowAdopcion] = useState(false);
  const handleShow = e => {
    if (e.target.id === "Perdida") {
      setShowAdopcion(true);
      setShowPerdida(false);
    } else {
      if (e.target.id === "Adopcion") {
        setShowPerdida(true);
        setShowAdopcion(false);
      }
    }
  };
  return (
    <div>
      <div className="portada">
        <button>Contáctanos</button>
      </div>
      <div className="contactcontain">
        <div>
          <h3>¿No puedes seguir cuidando de tu mascota?</h3>
          <button onClick={handleShow} id="Adopcion">
            ¡Publica aquí tu mascota!
          </button>
          {showPerdida === true ? <FormDarenAdopcion /> : ""}
        </div>

        <div>
          <h3>¿Encontraste una mascota perdida o en estado de abandono?</h3>
          <button onClick={handleShow} id="Perdida">
            ¡Compártenos toda la información!
          </button>
          {showAdopcion === true ? <FormAdoptar /> : ""}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contactanos;
