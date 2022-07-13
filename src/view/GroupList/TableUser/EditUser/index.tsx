import listGroupPresenter from '@modules/listGroup/presenter';
import User from '@modules/user/entity';
import userPresenter from '@modules/user/presenter';
import MainTitleComponent from '@view/shared/components/MainTitleComponent';
import { validateMessages } from '@view/shared/helper/functions';
import { useAsync } from '@view/shared/hook/useAsync';
import { useTranslate } from '@view/shared/hook/useTranslate';
import { common, groupList } from '@view/shared/translateKey';
import { Row, Form, Col, Input, Button, Select, Radio } from 'antd';
import React from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router';
import './style.scss';

const EditUser = () => {

    const history = useHistory()
    const { idGroup, idUser } = useParams<any>();
    const [form] = Form.useForm();
    //state
    const [groupName, setGroupName] = React.useState('');
    const [user, setUser] = React.useState<User>();
    console.log('user', user);

    const { getGroupById } = listGroupPresenter;
    const { getUserById } = userPresenter;

    const [getGroup, getUser] = useAsync(getGroupById, getUserById);

    const { EDIT_USER,
        USER_NAME,
        NAME_USER,
        EMAIL,
        PASSWORD,
        CONFIRM_PASSWORD,
        ROLE, STATUS_USER, NOTE_RED_POINT, CANCEL, SAVE, ACTIVE_USER, DEACTIVE
    } = useTranslate("groupList");
    const { LIST_UNITS_USED, LIST_USER } = useTranslate("common");

    const data = [
        {
            name: LIST_UNITS_USED,
            href: "/list-used-unit",
        },
        {
            name: `${LIST_USER} ${groupName}`,
            href: `/list-used-unit/${idGroup}/used-unit`,
        },
        {
            name: EDIT_USER
        }
    ];

    React.useEffect(() => {
        if (user) {
            form.setFieldsValue({
                'name': user.userName,
                'userName': user.userEmail,
                'email': user.userEmail,
                'role': 'Adminstrater',
                "statusUser": true
            })
        }
    }, [user])

    React.useEffect(() => {
        getGroup.execute(idGroup).then(res => {
            setGroupName(res.groupName)
        })
        getUser.execute(idUser).then(res => {
            setUser(res);
        })
    }, []);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
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
                title={EDIT_USER}
                classBreadcumb={null}
                classTitle={'mt-3 mb-3'}
            />
            <Form
                {...layout}
                autoComplete='false'
                form={form}
                name="formBasicInfor"
                // onFinish={handleOk}
                scrollToFirstError
                id="formBasicInfor"
                validateMessages={validateMessages()}
                className='mt-5 quang-tran-form form-edit-user'
            >
                <Row>
                    <Col lg={12} sm={24} xs={24}>
                        <Form.Item
                            key='name'
                            name='name'
                            label={USER_NAME}
                            rules={[{ required: true }]}>
                            <Input className='label-input-edit' />
                        </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                        <Form.Item
                            key='userName'
                            name='userName'
                            label={NAME_USER}
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
                            label={PASSWORD}
                            rules={[{ required: true }]}>
                            <Input.Password className='label-input-edit'
                                iconRender={(visible) => (visible ? <EyeInvisibleOutlined /> : <EyeOutlined />)}
                            />
                        </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                        <Form.Item
                            key='role'
                            name='role'
                            label={ROLE}
                            rules={[{ required: true }]}>
                            <Select className='label-input-edit' onChange={handleChange}>
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
                            key='repass'
                            name='repass'
                            label={CONFIRM_PASSWORD}
                            rules={[{ required: true }]}>
                            <Input.Password
                                iconRender={(visible) => (visible ? <EyeInvisibleOutlined /> : <EyeOutlined />)}
                                className='label-input-edit' />
                        </Form.Item>
                    </Col>
                    <Col lg={12} sm={0} xs={0}>
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
                                history.push(`/list-used-unit/${idGroup}/used-unit/${idUser}/view-user`)
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

export default EditUser
