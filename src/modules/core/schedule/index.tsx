import React, {useEffect, useState} from "react";
import {Checkbox, Col, Row, Select} from "antd";
import MultiDates from "./component/MultiDates";
import store, {RootState} from "@store/redux";
import timeScheduleStore from "@modules/schedule/timeScheduleStore";
import {useDispatch, useSelector} from "react-redux";
import {useTranslate} from "@hook/useTranslate";
import {useRouter} from "@helper/functions";

const {Option} = Select;

interface ISchedule {
    type: any,
    onChange?: any,
    valueSchedule?: any,
}


const ScheduleComponent = (props: ISchedule) => {
    const {type, onChange, valueSchedule} = props;
    const {arrayWeekly, arrayMonthly, arrayYearly} = useSelector((state: RootState) => state.timeSchedule);
    const {Mon, Tue, Wed, Thu, Fri, Sat, Sun, Choose_day, Choose_day_place_holder} = useTranslate("serverTranslateKey");
    const router = useRouter();
    const idSchedule = router.query["key"];
    const dispatch =useDispatch();

    const arrWeek = [{value: "Mon", name: Mon}, {value: "Tue", name: Tue}, {value: "Wed", name: Wed},
        {value: "Thu", name: Thu}, {value: "Fri", name: Fri}, {value: "Sat", name: Sat}, {value: "Sun", name: Sun}];


    const children = [];
    for (let i = 1; i < 32; i++) {
        children.push(<Option key={i} value={i < 10 ? '0' + i : i}>{i < 10 ? '0' + i : i}</Option>);
    }

    const handleChangeWeek = (value) => {
        // console.log(value,'handleChangeWeek======')
        dispatch(timeScheduleStore.actions.updateTimeSchedule({arrayWeekly: value}))

    };

    const handleChangeMonth = (value) => {
        // console.log(`selected ${value}`);
        dispatch(timeScheduleStore.actions.updateTimeSchedule({arrayMonthly: value}))
    };

    function renderTypeSchedule(value) {
        switch (value) {
            case 0:
            case 1:
                return "";
            case 2:

                return <div>
                    <Checkbox.Group style={{width: '100%'}} onChange={handleChangeWeek}
                                    defaultValue={idSchedule ? arrayWeekly: []}>
                        <Row gutter={24}>
                            {
                                arrWeek.map((item, index) => {
                                    return <div className="mt-3 mb-2"><Col span={24} key={index}>
                                        <span className="name-day-of-week">{item.name}</span> <Checkbox
                                        value={item.value}/>
                                    </Col></div>
                                })
                            }
                        </Row>
                    </Checkbox.Group>
                </div>;
            case 3:
                return <Row><Col>
                    <h6 className="label-header-choose-date">{Choose_day}</h6>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{width: 350}}
                        placeholder={Choose_day_place_holder}
                        onChange={handleChangeMonth}
                        defaultValue={idSchedule ? arrayMonthly: []}
                    >
                        {children}
                    </Select>
                </Col></Row>;
            case 4:
                return <Row><Col><MultiDates/></Col></Row>
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

export default ScheduleComponent;