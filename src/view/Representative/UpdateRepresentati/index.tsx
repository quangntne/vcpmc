import listGroupPresenter from '@modules/listGroup/presenter';
import User from '@modules/user/entity';
import userPresenter from '@modules/user/presenter';
import MainTitleComponent from '@view/shared/components/MainTitleComponent';
import NoteForm from '@view/shared/components/NoteForm';
import { validateMessages } from '@view/shared/helper/functions';
import { useAsync } from '@view/shared/hook/useAsync';
import { useTranslate } from '@view/shared/hook/useTranslate';
import { representativeTranslateKey } from '@view/shared/translateKey';
import { Row, Form, Col, Input, Button, Select, Radio } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import './style.scss';

const UpdateRepresentati = () => {

    const history = useHistory()
    const { idUser } = useParams<any>();
    const [form] = Form.useForm();
    //state
    const [groupName, setGroupName] = React.useState('');
    const [user, setUser] = React.useState<User>();
    console.log('user', user);

    const { getGroupById } = listGroupPresenter;
    const { getUserById } = userPresenter;

    // const [getGroup, getUser] = useAsync(getGroupById, getUserById);

    const { AUTHOR_PARTNER, UPDATE_AGENT_INFOR, NOTE_RED_POINT,
        NAME, USER_NAME, EMAIL, PASS, REPASS, ROLE, STATUS_USER, ACTIVE_USER, DEACTIVE, CANCEL, SAVE, PHONE
    } = useTranslate("representativeTranslateKey");


    const data = [
        {
            name: AUTHOR_PARTNER,
            href: "/au-unit",
        },
        {
            name: UPDATE_AGENT_INFOR,
        },
    ];
    const layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 },
    };
    const tailLayout = {
        wrapperCol: { offset: 0 },
    };

    const handleChange = (value) => {
        form.setFieldsValue({ 'role': value })
    }

    return (
        <div>
            <MainTitleComponent
                breadcrumbs={data}
                title={UPDATE_AGENT_INFOR}
                classBreadcumb={null}
                classTitle={'mt-3 mb-3'}
            />
            <Form
                {...layout}
                autoComplete='false'
                form={form}
                name="formedituser"
                // onFinish={handleOk}
                scrollToFirstError
                id="formedituser"
                validateMessages={validateMessages()}
                className='mt-5 quang-tran-form form-edit-user'
            >
                <Row>
                    <Col lg={12} sm={24} xs={24}>
                        <Form.Item
                            key='name'
                            name='name'
                            label={NAME}
                            rules={[{ required: true }]}>
                            <Input className='label-input-edit' />
                        </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                        <Form.Item
                            key='userName'
                            name='userName'
                            label={USER_NAME}
                            rules={[{ required: true }]}>
                            <Input className='label-input-edit' />
                        </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                        <Form.Item
                            key='email'
                            name='email'
                            label={EMAIL}
                            rules={[{ required: true }]}>
                            <Input className='label-input-edit' />
                        </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                        <Form.Item
                            key='password'
                            name='password'
                            label={PASS}
                            rules={[{ required: true }]}>
                            <Input.Password className='label-input-edit'
                                iconRender={(visible) => (visible ? <EyeInvisibleOutlined /> : <EyeOutlined />)} />
                        </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                        <Form.Item
                            key='phone'
                            name='phone'
                            label={PHONE}
                            rules={[{ required: true }]}>
                            <Input className='label-iput-phone' />
                        </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                        <Form.Item
                            key='repass'
                            name='repass'
                            label={REPASS}
                            rules={[{ required: true }]}>
                            <Input.Password className='label-input-edit'
                                iconRender={(visible) => (visible ? <EyeInvisibleOutlined /> : <EyeOutlined />)} />
                        </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                        <Form.Item
                            key='role'
                            name='role'
                            label={ROLE}
                            rules={[{ required: true }]}>
                            <Select className='label-iput-phone' onChange={handleChange}>
                                <Select.Option value="SA">Super Admin</Select.Option>
                                <Select.Option value="GA">Group Admin</Select.Option>
                                <Select.Option value="SU">Sub - user</Select.Option>
                                <Select.Option value="CM">Content manager</Select.Option>
                                <Select.Option value="QC">QC</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                        <Form.Item
                            key='statusUser'
                            name='statusUser'
                            label={STATUS_USER}
                            rules={[{ required: true }]}>
                            <Radio.Group className='radio-eidt'>
                                <Radio value={true}><label>{ACTIVE_USER}</label></Radio>
                                <Radio value={false}><label>{DEACTIVE}</label></Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <div className='mt-5 location'>
                    <label>
                        <span className='point-red' />
                        <span style={{ opacity: '0.6' }}>{NOTE_RED_POINT}</span>
                    </label>
                </div>
                <Row className='mt-3' gutter={25}>
                    <Col className='col-save' lg={12} sm={24} xs={24} >
                        <Form.Item {...tailLayout} className='text-right'>
                            <Button type="primary" className='btn-cancel-form' onClick={() =>
                                history.push('/au-unit')
                            }>
                                {CANCEL}
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col className='col-save' lg={12} sm={24} xs={24} >
                        <Form.Item {...tailLayout} key='submit'>
                            <Button type="primary" className='btn-save-form' htmlType='submit'>
                                {SAVE}
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default UpdateRepresentati
