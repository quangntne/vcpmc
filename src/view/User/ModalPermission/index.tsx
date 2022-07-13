import React, { useEffect, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import userPresenter from "@modules/user/presenter";
import { useAsync } from "@view/shared/hook/useAsync";
import "./styles.scss";

const ModalPermision = ({ dataModalPer, onCancelModalPer, userData }) => {
  const CheckboxGroup = Checkbox.Group;
  const [listPermission, setListPermission] = useState(null);
  const [userPermission, setUserPermission] = useState(null);
  const [form] = useForm();
  const {
    getAllPermissionUserSystem,
    updatePermission,
    getPermissionUser,
  } = userPresenter;
  const [
    getAllPermissionUserSystemcall,
    updatePermissioncall,
    getPermissionUsercall,
  ] = useAsync(getAllPermissionUserSystem, updatePermission, getPermissionUser);

  useEffect(() => {
    getAllPermissionUserSystemcall
      .execute()
      .then((res) => setListPermission(res));
  }, []);

  useEffect(() => {
    if (dataModalPer?.visible == false) {
      form.resetFields();
    } else {
      getPermissionUsercall
        .execute(userData?.userId)
        .then((res) =>
          setUserPermission(res?.map((item) => item?.permissionCode))
        );
    }
  }, [dataModalPer?.visible]);

  // console.log(listPermission);

  const handleFinish = (values) => {
    const body = {
      permissionCodes: userPermission,
    };
    // console.log(body);
    updatePermissioncall.execute(body, userData?.userId).then((res) => {
      return onCancelModalPer(true);
    });
  };

  const onChange = (val) => {
    setUserPermission(val);
  };

  return (
    <div>
      <Modal
        visible={dataModalPer?.visible}
        title={"PERMISSION"}
        onOk={form.submit}
        onCancel={() => onCancelModalPer(false)}
        footer={null}
        className="modalPermission"
        width={850}
      >
        <Form
          onFinish={handleFinish}
          form={form}
          className="main-form"
          layout="vertical"
        >
          <Checkbox.Group onChange={onChange} value={userPermission}>
            <Row>
              {listPermission?.map((item) => {
                return (
                  <>
                    <Col span={12}>
                      <Form.Item label={item?.module} name={item?.module}>
                        <Row className={"px-3"}>
                          {item?.permissions?.map(
                            (permissionItem, index: number) => {
                              return (
                                <Col
                                  key={index}
                                  span={12}
                                  style={{ marginBottom: "5px" }}
                                >
                                  <Checkbox
                                    value={permissionItem?.permissionCode}
                                  >
                                    {permissionItem?.permissionName}
                                  </Checkbox>
                                </Col>
                              );
                            }
                          )}
                        </Row>
                        {/* </Checkbox.Group> */}
                      </Form.Item>
                    </Col>
                  </>
                );
              })}
            </Row>
          </Checkbox.Group>

          <div style={{ width: "100%", textAlign: "right", marginTop: "5px" }}>
            <Button
              className="cancel-button mr-2"
              onClick={() => onCancelModalPer(false)}
            >
              {"CANCEL"}
            </Button>
            <Button className="normal-button" onClick={form.submit}>
              {"SAVE"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalPermision;
