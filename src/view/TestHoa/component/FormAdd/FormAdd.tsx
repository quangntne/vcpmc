import { useTranslate } from "@view/shared/hook/useTranslate";
import { common } from "@view/shared/translateKey";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Menu,
  Radio,
  Row,
  Select,
  TimePicker,
} from "antd";
import React from "react";
import { option_date, option_data, IModal } from "../../interface";

const FormAdd = ({}) => {
  const { ACTION, CANCEL } = useTranslate("common");
  const [value, setValue] = React.useState(1);
  const menu = (
    <Menu className="dropdown-menu">
      <Menu.Item>
        <a>1st menu item</a>
      </Menu.Item>
      <Menu.Item>
        <a>1st menu item</a>
      </Menu.Item>
      <Menu.Item>
        <a>1st menu item</a>
      </Menu.Item>
    </Menu>
  );
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Form
        className="main-form" //important
        layout="vertical" //important
        name="basic"
        initialValues={{ remember: true }}
      >
        <Row gutter={6}>
          <Col span={12}>
            <Radio.Group value={value} onChange={onChange}>
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
            </Radio.Group>
          </Col>
          <Col span={12}>
            <Checkbox>Checkbox</Checkbox>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="Tag name"
              name="tagName"
              rules={[{ required: true, message: "Please input tag name!" }]}
            >
              <Input placeholder="Leave a comment" />
            </Form.Item>
            <Form.Item
              name="repeat type"
              label="repeat type"
              rules={[{ required: true, message: `Must type repeat type` }]}
            >
              <Select
                placeholder="Select"
                allowClear
                onChange={() => {}}
                autoFocus={true}
                className="select-main"
              >
                {option_date.map((item) => (
                  <Select.Option value={item.key} key={item.key}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="group"
              label="group"
              rules={[{ required: true, message: `Must type repeat type` }]}
            >
              <Input.TextArea placeholder="Leave a comment" />
            </Form.Item>

            {/* button with icon  */}
            <Button className="icon-button">
              <i className="fas fa-plus"></i>Icon button
            </Button>
          </Col>
          <Col span={12}>
            <Form.Item label="Password" name="password">
              <Input.Password placeholder="input password" />
            </Form.Item>
            <Form.Item name="repeatype" label="repeat type">
              <DatePicker
                onChange={(time, timeString) => console.log(time, timeString)}
              />
            </Form.Item>
            <Form.Item name="group" label="group">
              <TimePicker
                onChange={(date, dateString) => {
                  console.log(date, dateString);
                }}
              />
            </Form.Item>
            <Dropdown overlay={menu} placement="bottomCenter">
              <Button className="normal-button">Dropdown</Button>
            </Dropdown>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FormAdd;
