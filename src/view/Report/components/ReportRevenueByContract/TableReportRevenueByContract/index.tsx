import { Table } from 'antd'
import React,{useState} from 'react';
import RightMenu from "@view/shared/components/layout/RightMenu";
const TableReportRevenueByContract = ({setModal}) => {
    const [ selectedRowKeys, setSelectedRowKeys ] = useState([]);
   
    
    const selectRow = (record) => {
        const selectedRowKeys = [ ...selectedRowKeys ];
        
        if (selectedRowKeys.indexOf(record.key) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
        } else {
            selectedRowKeys.push(record.key);
        }
        selectedRowKeys({ selectedRowKeys });
    }
    
    const onSelectedRowKeysChange = (selectedRowKeys) => {
        selectedRowKeys({ selectedRowKeys });
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectedRowKeysChange,
    };
    const arrayAction = [
        {
            icon: "fas fa-edit",
            name: "edit",
            handleAction: () => {
                setModal({ isVisible: true, dataEdit: [] });
            },
        },
        {
            icon: "fas fa-info-circle",
            name: "detail",
        },
       
       
    ];

    return (
        <div>
            {/* <RightMenu arrayAction={arrayAction} />
            <Table rowSelection={rowSelection} onRow={(record) => ({
                onClick: () => {
                    selectRow(record);
                },
            })} className="main-table mt-3" pagination={{ defaultPageSize: 6}} dataSource={dataSource} columns={columns}/> */}
        </div>
    )
}

export default TableReportRevenueByContract
