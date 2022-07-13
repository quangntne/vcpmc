import React, { useEffect, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import userPresenter from "@modules/user/presenter";
import listGroupPresenter from "@modules/listGroup/presenter";
import { Option } from "antd/lib/mentions";
import "./styles.scss";
import { utc } from "moment";
import moment from "moment";
import { checkValidSpaces } from "@view/shared/helper/functions";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { common, groupList } from "@view/shared/translateKey";
import { useAsync } from "@view/shared/hook/useAsync";


const ModalUploadListGroup = ({ dataModal, onCancelModal, groupName }) => {
  const [listUser, setListUser] = useState([]);
  const [timeExp, setTimeExp] = useState("");

  // const [timeExp, setTimeExp] = useState("");
  const [imageUrl, setImageUrl] = useState({ url: "", file: "" });
  const [form] = useForm();
  const type = dataModal?.type;

  const { getAllUser } = userPresenter;
  const { addListGroup, updateExtend, updateListGroup } = listGroupPresenter;
  const [addListGroupcall, updateExtendcall, updateListGroupcall] = useAsync(
    addListGroup,
    updateExtend,
    updateListGroup
  );

  const [getAllUsetcall] = useAsync(getAllUser);
  const {
    GROUP_NAME,
    GROUP_CODE,
    EXPIRED,
    SELECT_DATE,
    ADD_GROUP,
    EDIT_GROUP,
    UPDATE_EXPIRED,
  } = useTranslate("groupList");
  const { SAVE, CANCEL } = useTranslate("common");

  const handleFinish = (values) => {
    const id = dataModal?.data[0]?.groupId;

    const postData = new FormData();

    console.log(values);
    const expired = values?.expired?.format("YYYY-MM-DD hh:mm:ss");
    postData.append("Expired", expired == undefined ? "" : expired);
    postData.append("GroupCode", values?.groupCode || "");
    postData.append("GroupName", values?.groupName || "");
    // postData.append("GroupDescription", data?.locationAddress);
    postData.append("ImageGroup", imageUrl?.file || "");

    if (type == "add") {
      addListGroupcall.execute(postData).then((res) => {
        onCancelModal(true);
      });
    } else if (type == "edit") {
      updateListGroupcall.execute(postData, id).then((res) => {
        onCancelModal(true);
      });
    } else if (type == "expired") {
      updateExtendcall.execute(postData, id).then((res) => {
        onCancelModal(true);
      });
    }
  };

  useEffect(() => {
    getAllUsetcall.execute(0).then((res) => setListUser(res));
  }, []);

  useEffect(() => {
    console.log(dataModal?.data);
    if (type != "add") {
      const time = dataModal?.data[0]?.expired
        ? moment(dataModal?.data[0]?.expired)
        : null;
      // console.log(dataModal, "ssss");
      form.setFieldsValue({ ...dataModal?.data[0], expired: time });
      setImageUrl({ ...imageUrl, url: dataModal?.data[0]?.groupImage });
    }
  }, [dataModal]);

  useEffect(() => {
    if (dataModal?.visible == false) {
      form.resetFields();
      setTimeExp("");
    }
  }, [dataModal?.visible]);

  const checkloading = () => {
    return (
      addListGroupcall.status == "loading" ||
      updateListGroupcall.status == "loading" ||
      updateExtendcall.status == "loading"
    );
  };

  const checkDate = (val) => {
    const timestampVal = moment(val).valueOf();
    const timestampNow = moment().valueOf();
    const timestampexpired = moment(dataModal?.data[0]?.expiredAt).valueOf();
    if (timestampVal > timestampNow && timestampVal > timestampexpired) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Modal
        visible={dataModal?.visible}
        title={
          type == "add"
            ? ADD_GROUP
            : type == "edit"
              ? EDIT_GROUP + " " + groupName
              : UPDATE_EXPIRED + " " + groupName
        }
        onOk={form.submit}
        onCancel={() => onCancelModal(false)}
        footer={null}
      >
        <Form
          onFinish={handleFinish}
          form={form}
          className="main-form"
          layout="vertical"
        >
          {type != "expired" && (
            <>
              {" "}
              <Form.Item
                label={GROUP_CODE}
                name="groupCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your Group Code!",
                  },
                  {
                    validator: (rule, value) =>
                      checkValidSpaces(rule, value, "groupCode"),
                  },
                ]}
              >
                <Input className="main-form"></Input>
              </Form.Item>
              <Form.Item
                label={GROUP_NAME}
                name="groupName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Group Name!",
                  },
                  {
                    validator: (rule, value) =>
                      checkValidSpaces(rule, value, "groupName"),
                  },
                ]}
              >
                <Input className="main-form"></Input>
              </Form.Item>

              {/* <Form.Item label="Group Description" name="groupDescription">
            <Input></Input>
          </Form.Item> */}
              {/* <Form.Item
                label={ADMIN}
                name="userAdminId"
                rules={[
                  {
                    required: true,
                    message: "Please select your user Admin Id!",
                  },
                ]}
              >
                <Select
                  // placeholder={Translate(messageKey.MESS_SELECT_ARTICLES_PARENT)}
                  placeholder={SELECT_AD}
                  style={{ width: "100%" }}
                  showSearch
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listUser?.map((item, index) => (
                    <Option value={item?.userId}>{item?.userName}</Option>
                  ))}
                </Select>
              </Form.Item> */}
            </>
          )}
          {type == "add" ||
            (type == "expired" && (
              <>
                <Form.Item
                  label={EXPIRED}
                  name="expired"
                  rules={[
                    {
                      required: true,
                      message: "Please input expired!",
                    },
                    {
                      validator: (rule, value) =>
                        checkValidSpaces(rule, value, "expired"),
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (checkDate(value) == true) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The input times is invalid!")
                        );
                      },
                    }),
                  ]}
                >
                  <DatePicker
                    placeholder={SELECT_DATE}
                    showTime
                    format={"DD/MM/YYYY hh:mm:ss"}
                    onChange={(date, dateString) => setTimeExp(dateString)}
                  />
                </Form.Item>
              </>
            ))}
          <div style={{ width: "100%", textAlign: "right" }}>
            <Button
              className="cancel-button mr-2"
              onClick={() => onCancelModal(false)}
            >
              {CANCEL}
            </Button>
            <Button
              className="normal-button"
              onClick={form.submit}
              loading={checkloading()}
            >
              {SAVE}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalUploadListGroup;
