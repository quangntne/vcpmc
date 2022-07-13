import React from "react";
import { Button, Form, Input, Modal } from "antd";
import { useTranslate } from "@hook/useTranslate";
import auContractPresenter from "@modules/aucontract/presenter";
import { useAsync } from "@view/shared/hook/useAsync";
import { routerContract } from "@config/path";
import { useRouter } from "@view/shared/helper/functions";

const ModalCancelContract = props => {
    const router = useRouter();
    const { cancelAuContract } = auContractPresenter;
    const [{ execute: cancelContract }] = useAsync(cancelAuContract)
    const { visible, handleCancel } = props;
    const [form] = Form.useForm();
    const { Cancellation_Title, Back, Can_Contract, Cancellation_Placeholder } = useTranslate("aucontractTranslateKey");
    const onFinish = values => {
        cancelContract(values, props.idContract).then(res => {
            console.log('res', res)
            router.push(routerContract.CONTRACT);
        }).catch(err => {
            console.log('err', err);
        })
    };

    const handleCancelModal = () => {
        form.resetFields();
        handleCancel();
    }
    return (
        <>
            <Modal className="main-modal extend-contract-modal" width={800}
                title={Cancellation_Title} visible={visible}
                onCancel={handleCancelModal}
                footer={[<></>]}
            >
                <Form form={form} onFinish={onFinish}>
                    <Form.Item name={"reason"}
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea autoComplete={"off"}
                            placeholder={Cancellation_Placeholder}
                            autoSize={{ minRows: 6, maxRows: 6 }}
                        />
                    </Form.Item>
                    <div className="text-center">

                        <Button className="cancel-button mr-4" onClick={handleCancelModal}>
                            {Back}
                        </Button>
                        <Button className="normal-button" htmlType="submit">
                            {Can_Contract}
                        </Button>
                    </div>
                </Form>
            </Modal >
        </>
    )
};

export default ModalCancelContract