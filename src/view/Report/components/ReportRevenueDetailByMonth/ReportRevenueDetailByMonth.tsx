import getReportDataContractPresenter from '@modules/report/presenter';
import MainTitleComponent from '@view/shared/components/MainTitleComponent';
import TableComponent from '@view/shared/components/TableComponent';
import { DatePicker, Table } from 'antd';
import Search from 'antd/lib/transfer/search';
import moment from 'moment';
import React,{useState} from 'react';
import ReportRevenueFilterByMonth from './ReportRevenueFilterByMonth/ReportRevenueFilterByMonth';

import "./Styles.scss";

const ReportRevenueDetailByMonth = () => {
    const [ keyRow, setKeyRow ] = useState([]);
    const onClickRadio = (record) => {
        setKeyRow([ record.businessContractId ])
    };
    const dataSource = [
        {
            "id": "1",
            "contract": "Intelligent Steel Computer",
            "nameofcompany": "Nitzsche, Cartwright and Fritsch",
            "time": "2021-09-30T22:08:39.133Z",
            "type": "Taka",
            "device": "1-039-056-4289 x396",
            "totalview": 8523,
            "amount": "416.90"
        },
        {
            "id": "2",
            "contract": "Intelligent Frozen Fish",
            "nameofcompany": "Bogan Inc",
            "time": "2021-11-05T02:13:01.377Z",
            "type": "Malaysian Ringgit",
            "device": "(867) 508-0045 x4980",
            "totalview": 70096,
            "amount": "263.48"
        },
        {
            "id": "3",
            "contract": "Unbranded Plastic Towels",
            "nameofcompany": "Ratke Group",
            "time": "2021-09-17T16:56:57.732Z",
            "type": "Swedish Krona",
            "device": "244-824-1722",
            "totalview": 10763,
            "amount": "902.38"
        },
        {
            "id": "4",
            "contract": "Refined Concrete Shoes",
            "nameofcompany": "Reichert, Dicki and Padberg",
            "time": "2021-09-10T04:17:10.901Z",
            "type": "Kuwaiti Dinar",
            "device": "701.984.5452",
            "totalview": 86836,
            "amount": "342.26"
        },
        {
            "id": "5",
            "contract": "Awesome Metal Fish",
            "nameofcompany": "Hagenes - Borer",
            "time": "2021-10-13T22:17:10.684Z",
            "type": "CFP Franc",
            "device": "1-149-612-8103",
            "totalview": 45173,
            "amount": "846.23"
        },
        {
            "id": "6",
            "contract": "Unbranded Cotton Tuna",
            "nameofcompany": "Welch - Tremblay",
            "time": "2021-12-22T21:20:29.028Z",
            "type": "Nuevo Sol",
            "device": "902.046.3055",
            "totalview": 47015,
            "amount": "33.09"
        },
        {
            "id": "7",
            "contract": "Gorgeous Plastic Salad",
            "nameofcompany": "Morissette, Becker and Ward",
            "time": "2022-04-01T14:44:04.183Z",
            "type": "Peso Uruguayo Uruguay Peso en Unidades Indexadas",
            "device": "1-047-450-6273 x57488",
            "totalview": 35585,
            "amount": "487.51"
        },
        {
            "id": "8",
            "contract": "Unbranded Granite Computer",
            "nameofcompany": "Parker Inc",
            "time": "2021-09-21T21:47:01.932Z",
            "type": "Gibraltar Pound",
            "device": "857-495-5049 x4924",
            "totalview": 36818,
            "amount": "723.89"
        },
        {
            "id": "9",
            "contract": "Refined Metal Fish",
            "nameofcompany": "Sauer - Marquardt",
            "time": "2021-05-11T09:39:43.009Z",
            "type": "Kyat",
            "device": "1-853-783-5933 x6594",
            "totalview": 29301,
            "amount": "736.43"
        },
        {
            "id": "10",
            "contract": "Small Cotton Tuna",
            "nameofcompany": "Robel - Bins",
            "time": "2021-04-20T13:28:53.216Z",
            "type": "Netherlands Antillian Guilder",
            "device": "1-384-519-8674",
            "totalview": 25044,
            "amount": "358.69"
        }]
    const columns = [
        {
            title: 'Tên bài hát',

            dataIndex: 'contract',
            key: 'contract',
        },
        {
            title: 'Tổng số lượt phát',
            dataIndex: 'nameofcompany',
            key: 'nameofcompany',
        },
        {
            title: "Tổng doanh thu",
            dataIndex: 'time',
            key: "time"
        },
        {
            title: "Quyền tác giả",
            dataIndex: 'type',
            key: "type"
        },
        {
            title: "Quyền biểu diễn",
            dataIndex: 'device',
            key: "device"
        },
        {
            title: "Quyền liên quan",
            dataIndex: 'totalview',
            key: "time"
        },
        {
            title: "VCPMC",
            dataIndex: 'amount',
            key: "amount"
        },
      
    ];
    // const api = () => {
    //     return new Promise((res, rej) => {
    //         setTimeout(() => {
    //             res({
    //                 data: dataSource,
    //                 info: {
    //                     total: dataSource.length,
    //                 },
    //             });
    //         }, 100);
    //     });
    // };
    function onChange(value, dateString) {
    }

    function onOk(value) {
    }
    return (
        <div className="report-by-month">
            <MainTitleComponent
                breadcrumbs={[

                    { name: "Báo cáo", href: "/report" },
                    { name: "Chi tiết doanh thu theo hợp đồng", href: "/report-revenue-detail-by-month" },
                ]}
                title="Chi tiết doanh thu theo hợp đồng - HĐ123 - Kỳ tháng 3-2021"
                classBreadcumb={null}
                classTitle={null}

            />
            <h3>Danh sách bài hát</h3>
           <ReportRevenueFilterByMonth />
            <Table className="mt-3 main-table report-by-month" columns={columns} dataSource={dataSource}/>
        </div>
    )
}

export default ReportRevenueDetailByMonth
