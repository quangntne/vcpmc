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
import {
  checkNumberPhone,
  checkValidSpaces,
  correctEmail,
} from "@view/shared/helper/functions";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { common, groupList } from "@view/shared/translateKey";
import { useParams } from "react-router";
import { useAsync } from "@view/shared/hook/useAsync";
import UploadMediaComponent from "@view/shared/components/UploadMediaComponent/UploadMediaComponent";

const ModalUploadUser = ({ dataModal, onCancelModal, userName }) => {
  const [listRole, setListRole] = useState([]);
  const [timeExp, setTimeExp] = useState("");
  const {
    USER_NAME,
    USER_EMAIL,
    PASSWORD,
    STATUS,
    CONFIRM_PASSWORD,
    USER_PHONE,
    EXPIRED,
    ROLE,
    ADD_USER,
    EDIT_USER,
    UPDATE_EXPIRED,
    SELECT_DATE,
    SELECT_ROLE,
  } = useTranslate("groupList");

  const { addUser, updateUser, updateExtend, getAllRoleUser } = userPresenter;

  const [
    addUsercall,
    updateUsercall,
    updateExtendcall,
    getAllRoleUsercall,
  ] = useAsync(addUser, updateUser, updateExtend, getAllRoleUser);

  const { CANCEL, SAVE } = useTranslate("common");

  const [form] = useForm();
  const type = dataModal?.type;
  const { idGroup } = useParams<{idGroup:any}>();

  const handleFinish = (values) => {
    const id = dataModal?.data[0]?.userId;
    values.expiredAt = values?.expiredAt?.format("YYYY-MM-DD hh:mm:ss");
    if (type == "add") {
      const bodyAdd = { ...values, userLevel: "1" };
      addUsercall.execute(bodyAdd).then((res) => {
        onCancelModal(true);
      });
    } else if (type == "edit") {
      updateUsercall.execute(values, id).then((res) => {
        onCancelModal(true);
      });
    } else if (type == "expired") {
      updateExtendcall.execute(values, id).then((res) => {
        onCancelModal(true);
      });
    }
  };

  useEffect(() => {
    getAllRoleUsercall.execute().then((res) => setListRole(res));
  }, []);

  useEffect(() => {
    if (type != "add") {
      const time = dataModal?.data[0]?.expiredAt
        ? moment(dataModal?.data[0]?.expiredAt)
        : null;
      form.setFieldsValue({ ...dataModal?.data[0], expiredAt: time });
    }
  }, [dataModal]);

  useEffect(() => {
    if (dataModal?.visible == false) {
      form.resetFields();
      setTimeExp("");
    }
  }, [dataModal?.visible]);

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
            ? ADD_USER
            : type == "edit"
            ? EDIT_USER + " " + userName
            : UPDATE_EXPIRED + " " + userName
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
          {type == "expired" ? (
            <Form.Item
              label={EXPIRED}
              name="expiredAt"
              rules={[
                {
                  required: true,
                  message: "Please input Expired!",
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
                showTime
                // defaultValue={""}
                format={"DD/MM/YYYY HH:mm:ss"}
                onChange={(date, dateString) => setTimeExp(dateString)}
              />
            </Form.Item>
          ) : (
            <>
              <Form.Item
                label={USER_NAME}
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "Please input userName!",
                  },
                  {
                    validator: (rule, value) =>
                      checkValidSpaces(rule, value, "userName"),
                  },
                ]}
              >
                <Input className="main-form"></Input>
              </Form.Item>

              {type == "add" && (
                <>
                  {" "}
                  <Form.Item
                    label={USER_EMAIL}
                    name="userEmail"
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (correctEmail(value) == true) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("The input is not valid Email!")
                          );
                        },
                      }),
                      {
                        required: true,
                        message: "Please input userEmail!",
                      },
                      {
                        validator: (rule, value) =>
                          checkValidSpaces(rule, value, "userEmail"),
                      },
                    ]}
                  >
                    <Input className="main-form"></Input>
                  </Form.Item>
                  <Form.Item
                    label={PASSWORD}
                    name="userPass"
                    rules={[
                      {
                        required: true,
                        message: "Please input Password!",
                      },
                      {
                        validator: (rule, value) =>
                          checkValidSpaces(rule, value, "userPass"),
                      },
                    ]}
                  >
                    <Input className="main-form" type="password"></Input>
                  </Form.Item>
                  <Form.Item
                    label={CONFIRM_PASSWORD}
                    name="userPassConfirm"
                    dependencies={["userPass"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input confirm Password!",
                      },
                      {
                        validator: (rule, value) =>
                          checkValidSpaces(rule, value, "userPassConfirm"),
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("userPass") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input className="main-form" type="password"></Input>
                  </Form.Item>
                  <Form.Item
                    label={USER_PHONE}
                    name="userPhone"
                    rules={[
                      {
                        required: true,
                        message: "Please input User Phone!",
                      },
                      {
                        validator: (rule, value) =>
                          checkValidSpaces(rule, value, "userPhone"),
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (checkNumberPhone(value) == true) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("The input is not valid Phone number!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input className="main-form"></Input>
                  </Form.Item>
                </>
              )}
              {/* <Form.Item label="Group Description" name="groupDescription">
            <Input></Input>
          </Form.Item> */}
              <Form.Item
                label={ROLE}
                name="roleId"
                rules={[
                  {
                    required: true,
                    message: SELECT_ROLE,
                  },
                  {
                    validator: (rule, value) =>
                      checkValidSpaces(rule, value, "roleId"),
                  },
                ]}
              >
                <Select
                  // placeholder={Translate(messageKey.MESS_SELECT_ARTICLES_PARENT)}
                  placeholder={SELECT_ROLE}
                  style={{ width: "100%" }}
                  showSearch
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listRole?.map((item, index) => (
                    <Option value={item?.roleId}>{item?.roleName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </>
          )}

          <div style={{ width: "100%", textAlign: "right" }}>
            <Button
              className="cancel-button mr-2"
              onClick={() => onCancelModal(false)}
            >
              {CANCEL}
            </Button>
            <Button className="normal-button" onClick={form.submit}>
              {SAVE}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalUploadUser;
