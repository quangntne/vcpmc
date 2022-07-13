import React, { useEffect, useState } from "react";
import { Col, Form, Input, Row, Radio, Button, DatePicker, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "./styles.scss";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import UploadMediaComponent from "@view/shared/components/UpLoadComponent/UploadMediaComponent";
import RepositoryDevice from "@modules/devices/repository";
import { useAsync } from "@hook/useAsync";
import * as moment from "moment";
import { useRouter, validateMessages } from "@view/shared/helper/functions";
import { useTranslate } from "@hook/useTranslate";
import { common, deviceTranslateKey } from "@translateKey/index";
import UilCalendarAlt from "@iconscout/react-unicons/icons/uil-calendar-alt";
import UilEye from "@iconscout/react-unicons/icons/uil-eye";
import UilEyeSlash from "@iconscout/react-unicons/icons/uil-eye-slash";
import UilPlusCircle from "@iconscout/react-unicons/icons/uil-plus-circle";
import NoteForm from "@view/shared/components/NoteForm";

const { TextArea } = Input;

const DeviceAdd = (props) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [imgURL, setImgURL] = useState({ url: null, file: null });
  const [{ execute: create, status }] = useAsync(RepositoryDevice.createDevice);
  const {
    Device_Name,
    MAC_Address,
    SKU_ID,
    Warranty_Expired,
    Location,
    Add_Setting,
    Setting,
    Note,
    Login_Name,
    Password,
    Re_Password,
    Save,
    Cancel_Text,
    Length_Pass,
    Add_Device,
    Device,
    Whitespace,
    Miss_Key,
    Miss_Value,
  } = useTranslate("deviceTranslateKey");
  const { VALIDATE_REQUIRE } = useTranslate("common");


  const onFinish = (values: any) => {
    const setting = {};
    if (values.DeviceSetting) {
      values.DeviceSetting.forEach((item) => (setting[item.key] = item.value));
    }
    values.DeviceSetting = setting;

    const frmData = new FormData();
    frmData.append("DeviceName", values.DeviceName);
    frmData.append("Image", imgURL.file);
    frmData.append("LoginName", values.LoginName);
    frmData.append("DevicePass", values.DevicePass);
    // frmData.append("DeviceStatus", values.DeviceStatus);
    frmData.append("DeviceComment", values.DeviceComment || "");
    frmData.append("DeviceMemory", values.DeviceMemory || 0);
    // frmData.append("DeviceTypeId", values.DeviceTypeId);
    frmData.append("DeviceLocation", values.DeviceLocation);
    frmData.append(
      "DeviceExpired",
      moment(values.DeviceExpired).format("YYYY/MM/DD")
    );
    // frmData.append(
    //     "DeviceLicenseFrom",
    //     moment(values.DeviceLicenseFrom).format("YYYY/MM/DD")
    // );
    frmData.append("DeviceMACAddress", values.DeviceMACAddress);
    frmData.append("DeviceSku", values.DeviceSku);

    create(frmData).then((res) => {
      onReset();
      setImgURL({ url: null, file: null });
      router.push("/device");
    });
  };

  const onReset = () => {
    form.resetFields();
    router.push("/device");
  };

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };


  return (
    <div >
      <MainTitleComponent
        breadcrumbs={[{ name: Device, href: "/device" }, { name: Add_Device }]}
        title={Add_Device}
      />

      <div className="w-100 device-add">
        <Form
          {...layout}
          labelAlign={"left"}
          form={form}
          onFinish={onFinish}
          className="device-add-form"
          validateMessages={validateMessages()}
        >
          <Row gutter={24} className="m-0">
            <Col xl={{ span: 12 }} xxl={{ span: 8 }}>
              <Form.Item
                label={Device_Name}
                required
                name="DeviceName"
                rules={[
                  {
                    required: true,
                  },
                  {
                    whitespace: true,
                    message: Whitespace,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={SKU_ID}
                required
                name="DeviceSku"
                rules={[
                  {
                    required: true,
                  },
                  {
                    whitespace: true,
                    message: Whitespace,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={MAC_Address}
                required
                name="DeviceMACAddress"
                rules={[
                  {
                    required: true,
                  },
                  {
                    whitespace: true,
                    message: Whitespace,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={Warranty_Expired}
                required
                name="DeviceExpired"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  placeholder={`dd/mm/yyyy`}
                  style={{ width: "200px" }}
                  suffixIcon={[
                    <>
                      <UilCalendarAlt size={18} color={"#FF7506"} />
                    </>,
                  ]}
                />
              </Form.Item>

              <Form.Item label={Setting}>
                <Form.List name="DeviceSetting">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <div key={key} className="list-setting">
                          <Form.Item
                            {...restField}
                            name={[name, "key"]}
                            fieldKey={[fieldKey, "key"]}
                            rules={[{ required: true, message: Miss_Key }]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "value"]}
                            fieldKey={[fieldKey, "value"]}
                            rules={[{ required: true, message: Miss_Value }]}
                          >
                            <Input />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                      ))}
                      <span
                        className="float-right cursor-pointer"
                        onClick={() => add()}
                      >
                        <UilPlusCircle size={18} color={"#FF7506"} />{" "}
                        <span className="label-add-setting">{Add_Setting}</span>
                      </span>
                    </>
                  )}
                </Form.List>
              </Form.Item>

              <Form.Item label={Note} name="DeviceComment">
                <TextArea autoSize={{ minRows: 5 }} />
              </Form.Item>
            </Col>

            <Col xl={{ span: 12 }} xxl={{ span: 8, push: 7 }}>
              <Form.Item
                label={Login_Name}
                required
                name="LoginName"
                rules={[
                  { required: true, message: Miss_Key },
                  {
                    whitespace: true,
                    message: Whitespace,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                className="pass-word"
                label={Password}
                required
                name="DevicePass"
                rules={[
                  {
                    required: true,
                  },
                  {
                    min: 8,
                    message: Length_Pass,
                  },
                  {
                    whitespace: true,
                  },
                ]}
              >
                {/*<Input.Password style={{width: "300px"}}/>*/}
                <Input.Password
                  iconRender={(visible) =>
                    visible ? (
                      <UilEyeSlash size={18} color={"#FF7506"} />
                    ) : (
                      <UilEye size={18} color={"#FF7506"} />
                    )
                  }
                />
              </Form.Item>
              <Form.Item
                className="pass-word"
                label={Re_Password}
                required
                name="rePassword"
                dependencies={["DevicePass"]}
                rules={[
                  { required: true, message: Miss_Value },
                  {
                    whitespace: true,
                    message: Whitespace,
                  },
                ]}
              >
                {/*<Input.Password style={{width: "300px"}}/>*/}
                <Input.Password
                  iconRender={(visible) =>
                    visible ? (
                      <UilEyeSlash size={18} color={"#FF7506"} />
                    ) : (
                      <UilEye size={18} color={"#FF7506"} />
                    )
                  }
                />
              </Form.Item>
              <Form.Item
                label={Location}
                required
                name="DeviceLocation"
                rules={[
                  {
                    required: true,
                  },
                  {
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <NoteForm/>
          <div className="d-flex justify-content-center list-btn">
            <Button
              htmlType="button"
              onClick={onReset}
              className="cancel-button"
            >
              {Cancel_Text}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="normal-button"
              loading={status == "loading"}
            >
              {Save}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default DeviceAdd;
