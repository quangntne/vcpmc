import listContractPresenter from "@modules/revenueDistribution/presenter";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import { useAsync } from "@view/shared/hook/useAsync";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { revenueDistribution } from "@view/shared/translateKey";
import { Button, Col, DatePicker, Form, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import TableMusics from "./TableMusics";
import TableRevenue from "./TableRevenue";
import "../styles.scss";

const DetailRevenue = () => {
  const [dataRowMusic, setDataRowMusic] = useState(null);
  const [date, setDate] = useState({
    dateFrom: "",
    dateTo: "",
  });
  const {
    REVENUE_DISTRIBUTION_DETAIL,
    Quarter,
    Month,
    REVENUE_DISTRIBUTION,
    DateFrom,
    DateTo,
  } = useTranslate("revenueDistribution");
  const { id, type, timeSelect, dateFrom, dateTo }: any = useParams();
  const [form] = Form.useForm();

  const [getDetailContract] = useAsync(listContractPresenter?.detailContract);

  useEffect(() => {
    getDetailContract.execute(id);
    form.setFieldsValue({
      dateFrom: dateFrom != 0 ? moment(dateFrom) : "",
      dateTo: dateTo != 0 ? moment(dateTo) : "",
    });
  }, []);

  console.log(dataRowMusic);

  const onFinish = (values) => {
    const dateFrom = moment(date?.dateFrom || values?.dateFrom).format(
      "YYYY-MM-DD"
    );
    const dateTo = moment(date?.dateTo || values?.dateTo).format("YYYY-MM-DD");
    setDate({ dateFrom, dateTo });
  };

  // const time = `${type == 0 ? Quarter : Month} ` + `${timeSelect}`;

  const data = [
    {
      href: "/revenue-distribution",
      name: REVENUE_DISTRIBUTION,
    },
    {
      name: REVENUE_DISTRIBUTION_DETAIL,
    },
  ];

  return (
    <>
      <MainTitleComponent
        breadcrumbs={data}
        title={
          REVENUE_DISTRIBUTION_DETAIL +
          " - " +
          getDetailContract.value?.detailContract?.authorityContractName
        }
        classBreadcumb={null}
        classTitle={null}
      />
      <div
        style={{ display: "flex", marginBottom: "20px" }}
        className="formDate"
      >
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

      <Row className="w-100">
        <Col span={24}>
          <Row gutter={30}>
            <Col span={15}>
              <TableMusics setDataRowMusic={setDataRowMusic} date={date} />
            </Col>
            <Col span={9}>
              <TableRevenue dataRowMusic={dataRowMusic} date={date} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default DetailRevenue;
