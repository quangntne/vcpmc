import { useTranslate } from "@view/shared/hook/useTranslate";
import { revenueDistribution } from "@view/shared/translateKey";
import { Button } from "antd";
import React from "react";
import { CSVLink } from "react-csv";

const ExportCsv = ({ type, data }) => {
  const { EXPORT } = useTranslate("revenueDistribution");
  const headers = [
    { label: "Media Name", key: "mediaName" },
    { label: "Count Plays", key: "countPlays" },
    { label: "Revenue", key: "revenue" },
    { label: "VCPMC", key: "VCPMC" },
    { label: "Author Music", key: "author" },
  ];
  const headersDetails = [
    { label: "Business Customers Name", key: "businessCustomersName" },
    { label: "Count Plays Media", key: "countPlaysMedia" },
    { label: "Revenue", key: "revenue" },
  ];
  return (
    <Button className="normal-button" style={{ marginTop: "40px" }}>
      <CSVLink
        data={data}
        headers={type == "detail" ? headersDetails : headers}
      >
        {EXPORT} .csv
      </CSVLink>
    </Button>
  );
};

export default ExportCsv;
