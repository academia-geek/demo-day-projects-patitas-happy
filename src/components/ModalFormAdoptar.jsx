import { Modal } from "antd";
import React, { useState } from "react";
import FormAdoptar from "./FormAdoptar";

const ModalForm = () => {
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
      <button onClick={showModal}>¡Compártenos toda la información!</button>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <FormAdoptar />
      </Modal>
    </>
  );
};

export default ModalForm;
