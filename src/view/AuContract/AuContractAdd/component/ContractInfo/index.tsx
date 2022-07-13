import React, { useState } from "react";
import { Col, DatePicker, Form, Input, Row } from "antd";
import Upload from "@view/shared/components/Upload";
import { useTranslate } from "@hook/useTranslate";
import * as moment from "moment";
import { IDay } from "@view/BusinessContract/interface";
import { InfoCircleOutlined } from '@ant-design/icons';
import RoyaltiesComp from "@view/AuContract/component/RoyaltiesComponent";
import UilCalendarAlt from '@iconscout/react-unicons/icons/uil-calendar-alt';

const ContractInfo = ({ form }) => {
    const {
        Contract_name,
        Contract_number,
        Attachments,
        Date_Au,
        Royalties,
        Date_Au_Ex,
    } = useTranslate("aucontractTranslateKey");


    const [day, setDay] = useState<IDay>({
        start: null,
        end: null,
        duration: null,
    });

    const disabledDateStart = (current) => {
        return current && current < moment().startOf("day");
    };

    const disabledDateEnd = (current) => {
        if (day.start) {
            return current && current < moment(day.start).startOf("day");
        }
    };

    return (
        <>
            <Row gutter={24}>
                <Col span={8}>

                    <Form.Item
                        label={Contract_number}
                        name={`authorizedContractCode`}
                        required
                        rules={[{ required: true }]}

                    >
                        <Input autoComplete={"off"} />
                    </Form.Item>
                    <Form.Item
                        label={Contract_name}
                        name={`authorizedContractName`}
                        required
                        rules={[{ required: true }]}
                    >
                        <Input autoComplete={"off"} />
                    </Form.Item>
                    <Form.Item
                        label={Date_Au}
                        name={`authorizedContractStart`}
                        required
                        rules={[{ required: true }]}
                    >
                        <DatePicker
                            placeholder={`dd/mm/yyyy`}
                            format={"DD/MM/YYYY"}
                            disabledDate={disabledDateStart}
                            onChange={(time, timeString) => {
                                setDay((prev) => ({ ...prev, start: time ? time : null }));
                            }}
                            suffixIcon={[<><UilCalendarAlt size={18} color={"#FF7506"} /></>]}
                        />
                    </Form.Item>
                    <Form.Item
                        label={Date_Au_Ex}
                        name={`authorizedContractEnd`}
                        required
                        dependencies={["EffectiveAt"]}
                        rules={[{ required: true }]}
                    >
                        <DatePicker
                            placeholder={`dd/mm/yyyy`}
                            format={"DD/MM/YYYY"}
                            disabledDate={disabledDateEnd}
                            onChange={(time, timeString) =>
                                setDay((prev) => ({ ...prev, end: time ? time : null }))
                            }
                            suffixIcon={[<><UilCalendarAlt size={18} color={"#FF7506"} /></>]}
                        />
                    </Form.Item>

                </Col>

                <Col span={6} push={1}>
                    <Form.Item
                        label={Attachments}
                        name={`attachmentFiles`}
                    >
                        <Upload
                            title={`${Attachments}`}
                            accept={".doc,.docx,.pdf"}
                        />
                    </Form.Item>
                </Col>

                <Col span={8} push={3}>
                    <span className="royal-label"><InfoCircleOutlined className="mr-2"
                        style={{ fontSize: "18px" }} />{Royalties}</span>
                    <div className="mt-4" />
                    <RoyaltiesComp form={form} wrapperCol={24} />
                </Col>
            </Row>
        </>
    );
};

export default ContractInfo;