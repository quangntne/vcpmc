import React from "react";
import { Button, Form, Input, Modal } from "antd";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { validateMessages } from "@view/shared/helper/functions";

interface IModalCancelReason {
  visible: boolean;
  setVisible: (prev) => void;
  onFinishReason: (argument: any) => void;
  mainTitle?: string;
  placeholderTitle?: string;
  required?: boolean;
}

const ModalCancelBusinessContract = (props: IModalCancelReason) => {
  const { visible, setVisible, onFinishReason, required = false, mainTitle = "Lý do", placeholderTitle = " cái này" } = props;
  const [form] = Form.useForm();

  const handleCancelModal = () => {
    form.resetFields();
    setVisible(!visible);
  }

  const handleSubmit = () => {
    form.submit();
  }
  const { GO_BACK, CANCEL } = useTranslate("common");
  return (
    <>
      <Modal className="main-modal extend-contract-modal" width={800}
        title={mainTitle} visible={visible}
        onCancel={handleCancelModal}
        footer={[
          <>
            <div className="text-center">
              <Button className="cancel-button mr-3" onClick={handleCancelModal}>
                {GO_BACK}
              </Button>
              <Button className="normal-button ml-3" onClick={handleSubmit}>
                {CANCEL}
              </Button>

            </div>
          </>
        ]}>
        <Form form={form} onFinish={onFinishReason} validateMessages={validateMessages()}>
          <Form.Item name={"reason"} rules={[{ required: required }]}>
            <Input.TextArea autoComplete={"off"}
              placeholder={`Cho chúng tôi biết lý do bạn muốn hủy ${placeholderTitle}...`}
              autoSize={{ minRows: 6, maxRows: 6 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
};

export default ModalCancelBusinessContract