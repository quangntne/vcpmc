import React, { useEffect, useState } from "react";
import TableComponent from "@view/shared/components/TableComponent";
import { Button, Input } from "antd";
import listGroupPresenter from "@modules/listGroup/presenter";

import useTable from "@view/shared/components/TableComponent/hook";
import listContractPresenter from "@modules/revenueDistribution/presenter";
import { useAsync } from "@view/shared/hook/useAsync";
import ExportCsv from "./ExportCsv";
import { formatNumberDec } from "@view/shared/helper/functions";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { revenueDistribution } from "@view/shared/translateKey";
import { useParams } from "react-router";

const TableRevenue = ({ dataRowMusic, date }) => {
  const [dataCsv, setDataCsv] = useState(null);
  const { id, dateFrom, dateTo }: any = useParams();
  const {
    Revenue,
    BusinessCustomersName,
    countPlaysMedia,
    Detail_Revenue,
    PLAMEDIA,
  } = useTranslate("revenueDistribution");

  const [getAllDetailMedia] = useAsync(listContractPresenter.getAllDetailMedia);

  useEffect(() => {
    if (dataRowMusic != undefined) {
      table.fetchData({
        option: {
          id: dataRowMusic?.mediaId,
          dateFrom: date?.dateFrom || (dateFrom == 0 ? "" : dateFrom),
          dateTo: date?.dateTo || (dateTo == 0 ? "" : dateFrom),
        },
      });
      getAllDetailMedia
        .execute(dataRowMusic?.mediaId, dateFrom, dateTo)
        .then((res) => setDataCsv(res?.data));
    }
  }, [dataRowMusic, date]);

  const table = useTable();

  const handleSearch = (e) => {
    const value = e.target.value;
    table.fetchData({
      option: { search: value, id: dataRowMusic?.mediaId },
    });
  };

  const columns = [
    {
      title: BusinessCustomersName,
      dataIndex: "businessCustomersName",
    },
    {
      title: countPlaysMedia,
      dataIndex: "countPlaysMedia",
      render: (text, record, index) => (
        <p style={{ marginBottom: 0 }}>
          {formatNumberDec(Math.floor(text) + "", ".", ",")}
        </p>
      ),
    },
    {
      title: Revenue,
      dataIndex: "revenue",
      render: (text, record, index) => (
        <p style={{ marginBottom: 0 }}>
          {formatNumberDec(Math.floor(text) + "", ".", ",")}
        </p>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontWeight: 700, fontSize: "19px" }}>{Detail_Revenue}</p>
        <Input.Search
          style={{ width: 300 }}
          placeholder={PLAMEDIA}
          className="ant-form-search mb-3"
          onChange={handleSearch}
        />
      </div>
      <TableComponent
        register={table}
        apiServices={listContractPresenter?.getDetailMedia}
        columns={columns}
        loading={getAllDetailMedia.status == "loading"}
      />
      {dataCsv && <ExportCsv data={dataCsv} type={"detail"} />}
    </>
  );
};

export default React.memo(TableRevenue);
