import { useTranslate } from "@hook/useTranslate";
import { common } from "@translateKey/index";
import { Form, Select } from "antd";
import React from "react";
const FormSelect = ({formName = "gender", dataMap}) => {
  const { MUST_TYPE } = useTranslate("common");
  return (
    <Form.Item
      name={formName}
      label={formName}
      rules={[{ required: true, message: `${MUST_TYPE} ${formName}` }]}
    >
      <Select placeholder="Select" allowClear >
        {dataMap.map((item) => (
          <Select.Option value={item.key} key={item.key}>
            {item.value}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default FormSelect;
