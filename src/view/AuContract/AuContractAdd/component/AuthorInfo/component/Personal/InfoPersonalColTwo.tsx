import React, { useEffect } from "react"
import { DatePicker, Form, Input } from "antd";
import { useTranslate } from "@hook/useTranslate";
import UilCalendarAlt from '@iconscout/react-unicons/icons/uil-calendar-alt';
import { useSelector } from "react-redux";
import { RootState } from "@store/redux";
import moment from "moment";

const InfoPersonalColTwo = ({ form }) => {
    const { Tax_Code, ID, Place_issuance, Date_issued, Address } = useTranslate("aucontractTranslateKey");

    const autoComplete = useSelector((state: RootState) => state.auContractStore.autoComplete);
    return (
        <>
            <Form.Item label={ID} required name={`personIdentify`}
                rules={[{ required: true, message: "This field is required!" }]}
            >
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>
            <Form.Item label={Date_issued} required name={`personIdentifiIssuanceDate`}
                rules={[{ required: true, message: "This field is required!" }]}
            >

                <DatePicker disabled={autoComplete} format={"DD/MM/YYYY"}
                    placeholder={`dd/mm/yyyy`} suffixIcon={[<><UilCalendarAlt size={18} color={"#FF7506"} /></>]} />
            </Form.Item>
            <Form.Item label={Place_issuance} required name={`personIdentifiIssuancePlace`}
                rules={[{ required: true, message: "This field is required!" }]}
            >
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>
            <Form.Item label={Tax_Code} required name={`authorizedRepresentationTaxNumber`}
                rules={[{ required: true, message: "This field is required!" }]}
            >
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>

            <Form.Item label={Address} required name={`personAddress`}
                rules={[{ required: true, message: "This field is required!" }]}
            >
                <Input.TextArea disabled={autoComplete} autoComplete={"off"} autoSize={{ minRows: 4, maxRows: 4 }} />
            </Form.Item>
        </>
    )
};

export default InfoPersonalColTwo