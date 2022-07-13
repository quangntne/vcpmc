import MainTitleComponent from '@view/shared/components/MainTitleComponent';
import { useTranslate } from '@view/shared/hook/useTranslate';
import { deviceTranslateKey } from '@view/shared/translateKey';
import FilterTime from "./FilterTime/index"
import React, { useState } from 'react';
import { DatePicker, Button } from "antd";
import { CalendarOutlined, DownloadOutlined } from "@ant-design/icons";
import "./styles.scss";
import moment from "moment";
import TrackingTable from './TrackingTable';
const TrackingList = () => {
    const [ open, setOpen ] = useState(false);

    const handleOpenChange = open => {
        setOpen(open);
    };
    function onChange(value, dateString) {
    }

    function onOk(value) {
    }
    const handleClose = () => setOpen(false);
    return (
        <>
            <div className="w-100">
                <MainTitleComponent
                    breadcrumbs={[
                        { name: "Báo cáo", href: "/report" },
                        { name: "Theo dõi lượt phát", href: "/tracking-view/detail" },
                    ]}
                    title="Danh sách thiết bị"
                    classBreadcumb={null}
                    classTitle={null}
                    
                />

            </div>
            <div className="w-100 button-download">
                <button className="ant-btn icon-button normal-button" style={{ display: "flex"}}>Xuất dữ liệu
                    <div className="download-icon ml-2" >
                         <DownloadOutlined />
                    </div>
                </button>
            </div>
            <FilterTime />
            <TrackingTable />

        </>)
}

export default TrackingList
