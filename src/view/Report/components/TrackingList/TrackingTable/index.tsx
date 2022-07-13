import TableComponent from "@view/shared/components/TableComponent";
import { Table } from "antd";
import React from "react";
import "./styles.scss";
const TrackingTable = () => {
  const dataSource1 = [
    {
      id: "1",
      devicename: "Randi Schoen",
      account: "Mrs. Burnice Torp",
      status: false,
      totalview: 26567,
      playlist: {},
      name: "bai hat",
      soluotphat: "10",
    },
    {
      id: "2",
      devicename: "Keely Fahey",
      account: "Hassie McGlynn",
      status: false,
      totalview: 74980,
      playlist: {},
      name: "bai hat",
      soluotphat: "10",
    },
    {
      id: "3",
      devicename: "Dr. Maryam Ledner",
      account: "Ms. Judah Wolff",
      status: false,
      totalview: 81915,
      playlist: {},
      name: "bai hat",
      soluotphat: "10",
    },
    {
      id: "4",
      devicename: "Sabina Ryan",
      account: "Brown Bahringer MD",
      status: false,
      totalview: 33450,
      playlist: {},
      name: "bai hat",
      soluotphat: "10",
    },
    {
      id: "5",
      devicename: "Andre McLaughlin",
      account: "Mitchel Ziemann",
      status: false,
      totalview: 3297,
      playlist: {},
      name: "bai hat",
      soluotphat: "10",
    },
    {
      id: "6",
      devicename: "Mr. Jerad Little",
      account: "Gloria Walker",
      status: false,
      totalview: 63727,
      playlist: {},
      name: "bai hat",
      soluotphat: "10",
    },
    {
      id: "7",
      devicename: "Willie Gaylord",
      account: "Alivia Armstrong",
      status: false,
      totalview: 58715,
      playlist: {},
      name: "bai hat",
      soluotphat: "10",
    },
    {
      id: "8",
      devicename: "Norbert Altenwerth",
      account: "Judge Powlowski",
      status: false,
      totalview: 75289,
      playlist: {},
      name: "bai hat",
      soluotphat: "10",
    },
    {
      id: "9",
      devicename: "Kole Littel",
      account: "Abe Cronin",
      status: false,
      totalview: 53487,
      playlist: {},
      name: "bai hat",
      soluotphat: "10",
    },
    {
      id: "10",
      devicename: "Abagail Schowalter DDS",
      account: "Aleen Nitzsche",
      status: false,
      totalview: 84510,
      playlist: {},
      name: "bai hat",
      soluotphat: "10",
    },
    {
      id: "11",
      devicename: "Delphia Graham",
      account: "Sylvan Spencer",
      status: false,
      totalview: 78253,
      playlist: {},
      name: "bai hat",
      soluotphat: "10",
    },
    {
      id: "12",
      devicename: "Dr. Shyanne Hayes",
      account: "Dr. Delores Thiel",
      status: false,
      totalview: 15062,
      playlist: {},
      name: "bai hat",
      soluotphat: "10",
    },
    {
      id: "13",
      devicename: "Maximillian Upton",
      account: "Jannie Breitenberg",
      status: false,
      totalview: 16798,
      playlist: {},
      name: "bai hat",
      soluotphat: "10",
    },
    {
      id: "14",
      devicename: "Amy Langosh",
      account: "Queen Wilkinson",
      status: false,
      totalview: 17517,
      playlist: {},
      name: "bai hat",
      soluotphat: "10",
    },
    {
      id: "15",
      devicename: "Adaline Glover",
      account: "Niko Mayer",
      status: false,
      totalview: 34310,
      playlist: {},
      name: "bai hat",
      soluotphat: "10",
    },
    {
      id: "16",
      devicename: "Beatrice King PhD",
      account: "Gilbert Huel",
      status: false,
      totalview: 19868,
      playlist: {},
      name: "bai hat",
      soluotphat: "10",
    },
  ];
  const dataSource2 = [
    {
      id: "1",
      list: "Lead Interactions Developer",
      views: 98442,
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/marosholly/128.jpg",
    },
    {
      id: "2",
      list: "Customer Applications Assistant",
      views: 29014,
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/arthurholcombe1/128.jpg",
    },
    {
      id: "3",
      list: "Global Intranet Coordinator",
      views: 2895,
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/traneblow/128.jpg",
    },
    {
      id: "4",
      list: "Forward Integration Manager",
      views: 25276,
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/loganjlambert/128.jpg",
    },
    {
      id: "5",
      list: "National Assurance Strategist",
      views: 88568,
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/michaelbrooksjr/128.jpg",
    },
    {
      id: "6",
      list: "Direct Group Officer",
      views: 40232,
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/sainraja/128.jpg",
    },
    {
      id: "7",
      list: "Global Directives Representative",
      views: 77012,
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/alan_zhang_/128.jpg",
    },
    {
      id: "8",
      list: "Chief Creative Officer",
      views: 46904,
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ryhanhassan/128.jpg",
    },
    {
      id: "9",
      list: "Principal Branding Specialist",
      views: 80860,
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/maximsorokin/128.jpg",
    },
    {
      id: "10",
      list: "Corporate Configuration Planner",
      views: 10942,
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/jehnglynn/128.jpg",
    },
    {
      id: "11",
      list: "Dynamic Integration Liaison",
      views: 53945,
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/mateaodviteza/128.jpg",
    },
    {
      id: "12",
      list: "Regional Accountability Manager",
      views: 77182,
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/marclgonzales/128.jpg",
    },
    {
      id: "13",
      list: "Senior Security Supervisor",
      views: 28621,
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/jcubic/128.jpg",
    },
    {
      id: "14",
      list: "Chief Optimization Analyst",
      views: 56911,
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/nelsonjoyce/128.jpg",
    },
    {
      id: "15",
      list: "Direct Accountability Designer",
      views: 43684,
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/zackeeler/128.jpg",
    },
    {
      id: "16",
      list: "Customer Group Agent",
      views: 19015,
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/danthms/128.jpg",
    },
    {
      id: "17",
      list: "Product Communications Analyst",
      views: 60119,
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/mrebay007/128.jpg",
    },
    {
      id: "18",
      list: "Internal Paradigm Architect",
      views: 77128,
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/nicollerich/128.jpg",
    },
    {
      id: "19",
      list: "Customer Usability Engineer",
      views: 98883,
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/arindam_/128.jpg",
    },
  ];

  const columns1 = [
    {
      title: "DEVICE_NAME",
      dataIndex: "devicename",
      key: "devicename",
    },
    {
      title: "ACCOUNT",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      // key: {status?"active":"Inactive"},
    },
  ];
  const columns2 = [
    {
      title: "Danh sách bài hát",

      dataIndex: "list",
      key: "list",
    },
    {
      title: "Số lượt phát",
      dataIndex: "views",
      key: "views",
    },
  ];

  return (
    <div className="table-container">
      <div className="left-table mt-5 width-50">
        <TableComponent
          dataSource={dataSource1}
          columns={columns1}
          className="main-table"
          langs={["customerTranslateKey"]}
        />
        <div className="polygon"></div>
      </div>

      <div className="width-5"></div>
      <Table
        dataSource={dataSource2}
        pagination={{ defaultPageSize: 5 }}
        columns={columns2}
        className="mt-5 width-45 main-table"
      />
    </div>
  );
};

export default TrackingTable;
