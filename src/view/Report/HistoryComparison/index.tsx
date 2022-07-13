import React from 'react';
import { Row, Col, DatePicker } from "antd";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import RightMenu, { IArrayAction } from "@view/shared/components/layout/RightMenu";
import SearchComponent from "@view/shared/components/SearchComponent/SearchComponent";
import TableComponent from "@view/shared/components/TableComponent";
import { useHistory } from 'react-router';
import './style.scss';
import useTable from '@view/shared/components/TableComponent/hook';
import { useTranslate } from '@view/shared/hook/useTranslate';
import * as Unicons from '@iconscout/react-unicons';

const fakeApi = require("./fakeData.json");

const HistoryComparison = () => {
    const revenu = useTranslate('reportRevenueTranslateKey');
    const table = useTable();
    const history = useHistory();

    const data = [
        {
            name: revenu.HISTORY_COMPARISON
        },
    ];

    const arrayViewAction: IArrayAction[] = [
        {
            iconType: 'import',
            name: revenu.EXPORT_DATA,
            handleAction: () => {
                // history.push("/report/revenue-by-contract")
            },
        }
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

    const columns = [
        {
            title: revenu.NO,
            dataIndex: "no",
        },
        {
            title: revenu.NO_CONTRACT,
            dataIndex: "noContract",
        },
        {
            title: revenu.MINING_UNIT,
            dataIndex: "minningUnit",
        },
        {
            title: revenu.CONTRACT_TERM,
            dataIndex: "contractTerm",
        },
        {
            title: revenu.TYPE_CONTRACT,
            dataIndex: "typeContract"
        },
        {
            title: revenu.TOTAL_PLAYS_3,
            dataIndex: "sumPlay"
        },
        {
            title: revenu.TOTAL_REVENUE,
            dataIndex: "sumRevenue"
        },
        {
            title: revenu.DATE_CLOSE,
            dataIndex: "closingDate"
        },
        // {
        //     title: revenu.DATE_IMPLEMENT,
        //     dataIndex: "implementDateControl"
        // },
        {
            title: "",
            render: (text) => {
                return (<><div className='label-action-revenue'
                    onClick={() =>
                        history.push(`/history-comparison/${text.noContract}`)
                    }
                >{revenu.Detail}</div></>)
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

    return (
        <div className="w-100">
            <MainTitleComponent
                breadcrumbs={data}
                title={revenu.HISTORY_COMPARISON_REVENUE}
                classBreadcumb={null}
                classTitle={null}
            />
            <div className="label-view-table d-flex div-search justify-content-between">
                <div className="label-view-datepicker d-flex main-form">
                    <label>{revenu.TIME_PERFORM}:</label>
                    <DatePicker format='DD/MM/YYYY'
                        suffixIcon={<Unicons.UilCalendarAlt size="27" className="icon-feather"/>} />
                </div>
                <SearchComponent placeholder={revenu.PRESS_ADMIN_NAME} />
            </div>
            <div className='label-list-record mb-3'><label>{revenu.LIST_CONTRACT}</label></div>
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
            <RightMenu csvReport={csvReport} arrayAction={arrayViewAction} />
        </div>
    )
}

export default HistoryComparison;
