import React, {useEffect, useState} from "react";
import {Checkbox, Col, Row, Select} from "antd";
import MultiDates from "./MultiDates";
import store, {RootState} from "@store/redux";
import timeScheduleStore from "@modules/schedule/timeScheduleStore";
import {useSelector} from "react-redux";
import {useTranslate} from "@hook/useTranslate";
import {scheduleTranslateKey} from "@translateKey/index";
import {useRouter} from "@helper/functions";

const {Option} = Select;

interface ISchedule {
    type: any,
    onChange?: any,
    valueSchedule?: any,
}


const ScheduleLoop = (props: ISchedule) => {
    const {type, onChange, valueSchedule} = props;
    const {arrayWeekly, arrayMonthly, arrayYearly} = useSelector((state: RootState) => state.timeSchedule);
    const {Mon, Tue, Wed, Thu, Fri, Sat, Sun, Choose_day, Choose_day_place_holder} = useTranslate("scheduleTranslateKey");
    const router = useRouter();
    const idSchedule = router.query["key"];

    const arrWeek = [{value: "Mon", name: Mon}, {value: "Tue", name: Tue}, {value: "Wed", name: Wed},
        {value: "Thu", name: Thu}, {value: "Fri", name: Fri}, {value: "Sat", name: Sat}, {value: "Sun", name: Sun}];


    const children = [];
    for (let i = 1; i < 32; i++) {
        children.push(<Option key={i} value={i < 10 ? '0' + i : i}>{i < 10 ? '0' + i : i}</Option>);
    }

    const handleChangeWeek = (value) => {
        // console.log(value,'handleChangeWeek======')
        store.dispatch(timeScheduleStore.actions.updateTimeSchedule({arrayWeekly: value}))

    };

    const handleChangeMonth = (value) => {
        // console.log(`selected ${value}`);
        store.dispatch(timeScheduleStore.actions.updateTimeSchedule({arrayMonthly: value}))
    };

    function renderTypeSchedule(value) {
        switch (value) {
            case 0:
            case 1:
                return "";
            case 2:

                return <div>
                    <Checkbox.Group style={{width: '100%'}} onChange={handleChangeWeek}
                                    defaultValue={idSchedule ? arrayWeekly : []}>

                        {
                            arrWeek.map((item, index) => {
                                return <div className="mt-4 mb-4" key={index}>
                                    <Row gutter={24}>
                                        <Col span={12}>
                                            <span className="name-day-of-week">{item.name}</span>
                                        </Col>
                                        <Col span={12}>
                                            <Checkbox value={item.value}/>
                                        </Col>
                                    </Row>
                                </div>
                            })
                        }

                    </Checkbox.Group>
                </div>;
            case 3:
                return <Row><Col>
                    <h6 className="label-header-choose-date">{Choose_day}</h6>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{minWidth: 510}}
                        placeholder={Choose_day_place_holder}
                        onChange={handleChangeMonth}
                        defaultValue={idSchedule ? arrayMonthly : []}
                    >
                        {children}
                    </Select>
                </Col></Row>;
            case 4:
                return <Row><Col span={24}><MultiDates/></Col></Row>
        }
    }

    return (
        <>

            <div className="mt-3"/>
            {
                renderTypeSchedule(type)
            }
        </>
    )
};

export default ScheduleLoop;