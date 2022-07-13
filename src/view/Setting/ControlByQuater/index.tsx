import { Button, Col, DatePicker, Row } from 'antd'
import { current } from 'immer'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import settingRepository from "@modules/setting/repository"
import { useAsync } from '@view/shared/hook/useAsync'

interface Props {
    span?: number;
    data: Array<any>;
    isEdit: boolean;
    onCancel: (reset) => void
}

const ControlByQuater = (props: Props) => {
    const { updateSettingSystem } = settingRepository;
    const [{ execute: updateSettingSystemAsyn, value, status }] = useAsync(updateSettingSystem)
    const format = "DD/MM/YYYY"
    const { span } = props;
    const [state, setState] = useState([
        {
            dateFrom: moment().quarter(1).startOf("quarter"),
            dateTo: moment().quarter(1).endOf("quarter"),
        },
        {
            dateFrom: moment().quarter(2).startOf("quarter"),
            dateTo: moment().quarter(2).endOf("quarter"),
        },
        {
            dateFrom: moment().quarter(3).startOf("quarter"),
            dateTo: moment().quarter(3).endOf("quarter"),
        },
        {
            dateFrom: moment().quarter(4).startOf("quarter"),
            dateTo: moment().quarter(4).endOf("quarter"),
        },
    ]);

    const handleChangeDateEnd = (date, dateString, index) => {
        const tempState = [...state];
        tempState[index].dateTo = date;
        tempState[index + 1].dateFrom = moment(dateString, format).add(1, "d");
        setState([...tempState])

    }
    const handleSubmit = () => {
        const payload = {
            type: 0,
            value: state
        }
        updateSettingSystemAsyn(payload).then((res) => props.onCancel(true))
    }
    const renderFormDate = (item, index) => {
        // const dateEnd = item.dateForm.add(3, "M")
        return <Row gutter={[15, 30]} justify={"center"} align="middle" className="mb-3" >
            <Col span={3}> Quý {index + 1}</Col>
            <Col span={5} style={{ textAlign: "center" }}> Từ ngày</Col>
            <Col span={5}>
                {
                    props.isEdit ?
                        <DatePicker disabled={true} format={format} value={item.dateFrom} /> :
                        <span className="value">{item.dateFrom.format(format)}</span>
                }
            </Col>
            <Col span={5} style={{ textAlign: "center" }}> đến ngày </Col>
            <Col span={5} >
                {
                    props.isEdit ?
                        <DatePicker disabled={!props.isEdit}
                            disabledDate={(currentDate) => currentDate > moment().endOf("year")}
                            onChange={(date, dateString) => handleChangeDateEnd(date, dateString, index)}
                            format={format} value={item.dateTo} /> :
                        <span className="value">{item.dateTo.format(format)}</span>
                }


            </Col>
        </Row>
    }
    const converdateToMoment = (item) => {
        const dateFrom = moment(item.dateFrom)
        const dateTo = moment(item.dateTo)
        return {
            dateFrom,
            dateTo
        }
    }
    useMemo(() => {
        if (!!props.data) {
            const newData = [...props.data]
            props.data.length > 0 && setState(newData.map(date => converdateToMoment(date)))
        }
    }, [props.data])
    const handleCancel = () => {
        if (!!props.data) {
            const newData = [...props.data]
            props.data.length > 0 && setState(newData.map(date => converdateToMoment(date)))
        }
        props.onCancel(false)
    }
    return (
        <Col span={props.span}>
            {
                state.map((item, index) => renderFormDate(item, index))
            }
            {
                props.isEdit && <Row className="my-5" gutter={[15, 15]} justify="end">

                    <Col><Button onClick={handleCancel} className="cancel-button">Cancel</Button> </Col>
                    <Col> <Button loading={status == "loading"} onClick={handleSubmit} className="normal-button">Lưu</Button></Col>
                </Row>
            }
        </Col>
    )
}

export default ControlByQuater
