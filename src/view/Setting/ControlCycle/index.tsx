import React, { useEffect, useState } from 'react';
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import RightMenu, { IArrayAction } from "@view/shared/components/layout/RightMenu";
import { Row, Col, Radio, DatePicker, Button } from 'antd';
import ContentComponent from "@view/shared/components/ContentComponent";
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@modules/core/store/redux';
import { fetchSettingControl } from '@modules/setting/settingStore';
import moment from "moment";
import { useTranslate } from '@view/shared/hook/useTranslate';
import * as Unicons from '@iconscout/react-unicons';

const ControlCycle = () => {
    const setting = useTranslate("settingTranslateKey");
    const dispatch = useDispatch();
    const settingControl = useSelector((state: RootState) => state.settingStore.settingControl.checkBy);
    const startDay = useSelector((state: RootState) => state.settingStore.settingControl.startDate);
    const endDay = useSelector((state: RootState) => state.settingStore.settingControl.endDate);
    //state
    const [dataSetting, setDataSetting] = useState<any>({
        checkBy: settingControl,
        startDate: "",
        endDate: ""
    });
    const [checkEdit, setCheckEdit] = useState<boolean>(true);

    useEffect(() => {
        if (startDay !== "" && endDay !== "") {
            setDataSetting({
                ...dataSetting, startDate: moment(startDay), endDate: moment(endDay)
            })
        }
    }, [startDay, endDay])

    useEffect(() => {
        if (dataSetting.checkBy !== settingControl) {
            setCheckEdit(false)
        } else {
            setCheckEdit(true)
        }
    }, [dataSetting])

    const data = [
        {
            name: setting.SETTING,
            href: '/infor-work'
        },
        {
            name: setting.ARTWORK_INFO,
        }
    ];

    const onChangeSettingControl = (value) => {
        setDataSetting({ ...dataSetting, checkBy: value.target.value })
    }

    const onchangeStarDay = (value) => {
        setDataSetting({ ...dataSetting, startDate: value })
    }
    const onchangeEndDay = (value) => {
        setDataSetting({ ...dataSetting, endDate: value })
    }

    const onClickSave = () => {
        dispatch(fetchSettingControl(
            { settingControl: dataSetting }
        ))
    }

    return (
        <div className="w-100 quang-tran-form">
            <MainTitleComponent
                breadcrumbs={data}
                title={setting.SETTING}
                classBreadcumb={null}
                classTitle={null}
            />
            <div className="label-div-setting">
                <div><label>{setting.SET_CONTROL}</label></div>
                <Radio.Group className='radio-eidt w-100' value={dataSetting.checkBy} onChange={value => onChangeSettingControl(value)}>
                    <div>
                        <Radio value={0}><label>{setting.QUATERLY_CONTROL}</label>
                        </Radio>
                        {
                            dataSetting.checkBy === 0 && (
                                <Row className='ml-5'>
                                    <Col lg={6} sm={12} xs={12}>
                                        <ContentComponent className="label-content mt-3" label={`${setting.QUARTER}1`} text="01/06 - 30/07" />
                                        <ContentComponent className="label-content mt-3" label={`${setting.QUARTER}2`} text="01/08 - 30/09" />
                                        <ContentComponent className="label-content mt-3" label={`${setting.QUARTER}3`} text="01/10 - 30/11" />
                                        <ContentComponent className="label-content mt-3" label={`${setting.QUARTER}4`} text="01/12 - 31/12" />
                                    </Col>
                                </Row>
                            )
                        }
                    </div>
                    <div>
                        <Radio value={1}><label className='mb-3'>{setting.MONTH_CONTROL}</label>
                        </Radio>
                    </div>
                    <div>
                        {
                            dataSetting.checkBy === 1 && (
                                <Row className='d-flex mt-5'>
                                    <Col className='d-flex' lg={12} sm={12} xs={12}>
                                        <label className='label-date mr-5'>{setting.START_DAY}:</label>
                                        <DatePicker value={dataSetting.startDate} className='label-datepicker-setting'
                                            format='DD/MM/YYYY' onChange={value => onchangeStarDay(value)}
                                            suffixIcon={<Unicons.UilCalendarAlt size="27" className="icon-feather" />} />
                                    </Col>
                                    <Col className='d-flex' lg={12} sm={12} xs={12}>
                                        <label className='label-date mr-5'>{setting.END_DAY}:</label>
                                        <DatePicker value={dataSetting.endDate} className='label-datepicker-setting'
                                            format='DD/MM/YYYY' onChange={value => onchangeEndDay(value)}
                                            suffixIcon={<Unicons.UilCalendarAlt size="27" className="icon-feather" />} />
                                    </Col>
                                </Row>
                            )
                        }
                    </div>
                </Radio.Group>
            </div>

            <Row>
                <Col lg={24} sm={24} xs={24}>
                    <div className='text-center mt-5'>
                        <div className={checkEdit === true ? 'label-disable-button' : ''}>
                            <Button onClick={onClickSave} disabled={checkEdit} type="primary" className='btn-save-form' htmlType='submit'>
                                {setting.SAVE}
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ControlCycle;
