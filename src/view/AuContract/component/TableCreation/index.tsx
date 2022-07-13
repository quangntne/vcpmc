import React, { useEffect, useState } from "react";
import { Button, Select, Table } from "antd";
import { useSelector } from "react-redux";
import store, { RootState } from "@store/redux";
import { useTranslate } from "@hook/useTranslate";
import moment from 'moment';
import "./styles.scss";
import SelectAndLabelComponent from "@view/shared/components/SelectAndLabelConponent";
import SearchComponent from "@view/shared/components/SearchComponent/SearchComponent";
import RightMenu from "@view/shared/components/layout/RightMenu";
import UilClipboardNotes from '@iconscout/react-unicons/icons/uil-clipboard-notes';
import ModalRejectMedia from "@view/AuContract/component/ModalRejectMedia";
import AuContractEntity from "@modules/aucontract/entity";
import RenderStatus from '../../component/RenderStatusMedias';
import TableComponent from "@view/shared/components/TableComponent";
import auContractPresenter from "@modules/aucontract/presenter";
import { useAsync } from "@view/shared/hook/useAsync";
import useTable from "@view/shared/components/TableComponent/hook";

export interface IFacetab {
    arrMediaRes?: Array<any>,
    dataOnRow?: (data) => void,
    data?: any,
    className?: string,
    openExt?: any,
    openCancel?: any,
    idCont?: string,
    dataResponse?: any,
    openDelete?: any
}
const TableCreation = (props: IFacetab) => {
    const table = useTable();
    const { dataOnRow, data, idCont } = props;
    const { getListMediasAuContract } = auContractPresenter;
    const {
        Record_name, Singer, Author, Download_Date, Status, ISRC_Code, Audition, Approval_Status,
        All, New, Approved, Refuse, Placeholder, Edit_creation, Ext_Contract, Can_Contract, Record,
    } = useTranslate("aucontractTranslateKey");
    //state
    const [keyRow, setKeyRow] = useState([]);
    const [editWork, setEditWork] = useState({ rowSelect: false, btnSave: false });
    const [refuseWork, setRefuseWork] = useState({ modal: false, data: null });
    const [dataTable, setDataTable] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRowsFormat, setSelectedRowsFormat] = useState([]);
    const arrStatusApproval = [
        {
            value: null,
            name: All
        },
        {
            value: 0,
            name: New
        },
        {
            value: 1,
            name: Approved
        },
        {
            value: -1,
            name: Refuse
        },
    ];


    useEffect(() => {

    }, []);
    const columns = [
        {
            title: Record_name,
            dataIndex: '',
            key: '',
            render: record => <><span>{record?.mediaName}</span>
                <div>
                    <div className="d-flex align-items-center">
                        <span className="describe">{record?.mediaCategory?.mediaCategoryName}</span>
                        <div className="dot-work" />
                        <span className="describe">{record?.mediaFormat?.mediaFormatName}</span>
                        <div className="dot-work" />
                        <span className="describe">{record?.mediaDuration}</span>
                    </div>
                </div>
            </>
        },
        {
            title: ISRC_Code,
            dataIndex: 'isrcCode',
            key: 'isrcCode',
        },
        {
            title: Singer,
            dataIndex: 'mediaPerformer',
            key: 'mediaPerformer',
        },
        {
            title: Author,
            dataIndex: 'mediaAuthor',
            key: 'mediaAuthor',
        },
        {
            title: Download_Date,
            dataIndex: 'mediaCreateAt',
            key: 'mediaCreateAt',
        },
        {
            title: Status,
            dataIndex: 'mediaStatus',
            key: 'mediaStatus',
            render: text => <RenderStatus status={text} />
        },
        {
            title: "",
            dataIndex: '',
            key: '',
            render: record => <><span className="cursor-pointer action-audition">{Audition}</span></>
        },
    ];

    const rowSelection = {
        selectedRowKeys: keyRow,
        onChange: (selectedRowKeys, selectedRows) => {
            setKeyRow(selectedRowKeys);
            setSelectedRows(selectedRows);
        },
    };

    const onClickCheckbox = (data) => {
        dataOnRow(data)
        if (data) {
            setKeyRow([data?.stt]);
        }
    };

    const onChangeSelect = value => {
        table.fetchData({
            option: {
                filter: {
                    mediaStatus: value,
                },
            },
        });
        console.log(value, "ee===========")
    }

    const onSearch = (value) => {
        console.log(value, "value=====")
    };


    const arrRejectWork = [
        {
            iconType: "cancel",
            disable: selectedRows.length == 0 && true,
            name: `${Refuse} ${selectedRows.length} ${Record}`,
            handleAction: () => {
                let arrMediaId = [];
                selectedRows && selectedRows?.map((item, index) => {
                    arrMediaId.push(item.mediaId);
                })
                setSelectedRowsFormat(arrMediaId);
                setRefuseWork({ modal: true, data: null })
            },
        },
    ];

    const arrayActionRight = [
        {
            iconType: "edit",
            name: Edit_creation,
            handleAction: () => {
                setEditWork({ rowSelect: true, btnSave: true })
            },
        },
        {
            icon: <UilClipboardNotes size="33" />,
            name: Ext_Contract,
            disable: props?.dataResponse?.status !== 2 && true,
            handleAction: () => {
                props.openExt();
            },
        },
        {
            // icon: "fa fa-plus",
            iconType: "cancel",
            name: Can_Contract,
            disable: props?.dataResponse?.status !== 2 && true,
            handleAction: () => {
                props.openCancel();
            },
        },
        {
            // icon: "fa fa-plus",
            iconType: "delete",
            name: "Xoá Hợp Đồng",
            disable: props?.dataResponse?.status !== 1 && true,
            handleAction: () => {
                props.openDelete();
            },
        },
    ];

    const handleCloseModal = () => {
        setRefuseWork({ modal: false, data: null });
        setEditWork({ rowSelect: false, btnSave: false });
        setKeyRow(null);
    };

    const fetchDataTable = (value) => {
        if (value) {
            table.fetchData();
        }
    }
    return (
        <>
            <div className="w-100 table-works">

                <div className="d-flex div-search justify-content-between">
                    <div className="mt-3 mb-3">
                        <SelectAndLabelComponent textLabel={Approval_Status} dataString={arrStatusApproval}
                            defaultValue={0} onChange={onChangeSelect} />
                    </div>

                    <SearchComponent onChange={onSearch} classNames="w-500px" placeholder={Placeholder} />

                </div>
                <div className="BE-pagination-table">
                    <TableComponent className="main-table"
                        register={table}
                        apiServices={getListMediasAuContract}
                        defaultOption={{ idCont }}
                        columns={columns}
                        rowKey={media => media.mediaId}
                        rowSelection={editWork.rowSelect ? rowSelection : null}
                    />
                </div>

            </div>
            <RightMenu arrayAction={editWork.btnSave ? arrRejectWork : arrayActionRight} />
            <ModalRejectMedia fetchDataTable={value => fetchDataTable(value)} selectedRowsFormat={selectedRowsFormat} visible={refuseWork.modal} handleCancel={handleCloseModal} />
        </>
    )
};

export default TableCreation