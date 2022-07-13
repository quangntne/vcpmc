import { CheckCircleOutlined } from '@ant-design/icons';
import { message } from 'antd';
import "./style.scss";
import React, { ReactNode } from 'react';
import { translate } from '@view/shared/hook/useTranslate';

interface IMessage {
    typeMessage: "success" | "error" | "warning",
    content?: string,
    className?: string | 'label-custom-message',
    duration?: number,
    style?: any,
    language: string
};

const MessageComponent = (props?: IMessage) => {
    let content = "You didn't translate in serverTranslateKey yet";
    content = translate("serverTranslateKey", props?.content, props?.language);
    message[props?.typeMessage]({
        content: content,
        className: props?.className,
        icon: props?.typeMessage === 'success' && <CheckCircleOutlined />,
        duration: props?.duration ? props?.duration : 1.8,
        style: { marginTop: '85vh' }
    });
}

export default MessageComponent;
