import React from "react";
import { DatePicker, Form, Input, Radio, Select } from "antd";
import { useTranslate } from "@hook/useTranslate";
import { aucontractTranslateKey } from "@translateKey/index";
import moment from "moment";
import UilCalendarAlt from '@iconscout/react-unicons/icons/uil-calendar-alt';
import { useSelector } from "react-redux";
import { RootState } from "@modules/core/store/redux";

const { Option } = Select;

const InfoOrganiColTwo = props => {
    const autoComplete = useSelector((state: RootState) => state.auContractStore.autoComplete);
    const {
        Representatives, BirthDay, Position, ID, Place_issuance, Date_issued, Nationality, Gender, Male,
        Female
    } = useTranslate("aucontractTranslateKey");
    return (
        <>
            <Form.Item label={Representatives} required name={`personName`}
                rules={[{ required: true, message: "This field is required!" }]}
            >
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>
            <Form.Item label={Position} name={`personTitle`}
            >
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>
            <Form.Item label={BirthDay} required name={`personBirthDate`}
                rules={[{ required: true, message: "This field is required!" }, () => ({
                    validator(_, value) {
                        const year = moment(moment(new Date())).diff(value, "year");
                        if (year >= 18) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error("Bạn chưa đủ tuổi!!!"));
                    },
                })]}
            >
                <DatePicker disabled={autoComplete} format={"DD/MM/YYYY"} placeholder={`dd/mm/yyyy`} suffixIcon={[<><UilCalendarAlt size={18} color={"#FF7506"} /></>]} />
            </Form.Item>
            <Form.Item label={Gender} required name={`personGender`}
                rules={[{ required: true, message: "This field is required!" }]}
            >
                <Radio.Group disabled={autoComplete}>
                    <Radio value={0}>{Male}</Radio>
                    <Radio value={1}>{Female}</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label={ID} required name={`personIdentify`}
                rules={[{ required: true, message: "This field is required!" }]}
            >
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>
            <Form.Item label={Date_issued} required name={`personIdentifiIssuanceDate`}
                rules={[{ required: true, message: "This field is required!" }]}
            >
                <DatePicker disabled={autoComplete} format={"DD/MM/YYYY"} placeholder={`dd/mm/yyyy`} suffixIcon={[<><UilCalendarAlt size={18} color={"#FF7506"} /></>]} />
            </Form.Item>
            <Form.Item label={Place_issuance} required
                rules={[{ required: true, message: "This field is required!" }]} name={`personIdentifiIssuancePlace`}>
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>
            <Form.Item label={Nationality} required
                rules={[{ required: true, message: "This field is required!" }]} name={`personNationality`}>
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>
        </>
    )
};

export default InfoOrganiColTwo