import React, { useEffect } from "react";

import { Role } from "@modules/roles/interface"
import Modal from 'antd/lib/modal/Modal';
import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd';
import rolePresenter from '@modules/roles/presenter';
import { useSelector } from 'react-redux';
import { RootState } from '@modules/core/store/redux';
import { useTranslate } from '@view/shared/hook/useTranslate';
import { common, roleTranslateKey } from '@view/shared/translateKey';
import { validateMessages } from '@view/shared/helper/functions';
import { useAsync } from '@view/shared/hook/useAsync';
import GroupCheckboxPermission from '../GroupCheckboxPermission';

interface Props {
  visible: boolean;
  data?: Role;
  onCancel: (data: Role) => void;
}

const ModalAddRole = (props: Props) => {
  const { SAVE, CANCEL } = useTranslate("common");

  const { ADD_NEW_ROLE, ROLE_NAME, ROLE_CODE, PERMISSIONS } = useTranslate("roleTranslateKey")
  const { addRole, getPermissionsByType, updateRole } = rolePresenter;
  const [{ execute: addRoleAsync, status: statusAddRole },
    { execute: updateRoleAsync, status: statusUpdateRole }] = useAsync(addRole, updateRole)
  const { listPermission, status } = useSelector((state: RootState) => state.roleStore)
  const { user } = useSelector((state: RootState) => state.profile)
  const [form] = Form.useForm();
  useEffect(() => {
    if (status != "success" && props.visible) getPermissionsByType();
    if (props.data) {
      form.setFieldsValue({
        ...props.data,
        permissionIds: props.data.permissions,
      });
    }
  }, [status, props.visible]);
  const handleCancel = (data) => {
    form.resetFields();
    props.onCancel(data);
  };
  const handleFinish = (values) => {
    if (props.data && props.data.roleId) {
      const newPayload = {
        roleName: values["roleName"],
        permissionIds: values["permissionIds"]
      }

      updateRoleAsync(newPayload, props.data.roleId).then((res) => {
        handleCancel(res)
      })
    } else {
      addRoleAsync(values).then((res) => {
        handleCancel(res)
      })
    }
  }
  const handleChangPermission = (checkValue) => {

  }
  return (
    <Modal
      maskClosable={false}
      width={1080}
      visible={props.visible}
      title={props.data ? `Edit ${props.data.roleName}` : ADD_NEW_ROLE}
      onCancel={handleCancel}
      className={"main-modal"}
      destroyOnClose
      footer={
        <Row justify={"end"}>
          <Col> <Button className="normal-button mx-2" loading={statusAddRole == "loading" || statusUpdateRole == "loading"} onClick={() => form.submit()}>{SAVE} </Button></Col>
          <Col> <Button className="cancel-button mx-2" disabled={statusAddRole == "loading" || statusUpdateRole == "loading"} onClick={handleCancel}>{CANCEL} </Button></Col>
        </Row>
      }
    >
      <Form form={form} onFinish={handleFinish} className={"main-form"} >
        <Form.Item label={ROLE_NAME} name="roleName" messageVariables={validateMessages()} rules={[{ required: true }, { whitespace: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label={ROLE_CODE} name="roleCode" messageVariables={validateMessages()} rules={[{ required: true }, { whitespace: true }]}>
          <Input disabled={!!props.data} />
        </Form.Item>

        <Row >
          <GroupCheckboxPermission lispermission={listPermission}
            label={PERMISSIONS} name="permissionIds"
            defaultValue={props.data?.permissions}
            onChange={handleChangPermission} />

        </Row>


      </Form>
    </Modal >
  )
}

export default ModalAddRole;
