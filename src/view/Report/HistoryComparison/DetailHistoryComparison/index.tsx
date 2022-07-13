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
import lodash from "lodash";
import RangePickerComponent from '@view/shared/components/RangePickerComponent'

const fakeApi = require("../fakeData.json");

const DetailHistoryComparison = () => {
    const table = useTable();
    const param: { contractId: string } = useParams()
    const { contractId } = param;
    const report = useTranslate("reportRevenueTranslateKey");
    const contractDetail = lodash.find(fakeApi, item => item.noContract === contractId);
    //state
    const [valueDatePicker, setvalueDatePicker] = React.useState<any>();


    const data = [
        {
            name: report.HISTORY_COMPARISON,
            href: "/history-comparison"
        },
        {
            name: report.DETAIL,
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

    const apiDetail = () => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res({
                    data: contractDetail.detailSong,
                    info: {
                        total: contractDetail.detailSong.length,
                    },
                });
            }, 100);
        });
    };

    const columns = [
        {
            title: report.NAME_SONG,
            dataIndex: "songName",
        },
        {
            title: report.TOTAL_PLAYS,
            dataIndex: "sumPlay",
        },
        {
            title: report.TOTAL_REVENUE,
            dataIndex: "sumRevenue",
        },
        {
            title: report.PERFORMANCE,
            dataIndex: "rightPerfomance",
            key: "rightPerfomance"
        },
        {
            title: report.PRODUCT,
            dataIndex: "rightProduct",
            key: "rightProduct",
        },
        {
            title: report.VCPMC_2,
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

    const onChangeDatePicker = (value) => {
        console.log('value', value);
        setvalueDatePicker(value)
    }

    return (
        <div>
            <MainTitleComponent
                breadcrumbs={data}
                title={`${report.REVENUE_CONTRACT_2} - HĐ123 - ${report.MONTH_CONTRACT} 03/2021 `}
                classBreadcumb={null}
                classTitle={null}
            />
            <Row className='mt-3'>
                <Col lg={9} sm={9} xs={9} className="pr-4">
                    <div className='label-infor-contract'>
                        <label>{report.CONTRACT_INFOR}</label>
                        <ContentComponent className="label-content mt-3" label={report.NO_CONTRACT} text={contractDetail?.noContract} />
                        <ContentComponent className="label-content" label={report.MINING_UNIT} text={contractDetail?.minningUnit} />
                        <ContentComponent className="label-content" label={report.TYPE_CONTRACT} text={contractDetail?.typeContract} />
                        <ContentComponent className="label-content" label={report.EFFECT_FROM} text={contractDetail?.controlValidDate} />
                        <ContentComponent className="label-content" label={report.EXPIR_DATE} text={contractDetail?.expirationDate} />
                        {
                            contractDetail?.typeContract === "Trọn gói" ?
                                (<>
                                    <ContentComponent className="label-content" label={report.CONTRACT_VALUE} text={contractDetail?.valueContract} />
                                    <ContentComponent className="label-content" label={report.DELIVERY_VALUE} text={contractDetail?.valueDeliDay} />
                                </>)
                                : (
                                    <><ContentComponent className="label-content" label={report.PRICE} text={contractDetail?.priceTurn} /></>
                                )
                        }
                    </div>
                    <div className="mt-3 label-infor-control">
                        <label>{report.CONTROL_INFOR}</label>
                        <ContentComponent className="label-content mt-3" label={report.SIGN_CHECK} text={contractDetail?.dayControlMoney} />
                        <ContentComponent className="label-content" label={report.SONGS} text={contractDetail?.sumSong} />
                        <ContentComponent className="label-content" label={report.TOTAL_PLAYS} text={`${contractDetail?.sumPlay} lượt`} />
                        <ContentComponent className="label-content" label={report.TOTAL_REVENUE} text={contractDetail?.sumRevenue} />
                        <ContentComponent className="label-content" label={report.CONTRACT_STATUS}
                            text={contractDetail?.statusControl === 1 ? report.CHECKED : report.NO_CHECKED} />
                        {contractDetail?.typeContract === "Theo lượt phát" && (
                            <><ContentComponent className="label-content" label={report.IMPLEMENT_DATE} text={contractDetail?.implementDate} /></>
                        )
                        }
                    </div>
                </Col>
                <Col lg={15} sm={15} xs={15}>
                    <div className='label-list-record mb-3'><label>{report.LIST_RECORDS}</label></div>
                    <div className="label-view-table d-flex div-search justify-content-between">
                        <div className="label-view-datepicker d-flex main-form">
                            <label>{report.VIEW_BY_DAY}: </label>
                            <RangePickerComponent value={valueDatePicker} onChange={(value) => onChangeDatePicker(value)} />
                        </div>
                        <SearchComponent placeholder={report.PRESS_SONG} />
                    </div>
                    <div className="table-contract-list">
                        <TableComponent
                            apiServices={apiDetail}
                            columns={columns}
                            // rowSelection={{type: 'checkbox', ...rowSelection}}
                            rowKey={"no"}
                            register={table}
                            // disableFirstCallApi={true}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: () => {
                                        // onClickCheckbox(record)
                                    }, // click row
                                };
                            }}
                        // dataSource={contractDetail.detailSong}
                        />
                    </div>
                </Col>
            </Row>
            <RightMenu csvReport={csvReport} arrayAction={arrayActionRight} />
        </div>
    )
}

export default DetailHistoryComparison;
