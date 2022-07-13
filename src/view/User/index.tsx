import listGroupPresenter from "@modules/listGroup/presenter";
import userPresenter from "@modules/user/presenter";
import { DeleteConfirm } from "@view/shared/components/ConfirmDelete";
import RightMenu from "@view/shared/components/layout/RightMenu";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import TableComponent from "@view/shared/components/TableComponent";
import useTable from "@view/shared/components/TableComponent/hook";
import { useAsync } from "@view/shared/hook/useAsync";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { common, groupList } from "@view/shared/translateKey";
import { Input } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useParams } from "react-router";
import ModalPermision from "./ModalPermission";
import ModalUploadUser from "./ModalUser";
import CheckPermission from "@hoc/CheckPermission";

const TableUser = () => {
  const table = useTable();
  const { idGroup }: any = useParams();
  const [selectedRow, setSelectedRow] = useState([]);
  const [input, setInput] = useState(null);
  const [dataModalPer, setDataModalPer] = useState({
    data: [],
    visible: false,
  });
  const [dataModal, setDataModal] = useState({
    data: [],
    visible: false,
    type: "",
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const {
    deleteUser,
    updateStatusActives,
    updateStatusUnactives,
  } = userPresenter;
  const [
    deleteUsercall,
    updateStatusActivescall,
    updateStatusUnactivescall,
  ] = useAsync(deleteUser, updateStatusActives, updateStatusUnactives);

  const {
    NAME,
    ROLE,
    EMAIL,
    STATUS,
    Last_Update,
    Expered_Date,
    INACTIVE,
    ACTIVE,
    UPDATE_STATUS,
    UPDATE_EX,
    DELETE_USER,
    DELETE_MUL_USER,
    PLAHOLDER_SEARCH_USER,
    PERMISSION,
  } = useTranslate("groupList");
  const {
    ADD,
    EDIT,
    DETAIL,
    DELETE,
    LIST_USER,
    HOME,
  } = useTranslate("common");

  const handleCancel = (isReload) => {
    setDataModal((pre) => ({ ...pre, visible: false, type: "" }));
    isReload && setSelectedRowKeys([]);
    isReload && setSelectedRow([]);
    isReload && table.fetchData();
  };

  const handleCancelPer = (isReload) => {
    setDataModalPer((pre) => ({ ...pre, visible: false }));
    isReload && setSelectedRowKeys([]);
    isReload && setSelectedRow([]);
    isReload && table.fetchData();
  };

  const handleDelete = (val) => {
    DeleteConfirm({
      content: `${val.length == 1 ? DELETE_USER : DELETE_MUL_USER} ${val.length == 1 ? val[0]?.userName : ""
        }  ?`,
      title: `${DELETE_USER}`,
      handleOk: () =>
        deleteUsercall
          .execute({ userIds: selectedRow.map((user) => user.userId) })
          .then((res) => {
            table.fetchData();
            setSelectedRow([]);
            setSelectedRowKeys([]);
          }),
      handleCancel: () => { },
    });
    // DeleteConfirm({
    //   handleOk: () =>
    //     deleteMutipleMediaAsync(listKeyMedia).then((res) => {
    //       fetchData({ ...info, current: 1 }, true);
    //       store.dispatch(mediaStore.actions.selectAll(false));
    //     }),
    //   // handleCancel: () => { },

    //   content: CONFIRM_DELETE_MEDIA,
    // });
  };

  // const handleUpdateStatus = () => {
  //   const id = selectedRow[0]?.userId;
  //   updateStatusUsercall.execute(id).then((res) => {
  //     table.fetchData();
  //     setSelectedRowKeys([]);
  //     setSelectedRow([]);
  //   });
  // };

  const handleSearch = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleKeyDown = (e) => {
    const keyCode = e.keyCode;
    if (keyCode == 13) {
      table.fetchData({ option: { search: input, current: 1, idGroup } });
    }
  };

  const handleActive = () => {
    updateStatusActivescall
      .execute({
        userIds: selectedRow.map((item) => item?.userId),
      })
      .then((res) => {
        table.fetchData();
        setSelectedRow([]);
        setSelectedRowKeys([]);
      });
  };
  const handleDeActive = () => {
    updateStatusUnactivescall
      .execute({
        userIds: selectedRow.map((item) => item?.userId),
      })
      .then((res) => {
        table.fetchData();
        setSelectedRow([]);
        setSelectedRowKeys([]);
      });
  };

  const data = [
    {
      name: LIST_USER,
    },
  ];

  const checkStatus = (val) => {
    return val == 0 ? INACTIVE : ACTIVE;
  };
  const handleClickOnRow = (record) => {
    const isInArr = selectedRowKeys.includes(record?.userId);
    if (isInArr == false) {
      setSelectedRow([...selectedRow, record]);
      setSelectedRowKeys([...selectedRowKeys, record?.userId]);
    } else {
      const a = [...selectedRowKeys];
      const b = [...selectedRow];
      const index = a.findIndex((item) => item == record?.userId);
      a.splice(index, 1);
      b.splice(index, 1);
      setSelectedRow(b);
      setSelectedRowKeys(a);
    }
  };

  const arrayAction = [
    {
      icon: "fas fa-plus",
      name: ADD,
      handleAction: () => {
        setDataModal({ visible: true, data: [], type: "add" });
      },
    },
    {
      icon: "fas fa-edit",
      name: EDIT,
      handleAction: () => {
        setDataModal({ visible: true, data: selectedRow, type: "edit" });
      },
      disable: selectedRow.length == 1 ? false : true,
    },
    {
      icon: "fas fa-edit",
      name: `${ACTIVE} (${selectedRow?.length})`,
      handleAction: () => {
        handleActive();
      },
      disable: selectedRow.length > 0 ? false : true,
    },
    {
      icon: "fas fa-edit",
      name: `${INACTIVE} (${selectedRow?.length})`,
      handleAction: () => {
        handleDeActive();
      },
      disable: selectedRow.length > 0 ? false : true,
    },
    {
      icon: "fas fa-user-shield",
      name: PERMISSION,
      handleAction: () => {
        setDataModalPer({ visible: true, data: selectedRow });
      },
      disable: selectedRow.length == 1 ? false : true,
    },
    {
      icon: "fas fa-trash-alt",
      name: `${DELETE} (${selectedRow?.length}) `,
      handleAction: () => {
        handleDelete(selectedRow);
      },
      disable: selectedRow.length > 0 ? false : true,
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    // onChange: (selectedRowKeys: React.Key[], selectedRows: []) => {
    //   setSelectedRow(selectedRows);
    //   setSelectedRowKeys(selectedRowKeys);
    // },
    onselect: (record) => {
      console.log(record, "recordRowSelection");
      
      handleClickOnRow(record);
    }
  };

  const columns = [
    {
      title: NAME,
      dataIndex: "userName",
    },
    {
      title: ROLE,
      dataIndex: "role",
      render: (text) => text?.roleName,
    },
    {
      title: EMAIL,
      dataIndex: "userEmail",
    },
    {
      title: STATUS,
      dataIndex: "userStatus",
      render: (text) => (text == 0 ? INACTIVE : ACTIVE),
    },
    {
      title: Last_Update,
      dataIndex: "updatedAt",
      render: (text, record) =>
        text
          ? moment(text).format("DD/MM/YYYY hh:mm:ss")
          : moment(record?.createAt).format("DD/MM/YYYY hh:mm:ss"),
    },
  ];

  return (
    <CheckPermission permissionCode={"SP_USER_MENU"}>
      <div>
        <MainTitleComponent
          breadcrumbs={data}
          title={LIST_USER}
        />
        <Input.Search
          style={{ width: 400 }}
          className="ant-form-search mb-3"
          onChange={handleSearch}
          placeholder={PLAHOLDER_SEARCH_USER}
          onKeyDown={handleKeyDown}
        />
        <TableComponent
          register={table}
          apiServices={userPresenter.getUser}
          defaultOption={{ idGroup }}
          columns={columns}
          rowSelection={rowSelection}
          onRow={(record, rowIndex) => ({
            onClick: () => {
              handleClickOnRow(record);
            },
          })}
          rowKey={"userId"}
        />
        <RightMenu arrayAction={arrayAction} />
        <ModalUploadUser
          dataModal={dataModal}
          onCancelModal={handleCancel}
          userName={selectedRow[0]?.userName}
        />
        <ModalPermision
          dataModalPer={dataModalPer}
          onCancelModalPer={handleCancelPer}
          userData={selectedRow[0]}
        />
      </div>
    </CheckPermission>
  );
};

export default TableUser;

function listGroup(listGroup: any): { NAME: any; ROLE: any; EMAIL: any } {
  throw new Error("Function not implemented.");
}
