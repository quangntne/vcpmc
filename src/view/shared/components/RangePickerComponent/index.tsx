import React from 'react';
import { DatePicker } from "antd";
import './style.scss';
import * as Unicons from '@iconscout/react-unicons';

interface IRangerPicker {
    value: any,
    onChange: any
}

const RangePickerComponent = (props: IRangerPicker) => {
    return (
        <>
            <DatePicker.RangePicker onChange={(value) => props?.onChange(value)}
                value={props?.value}
                picker="date" format='DD/MM/YYYY'
                suffixIcon={<Unicons.UilCalendarAlt size="27" className="icon-feather" />}
            />
        </>
    )
}

export default RangePickerComponent
