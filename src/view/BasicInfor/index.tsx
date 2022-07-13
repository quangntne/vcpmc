import { CameraOutlined } from '@ant-design/icons'
import authenticationPresenter from '@modules/authentication/presenter';
import User from '@modules/user/entity';
import RightMenu, { IArrayAction } from '@view/shared/components/layout/RightMenu';
import TitleComponent from '@view/shared/components/MainTitleComponent/TitleComponent'
import { validateMessages } from '@view/shared/helper/functions';
import { Col, Input, Row, Form, DatePicker, Button } from 'antd'
import ModalChangePassword from './component/ChangePassword'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import './style.scss';
import store, { RootState } from '@modules/core/store/redux';
import { removeProfile } from '@modules/authentication/profileStore';
import profileStore from '@modules/authentication/profileStore';
import { useHistory } from 'react-router';
import { useTranslate } from '@view/shared/hook/useTranslate';
import { basicInforTranslateKey } from '@view/shared/translateKey';
import ModalUploadAvatar from '@view/shared/components/layout/Header/ModalUploadAvatar';
import { useAsync } from '@view/shared/hook/useAsync';
import { useDispatch, useSelector } from 'react-redux';
import MessageComponent from '@view/shared/components/MessageComponent';
import * as Unicons from '@iconscout/react-unicons';
// import profileStore from '@modules/listGroup/profileStore';

