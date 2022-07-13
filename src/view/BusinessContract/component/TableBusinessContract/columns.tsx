import { useTranslate } from "@view/shared/hook/useTranslate";
import { Tooltip } from "antd";
import moment from "moment";
import React from "react";
import { useRouter } from "@helper/functions";
import { routerBusinessContract } from "@config/path";
import BusinessContractEntity from "@modules/businessContract/entity";
import { useHistory } from "react-router";
import StatusCircle from "../DetailBusinessContract/StatusCircle";

const BusinessContractColumns = () => {
  const { COPY_CONTRACT, New, Expired, Time_Left, Canceled, DETAIL } =
    useTranslate(
      "aucontractTranslateKey",
      "businessContractTranslateKey",
      "common"
    );

  const renderStatusAuContract = (data) => {
    console.log(data, "renderStatusAuContract");
    
    switch (data) {
      case 1:
        return (
          <div className="d-flex  align-items-center">
            <div className="circle-status circle-new" />
            {New}
          </div>
        );
      case 2:
        return (
          <div className="d-flex  align-items-center">
            <div className="circle-status circle-time-left" />
            {Expired}
          </div>
        );
      case 3:
        return (
          <div className="d-flex  align-items-center">
            <div className="circle-status circle-expired" />
            {Time_Left}
          </div>
        );
      case 4:
        return (
          <div className="d-flex  align-items-center">
            <div className="circle-status circle-cancel" />
            {Canceled}
          </div>
        );
    }
  };

  const ellipsip = {
    ellipsis: {
      showTitle: false,
    },
    render: (text) => (
      <Tooltip placement="bottomLeft" title={text}>
        {text}
      </Tooltip>
    ),
  };
  const history = useHistory();
  return [
    {
      ...ellipsip,
      title: "CONTRACT_CODE",
      dataIndex: "businessContractCode",
      // className: "main-column",
    },
    {
      ...ellipsip,
      title: "CUSTOMER",
      dataIndex: "businessContractName",
    },
    {
      ...ellipsip,
      title: "Create_at",
      dataIndex: "businessContractCreatedAt",
      render: (text, record) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Date_Au",
      dataIndex: "businessContractStart",
      render: (text, record) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Date_Au_Ex",
      dataIndex: "businessContractEnd",
      render: (text, record) => moment(text).format("DD/MM/YYYY"),
    },
    {
      ...ellipsip,
      title: "THIS_CONTRACT_TYPE",
      dataIndex: "businessContractType",
      render: (text, record) => <StatusCircle data={record} />,
    },
    {
      render: (text, record: BusinessContractEntity) => (
        <span
          className="btn-detail cursor-pointer"
          onClick={() =>
            history.push(
              `${routerBusinessContract.DETAIL_BUSINESS_CONTRACT}/${record?.businessContractId}`
            )
          }
        >
          {DETAIL}
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "",
      render: (text, record: BusinessContractEntity) => (
        <span
          className="btn-detail cursor-pointer"
          onClick={() => {
            history.push(
              `${routerBusinessContract.COPY_BUSINESS_CONTRACT}/${record.businessContractId}`
            );
          }}
        >
          {COPY_CONTRACT}
        </span>
      ),
    },
  ];
};

export default BusinessContractColumns;
