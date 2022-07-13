import React from "react";
import { Button, Form, Input, Modal } from "antd";
import RecordGalleryPresenter from "@modules/recordGallery/presenter";
import { useAsync } from "@view/shared/hook/useAsync";

const ModalRejectMedia = props => {
    const { visible, handleCancel, selectedRowsFormat, fetchDataTable } = props;
    const [form] = Form.useForm();

    const { refuseApproveManyMedia } = RecordGalleryPresenter;

    const [{ execute: refuseMedia }] = useAsync(refuseApproveManyMedia)

    const onFinish = values => {
        const formatValues = Object.assign(values, { mediaIds: selectedRowsFormat });
        refuseMedia(formatValues).then(res => {
            fetchDataTable(true)
            handleCancel();
        })
    };

    const handleCancelModal = () => {
        form.resetFields();
        handleCancel();
    }

    const handleSubmit = () => {
        form.submit();
    }

    return (
        <>
            <Modal className="main-modal extend-contract-modal" width={800} title={`Từ chối bản ghi`}
                visible={visible} onCancel={handleCancelModal}
                footer={[
                    <>
                        <div className="text-center">
                            <Button className="cancel-button mr-3" onClick={handleCancelModal}>
                                Huỷ
                               </Button>
                            <Button className="normal-button ml-3" onClick={handleSubmit}>
                                Lưu
                               </Button>
                        </div>
                    </>
                ]}>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item name={"mediaReasonsRefusalApproval"}>
                        <Input.TextArea autoComplete={"off"} rows={6}
                            placeholder={`Cho chúng tôi biết lý do bạn muốn từ chối bản ghi này...`}
                            autoSize={{ minRows: 6, maxRows: 6 }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};

export default ModalRejectMedia