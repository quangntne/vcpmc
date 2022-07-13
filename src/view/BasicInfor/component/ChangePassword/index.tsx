import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import authenticationPresenter from '@modules/authentication/presenter';
import { validateMessages } from '@view/shared/helper/functions';
import { useAsync } from '@view/shared/hook/useAsync';
import { useTranslate } from '@view/shared/hook/useTranslate';
import { basicInforTranslateKey } from '@view/shared/translateKey';
import { Form, Input, message } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import './style.scss';

const ModalChangePassword = (props) => {
    const [form] = Form.useForm();

    const { TITLE_CHANGE_PASS, OLD_PASS, NEW_PASS, REPASS, CANCEL, SAVE, CHECK_REPASS } = useTranslate("basicInforTranslateKey");

    const { updatePass } = authenticationPresenter;

    const [updatePassword] = useAsync(updatePass)

    const handleUpdatePassword = () => {
        form.submit()
    }

    const submitFormChangePass = pass => {
        const value = {
            "userPassword": pass.userPassword,
            "userNewPassword": pass.userNewPassword
          }
        updatePassword.execute(value).then(
            res => {
                message.success({
                    content: 'Đổi mật khẩu thành công!',
                    style: {
                      marginTop: '85vh',
                    },

                  });
                handleCancelModalChangePass()
            }
        )
        .catch(
            err =>{
                message.error({
                    content: 'Đổi mật khẩu thất bại!',
                    style: {
                      marginTop: '85vh',
                    },

                  });
                handleCancelModalChangePass()
            }
        )

    }

    const handleCancelModalChangePass = () => {
        props.setIsModalChangePassword(!props.isModalChangePassword)
    }

    return (
        <>
            <Modal title={TITLE_CHANGE_PASS} visible={props.isModalChangePassword}
                onOk={handleUpdatePassword}
                onCancel={handleCancelModalChangePass}
                okText={SAVE}
                cancelText={CANCEL}
                className='label-modal-changepassword'
            >
                <Form
                    autoComplete='false'
                    form={form}
                    name="formChangePassword"
                    onFinish={submitFormChangePass}
                    scrollToFirstError
                    id="formChangePassword"
                    layout="vertical"
                    validateMessages={validateMessages()}
                    className='container quang-tran-form'
                >
                    <Form.Item
                        name='userPassword'
                        label={OLD_PASS}
                        rules={[{ required: true }]}>
                        <Input.Password iconRender={(visible) => (visible ? <EyeInvisibleOutlined /> : <EyeOutlined />)} />
                    </Form.Item>
                    <Form.Item
                        name='userNewPassword'
                        label={NEW_PASS}
                        rules={[{ required: true }]}>
                        <Input.Password iconRender={(visible) => (visible ? <EyeInvisibleOutlined /> : <EyeOutlined />)} />
                    </Form.Item>
                    <Form.Item
                        name='confirmPassword'
                        label={REPASS}
                        rules={[
                            {
                                required: true,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('userNewPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(CHECK_REPASS));
                                },
                            }),
                        ]}
                    >
                        <Input.Password iconRender={(visible) => (visible ? <EyeInvisibleOutlined /> : <EyeOutlined />)} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ModalChangePassword
