import { DownloadOutlined } from "@ant-design/icons";
import listGroupPresenter from "@modules/listGroup/presenter";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import TableComponent from "@view/shared/components/TableComponent";
import useTable from "@view/shared/components/TableComponent/hook";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { customerTranslateKey } from "@view/shared/translateKey";
import { Button, Col, DatePicker, Input, Row } from "antd";
import React from "react";
import "./styles.scss";

const eye_outline = require("@assets/icon/eye-outline.png");

const Report = () => {
  const {
    STT,
    DEVICE_NAME,
    ACCOUNT,
    STATUS,
    TOTAL_DISPENSATION,
    NUMBER_OF_PLAYS,
    MUSIC,
  } = useTranslate("customerTranslateKey");

  const data = [
    {
      name: "REPORT",
    },
  ];
  const table = useTable();

  const handleSearch = (e) => {
    const value = e.target.value;
    table.fetchData({
      option: { search: value },
    });
  };

  const columnsDevices = [
    {
      title: STT,
      dataIndex: "totalDevice",
      width: 50,
    },
    {
      title: DEVICE_NAME,
      dataIndex: "groupName",
      render: (text) => text,
    },
    {
      title: ACCOUNT,
      dataIndex: "groupName",
      render: (text, record) => record?.admin?.userName,
    },
    {
      title: STATUS,
      dataIndex: "groupName",
    },
    {
      title: TOTAL_DISPENSATION,
      dataIndex: "totalDevice",
    },
  ];
  const columnsMusics = [
    {
      title: STT,
      dataIndex: "totalDevice",
    },
    {
      title: MUSIC,
      dataIndex: "groupCode",
      render: (text) => text,
    },
    {
      title: NUMBER_OF_PLAYS,
      dataIndex: "totalDevice",
      // render: (text, record) => record?.admin?.userName,
    },
  ];

  return (
    <>
      <MainTitleComponent
        breadcrumbs={data}
        title={"LIST CUSTOMER"}
        classBreadcumb={null}
        classTitle={null}
      />
      <div className="actionHeader">
        <div className="filter">
          <p style={{ marginRight: "10px" }}>Từ ngày</p>{" "}
          <DatePicker></DatePicker> <p>Đến ngày</p> <DatePicker></DatePicker>
        </div>
        <div className="export">
          <Button>
            Xuất dữ liệu <DownloadOutlined />
          </Button>
        </div>
      </div>
      <Row gutter={[50, 50]}>
        <Col span={16}>
          <div>
            <TableComponent
              register={table}
              apiServices={listGroupPresenter.getInfor}
              columns={columnsDevices}
              // rowSelection={rowSelection}
              // rowKey={"groupId"}
            />
          </div>
        </Col>
        <Col span={8}>
          <div>
            <TableComponent
              register={table}
              apiServices={listGroupPresenter.getInfor}
              columns={columnsMusics}
              // rowSelection={rowSelection}
              // rowKey={"groupId"}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Report;
