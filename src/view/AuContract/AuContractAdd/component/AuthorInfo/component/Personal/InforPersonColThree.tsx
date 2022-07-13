import React, { useEffect } from "react";
import { useTranslate } from "@hook/useTranslate";
import { Form, Input } from "antd";
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import UilEyeSlash from '@iconscout/react-unicons/icons/uil-eye-slash';
import { useSelector } from "react-redux";
import { RootState } from "@store/redux";


const InfoPersonalColThree = ({ form }) => {
    const {
        User_name, Pass_word, Bank_name,
        Account_number, Email,
    } = useTranslate("aucontractTranslateKey");
    const autoComplete = useSelector((state: RootState) => state.auContractStore.autoComplete);

    return (
        <>
            <Form.Item label={Email} required name={`authorizedRepresentationEmail`} rules={[{
                type: 'email',
                required: true,
                message: 'The input is not valid E-mail!',
            },]}>
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>
            <Form.Item label={User_name} required name={`authorizedRepresentationUsername`}
                rules={[{ type: 'email', required: true, message: 'The input is not valid E-mail!', }]}
            >
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>
            <Form.Item label={Pass_word} required name={`personPassword`}
                rules={[{ required: true, message: "This field is required!" }]}
            >
                <Input.Password
                    disabled={autoComplete}
                    iconRender={(visible) => (visible ? <UilEyeSlash size={18} color={"#FF7506"} /> : <UilEye size={18} color={"#FF7506"} />)} />
            </Form.Item>

            <Form.Item label={Account_number} required name={`authorizedRepresentationBankNumber`}
                rules={[{ required: true, message: "This field is required!" }]}
            >
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>
            <Form.Item label={Bank_name} required name={`authorizedRepresentationBankName`}
                rules={[{ required: true, message: "This field is required!" }]}
            >
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>
        </>
    )
};

export default InfoPersonalColThree