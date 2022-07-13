import React from 'react';
import SearchComponent from "@view/shared/components/SearchComponent/SearchComponent";
import SelectAndLabelComponent from "@view/shared/components/SelectAndLabelConponent";
import RightMenu, { IArrayAction } from "@view/shared/components/layout/RightMenu";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import FilterRevenue from "../components/FilterRevenue/index";
import "./style.scss";
import useTable from "@view/shared/components/TableComponent/hook";
import TableComponent from "@view/shared/components/TableComponent";
import { DeleteConfirm } from '@view/shared/components/ConfirmDelete';
import { useTranslate } from '@view/shared/hook/useTranslate';
import { useHistory } from 'react-router';
import { CSVLink } from 'react-csv';

const fakeApi = require("./fakeData.json");

const RevenueByContract = () => {
    const history = useHistory();
    const report = useTranslate("reportRevenueTranslateKey");
    const table = useTable();
    const data = [
        {
            name: report.REVENUE_REPORT,
            href: "/report"
        },
        {
            name: report.REPORT_DETAIL,
        },
    ];

    const columns = [
        {
            title: report.NO_CONTRACT,
            dataIndex: "noContract",
        },
        {
            title: report.MINING_UNIT,
            dataIndex: "miningUnit",
        },
        {
            title: report.CONTRACT_TERM,
            dataIndex: "contractTerm",
        },
        {
            title: report.TYPE_CONTRACT,
            dataIndex: "typeContract",
            key: "typeContract",
            render: text => (
                <div>{text === 0 ? report.ALL_ONE : report.BY_PLAYS}</div>
            )
        },
        {
            title: report.DEVICE_SYNCED,
            dataIndex: "syncDevices",
            key: "syncDevices",
            render: text => (
                <div className={text.syncDevicesAfter < text.syncDevicesBefore ? 'label-text-error' : ''}>
                    {text.syncDevicesAfter}/ {text.syncDevicesBefore}
                </div>
            )
        },
        {
            title: report.TOTAL_PLAYS_2,
            dataIndex: "totalPlay",
            key: "totalPlay",
        },
        {
            title: report.DATE_CLOSE,
            dataIndex: "closingDate",
            key: "closingDate",
        },
        {
            render: text => {
                return (
                    <>
                        <div>
                            <span className='label-text-action'
                                onClick={() => { history.push(`/report/revenue-by-contract/history-device/${text.noContract}`) }}
                            >{report.HISTORY_DEVICE}</span>
                        </div>
                    </>
                )
            }
        },
        {
            render: text => {
                return (
                    <>
                        <div>
                            <span className='mr-5 label-text-action'
                                onClick={() => {
                                    history.push(`/report/revenue-by-contract/detail-revenue/${text.noContract}`)
                                }}
                            >{report.REVENUE_DETAIL}</span>
                        </div>
                    </>
                )
            }

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

    const arrayActionRight: IArrayAction[] = [
        {
            iconType: "report",
            name: report.CLOSE_REVENUE,
            handleAction: () => {
                DeleteConfirm({
                    title: report.CLOSE_REVENUE,
                    content: (<div style={{ fontSize: '16px' }}>
                        <span>{report.REVENUE_WILL}</span> 01/05/2021 <span>{report.TO}</span> 14/05/2021
                        <span>{report.ALL_CONTRACT}</span> <br />
                        <div className='mt-3'>
                            <span >{report.PRESS_CONTINUE}</span><br />
                            <span>{report.PRESS_CANCEL}</span>
                        </div>
                    </div>),
                    textOk: report.CONTINUE,
                    textCancel: report.CANCEL,
                    handleOk: async () => { return await console.log('luu') },
                    handleCancel: () => {
                        console.log('thoat')
                    }
                })
            },
        },
        {
            iconType: "import",
            // csvReport: csvReport,
            name: report.EXPORT_DATA,
            handleAction: () => {
                // router.push("/contract-add");
                // return (

                // )
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
    return (
        <div className="contract-list">
            <MainTitleComponent
                breadcrumbs={data}
                title={report.REVENUE_CONTRACT}
                classBreadcumb={null}
                classTitle={null}
            />
            <div className="d-flex div-search justify-content-between">
                <div className="d-flex">
                    <FilterRevenue />
                </div>
                <SearchComponent classNames="w-500px" placeholder={report.PRESS_USER} />
            </div>
            <div className="table-contract-list">
                <TableComponent
                    apiServices={api}
                    columns={columns}
                    // rowSelection={{type: 'radio', ...rowSelection}}
                    rowKey={"authorityContractId"}
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
            <RightMenu csvReport={csvReport} arrayAction={arrayActionRight} />
        </div>
    )
}

export default RevenueByContract