const BasicInfor = () => {
    const dispatch = useDispatch();
    const { profile } = useSelector((state: RootState) => ({ profile: state.profile.user }))
    const [form] = Form.useForm();
    const ViewModal = {
        readOnly: true,
    }
    const history = useHistory()
    const [isEdit, setIsEdit] = React.useState<boolean>(false);
    const [isModalChangePassword, setIsModalChangePassword] = React.useState(false);
    const [visibleAvatar, setVisibleAvatar] = useState<boolean>(false);

    const [imgUrl, setImgUrl] = useState<any>("");
    console.log(imgUrl, "imgUrl");

    const [upload, updatePersonalInfor] = useAsync(authenticationPresenter.uploadAvatar, authenticationPresenter.updatePersonalInfor);

    const { CHANGE_INFOR, CHANGE_PASS, LOG_OUT, BASIC_INFOR
        , DOB, PHONE, EMAIL, USER_NAME, ROLE, CANCEL, SAVE, FULL_NAME } = useTranslate("basicInforTranslateKey");

    const arrayActionRight: IArrayAction[] = [
        {
            iconType: "edit",
            name: CHANGE_INFOR,
            handleAction: () => {
                setIsEdit(true);
            },
        },
        {
            iconType: "lock",
            name: CHANGE_PASS,
            handleAction: () => {
                setIsModalChangePassword(true);
            },
        },
        {
            iconType: "logout",
            name: LOG_OUT,
            handleAction: () => {
                logoutUser()
            },
        },
    ];

    useEffect(() => {
        form.setFieldsValue({
            'name': profile?.userFullName,
            'dateofbirth': moment(profile?.userDayOfBirth),
            'phone': profile?.userPhoneNumber,
            'email': profile?.userEmail,
            'usename': profile?.userName,
            'role': profile?.role ? profile?.role : 'Admin'
        })
        setImgUrl(profile?.userAvatar)
    }, [profile]);

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    };
    const logoutUser = () => {
        // authenticationPresenter.logout().then((res) => {
        //     authenticationPresenter.removeToken();
        //     store.dispatch(removeProfile());
        //     history.push("/login");
        // });
        store.dispatch(removeProfile());
        dispatch(profileStore.actions.logOut());
        history.push("/login");
    };
    const onClickCancelEdit = () => {
        setIsEdit(false)
        form.setFieldsValue({
            'name': profile?.userFullName,
            'dateofbirth': moment(profile?.userDayOfBirth),
            'phone': profile?.userPhoneNumber,
        })
        setImgUrl(profile?.userAvatar)
    }

    const handleOk = value => {
        console.log('value', value);
        const formatData = {
            UserDayOfBirth: value?.dateofbirth,
            UserAvatar: imgUrl,
            UserFullName: value?.name,
            UserPhoneNumber: value?.phone
        }
        updatePersonalInfor.execute(formatData).then(res => {
            setIsEdit(false);
            dispatch(profileStore.actions.fetchProfile(res))

        }).catch(err => {
            console.log('err', err);
        })
        // if (imgUrl != profile?.userAvatar) {
        //     const formUploadImage = new FormData();
        //     formUploadImage.append("Image", imgUrl);
        //     console.log('value', value);
        //     console.log('value', formUploadImage, 'imgUrl', imgUrl);
        //     upload.execute(formUploadImage).then(res => {
        //         console.log(res);
        //     })
        // }
    }

    return (
        <>
            <div className='mb-5'>
                <TitleComponent title={BASIC_INFOR} />
            </div>
            <div>
                <Form
                    {...layout}
                    autoComplete='false'
                    form={form}
                    name="formBasicInfor"
                    onFinish={handleOk}
                    scrollToFirstError
                    id="formBasicInfor"
                    layout="vertical"
                    validateMessages={validateMessages()}
                    className='quang-tran-form form-basic-infor'
                >
                    <Row style={{ width: '100%' }}>

                        <Col lg={7} sm={8} xs={24}>
                            <div style={{ width: 'fit-content' }}>
                                <div className="basic_infor__img">
                                    {imgUrl !== "" ? (
                                        <img alt="" className="" src={(imgUrl == null || typeof imgUrl == "string") ? imgUrl : URL.createObjectURL(imgUrl)} />
                                    ) : (
                                        <div className="header-component__dropdown-avatar">
                                            <span className="icon__avatar">
                                                <i className="fas fa-user" />
                                            </span>
                                        </div>
                                    )}


                                    <div className="icon-image">
                                        <label htmlFor="input-media">
                                            <CameraOutlined hidden={!isEdit} onClick={() => setVisibleAvatar(true)} />
                                        </label>

                                        <input
                                            hidden
                                            onChange={(e) => {
                                                const media: any = e.target.files[0]
                                                setImgUrl(media)
                                            }}
                                            placeholder="213123"
                                            type="file"
                                            id="input-media"
                                            readOnly
                                            name="input-media"
                                            accept="image/png, image/jpeg, image/jpg"
                                        />
                                    </div>
                                </div>
                                <label className='text-center mt-3 w-100'>{profile?.userFullName}</label>
                            </div>
                        </Col>
                        <Col lg={9} sm={8} xs={24}>
                            <Form.Item
                                key='name'
                                name='name'
                                label={FULL_NAME}
                                style={{ width: '95%' }}
                                rules={[{ required: true }]}
                            >
                                <Input {...(isEdit ? '' : ViewModal)} />
                            </Form.Item>
                            <Row>
                                <Col lg={12} sm={12} xs={24}>
                                    <Form.Item
                                        key='Dateofbirth'
                                        name='dateofbirth'
                                        label={DOB}
                                        rules={[{ required: true }]}
                                        className="location label-date-picker"
                                        style={{ width: '90%' }}>
                                        <DatePicker {...(isEdit ? '' : { disabled: true })} format='DD/MM/YYYY'
                                            suffixIcon={<Unicons.UilCalendarAlt size="27" className="icon-feather" />}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col lg={12} sm={12} xs={24}>
                                    <Form.Item
                                        key='phone'
                                        name='phone'
                                        label={PHONE}
                                        rules={[{ required: true }]}
                                        style={{ width: '90%' }}>
                                        <Input type='number' {...(isEdit ? '' : ViewModal)} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item
                                key='email'
                                name='email'
                                label={EMAIL}
                                className="input-readonly"
                                style={{ width: '95%' }}>
                                <Input readOnly />
                            </Form.Item>
                            <Form.Item
                                key='usename'
                                name='usename'
                                label={USER_NAME}
                                className="input-readonly"
                                style={{ width: '95%' }}>
                                <Input readOnly />
                            </Form.Item>
                            <Form.Item
                                key='role'
                                name='role'
                                label={ROLE}
                                className="input-readonly"
                                style={{ width: '45%' }}>
                                <Input readOnly />
                            </Form.Item>
                            {
                                isEdit && (
                                    <Row className='row-btn-submit'>
                                        <Col className='col-cancel' lg={12} sm={24} xs={24} >
                                            <Form.Item className='text-center'>
                                                <Button type="primary" className='label-btn-cancel' onClick={() => onClickCancelEdit()}>
                                                    {CANCEL}
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                        <Col className='col-save' lg={12} sm={24} xs={24} >
                                            <Form.Item key='submit' className='text-center' >
                                                <Button type="primary" className='label-btn-save' htmlType='submit'
                                                >
                                                    {SAVE}
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                            }
                        </Col>
                    </Row>
                </Form>
            </div>
            {
                isEdit === false && (<RightMenu arrayAction={arrayActionRight} />)
            }
            <ModalChangePassword isModalChangePassword={isModalChangePassword} setIsModalChangePassword={setIsModalChangePassword} />
        </>
    )
}

export default BasicInfor
