import { Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import TypeContract from "./TypeContract";
import { useTranslate } from "@view/shared/hook/useTranslate";
import {
  businessContractTranslateKey,
  common,
} from "@view/shared/translateKey";
import DragContract from "./DragContract";
import ContractValue from "./ContractValue";
import StartEndDay from "./StartEndDay";

const ContractInfo = ({ form }) => {
  const { PLACEHOLDER } = useTranslate("common");
  const { CONTRACT_NAME, CONTRACT_CODE, START_DAY, END_DAY } = useTranslate(
    "businessContractTranslateKey"
  );

  return (
    <>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            label={CONTRACT_NAME}
            name={`businessContractName`}
            rules={[{ required: true, whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={CONTRACT_CODE}
            name={`businessContractCode`}
            rules={[{ required: true, whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <StartEndDay form={form} />
        </Col>
        <Col span={5} push={1}>
          <DragContract />
        </Col>
        <Col span={8} push={5}>
          <TypeContract form={form} />
        </Col>
      </Row>
    </>
  );
};

export default ContractInfo;
