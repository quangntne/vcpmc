import { DownloadOutlined } from "@ant-design/icons";
import listGroupPresenter from "@modules/listGroup/presenter";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import TableComponent from "@view/shared/components/TableComponent";
import useTable from "@view/shared/components/TableComponent/hook";
import { Button, Col, DatePicker, Input, Row, Table } from "antd";
import React from "react";
import "./styles.scss";

const eye_outline = require("@assets/icon/eye-outline.png");

const Report = () => {
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

  const daysOfMonth = new Date(2021, 3, 0).getDate();
  const arrDaysOfMonth = [];

  for (let i = 1; i <= daysOfMonth; i++) {
    arrDaysOfMonth.push(i);
  }
  console.log(arrDaysOfMonth);

  console.log(
    arrDaysOfMonth.map((item) => {
      return { title: item + "", dataIndex: "math" };
    })
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      fixed: "left",
      width: 150,
    },
    ...arrDaysOfMonth.map((item) => {
      return { title: item + "", dataIndex: "math", width: 100 };
    }),
  ];

  const dataTable = [
    {
      key: "1",
      name: "John Brown",
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      key: "2",
      name: "Jim Green",
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      key: "3",
      name: "Joe Black",
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      key: "4",
      name: "Jim Red",
      chinese: 88,
      math: 99,
      english: 89,
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
      <div style={{ width: "100%", textAlign: "right" }}>
        <Input.Search
          style={{ width: 400 }}
          className="ant-form-search mb-3"
          onChange={handleSearch}
        />
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={dataTable}
          bordered={true}
          scroll={{ x: 1500, y: 300 }}
        />
      </div>
    </>
  );
};

export default Report;
