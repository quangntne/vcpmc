import ListPermission from "./ListPermission";
import rolePresenter from "@modules/roles/presenter";
import { validateMessages } from "@view/shared/helper/functions";
import { useAsync } from "@view/shared/hook/useAsync";
import { useTranslate } from "@view/shared/hook/useTranslate";
import React, { useEffect } from "react";
import GroupCheckboxPermission from "../GroupCheckboxPermission";
import { Button, Checkbox, Col, Form, Input, Row, Select, message } from "antd";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import { routerRole } from "@config/path";
import { useHistory, useParams } from "react-router";
import RoleEntity from "@modules/roles/entity";
import { useSelector } from "react-redux";

const AddRole = () => {
  const {
    ADD_NEW_ROLE,
    ROLE_NAME,
    ROLE_CODE,
    PERMISSIONS,
    Description,
    ROLE,
    ADD,
    EDIT,
    ROLES,
    CANCEL,
    SAVE,
  } = useTranslate("roleTranslateKey", "playlistTranslateKey", "common");
  const [form] = Form.useForm();
  const param: any = useParams();
  const history = useHistory();

  const roleEdited = useSelector(state => state.roleStore.roleEdited);
  const checkedListPermission = useSelector(state => state.roleStore.checkedListPermission)

  const [getListPermission, getRoleDetail, createNewRole, updateRoleById] = useAsync(
    rolePresenter.getPermissionsByType,
    rolePresenter.getRoleDetail,
    rolePresenter.addRole,
    rolePresenter.updateRole
  );

  useEffect(() => {
    if(roleEdited?.roleId){
      form.setFieldsValue(roleEdited)
    }else{
      form.resetFields();
    }
  }, [])


  const onFinishFailed = (err)=> {
    console.log('onFinishFailed', err)
  }
  const handleFinish = (values) => {
    if(param?.roleId){
      // update
      if( checkedListPermission.length<1){
        return message.info('Select Function');
      }else{
        updateRoleById.execute(
          {
            ...roleEdited,
            roleName: values.roleName,
            roleDesciption: values.roleDesciption,
            permissionCodes: checkedListPermission,
          },
          param.roleId
        )
      }

    }else{
      // add
      if(checkedListPermission.length<1){
        return message.info('Select Function')
      } else {
        let newRole = {
          roleName: values.roleName,
          roleDescription: values.roleDescription,
          permissionCodes: checkedListPermission,
          businessOrganizationId: null,
        };
        createNewRole.execute( newRole );
      }
    }


    // if (props.data && props.data.roleId) {
    //   const newPayload = {
    //     roleName: values["roleName"],
    //     permissionIds: values["permissionIds"],
    //   };
    //   updateRoleAsync(newPayload, props.data.roleId).then((res) => {
    //     handleCancel(res);
    //   });
    // } else {
    //   addRoleAsync(values).then((res) => {
    //     handleCancel(res);
    //   });
    // }
  };
  const handleCancel = (data) => {
    // form.resetFields();
    // props.onCancel(data);
  };
  const [role, setRole] = React.useState<RoleEntity>(null);

  // useEffect(() => {
  //   getListPermission.execute();
  //   getRoleDetail.execute(param?.roleId).then((res:RoleEntity) => {
  //     console.log('res', res);
  //     setRole(res);
  //     form.setFieldsValue(res);
  //   });
  // }, []);

  return (
    <>
      <MainTitleComponent
        breadcrumbs={[
          { name: ROLE, href: routerRole.USER_AND_ROLE },
          { name: `${param?.roleId ? EDIT : ADD} ${ROLES}` },
        ]}
      />
      <Form
        layout="vertical"
        form={form}
        name="role-form"
        onFinish={handleFinish}
        onFinishFailed={onFinishFailed}
        className={"quang-tran-form"}
      >
        <Row gutter={32}>
          <Col span={10}>
            <Form.Item
              label={ROLE_NAME}
              name="roleName"
              messageVariables={validateMessages()}
              rules={[{ required: true }, { whitespace: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={Description}
              name="roleDescription"
              messageVariables={validateMessages()}
              rules={[{ required: true }, { whitespace: true }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={14}>
            <ListPermission permission={role?.permissions}/>
          </Col>
        </Row>
        <div className="d-flex justify-content-center mt-5">
          <Form.Item>
            <Button className="mr-3 cancel-button"
              onClick={()=> history.push(routerRole.USER_AND_ROLE)}
            >{ CANCEL }</Button>
          </Form.Item>

          <Form.Item >
            <Button htmlType="submit" className="normal-button">{ SAVE }</Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default AddRole;
