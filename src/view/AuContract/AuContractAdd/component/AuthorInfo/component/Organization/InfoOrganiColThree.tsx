import React from "react";
import { Form, Input } from "antd";
import { useTranslate } from "@hook/useTranslate";
import { aucontractTranslateKey } from "@translateKey/index";
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import UilEyeSlash from '@iconscout/react-unicons/icons/uil-eye-slash';
import { useSelector } from "react-redux";
import { RootState } from "@modules/core/store/redux";

const InfoOrganiColThree = props => {
    const { User_name, Pass_word, Address, Email, Phone } = useTranslate("aucontractTranslateKey");
    const autoComplete = useSelector((state: RootState) => state.auContractStore.autoComplete);
    return (
        <>

            <Form.Item label={Address} name={`personAddress`} >
                <Input.TextArea disabled={autoComplete} autoComplete={"off"} autoSize={{ minRows: 6, maxRows: 6 }} />
            </Form.Item>
            <Form.Item label={Phone} name={`authorizedRepresentationPhoneNumber`}
            >
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>
            <Form.Item label={Email} required name={`authorizedRepresentationEmail`} rules={[{
                type: 'email',
                message: 'The input is not valid E-mail!',
            },]}>
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>
            <Form.Item label={User_name} required name={`authorizedRepresentationUsername`}
                rules={[{ required: true, message: "This field is required!" }]}
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


        </>
    )
};

export default InfoOrganiColThree