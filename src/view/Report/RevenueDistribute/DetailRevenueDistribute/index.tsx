import React from 'react';
import { Row, Col } from "antd";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import RightMenu, { IArrayAction } from "@view/shared/components/layout/RightMenu";
import SearchComponent from "@view/shared/components/SearchComponent/SearchComponent";
import TableComponent from "@view/shared/components/TableComponent";
import lodash from "lodash";
import './style.scss';
import useTable from '@view/shared/components/TableComponent/hook';
import { useParams } from 'react-router';
import { useTranslate } from '@view/shared/hook/useTranslate';
import { useSelector } from 'react-redux';
import { RootState } from '@modules/core/store/redux';

const fakeApi = require("../fakeData.json");

const DetailRevenueDistribute = () => {
    const translate = useSelector((state: RootState) => state.translateStore.currentLanguage);
    const revenu = useTranslate('revenueDistribution');
    const param: any = useParams();
    const { authContractId } = param;
    const authContractDetail = lodash.find(fakeApi, item => item.authorContract === authContractId);
    //state
    const [detailRecord, setDetailRecord] = React.useState(authContractDetail.detailRevenu[1]);

    const [revenuSummary, setRevenuSummary] = React.useState({
        sumSong: "13",
        sumPlay: "17,527",
        sumRevenue: "1.045.000,000",
        sumAdminFree: "209.001.505",
        sumRoyal: "835.998.495"
    });
    const [revenuSummaryDetail, setRevenuSummaryDetail] = React.useState({
        sumPlayDetail: "100",
        sumRevenue: "835.998.495",
    })

    const table = useTable();
    const data = [
        {
            name: revenu.REVENUE_DISTRIBUTION,
            href: "/revenue-distribute"
        },
        {
            name: revenu.Detail_Revenue
        }
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

    const columns = React.useMemo(() => {
        return [
            {
                title: revenu.NO,
                key: "noSong",
                children: [
                    {
                        title: revenu.SUM,
                        key: 'Tổng',
                        dataIndex: "noSong",
                    }
                ]
            },
            {
                title: revenu.mediaName,
                children: [
                    {
                        title: revenuSummary.sumSong,
                        key: "songName",
                        dataIndex: "songName",
                    }
                ]
            },
            {
                title: revenu.CountPlays,
                children: [
                    {
                        title: revenuSummary.sumPlay,
                        key: "numberPlay",
                        dataIndex: "numberPlay",
                    }
                ]
            },
            {
                title: `${revenu.Revenue} (VNĐ)`,
                children: [
                    {
                        title: revenuSummary.sumRevenue,
                        key: "revenue",
                        dataIndex: "revenue",
                    }
                ]
            },
            {
                title: `${revenu.vcpmc}(VNĐ)`,
                key: "adminFree",
                children: [
                    {
                        title: revenuSummary.sumAdminFree,
                        key: 'adminFree',
                        dataIndex: "adminFree",
                    }
                ]
            },
            {
                title: `${revenu.Author_Music} (VNĐ)`,
                key: "royal",
                children: [
                    {
                        title: revenuSummary.sumRoyal,
                        key: 'royal',
                        dataIndex: "royal",
                    }
                ]
            }
        ];
    }, [revenuSummary, translate]);

    const columnsDetailRecord = React.useMemo(() => {
        return [
            {
                title: revenu.BusinessCustomersName,
                key: "miningUnit",
                children: [
                    {
                        title: revenu.SUM,
                        key: 'Tổng',
                        dataIndex: "miningUnit",
                    }
                ]
            },
            {
                title: revenu.countPlaysMedia,
                children: [
                    {
                        title: revenuSummaryDetail.sumPlayDetail,
                        key: 'numberPlayDetail',
                        dataIndex: "numberPlayDetail",
                    }
                ]
            },
            {
                title: `${revenu.Revenue} (VNĐ)`,
                children: [
                    {
                        title: revenuSummaryDetail.sumRevenue,
                        key: 'numberPlayDetail',
                        dataIndex: "numberPlayDetail",
                    }
                ]
            }
        ]
    }, [revenuSummaryDetail, translate])

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
        <div className="detail-revenue-district w-100">
            <MainTitleComponent
                breadcrumbs={data}
                title={`${revenu.contract_authorization} UQ123 - Quý 1`}
                classBreadcumb={null}
                classTitle={null}
            />
            <div className="table-contract-list mb-3">
                <Row>
                    <Col lg={15} sm={15} xs={15} className='pr-3'>
                        <div className='label-list-record mb-1'><label>{revenu.LIST_RECORDS}</label></div>
                        <SearchComponent placeholder={revenu.PRESS_SONG} />
                    </Col>
                    <Col lg={9} sm={9} xs={9} className='label-table-right'>
                        <div className='label-list-record mb-1'><label>{revenu.REVENU_RECORDS}</label></div>
                        <div className='label-name-record'><label>{detailRecord.songName}</label></div>
                    </Col>
                </Row>
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
                            disableFirstCallApi={true}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: () => {
                                        setDetailRecord(record);
                                    }, // click row
                                };
                            }}
                            dataSource={authContractDetail.detailRevenu}
                            rowClassName={(text) => text.noSong === detailRecord.noSong && 'active-row'}
                            noStt={true}
                        />
                    </Col>
                    <Col lg={9} sm={9} xs={9} className='label-table-right'>
                        <TableComponent
                            apiServices={api}
                            columns={columnsDetailRecord}
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
                            dataSource={detailRecord.detailSong}
                            noStt={true}
                        />
                    </Col>
                </Row>
            </div>
            <RightMenu csvReport={csvReport} arrayAction={arrayViewAction} />
        </div>
    )
}

export default DetailRevenueDistribute
