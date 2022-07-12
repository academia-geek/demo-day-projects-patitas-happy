import React from "react";
import spinExt from "../assets/spin.png";
import spinInt from "../assets/spin.png";
import spincent from "../assets/spinletter.png";
import "../Styles/SpinnerStyle.css";

const Spinner = () => {
  return (
    <div className="content">
      <img src={spinExt} alt="spin-externo" className="ext" />
      <img src={spinInt} alt="spin-interno" className="int" />
      <img src={spincent} alt="spin-letter" className="cent" />
    </div>
  );
};

export default Spinner;
