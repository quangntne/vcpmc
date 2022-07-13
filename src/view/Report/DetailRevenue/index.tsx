import React from 'react';
import { Row, Col, DatePicker } from "antd";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import ContentComponent from "@view/shared/components/ContentComponent";
import TableComponent from "@view/shared/components/TableComponent";
import { useTranslate } from '@view/shared/hook/useTranslate';
import RightMenu, { IArrayAction } from "@view/shared/components/layout/RightMenu";
import SearchComponent from "@view/shared/components/SearchComponent/SearchComponent";
import { useParams } from 'react-router';
import "./style.scss";
import useTable from '@view/shared/components/TableComponent/hook';
import * as Unicons from '@iconscout/react-unicons';

const fakeApi = require("./fakeData.json");

const DetailRevenue = () => {
    const table = useTable();
    const param: { contractId: string } = useParams()
    const { contractId } = param;
    //state

    const report = useTranslate("reportRevenueTranslateKey");
    const data = [
        {
            name: report.REVENUE_REPORT,
            href: "/report"
        },
        {
            name: report.REPORT_DETAIL,
            href: "/report/revenue-by-contract"
        },
        {
            name: report.REVENUE_DETAIL,
        },
    ];

    const arrayActionRight: IArrayAction[] = [
        {
            iconType: "import",
            name: report.EXPORT_DATA,
            handleAction: () => {
                // router.push("/contract-add");
            },
        },
    ]

    const api = () => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res({
                    data: fakeApi,
                    info: {
                        total: fakeApi.length,
                    },
                });
            }, 100);
        });
    };

    const columns = [
        {
            title: report.NO,
            dataIndex: "no",
        },
        {
            title: report.NAME_SONG,
            dataIndex: "nameSong",
        },
        {
            title: report.TOTAL_PLAYS_3,
            dataIndex: "totalPlays",
        },
        {
            title: report.TOTAL_REVENUE,
            dataIndex: "totalRevenue",
        },
        {
            title: report.PERFORMANCE,
            dataIndex: "preformanceRight",
            key: "preformanceRight"
        },
        {
            title: report.PRODUCT,
            dataIndex: "productRight",
            key: "productRight",
        },
        {
            title: report.VCPMC,
            dataIndex: "VCPMC",
            key: "VCPMC",
        },
    ];

    const headers = [
        { label: 'no', key: 'no' },
        { label: 'noContract', key: 'noContract' },
        { label: 'miningUnit', key: 'miningUnit' },
        { label: 'contractTerm', key: 'contractTerm' },
        { label: 'typeContract', key: 'typeContract' },
        { label: 'totalPlay', key: 'totalPlay' },
        { label: 'closingDate', key: 'closingDate' },
    ];

    const csvReport = {
        filename: 'report.csv',
        headers: headers,
        data: fakeApi ? fakeApi : []
    };

    return (
        <div>
            <MainTitleComponent
                breadcrumbs={data}
                title={`${report.CONTRACT} HD123 - ${report.MONTH_CONTRACT} 06/2021`}
                classBreadcumb={null}
                classTitle={null}
            />
            <Row className='mt-3'>
                <Col lg={9} sm={9} xs={9} className="pr-4">
                    <div className='label-infor-contract'>
                        <label>{report.CONTRACT_INFOR}</label>
                        <ContentComponent className="label-content mt-3" label={report.NO_CONTRACT} text="HĐ123" />
                        <ContentComponent className="label-content" label={report.MINING_UNIT} text="Công ty TNHH ABC" />
                        <ContentComponent className="label-content" label={report.TYPE_CONTRACT} text="Trọn gói" />
                        <ContentComponent className="label-content" label={report.EFFECT_FROM} text="01/01/2020" />
                        <ContentComponent className="label-content" label={report.EXPIR_DATE} text="01/01/2022" />
                        <ContentComponent className="label-content" label={report.CONTRACT_VALUE} text="730.000.000 VNĐ" />
                        <ContentComponent className="label-content" label={report.DELIVERY_VALUE} text="365.000.000 VNĐ" />
                    </div>
                    <div className="mt-3 label-infor-control">
                        <label>{report.CONTROL_INFOR}</label>
                        <ContentComponent className="label-content mt-3" label={report.SIGN_CHECK} text="01/01/2020" />
                        <ContentComponent className="label-content" label={report.SONGS} text="13 bài" />
                        <ContentComponent className="label-content" label={report.TOTAL_PLAYS} text="200.000 lượt" />
                        <ContentComponent className="label-content" label={report.TOTAL_REVENUE} text="300.000.000" />
                        <ContentComponent className="label-content" label={report.CONTRACT_STATUS} text="Chưa đối soát" />
                    </div>
                </Col>
                <Col lg={15} sm={15} xs={15}>
                    <div className='label-list-record mb-3'><label>{report.LIST_RECORDS}</label></div>
                    <div className="label-view-table d-flex div-search justify-content-between">
                        <div className="label-view-datepicker d-flex main-form">
                            <label>{report.VIEW_BY_DAY}: </label>
                            <DatePicker format='DD/MM/YYYY'
                                suffixIcon={<Unicons.UilCalendarAlt size="27" className="icon-feather" />} />
                        </div>
                        <SearchComponent placeholder={report.PRESS_SONG} />
                    </div>
                    <div className="table-contract-list">
                        <TableComponent
                            apiServices={api}
                            columns={columns}
                            // rowSelection={{type: 'checkbox', ...rowSelection}}
                            rowKey={"no"}
                            register={table}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: () => {
                                        // onClickCheckbox(record)
                                    }, // click row
                                };
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <RightMenu csvReport={csvReport} arrayAction={arrayActionRight} />
        </div>
    )
}

export default DetailRevenue;
