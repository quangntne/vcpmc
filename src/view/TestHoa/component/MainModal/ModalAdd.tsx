import { useTranslate } from "@hook/useTranslate";
import { common } from "@translateKey/index";
import { Button, Form, Input, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect } from "react";
import FormAdd from "../FormAdd/FormAdd";
import FormSelect from "./FormSelect";
const ModalAdd = ({ modal, setModal }) => {

  // TRANSLATE
  const { CANCEL, SAVE, EDIT, ADD, ACTION, MUST_TYPE } = useTranslate("common");

  // JUST MODAL
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setModal({ isVisible: false, dataEdit: null });
    form.resetFields();
  };

  // JUST FORM
  const [form] = Form.useForm();


  return (
    <Modal
    className="main-modal"
      title={modal.dataEdit ? `${EDIT} ${modal.dataEdit.tagName}` : ADD}
      visible={modal.isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button className="cancel-button" key="back" onClick={handleCancel}>{CANCEL}</Button>,
        <Button className="normal-button"
          key="submit"
          type="primary">
          {ACTION}
        </Button>,
      ]}
    >
      <FormAdd />
    </Modal>
  );
};

export default ModalAdd;
