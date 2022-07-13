import React from 'react';
import { Row, Col } from "antd";
import SearchComponent from "@view/shared/components/SearchComponent/SearchComponent";
import RightMenu, { IArrayAction } from "@view/shared/components/layout/RightMenu";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import ContentComponent from "@view/shared/components/ContentComponent";
import "./style.scss";
import useTable from "@view/shared/components/TableComponent/hook";
import TableComponent from "@view/shared/components/TableComponent";
import CircleLabel from "@view/shared/components/CircleLabel/index";
import { useTranslate } from '@view/shared/hook/useTranslate';

const fakeApi = require("./fakeData.json");

const HistoryDevice = () => {
    const report = useTranslate("reportRevenueTranslateKey");
    const table = useTable();
    //state
    const [listSongDetail, setListSongDetail] = React.useState<any>(fakeApi[0]);


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
            name: report.DEVICE_HISTORY
        },
    ];

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

    const arrayActionRight: IArrayAction[] = [
        {
            iconType: "import",
            name: report.EXPORT_DATA,
            handleAction: () => {
                // router.push("/contract-add");
            },
        },
    ];

    const columns = [
        {
            title: report.NAME_DEVICE,
            dataIndex: "nameDevice",
        },
        {
            title: report.STATUS,
            dataIndex: "status",
            render: (text) =>
                text === 0 ?
                    (<span><CircleLabel text={report.WORKING} colorCode={"green"} /></span>) :
                    (<span><CircleLabel text={report.NOT_WORKING} colorCode={"red"} /></span>)
        },
        {
            title: report.DATA_TIME_DEVICE,
            dataIndex: "timeSync",
        },
        {
            title: report.TOTAL_PLAYS,
            dataIndex: "totalPlays",
            key: "totalPlays"
        }
    ];

    const columnsDetail = [
        {
            title: report.LIST_SONGS,
            dataIndex: "nameSong"
        },
        {
            title: report.PLAY_COUNT,
            dataIndex: "playCount"
        },
    ]

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
        <div className="label-history-device">
            <MainTitleComponent
                breadcrumbs={data}
                title={`${report.CONTRACT} HD123 - ${report.MONTH_CONTRACT} 06/2021`}
                classBreadcumb={null}
                classTitle={null}
            />
            <div className='label-title'><label>{report.LIST_DEVICES}</label></div>
            <div><SearchComponent classNames="w-500px" placeholder={report.PRESS_NAME_DEVICE} /></div>
            <div className="d-flex div-content">
                <ContentComponent className="label-content-divice mt-3" label={report.TOTAL_EQUIPMENT} text="8 thiết bị" />
                <ContentComponent className="label-content-play mt-3" label={report.TOTAL_PLAYS_3} text="1784" />
            </div>
            <div className="table-contract-list">
                <Row>
                    <Col lg={15} sm={15} xs={15} className='pr-3'>
                        <TableComponent
                            apiServices={api}
                            columns={columns}
                            // rowSelection={{type: 'checkbox', ...rowSelection}}
                            rowKey={"no"}
                            register={table}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: () => {
                                        setListSongDetail(record);
                                    }, // click row
                                };
                            }}
                            rowClassName={(text) => text.no === listSongDetail.no && 'active-row'}
                        />
                    </Col>
                    <Col lg={9} sm={9} xs={9} className='label-table-right'>
                        <TableComponent
                            apiServices={api}
                            columns={columnsDetail}
                            rowKey={"authorityContractId"}
                            register={table}
                            disableFirstCallApi={true}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: () => {
                                        // onClickCheckbox(record)
                                    }, // click row
                                };
                            }}
                            dataSource={listSongDetail.detailHistoryDevice}
                        />
                    </Col>
                </Row>
            </div>
            <RightMenu csvReport={csvReport} arrayAction={arrayActionRight} />
        </div>
    )
}

export default HistoryDevice
