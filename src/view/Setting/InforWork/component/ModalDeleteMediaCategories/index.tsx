import React from "react";
import { Button, Modal } from "antd";
import { useTranslate } from "@hook/useTranslate";
import auContractPresenter from "@modules/aucontract/presenter";
import { useAsync } from "@view/shared/hook/useAsync";
import mediaCategoriesPresenter from "@modules/mediaCategories/presenter";

const ModalDeleteMediaCategories = props => {
    const { visible, handleCancel, selectedRow, fetchDataMediaCategories } = props;
    const { deleteMediaCategories } = mediaCategoriesPresenter;
    const [{ execute: deleteMedia }] = useAsync(deleteMediaCategories);
    const { Cancellation_Title, Back, DELETE, DELETE_MEDIA_CATEGORIES_MODAL } = useTranslate("aucontractTranslateKey");

    const handleCancelModal = () => {
        handleCancel();
    }

    const handleSubmit = () => {
        selectedRow && selectedRow.map(item => {
            deleteMedia(item.mediaCategoryId).then(res => {
                fetchDataMediaCategories(true)
            })
        })
        handleCancel();
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
                <span style={{ fontWeight: 500, fontSize: '16px', color: '#727288' }}>{DELETE_MEDIA_CATEGORIES_MODAL}</span>
            </Modal>
        </>
    )
};

export default ModalDeleteMediaCategories