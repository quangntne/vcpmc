import { DatePicker } from "antd"
import React from "react"
import moment, { Moment } from "moment"
import "./style.scss"

interface IProps {
    onChange: (month: Moment) => void,
    value: Moment,
}

const CONFIG = {
    format: "MM-YYYY"
}

const MonthPicker = (props: IProps) => {
    const onChange = (month: Moment, monthString) => {
        if (!month) return
        props.onChange(month)
    }

    const onChangeNextMonth = (month: Moment) => {
        props.onChange(month.add(1, "months"))
    }

    const onChangePrevMonth = (month: Moment) => {
        props.onChange(month.subtract(1, "months"))
    }

    return <div className="month-picker">
        <div className=""></div>
        <div className="show-month">
            <i className="fas fa-chevron-left" onClick={() => onChangePrevMonth(props.value)}></i>
            <span className="mx-4">
                {moment(props.value, CONFIG.format).format("MMMM YYYY")}
            </span>
            <i className="fas fa-chevron-right" onClick={() => onChangeNextMonth(props.value)}></i>
        </div>
        <div className="custom-datepicker">
            <DatePicker
                value={props.value}
                format={CONFIG.format}
                onChange={onChange}
                picker="month"
                className="antd-daypicker"
            />
            <i className="fas fa-calendar-alt icon-datepicker"></i>
        </div>
    </div>
}

export default MonthPicker