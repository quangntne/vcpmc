import React, { useEffect, useState } from "react";
import TableComponent from "@view/shared/components/TableComponent";
import { Modal, Space, Tooltip } from "antd";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { common, serverTranslateKey } from "@view/shared/translateKey";
import RightMenu from "@view/shared/components/layout/RightMenu";
import { showDeleteConfirm } from "./DeleteConfirm";
const dataTable = require("./../../data.json");

const TableData = ({ setModal }) => {
  const { ACTION, DELETE } = useTranslate("common");
  // Checkbox selection
  const [keyRow, setKeyRow] = useState([]);
  const rowSelection = {
    selectedRowKeys: keyRow,
    onChange: (selectedRowKeys, selectedRows) => {
      setKeyRow(selectedRowKeys);
    },
  };
  const onClickCheckbox = (record) => {
    const selectedRowKeys = [...keyRow];
    if (selectedRowKeys.indexOf(record.id) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1);
    } else {
      selectedRowKeys.push(record.id);
    }
    setKeyRow(selectedRowKeys);
  };

  const columns = [
    {
      title: "tagName",
      dataIndex: "tagName",
      className: "main-column",
    },
    {
      title: "lastUpdate",
      dataIndex: "lastUpdate",
    },
    {
      title: "group",
      dataIndex: "group",
    },
  ];

  const api = () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({
          data: dataTable,
          info: {
            total: dataTable.length,
          },
        });
      }, 100);
    });
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
    {
      icon: "fas fa-trash-alt",
      name: `${DELETE} ${keyRow.length} item`,
      handleAction: () => {
        showDeleteConfirm();
      },
      disable: keyRow.length == 0
    },
    {
      icon: "fas fa-plus",
      name: "Add new playlist",
      handleAction: () => {
        console.log("bleble");
      },
      isAllow: true,
      disable: true,
    },
    
    {
      icon: "fas fa-calendar-plus",
      name: "Add new schedule",
      handleAction: () => {
        console.log("bleble");
      },
      isAllow: false,
      disable: true
    },
  ];

  return (
    <>
      <RightMenu arrayAction={arrayAction} />
      <TableComponent
        //just CHECKBOX, ko co cung duoc
        rowKey={(record:any) => record.id}
        rowSelection={{ type: "checkbox", ...rowSelection }}
        onRow={(record, rowIndex) => ({
          onClick: () => onClickCheckbox(record),
        })}

        
        //PHUC TABLE
        apiServices={api}
        columns={columns}
      />
    </>
  );
};

export default TableData;
