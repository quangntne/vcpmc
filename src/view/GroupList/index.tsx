import React, { useEffect, useState } from "react";
import TableComponent from "@view/shared/components/TableComponent";
import { Switch } from "antd";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { common, groupList } from "@view/shared/translateKey";
import listGroupPresenter from "@modules/listGroup/presenter";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import ModalUploadListGroup from "./ModalUploadGroup";
import RightMenu, { IArrayAction } from "@view/shared/components/layout/RightMenu";
import useTable from "@view/shared/components/TableComponent/hook";
import { useHistory } from "react-router";
import { DeleteConfirm } from "@view/shared/components/ConfirmDelete";
import { useAsync } from "@view/shared/hook/useAsync";
import SearchComponent from "@view/shared/components/SearchComponent/SearchComponent";
import './style.scss';

const GroupList = ({ setModal }) => {
  const [dataModal, setDataModal] = useState({
    data: [],
    visible: false,
    type: "",
  });

  const { DELETE, LIST_UNITS_USED } = useTranslate("common");
  const {
    GROUP_NAME,
    NO_USER,
    ASSIGNED_DEVICES,
    STATUS,
    ACTIVE,
    INACTIVE,
    EXPIRED,
    DELETE_TIL,
    DELETE_MUL_TIL,
    PLAHOLDER_SEARCH_GROUP,
    EXPIR_DATE, VIEW_DETAIL
  } = useTranslate("groupList");

  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [input, setInput] = useState(null);
  const table = useTable();
  const history = useHistory();

  const {
    getInfor,
    updateStatusGroup,
    deleteListGroup,
    activeGroup,
    unActiveGroup,
  } = listGroupPresenter;

  const [
    getInformgroup,
    updateStatusGroupcall,
    deleteListGroupcall,
    activeGroupcall,
    unActiveGroupcall,
  ] = useAsync(getInfor, updateStatusGroup, deleteListGroup, activeGroup, unActiveGroup);

  const data = [
    {
      name: LIST_UNITS_USED,
    },
  ];

  useEffect(() => {
    getInformgroup.execute().then(res => {
      console.log('res', res);
    }).catch()
  }, [])

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: []) => {
      setSelectedRow(selectedRows);
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const handleCancel = (isReload) => {
    setDataModal((pre) => ({ ...pre, visible: false, type: "" }));
    isReload && setSelectedRowKeys([]);
    isReload && setSelectedRow([]);
    isReload && table.fetchData();
  };

  const handleDelete = (val) => {
    DeleteConfirm({
      content: `${val.length == 1 ? DELETE_TIL : DELETE_MUL_TIL} ${val.length == 1 ? val[0]?.groupName : ""
        }  ?`,
      title: `${DELETE_TIL} `,
      handleOk: () =>
        deleteListGroupcall
          .execute({
            groupIds: selectedRow.map((item) => item?.groupId),
          })
          .then((res) => {
            table.fetchData();
            setSelectedRow([]);
            setSelectedRowKeys([]);
          }),
      handleCancel: () => { },
    });
  };

  const handleActive = () => {
    activeGroupcall
      .execute({
        groupIds: selectedRow.map((item) => item?.groupId),
      })
      .then((res) => {
        table.fetchData();
        setSelectedRow([]);
        setSelectedRowKeys([]);
      });
  };
  const handleDeActive = () => {
    unActiveGroupcall
      .execute({
        groupIds: selectedRow.map((item) => item?.groupId),
      })
      .then((res) => {
        table.fetchData();
        setSelectedRow([]);
        setSelectedRowKeys([]);
      });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleKeyDown = (e) => {
    const keyCode = e.keyCode;
    if (keyCode == 13) {
      table.fetchData({ option: { search: input, current: 1 } });
    }
  };

  const checkStatus = (val) => {
    return val == 0 ? INACTIVE : ACTIVE;
  };

  const arrayAction: IArrayAction[] = [
    {
      iconType: "cancel",
      name: `${DELETE} (${selectedRow?.length})`,
      handleAction: () => {
        handleDelete(selectedRow);
      },
      disable: selectedRow.length > 0 ? false : true,
    },
  ];

  const columns = [
    {
      title: GROUP_NAME,
      dataIndex: "groupName",
    },
    {
      title: NO_USER,
      dataIndex: "totalUser",
    },
    {
      title: ASSIGNED_DEVICES,
      dataIndex: "totalDevice",
    },
    {
      title: EXPIR_DATE,
      dataIndex: "expired",
    },
    {
      title: STATUS,
      dataIndex: "groupStatus",
      render: (status) => (status == 0 ? (<><Switch className='mr-1' /> {INACTIVE}</>) : status == 1 ? (<><Switch className='mr-1' /> {ACTIVE}</>) : EXPIRED),
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <a onClick={() => {
          console.log('text', text);
          console.log('record', record);
          history.push(`/list-used-unit/${record.groupId}/used-unit`);
        }}
          style={{ fontSize: '12px', lineHeight: '24px', color: '#FF7506', textDecoration: 'underline' }}>{VIEW_DETAIL}</a>
      ),
    },
  ];

  return (
    <>
      <MainTitleComponent
        breadcrumbs={data}
        title={LIST_UNITS_USED}
        classBreadcumb={null}
        classTitle={null}
      />
      <SearchComponent classNames="list-used-unit-search mb-3 mt-4" placeholder={PLAHOLDER_SEARCH_GROUP} />
      <TableComponent
        style={{ fontSize: '12px' }}
        register={table}
        apiServices={listGroupPresenter.getInfor}
        columns={columns}
        // onRow={(record, rowIndex) => ({
        //   onClick: () => {
        //     handleClickOnRow(record);
        //   },
        // })}
        rowSelection={rowSelection}
        rowKey={"groupId"}
      />
      <RightMenu arrayAction={arrayAction} />
      <ModalUploadListGroup
        dataModal={dataModal}
        onCancelModal={handleCancel}
        groupName={selectedRow[0]?.groupName}
      />
    </>
  );
};

export default GroupList;
