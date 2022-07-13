import listGroupPresenter from '@modules/listGroup/presenter';
import userPresenter from '@modules/user/presenter';
import RightMenu, { IArrayAction } from '@view/shared/components/layout/RightMenu';
import MainTitleComponent from '@view/shared/components/MainTitleComponent';
import { validateMessages } from '@view/shared/helper/functions';
import { useAsync } from '@view/shared/hook/useAsync';
import { useTranslate } from '@view/shared/hook/useTranslate';
import { common, groupList } from '@view/shared/translateKey';
import { Input, Form, Row, Col, Button, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

//style
import './style.scss';

const AddUser = () => {
    const history = useHistory()
    const { idGroup } = useParams<any>();
    const [form] = Form.useForm();

    //state
    const [groupName, setGroupName] = useState('')

    const { getGroupById } = listGroupPresenter;

    const [
        getGroup
    ] = useAsync(getGroupById);

    useEffect(() => {
        getGroup.execute(idGroup).then(res => {
            setGroupName(res.groupName)
        })
    }, []);

    const {
        ADD_USER,
        USER_NAME,
        NAME_USER,
        EMAIL,
        PASSWORD,
        CONFIRM_PASSWORD,
        ROLE, NOTE_RED_POINT, CANCEL, SAVE
    } = useTranslate("groupList");
    const {
        LIST_UNITS_USED,
        LIST_USER,
    } = useTranslate("common");


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
            name: ADD_USER
        }
    ];

    const layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 },
    };
    const tailLayout = {
        wrapperCol: { offset: 0 },
    };

    const onChangeRole = (value) => {
        console.log('value', value);

    }

    return (
        <div>
            <MainTitleComponent
                breadcrumbs={data}
                title={ADD_USER}
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
                className='mt-3 quang-tran-form form-view-user'
            >
                <Row>
                    <Col lg={12} sm={24} xs={24}>
                        <Form.Item
                            key='name'
                            name='name'
                            label={USER_NAME}
                            rules={[{ required: true }]}>
                            <Input className='label-input-view-user' />
                        </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                        <Form.Item
                            key='userName'
                            name='userName'
                            label={NAME_USER}
                            rules={[{ required: true }]}>
                            <Input className='label-input-view-user' />
                        </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                        <Form.Item
                            key='email'
                            name='email'
                            label={EMAIL}
                            rules={[{ required: true }]}>
                            <Input className='label-input-view-user' />
                        </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                        <Form.Item
                            key='password'
                            name='password'
                            label={PASSWORD}
                            rules={[{ required: true }]}>
                            <Input className='label-input-view-user' />
                        </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                        <Form.Item
                            key='role'
                            name='role'
                            label={ROLE}
                            rules={[{ required: true }]}>
                            <Select className='label-input-view-user' placeholder='Chọn vai trò' onChange={onChangeRole}>
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
                            key='rePass'
                            name='rePass'
                            label={CONFIRM_PASSWORD}
                            rules={[{ required: true }]}>
                            <Input className='label-input-view-user' />
                        </Form.Item>
                    </Col>
                </Row>
                <div><label><span className='point-red' /><span className='label-note'>{NOTE_RED_POINT}</span></label></div>
                <Row gutter={25}>
                    <Col lg={12} sm={24} xs={24} >
                        <Form.Item {...tailLayout} className='text-right'>
                            <Button type="primary" className='btn-cancel-form' onClick={() =>
                                history.push(`/list-used-unit/${idGroup}/used-unit`)
                            }>
                                {CANCEL}
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24} >
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

export default AddUser