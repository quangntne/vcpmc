import listGroupPresenter from "@modules/listGroup/presenter";
import userPresenter from "@modules/user/presenter";
import { DeleteConfirm } from "@view/shared/components/ConfirmDelete";
import RightMenu, { IArrayAction } from "@view/shared/components/layout/RightMenu";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import TableComponent from "@view/shared/components/TableComponent";
import useTable from "@view/shared/components/TableComponent/hook";
import { useAsync } from "@view/shared/hook/useAsync";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { common, groupList } from "@view/shared/translateKey";
import { Input } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ModalPermision from "../ModalPermission";
import ModalUploadUser from "./ModalUser";
import CircleLabel from "@view/shared/components/CircleLabel/index";

const TableUser = () => {
  const history = useHistory();
  const table = useTable();
  const { idGroup } = useParams<any>();
  useEffect(() => {
    getGroup.execute(idGroup).then(res => {
      setGroupName(res.groupName)
      setGroup(res);
    })
  }, []);
  const [groupName, setGroupName] = useState('');
  const [group, setGroup] = useState<any>();
  const [selectedRow, setSelectedRow] = useState([]);
  const [input, setInput] = useState(null);
  const [dataModal, setDataModal] = useState({
    data: [],
    visible: false,
    type: "",
  });
  const [dataModalPer, setDataModalPer] = useState({
    data: [],
    visible: false,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const {
    deleteUser,
    updateStatusActives,
    updateStatusUnactives,
  } = userPresenter;

  const { getGroupById } = listGroupPresenter;

  const [
    getGroup,
    deleteUsercall,
    updateStatusActivescall,
    updateStatusUnactivescall,
  ] = useAsync(getGroupById, deleteUser, updateStatusActives, updateStatusUnactives);

  const {
    NAME,
    ROLE,
    EMAIL,
    STATUS,
    Last_Update,
    Expered_Date,
    INACTIVE,
    ACTIVE,
    DELETE_USER,
    DELETE_MUL_USER,
    PLAHOLDER_SEARCH_USER,
    VIEW_DETAIL,
    ADD_USER
  } = useTranslate("groupList");
  const {
    DELETE,
    LIST_USER,
    LIST_UNITS_USED,
    EXPIRED,
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
  };

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

  const data = [
    {
      name: LIST_UNITS_USED,
      href: "/group-list",
    },
    {
      name: `${LIST_USER} ${groupName}`,
    },
  ];

  const checkStatus = (val) => {
    return val == 0 ? INACTIVE : ACTIVE;
  };

  const arrayAction: IArrayAction[] = [
    {
      iconType: 'add',
      name: ADD_USER,
      handleAction: () => {
        history.push(`/list-used-unit/${group.groupId}/used-unit/add-user`);
      },
    },
    {
      iconType: "delete",
      name: `${DELETE} (${selectedRow?.length}) `,
      handleAction: () => {
        handleDelete(selectedRow);
      },
      disable: selectedRow.length > 0 ? false : true,
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: []) => {
      setSelectedRow(selectedRows);
      setSelectedRowKeys(selectedRowKeys);
    },
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
      render: (text) => (text == 0 ? INACTIVE : text == 1 ? ACTIVE : EXPIRED),
    },
    {
      title: Last_Update,
      dataIndex: "updatedAt",
      render: (text, record) =>
        text
          ? moment(text).format("DD/MM/YYYY")
          : moment(record?.createAt).format("DD/MM/YYYY"),
    },
    {
      title: 'Trạng thái',
      dataIndex: "userStatus",
      render: (text) => {
        return text === 1 ? ((<CircleLabel text={"Đang hoạt động"} colorCode={"green"} />)) : (<CircleLabel text={"Ngưng hoạt động"} colorCode={"red"} />)
      }
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <a onClick={() => {
          history.push(`/list-used-unit/${group.groupId}/used-unit/${record.userId}/view-user`);
        }}
          style={{ fontSize: '12px', lineHeight: '24px', color: '#FF7506', textDecoration: 'underline' }}>{VIEW_DETAIL}</a>
      ),
    },
  ];

  return (
    <div>
      <MainTitleComponent
        breadcrumbs={data}
        title={`${LIST_USER} ${groupName}`}
        classBreadcumb={null}
        classTitle={'mt-3 mb-3'}
      />
      <Input.Search
        style={{ width: '33vw' }}
        className="ant-form-search mb-3"
        onChange={handleSearch}
        placeholder={PLAHOLDER_SEARCH_USER}
        onKeyDown={handleKeyDown}
      />
      <TableComponent
        register={table}
        apiServices={userPresenter.getUserFromGroup}
        defaultOption={{ idGroup }}
        columns={columns}
        onRow={(record, rowIndex) => ({
          onClick: () => {
            handleClickOnRow(record);
          },
        })}
        rowSelection={rowSelection}
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
  );
};

export default TableUser;
// function listGroup(listGroup: any): { NAME: any; ROLE: any; EMAIL: any } {
//   throw new Error("Function not implemented.");
// }
