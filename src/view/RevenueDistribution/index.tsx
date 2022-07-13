import { EyeOutlined } from "@ant-design/icons";
import { RootState } from "@modules/core/store/redux";
import presenter from "@modules/reportRevenueExploitingContract/presenter";
import listContractPresenter from "@modules/revenueDistribution/presenter";
import FilterByPeriod from "@view/shared/components/FilterByPeriod";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import TableComponent from "@view/shared/components/TableComponent";
import useTable from "@view/shared/components/TableComponent/hook";
import { formatNumberDec } from "@view/shared/helper/functions";
import CheckPermission, {
  CheckPermissionFunc,
} from "@view/shared/hoc/CheckPermission";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { revenueDistribution } from "@view/shared/translateKey";
import { Button, DatePicker, Form, Input, Select, TimePicker } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./styles.scss";

const RevenueDistribution = () => {
  const [dataContract, setDataContract] = useState(null);
  const [date, setDate] = useState({
    dateFrom: "",
    dateTo: "",
  });
  const table = useTable();
  const history = useHistory();
  const [form] = Form.useForm();

  const { listPermissionCode } = useSelector(
    (state: RootState) => state.profile
  );
  const { Option } = Select;
  const {
    REVENUE_DISTRIBUTION,
    CONTRACT_LIST,
    contract_authorization,
    authorityUserName,
    countMedia,
    Revenue,
    vcpmc,
    Author,
    dateLatchData,
    Detail,
    Find_Contract,
    DateFrom,
    DateTo,
  } = useTranslate("revenueDistribution");

  const data = [
    {
      name: REVENUE_DISTRIBUTION,
    },
  ];
  const handleSearch = (e) => {
    const value = e.target.value;
    table.fetchData({
      option: { search: value },
    });
  };

  // const handleChange = ({
  //   dateRange,
  //   dateString,
  //   datePicker,
  //   datePickerString,
  //   type,
  // }) => {
  //   console.log(dateRange);
  //   const dateFrom =
  //     dateRange?.dateFrom == undefined
  //       ? ""
  //       : moment(dateRange?.dateFrom).format("YYYY-MM-DD");
  //   const dateTo =
  //     dateRange?.dateTo == undefined
  //       ? ""
  //       : moment(dateRange?.dateTo).format("YYYY-MM-DD");
  //   const month = moment(dateRange?.dateTo).format("MM");
  //   // console.log(month);
  //   if (type == 1) {
  //     setDate({ dateFrom, dateTo, timeSelect: month, type: type });
  //   } else if (type == 0) {
  //     setDate({ dateFrom, dateTo, timeSelect: datePickerString, type: type });
  //   }

  // table.fetchData({
  //   option: { dateFrom, dateTo },
  // });
  // };

  const columns = [
    {
      title: "STT",
      render: (text, record, index) => (
        <p style={{ marginBottom: 0 }}>
          {(dataContract?.info?.current - 1) * 10 + index + 1}
        </p>
      ),
      width: 100,
    },
    {
      title: contract_authorization,
      dataIndex: "authorityContractName",
      width: 300,
      ellipsis: true,
    },
    {
      title: authorityUserName,
      dataIndex: "authorityUserName",
    },
    {
      title: countMedia,
      dataIndex: "countMedia",
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
    {
      title: vcpmc,
      dataIndex: "vcpmc",
      render: (text, record, index) => (
        <p style={{ marginBottom: 0 }}>
          {formatNumberDec(Math.floor(text) + "", ".", ",")}
        </p>
      ),
    },
    {
      title: Author,
      dataIndex: "author",
      render: (text, record, index) => (
        <p style={{ marginBottom: 0 }}>
          {formatNumberDec(Math.floor(text) + "", ".", ",")}
        </p>
      ),
    },
    CheckPermissionFunc("SHOW_DETAIL_CONTRACT", listPermissionCode)
      ? // true
        {
          title: Detail,
          render: (text, record) => (
            <p
              style={{ cursor: "pointer" }}
              onClick={() =>
                history.push(
                  `/revenue-distribution/detail/${
                    record?.authorityContractId
                  }/${date?.dateFrom || 0}/${date?.dateTo || 0}`
                )
              }
            >
              <EyeOutlined style={{ fontSize: "25px" }} />
            </p>
          ),
        }
      : {},
  ];

  // console.log(CheckPermissionFunc("SHOW_DETAIL_CONTRACT", listPermissionCode));

  const onFinish = (values) => {
    console.log(values);
    const dateFrom = moment(values?.dateFrom).format("YYYY-MM-DD");
    const dateTo = moment(values?.dateTo).format("YYYY-MM-DD");
    setDate({ dateFrom, dateTo });
    table.fetchData({
      option: { dateFrom, dateTo },
    });
  };

  return (
    <>
      <div className="tableContract">
        <MainTitleComponent
          breadcrumbs={data}
          title={REVENUE_DISTRIBUTION}
          classBreadcumb={null}
          classTitle={null}
        />
        {/* <FilterByPeriod onChange={handleChange} /> */}
        <div style={{ display: "flex" }}>
          <Form
            className="main-form"
            layout="inline"
            form={form}
            onFinish={onFinish}
          >
            <div style={{ display: "flex" }}>
              <Form.Item
                label={DateFrom}
                name="dateFrom"
                rules={[
                  {
                    required: true,
                    message: "Please input dateFrom!",
                  },
                ]}
              >
                <DatePicker placeholder={DateFrom} format={"DD/MM/YYYY"} />
              </Form.Item>
              <Form.Item
                label={DateTo}
                name="dateTo"
                rules={[
                  {
                    required: true,
                    message: "Please input dateTo!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      console.log(value);
                      if (
                        !value ||
                        getFieldValue("dateFrom").unix() < value.unix()
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Invalid date!"));
                    },
                  }),
                ]}
              >
                <DatePicker placeholder={"DateTo"} format={"DD/MM/YYYY"} />
              </Form.Item>
              <Button className="normal-button" htmlType="submit">
                Xem dữ liệu
              </Button>
            </div>
          </Form>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <p style={{ fontSize: "18px", color: "#F6F6F6", fontWeight: 600 }}>
            {CONTRACT_LIST}
          </p>
          <Input.Search
            style={{ width: 400 }}
            className="ant-form-search mb-3"
            onChange={handleSearch}
            placeholder={Find_Contract}
          />
        </div>

        <TableComponent
          register={table}
          apiServices={listContractPresenter.getContract}
          columns={columns}
          getDataAfter={(data) => setDataContract(data)}
        />
      </div>
    </>
  );
};

export default RevenueDistribution;
