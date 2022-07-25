import { Modal } from "antd";
import React, { useState } from "react";
import FormDarenAdopcion from "./FormDarenAdopcion";

const ModalFormPerdidas = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <button onClick={showModal}>¡Publica aquí tu mascota!</button>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <FormDarenAdopcion />
      </Modal>
    </>
  );
};

export default ModalFormPerdidas;
