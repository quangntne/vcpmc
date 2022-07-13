import React from "react";
import { PermissionModule, Permission } from "@modules/roles/interface";
import { Checkbox, Row, Col, Typography, Form } from "antd";
import "./styles.scss";

interface Props {
  lispermission: PermissionModule[];
  defaultValue: Array<string>;
  onChange?: (checkvalue) => void;
  label?: string;
  name?: string;
}

const GroupCheckboxPermission = (props: Props) => {
  const renderCheckboxPernmission = (permissions: Permission[]) => {
    if (permissions?.length > 0)
      return permissions.map((permission: Permission) => {
        {
          return (
            <Col span={12}>
              <Checkbox value={permission.permissionCode}>
                {permission.permissionName}
              </Checkbox>
            </Col>
          );
        }
      });
  };
  const handleChange = (checkvalue) => {
    props.onChange(checkvalue);
  };
  // if (!props.data && props.data.length == 0) {
  //     return null
  // }

  return (
    <Form.Item label={props.label} name={props.name}>
      <Checkbox.Group className="group-check-permission ml-4">
        <Row gutter={[15, 8]}>
          {props.lispermission.map(
            (module: PermissionModule, index: number) => {
              return (
                <Col span={12}>
                  <Row>
                    <Col span={24}>
                      <Typography.Title className={"title-module"} level={4}>
                        {module.module}
                      </Typography.Title>
                    </Col>
                    <Col span={20} offset={2}>
                      <Row gutter={[5, 5]}>
                        {" "}
                        {renderCheckboxPernmission(module.permissions)}
                      </Row>
                    </Col>
                  </Row>{" "}
                </Col>
              );
            }
          )}
        </Row>
      </Checkbox.Group>
    </Form.Item>
  );
};

export default GroupCheckboxPermission;
