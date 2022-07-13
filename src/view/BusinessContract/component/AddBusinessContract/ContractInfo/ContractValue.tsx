import { updateBusinessContractValue } from "@modules/businessContract/businessContractStore";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { businessContractTranslateKey } from "@view/shared/translateKey";
import { Form, Input, InputNumber } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

const ContractValue = () => {
  const { CONTRACT_VALUE } = useTranslate("businessContractTranslateKey");
  const { MONEY_LESS, MONEY_POSITIVE, MONEY_NUMBER } = useTranslate(
    "businessContractTranslateKey"
  );
  let min = 0;
  const dispatch = useDispatch();
  const onChangeMoney = (value) => {
    dispatch(updateBusinessContractValue(value));
  };
  return (
    <Form.Item
      label={CONTRACT_VALUE}
      name={`BusinessContractValue`}
      rules={[
        { required: true, type: "number", min: min, message: "sai" },
      ]}
    >
      <InputNumber
        min={min}
        onChange={onChangeMoney}
        placeholder="Nhập giá trị"
      />
    </Form.Item>
  );
};

export default ContractValue;
