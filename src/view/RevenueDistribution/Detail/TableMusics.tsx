import React, { useEffect, useState } from "react";
import TableComponent from "@view/shared/components/TableComponent";
import { Button, Dropdown, Input, Menu, Space, Tooltip } from "antd";
import {
  common,
  groupList,
  revenueDistribution,
} from "@view/shared/translateKey";
import listContractPresenter from "@modules/revenueDistribution/presenter";

import useTable from "@view/shared/components/TableComponent/hook";

import "./styles.scss";
import { useAsync } from "@view/shared/hook/useAsync";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { useParams } from "react-router";
import listGroupPresenter from "@modules/listGroup/presenter";
import ExportCsv from "./ExportCsv";
import { formatNumberDec } from "@view/shared/helper/functions";

const TableMusics = ({ setDataRowMusic, date }) => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const table = useTable();
  const { id, dateFrom, dateTo }: any = useParams();

  const [dataCsv, setDataCsv] = useState(null);
  const {
    mediaName,
    CountPlays,
    Author_Music,
    Revenue,
    PLAMUSICS,
    LIST_MUSIC,
  } = useTranslate("revenueDistribution");
  const [getAllMusic] = useAsync(listContractPresenter.getAllMusics);
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: []) => {
      setSelectedRow(selectedRows);
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  useEffect(() => {
    table.fetchData({
      option: {
        id,
        dateFrom: date?.dateFrom || (dateFrom == 0 ? "" : dateFrom),
        dateTo: date?.dateTo || (dateTo == 0 ? "" : dateTo),
      },
    });
    getAllMusic
      .execute(id, dateFrom, dateTo)
      .then((res) => setDataCsv(res?.dataAllMusic));
  }, [id, date]);

  // useEffect(() => {
  //   if (date) {
  //     table.fetchData({
  //       option: { id, dateFrom: date?.dateFrom, dateTo: date?.dateTo },
  //     });
  //   }
  // }, [date]);

  const handleSearch = (e) => {
    const value = e.target.value;
    table.fetchData({
      option: { search: value, id: id },
    });
  };
  const handleClickOnRow = (record) => {
    console.log(record);
    setDataRowMusic(record);
    const isInArr = selectedRowKeys.includes(record?.mediaId);
    if (isInArr == false) {
      setSelectedRow([record]);
      setSelectedRowKeys([record?.mediaId]);
    } else {
      const a = [...selectedRowKeys];
      const b = [...selectedRow];
      const index = a.findIndex((item) => item == record?.mediaId);
      a.splice(index, 1);
      b.splice(index, 1);
      setSelectedRow(b);
      setSelectedRowKeys(a);
    }
  };

  const titleTable = (title, total) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <span>{title}</span>
        <span>({formatNumberDec(Math.floor(total) + "", ".", ",")})</span>
      </div>
    );
  };

  const columns = [
    {
      title: `mediaName` + `\n${""}`,
      dataIndex: "mediaName",
      width: 300,
      // colSpan: 3,
    },
    {
      title: titleTable(`${CountPlays}`, `${dataCsv?.totalCountPlaysMedia}`),
      width: "15%",
      dataIndex: "countPlays",
    },
    {
      title: titleTable(`${Revenue}`, `${dataCsv?.totalPrice}`),
      dataIndex: "revenue",
      render: (text, record, index) => (
        <p style={{ marginBottom: 0 }}>
          {formatNumberDec(Math.floor(text) + "", ".", ",")}
        </p>
      ),
      width: "15%",
    },
    {
      title: titleTable(`VCPMC`, `${dataCsv?.totalVCPMC}`),
      dataIndex: "vcpmc",
      render: (text, record, index) => (
        <p style={{ marginBottom: 0 }}>
          {formatNumberDec(Math.floor(text) + "", ".", ",")}
        </p>
      ),
      width: "15%",
    },
    {
      title: titleTable(`${Author_Music}`, `${dataCsv?.totalAuthor}`),
      dataIndex: "author",
      render: (text, record, index) => (
        <p style={{ marginBottom: 0 }}>
          {formatNumberDec(Math.floor(text) + "", ".", ",")}
        </p>
      ),
      width: "15%",
    },
  ];

  return (
    <div className="table-musics">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontWeight: 700, fontSize: "19px" }}>{LIST_MUSIC}</p>
        <Input.Search
          style={{ width: 300 }}
          placeholder={PLAMUSICS}
          className="ant-form-search mb-3"
          onChange={handleSearch}
        />
      </div>

      <TableComponent
        register={table}
        apiServices={listContractPresenter?.getMusics}
        columns={columns}
        getDataAfter={(data) => handleClickOnRow(data?.data[0])}
        onRow={(record, rowIndex) => ({
          onClick: () => {
            handleClickOnRow(record);
          },
        })}
        rowSelection={{ type: "radio", ...rowSelection }}
        rowKey={"mediaId"}
        loading={getAllMusic?.status == "loading"}
      />
      {dataCsv && <ExportCsv data={dataCsv?.pagedData} type={"music"} />}
    </div>
  );
};

export default React.memo(TableMusics);
