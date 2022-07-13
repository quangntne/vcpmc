import React from 'react'
import { DatePicker, Button } from "antd";
import moment from "moment";
import "./styles.scss";
const FilterTime = () => {
    function onChange(value, dateString) {
    }

    function onOk(value) {
    }
    return (
    
            <div className="filter-time mt-5">
                <div className="from-time-picker">
                    <span>Chọn thời gian:  <DatePicker showTime onChange={onChange} onOk={onOk} defaultValue={moment(new Date())} format="< DD:MM:YYYY >" /></span>
                </div>

            </div>
    
    )
}

export default FilterTime;
