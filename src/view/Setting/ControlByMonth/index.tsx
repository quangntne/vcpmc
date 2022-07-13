import { Button, Col, DatePicker, Row, Select } from 'antd'
import { current } from 'immer';
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import settingRepository from "@modules/setting/repository"
import { useAsync } from '@view/shared/hook/useAsync';

interface Props {
    span?: number;
    dateCollect: number;
    isEdit: boolean;
    onCancel: (type) => void
}
const dateCollect = [];
for (let i = 1; i <= 31; i++) {
    dateCollect.push(i.toString().padStart(2, "0"))
}
const ControlByMonth = (props: Props) => {

    const { updateSettingSystem } = settingRepository;
    const [{ execute: updateSettingSystemAsyn, value, status }] = useAsync(updateSettingSystem)
    const [state, setState] = useState("01")

    const handleChangeSelect = (value) => {
        setState(value)
    }
    useMemo(() => {
        if (props.dateCollect) {
            setState(props.dateCollect + "")
        }

    }, [props.dateCollect])
    const handleSubmit = () => {
        const payload = {
            type: 1,
            value: state
        }
        updateSettingSystemAsyn(payload).then((res) => props.onCancel(true))
    }
    const handleCancel = () => {
        if (props.dateCollect) {
            setState(props.dateCollect + "")
        }
        props.onCancel(false)
    }
    return (
        <>

            <Col span={3} style={{ textAlign: "center" }}> Ngày bắt đầu</Col>
            {!props.isEdit ? <Col span={6}> <span className="value">{state}</span></Col> :
                <Col span={6}> <Select disabled={!props.isEdit} value={state} onChange={handleChangeSelect}>
                    {
                        dateCollect.map((i) => {
                            return <Select.Option value={i}>
                                {i}
                            </Select.Option>
                        })
                    }
                </Select>
                </Col>

            }


            <Col span={24}>
                {
                    props.isEdit && <Row className="mt-5" gutter={[15, 15]} justify="end">
                        <Col><Button onClick={handleCancel} className="cancel-button">Cancel</Button> </Col>
                        <Col> <Button loading={status == "loading"} onClick={handleSubmit} className="normal-button">Lưu</Button></Col>
                    </Row>
                }
            </Col>

        </>
    )
}

export default ControlByMonth
