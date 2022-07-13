import TableComponent from '@view/shared/components/TableComponent';
import { DatePicker } from 'antd'
import Search from 'antd/lib/input/Search';

import moment from 'moment'
import React from 'react'
import "./Styles.scss";
const ReportRevenueFilterByMonth = () => {
    function onChange(value, dateString) {
    }

    function onOk(value) {
    }
    return (
        <>
            <div className="filter-calender mt-4">
                <div>
                    <span style={{ marginTop: "4px", color: "gray", marginRight: "8px" }}>Xem theo ngày/tuần</span>
                    <DatePicker showTime onChange={onChange} onOk={onOk} defaultValue={moment(new Date())} format="< DD/MM/YYYY >" />
                </div>
                <div>
                    <Search className="ant-form-search" placeholder="Nhập tên bài hát" />
                    
                </div>

            </div>
        </>
    )
}

export default ReportRevenueFilterByMonth
