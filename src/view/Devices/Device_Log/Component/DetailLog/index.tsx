import React from "react";
import {Modal, Table} from "antd";
import * as moment from "moment";
import {useTranslate} from "@hook/useTranslate";
import {deviceTranslateKey} from "@translateKey/index";

const ModalDetailLog = props => {
    const {visible, data, handleCancel} = props;
    const { New, Old, Field, Detail_Log} = useTranslate("deviceTranslateKey");
    const columns = [
        {
            title: Field,
            key: "field",
            dataIndex: "field",
        },
        {
            title: New,
            key: "NewValue",
            dataIndex: "NewValue",
            render: text =><span>{moment(text).format("DD/MM/YYYY")}</span>
        },
        {
            title: Old,
            key: "OldValue",
            dataIndex: "OldValue",
            render: text =><span>{moment(text).format("DD/MM/YYYY")}</span>
        },
    ];
    return(
        <>
            <Modal className="main-modal" visible={visible} footer={null}
                   title={Detail_Log} onCancel={handleCancel} width={700}>
                <Table className="main-table" columns={columns} dataSource={data}/>
            </Modal>
        </>
    )
};

export default ModalDetailLog