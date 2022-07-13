import React, { useEffect, useState } from "react";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import TableComponent from "@view/shared/components/TableComponent";
import { Table } from "antd";
import { tableConfig } from "./tableConfig";
import rolePresenter from "@modules/roles/presenter";
import { useAsync } from "@view/shared/hook/useAsync";
import RightMenu, {
  IArrayAction,
} from "@view/shared/components/layout/RightMenu";
import ModalAddRole from "./components/ModalAddRole";
import store, { RootState } from "@modules/core/store/redux";
import RoleStore from "@modules/roles/roleStore";
import { DeleteConfirm } from "@view/shared/components/ConfirmDelete";
import { useDispatch, useSelector } from "react-redux";
import { Role } from "@modules/roles/interface";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { roleTranslateKey } from "@view/shared/translateKey";
import CheckPermission from "@view/shared/hoc/CheckPermission";
import "./styles.scss";
import { useHistory } from "react-router";
import { routerRole } from "@config/path";
import RoleEntity from "@modules/roles/entity";
import useTable from "@view/shared/components/TableComponent/hook"
interface Props {}

interface DataType {
  key: React.Key;
  roleName: string;
  roleCode: string;
  createdAt: string;
}
const Roles = (props: Props) => {
  const {
    AFTER_CONTENT_DELETE,
    CONTENT_DELETE,
    ROLE,
    ADD_NEW_ROLE,
    REMOVE_ROLE,
    EDIT_ROLE,
    DELETE,
  } = useTranslate("roleTranslateKey", "common");
  const [selectedRows, setSelectedRows] = useState<Role[]>([]);
  const [modal, setmodal] = useState({ visible: false, data: null });
  const { getListRole, removeRole } = rolePresenter;
  const [
    { execute: getListRoleAsync, value: dataSource, status },
    { execute: removeRoleAsync, status: removeStatus },
  ] = useAsync(getListRole, removeRole);

  const table = useTable()

  const dispatch = useDispatch();
  const dispatchUserEdited = (role) => dispatch(RoleStore.actions.setRoleEdited({roleEdited: role}))

  useEffect(() => {
    getListRoleAsync();
  }, []);

  const handleAddNewRole = () => {
    setmodal((prev) => ({ ...prev, visible: true }));
  };
  const handleCancel = (data) => {
    setSelectedRows([]);
    setmodal((prev) => ({ ...prev, visible: false, data: null }));
  };
  const handleRemove = (data) => {
    DeleteConfirm({
      content: `${CONTENT_DELETE} ${selectedRows.length} ${AFTER_CONTENT_DELETE}`,
      handleOk: () =>{
        console.log(selectedRows);
        removeRoleAsync({ idRole: selectedRows[0].roleId }).then((res) => {
          table.fetchData();
          setSelectedRows([]);
        })
      },
        handleCancel: () => {
          console.log('cancel')
        },
    });
    setSelectedRows(prev => [])
  };
  const handleEdit = () => {
    setmodal((prev) => ({ ...prev, visible: true, data: selectedRows[0] }));
  };



  const columns = [
    {
      title: "GROUP_USER_NAME",
      dataIndex: "roleName",
    },
    {
      title: "USER_NUMBER",
      dataIndex: "numberOfUserInRole",
    },
    // {
    //   title: "ROLES",
    //   dataIndex: "roleName",
    // },
    {
      title: "DESCRIPTION",
      dataIndex: "roleDescription",
      className: "set-width-highest"
    },
    {
      dataIndex: "roleCode",
      render: (text, record: RoleEntity) => {
        return (
          <>
            <a
              className="link-table"
              onClick={() => {

                dispatchUserEdited(record);
                history.push(`${routerRole.EDIT_ROLES}/${record.roleId}`);
              }}
            >
              Cập nhật
            </a>
          </>
        );
      },
    },

    {
      dataIndex: "roleCode",
      render: (text, record:RoleEntity, index) => {
        return (
          <>
            <a className="link-table"
              onClick={()=>{
                console.log(record)
                selectedRows.push(record)
                handleRemove(record)
              }}
            >{DELETE}</a>
          </>
        );
      },
    },
  ];
  const history = useHistory();
  const arrayAction: IArrayAction[] = [
    {
      icon: "fa fa-plus",
      name: ADD_NEW_ROLE,
      permissionCode: "ROLE_CREATE",
      handleAction: () => {
        dispatchUserEdited(null)
        history.push(routerRole.ADD_ROLES);
      },
    },
    // {
    //   icon: "fa fa-edit",
    //   name: EDIT_ROLE,
    //   handleAction: handleEdit,
    //   permissionCode: "ROLE_UPDATE",

    //   disable: selectedRows?.length != 1,
    // },
    // {
    //   icon: "fa fa-trash",
    //   name: `${REMOVE_ROLE} (${selectedRows?.length})`,
    //   handleAction: handleRemove,
    //   permissionCode: "ROLE_DELETE",
    //   disable: selectedRows?.length == 0,
    // },
  ];
  return (
    <div>
      <RightMenu arrayAction={arrayAction} />
      <TableComponent
        search={{ placeholder: "ROLES", align: "right" }}
        apiServices={rolePresenter.getListRole}
        columns={columns}
        langs={["roleTranslateKey", "common"]}
      />
      <ModalAddRole
        visible={modal.visible}
        onCancel={handleCancel}
        data={modal.data}
      />
    </div>
  );
};

export default Roles;
