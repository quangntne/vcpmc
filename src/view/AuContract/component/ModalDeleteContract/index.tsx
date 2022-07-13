import React from "react";
import { Button, Form, Input, Modal } from "antd";
import { useTranslate } from "@hook/useTranslate";
import { aucontractTranslateKey } from "@translateKey/index";
import auContractPresenter from "@modules/aucontract/presenter";
import { useAsync } from "@view/shared/hook/useAsync";
import { routerContract } from "@config/path";
import { useRouter } from "@view/shared/helper/functions";

const ModalDeleteContract = props => {
    const router = useRouter();
    const { deleteAuContract } = auContractPresenter;
    const [{ execute: deleteContract }] = useAsync(deleteAuContract)
    const { visible, handleCancel } = props;
    const [form] = Form.useForm();
    const { Cancellation_Title, Back, DELETE_CONTRACT_MODAL, DELETE } = useTranslate("aucontractTranslateKey");

    const handleCancelModal = () => {
        form.resetFields();
        handleCancel();
    }

    const handleSubmit = () => {
        deleteContract(props.idContract).then(res => {
            console.log('res', res)
            router.push(routerContract.CONTRACT);
        }).catch(err => {
            console.log('err', err);
        })
    }
    return (
        <>
            <Modal className="main-modal extend-contract-modal" width={800}
                title={Cancellation_Title} visible={visible}
                onCancel={handleCancelModal}
                footer={[
                    <>

                        <div className="text-center">

                            <Button className="cancel-button mr-4" onClick={handleCancelModal}>
                                {Back}
                            </Button>
                            <Button className="normal-button" onClick={handleSubmit}>
                                {DELETE}
                            </Button>
                        </div>
                    </>
                ]}>
                <span style={{ fontWeight: 500, fontSize: '16px', color: '#727288' }}>{DELETE_CONTRACT_MODAL}</span>
            </Modal>
        </>
    )
};

export default ModalDeleteContract