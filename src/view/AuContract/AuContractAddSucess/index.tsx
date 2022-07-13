import React, { useState } from "react";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import { useTranslate } from "@hook/useTranslate";
import { aucontractTranslateKey } from "@translateKey/index";
import "./styles.scss";
import { Button } from "antd";
import ModalAddCreation from "@view/AuContract/component/ModalAddCreation";
import { useParams } from "react-router";

const AuContractAddSuccess = props => {
    const param: { id: string } = useParams();
    const { id } = param;

    const {
        Required_field, Save, List_contract, Add_new_contract,
        Add_new_au_contract, Cancel
    } = useTranslate("aucontractTranslateKey");
    const [openModal, setOpenModal] = useState({ modal: false });

    const handleAddMedia = () => {
        setOpenModal({ modal: true });
    };

    const onCloseModal = () => {
        setOpenModal({ modal: false });
    };


    return (
        <>
            <div className="AuContract-success">
                <MainTitleComponent
                    breadcrumbs={[
                        { name: List_contract, href: "/contract" },
                        {
                            name: Add_new_contract,
                            href: "/contract-add",
                        },
                    ]}
                    title={Add_new_au_contract}
                    classBreadcumb={null}
                    classTitle={null}
                />

                <div className="AuContract-success-wrapper d-flex justify-content-center align-items-center">
                    <div className="wrap-au-success">
                        <div className="wrap-au-success-title d-flex justify-content-center align-items-center">
                            <i className="fas fa-check-circle mr-3" />
                            <span>Hợp đồng đã được tạo thành công</span>
                        </div>
                        <hr />

                        <p className="wrap-au-success-label">Có 2 cách để tạo bản ghi:</p>
                        <section className="way-one">
                            <span className="way-title way-title-color">Cách 1:</span> <span className="way-title">Upload bản ghi trực tiếp</span>
                            <div className="way-descriptions">Bạn có thể thực hiện thêm bản ghi ngay trên website</div>
                            <Button className="normal-button" onClick={handleAddMedia}>Thêm bản ghi trực tiếp</Button>
                        </section>
                        <section className="way-two">
                            <span className="way-title way-title-color">Cách 2:</span> <span className="way-title">Upload bản ghi qua phần mềm</span>
                            <div className="way-descriptions">Bạn có thể thêm bản ghi bằng tool</div>
                            <Button className="button-tool">Thêm bản ghi bằng tool</Button>
                        </section>
                        <p className="wrap-au-success-note">Lưu ý: Hợp đồng chỉ có hiệu lực khi thêm bản ghi thành công.</p>
                    </div>
                </div>
                <ModalAddCreation
                    id={id}
                    visible={openModal.modal}
                    handleCancel={onCloseModal}
                />
            </div>
        </>
    )
};

export default AuContractAddSuccess