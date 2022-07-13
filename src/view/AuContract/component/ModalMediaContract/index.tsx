import React, {useEffect} from "react";
import {Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row} from "antd";
import "./styles.scss";
import {useSelector} from "react-redux";
import store, {RootState} from "@store/redux";
import {useTranslate} from "@hook/useTranslate";
import {aucontractTranslateKey} from "@translateKey/index";
import {LibMedia} from "@view/AuContract/component/LibMeida";


const ModalMediaContract = props => {
    const {visible, handleCancel} = props;
    const {List_work} = useTranslate("aucontractTranslateKey");

    const handleOk = () => {

        // console.log(arrConvert,"arrConvert modal=====")

        handleCancel();
    };


    return (
        <>
            <Modal className="main-modal extend-contract-modal" visible={visible}
                   onCancel={handleCancel} width={1260}
                   title={List_work}
                   destroyOnClose={true}
                   footer={[
                       <>

                           <Button className="cancel-button mr-3" onClick={handleCancel}>
                               Huỷ
                           </Button>
                           <Button className="normal-button ml-3" onClick={handleCancel}>
                               Lưu
                           </Button>
                       </>
                   ]}
            >
                <div className="body-media">
                    <LibMedia showContract={visible}/>
                </div>

            </Modal>
        </>
    )
};

export default ModalMediaContract