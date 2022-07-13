import React from "react";
import { Input, Modal, Form, Button } from "antd";
import { validateMessages } from "@view/shared/helper/functions";
import TitleComponent from "@view/shared/components/MainTitleComponent/TitleComponent";
import { useTranslate } from "@view/shared/hook/useTranslate";
const { TextArea } = Input;
const ModalReject = ({ visibleReject, setVisibleReject }) => {
  const handleOk = () => {
    handleCancel();
  };

  const handleCancel = () => {
    setVisibleReject(false);
  };

  const { REASON_REJECT, CANCEL, SAVE } = useTranslate(
    "common",
    "recordGalleryTranslateKey"
  );

  return (
    <Modal
      title={REASON_REJECT}
      visible={visibleReject}
      onOk={handleOk}
      onCancel={handleCancel}
      className="main-modal"
      footer={
        <div className="mx-auto">
          <Button
            className="cancel-button mr-3"
            type="primary"
            size="large"
            onClick={handleCancel}
          >
            {CANCEL}
          </Button>
          <Button
            onClick={handleCancel}
            className="normal-button"
            type="primary"
            size="large"
          >
            {SAVE}
          </Button>
        </div>
      }
    >
      <Form
        layout="vertical"
        className="quang-tran-form text-center"
        validateMessages={validateMessages()}
      >
        <Form.Item name="reason" rules={[{ required: true }]}>
          <TextArea maxLength={100} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalReject;
