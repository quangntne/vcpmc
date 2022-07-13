import React, { useEffect, useState } from 'react'
import MainTitleComponent from '@view/shared/components/MainTitleComponent';
import { useTranslate } from '@view/shared/hook/useTranslate'
import { settingTranslateKey } from '@view/shared/translateKey'
import { Button, Col, Input, Form, Radio, Row, Tabs, DatePicker, InputNumber } from 'antd';

import moment from 'moment';
import ControlByQuater from './ControlByQuater';
import ControlByMonth from './ControlByMonth';
import settingRepository from "@modules/setting/repository"

import "./styles.scss"
import { useAsync } from '@view/shared/hook/useAsync';

interface Props {

}
const { TabPane } = Tabs
const Setting = (props: Props) => {
    const [form] = Form.useForm();
    const { getSettingSystem } = settingRepository;
    const [{ execute: getSettingSystemAsync, value: dataSetting }] = useAsync(getSettingSystem)
    const { SETTING, CONFIGURATION, CONTRACT_MANAGEMENT, SYSTEM_USER, ARTWORK_INFO } = useTranslate("settingTranslateKey");
    const [edit, setEdit] = useState(false)
    const [dateExpired, setDateExpried] = useState(10)
    const breadcrumbs = [
        {
            name: SETTING,
            href: undefined
        }
    ]
    const radioStyle = {
        display: 'block',
    };


    useEffect(() => {
        getSettingSystemAsync().then((res) => {
            if (res) {
                form.setFieldsValue({
                    type: res.type
                })
            }
        })
    }, [])
    const handleCancel = (reset) => {

        if (reset) {
            getSettingSystemAsync().then((res) => {
                if (res) {
                    form.setFieldsValue({
                        type: res.type
                    })
                }
            })
        } else {
            form.setFieldsValue({ type: dataSetting.type });
        }
        setEdit(false)
    }
    return (
        <div className="setting">
            <MainTitleComponent breadcrumbs={breadcrumbs} title={SETTING} />

            <Form className="main-form" form={form} >
                {<Col className="text-right" span={24}>
                    <Button style={{ opacity: edit ? 0 : 1 }} onClick={() => setEdit(true)} className="normal-button">Chỉnh sửa</Button>
                </Col>}
                <Form.Item label={"Thông tin tác phẩm"}>
                    <Row gutter={[15, 15]} align={"middle"}>
                        <Col>Tác phẩm được cảnh báo trước thời gian hết hạn</Col>
                        <Col span={edit ? 2 : undefined}>
                            {
                                edit ? <Form.Item name={"dateExpired"} className="mb-0" initialValue={dateExpired}><InputNumber min={1} max={31} /></Form.Item> :
                                    <span className="value">{dateExpired}</span>
                            }
                        </Col>
                        <Col> ngày</Col>
                    </Row>
                </Form.Item>
                <Form.Item label={"Chu Kỳ đối soát"} shouldUpdate={(prevValues, curValues) => prevValues.radioButton !== curValues.radioButton} >
                    <Row gutter={[15, 15]} align={"stretch"} >

                        <Col span={8}>
                            {edit ?
                                <Form.Item name={"type"}>
                                    <Radio.Group disabled={!edit}>
                                        <Row gutter={[15, 30]}  >
                                            <Col span={24}><Radio style={radioStyle} value={1}>Đối soát theo tháng</Radio></Col>
                                            <Col span={24}><Radio style={radioStyle} value={0}>Đối soát theo quý</Radio></Col>
                                        </Row>
                                    </Radio.Group>
                                </Form.Item> :
                                <Row gutter={[15, 30]}  >
                                    <Col span={24}>{<i className={`mr-2 fa fa-check color-yellow ${dataSetting?.type !== 1 && "opacity-0"}`} />} Đối soát theo tháng</Col>
                                    <Col span={24}>{<i className={`mr-2 fa fa-check color-yellow ${dataSetting?.type !== 0 && "opacity-0"}`} />} Đối soát theo quý</Col>
                                </Row>
                            }
                        </Col>
                        <Col span={16}>
                            {/* <Row align={"bottom"} className="h-100"> */}
                            <Form.Item className="w-100" shouldUpdate={(prevValues, curValues) => prevValues.type !== curValues.type} >
                                {() => <Row gutter={[15, 30]} align={"middle"}> {form.getFieldValue("type") === 0 ?
                                    <ControlByQuater onCancel={(reset) => handleCancel(reset)}
                                        isEdit={edit} data={dataSetting?.type == 0 ? dataSetting?.value : null} span={24} /> :
                                    <ControlByMonth onCancel={(reset) => handleCancel(reset)}
                                        isEdit={edit} span={24} dateCollect={
                                            dataSetting?.type == 1 ? dataSetting?.value : null
                                        } />
                                }
                                </Row>

                                }
                            </Form.Item>
                            {/* </Row> */}

                        </Col>

                    </Row>
                </Form.Item>
            </Form>

        </div>
    )
}

export default Setting
