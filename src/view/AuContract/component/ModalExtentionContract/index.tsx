import React, { useState, useEffect } from "react";
import { Button, Checkbox, Col, DatePicker, Divider, Form, Input, Modal, Row } from "antd";
import "../../AuContractAdd/styles.scss";
import Upload from "@view/shared/components/Upload";
import RoyaltiesComp from "@view/AuContract/component/RoyaltiesComponent";
import UilCalendarAlt from '@iconscout/react-unicons/icons/uil-calendar-alt';
import * as moment from "moment";
import auContractPresenter from "@modules/aucontract/presenter";
import { useAsync } from "@view/shared/hook/useAsync";



const ModalExtensionContract = props => {
    const [form] = Form.useForm();
    const { visible, handleCancel, dataResponse } = props;
    const { extendAuContract } = auContractPresenter;
    const [{ execute: extend }] = useAsync(extendAuContract);
    //state
    const [day, setDay] = useState<any>({
        start: null,
        end: null,
        duration: null,
    });
    useEffect(() => {
        setDay({ ...day, start: dataResponse?.authorizedContractStart })
    }, [dataResponse]);

    const handleSubmit = () => {
        form.submit();
    };

    const handleCancelModal = () => {
        handleCancel();
    };

    const handleFinishForm = values => {
        const formatValue = Object.assign(values, { authorizedContractAttachments: dataResponse?.authorizedContractAttachments })
        extend(formatValue, dataResponse?.authorizedContractId).then(res => {
            console.log('res', res);
        }).catch(err => {
            console.log('err', err);
        })
    };

    const disabledDateEnd = (current) => {
        console.log('day', day);

        if (day.start) {
            return current && current < moment(day.start).startOf("day");
        }
    };


    return (
        <>
            <Modal width={800} visible={visible} onCancel={handleCancel}
                className="main-modal extend-contract-modal contract-add" title={`Gia hạn uỷ quyền tác phẩm`}
                footer={[
                    <>
                        <div className="text-center">

                            <Button className="cancel-button mr-3" onClick={handleCancelModal}>
                                Huỷ
                               </Button>
                            <Button className="normal-button ml-3" onClick={handleSubmit}>
                                Lưu
                               </Button>
                        </div>
                    </>
                ]}
            >
                <Form form={form} id="div-main-form" className="modal-extension" onFinish={handleFinishForm}
                    initialValues={{
                        copyrightPercent: dataResponse?.copyrightPercent,
                        performPercent: dataResponse?.performPercent,
                        producerPercent: dataResponse?.producerPercent
                    }}
                >
                    <Row gutter={24}>
                        <Col span={10}>
                            <Form.Item label={`Thời gian gia hạn`} required />
                            <div className="mb-3 mt-2"><span className="text-white">Từ ngày: </span> <span
                                className="text-white">{moment(dataResponse?.authorizedContractStart).format("DD/MM/YYYY")}</span></div>
                            <Form.Item name={`authorizedContractEnd`} label={`Đến ngày`} required>
                                <DatePicker
                                    format={"DD/MM/YYYY"}
                                    disabledDate={disabledDateEnd}
                                    onChange={(time, timeString) =>
                                        setDay((prev) => ({ ...prev, end: time ? time : null }))
                                    }
                                    suffixIcon={[<><UilCalendarAlt size={18} color={"#FF7506"} /></>]}
                                />
                            </Form.Item>
                            <small className="modal-extension-note">
                                Lưu ý: Thời gian bắt đầu gia hạn hợp đồng mới được tính sau ngày hết hạn hợp đồng cũ một
                                ngày.
                            </small>
                        </Col>
                        <Col span={13} push={2}>
                            <Form.Item label={`Mức nhuận bút`} required />
                            <RoyaltiesComp />
                        </Col>
                    </Row>
                    <Form.Item wrapperCol={{ span: 8 }} name={`attachmentFiles`} label={`Đính kèm tệp`} className="mt-5">
                        <Upload
                            title={`Tải lên`}
                            accept={".doc,.docx,.pdf"}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};

export default ModalExtensionContract