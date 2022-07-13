import React, { useState } from "react";
import TableComponent from "@view/shared/components/TableComponent";
import ScheduleRepository from "@modules/schedule/repository";
import * as moment from "moment";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import RightMenu from "@view/shared/components/layout/RightMenu";
import { useRouter } from "@helper/functions";
import { DeleteConfirm } from "@view/shared/components/ConfirmDelete";
import useTable from "@view/shared/components/TableComponent/hook";
import { useTranslate } from "@hook/useTranslate";
import { scheduleTranslateKey } from "@translateKey/index";
import CheckPermission from "@hoc/CheckPermission";


const arrDataSchedule = [
  {
    stt: 1,
    scheduleName: "Lich bieu chay hang ngay",
    scheduleDateTimeBegin: "06/20/2021",
    scheduleDateTimeEnd: "07/20/2021"
  }

];

const imgIconBarPlus = require("../../shared/assets/icon/BarPlus.svg");

const ListSchedule = (props) => {
  const router = useRouter();
  const [dataAction, setDataAction] = useState({selectedRowKeys: [], selectedRows: []});
  const {Name, Start_Date, End_Date, Start_Time, End_Time, Add_Schedule, Edit_Schedule, Delete_Selected,
    Schedule, Schedule_List, Are_U_Sure, Delete, Delete_Schedule,} = useTranslate("scheduleTranslateKey");
  const table = useTable();

  const columns = [
    {
      title: Name,
      dataIndex: "scheduleName",
      key: "scheduleName",
    },
    {
      title: "Thời gian phát",
      dataIndex: "",
      key: "",
      render: (text) => <span>{moment(text?.scheduleDateTimeBegin).format("DD/MM/YYYY")} - {moment(text?.scheduleDateTimeEnd).format("DD/MM/YYYY")}</span>,
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      width: 200,
      render: (text) => <span className="btn-detail">Xem chi tiết</span>,
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      width: 100,
      render: (text) => <span className="text-danger underline" onClick={()=>deleteListSchedule(text)}>Xoá</span>,
    },
    // {
    //   title: Start_Time,
    //   dataIndex: "scheduleTimeBegin",
    //   key: "scheduleTimeBegin",
    //   // render: text => <span>{moment(text).format("DD/MM/YYYY")}</span>
    // },
    // {
    //   title: End_Time,
    //   dataIndex: "scheduleTimeEnd",
    //   key: "scheduleTimeEnd",
    //   // render: text => <span>{moment(text).format("DD/MM/YYYY")}</span>
    // },
  ];

  const rowSelection = {
    selectedRowKeys: dataAction.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setDataAction((pre) => ({...pre, selectedRows, selectedRowKeys}));
    },
  };

  const onClickCheckbox = (record) => {
    const selectedRowKeys = [...dataAction.selectedRowKeys];
    const selectedRows = [...dataAction.selectedRows];
    if (selectedRowKeys.indexOf(record.scheduleId) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.scheduleId), 1);
      selectedRows.splice(selectedRows.indexOf(record.scheduleId), 1);
    } else {
      selectedRowKeys.push(record.scheduleId);
      selectedRows.push(record);
    }
    setDataAction({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows});

  };

  const deleteListSchedule = (data) => {
    // const arrTempId = dataAction.selectedRows.map((item) => item.scheduleId);
    const arrTempId = data.scheduleId;
    DeleteConfirm({
      handleOk: () =>
        ScheduleRepository.delSchedule(arrTempId).then((res) => {
          setDataAction({ selectedRowKeys: [], selectedRows: [] });
          table.fetchData({ option: { pagination: { current: 1 } } });
        }),
      handleCancel: () => {},
      content: `${Are_U_Sure} ${Delete} ${dataAction.selectedRows.map(
        (item) => item.scheduleName
      )} ?`,
      title: Delete_Schedule,
      width: 600,
    });
  };

  const editSchedule = () => {
    router.push({
      pathname: "/schedule-edit",
      search: `?key=${dataAction.selectedRows[0]["scheduleId"]}`,
    });
  };

  const arrayActionRight = [
    {
      // icon: "fa fa-plus",
      imgIcon: imgIconBarPlus,
      name: Add_Schedule,
      handleAction: () => {
        router.push("/schedule-add");
      },
    },
    // {
    //   icon: "fa fa-edit",
    //   name: Edit_Schedule,
    //   handleAction: () => editSchedule(),
    //   disable: dataAction.selectedRows.length != 1,
    //   permissionCode: "SCH_UPDATE"
    // },
    // {
    //   icon: "fa fa-trash",
    //   name: `${Delete_Selected} (${dataAction.selectedRows.length})`,
    //   handleAction: () => deleteListSchedule(),
    //   disable: dataAction.selectedRows.length <= 0,
    //   permissionCode: "SCH_DELETE"
    // },
  ];

  return (
    <>

      <section className="schedule-list">
        <MainTitleComponent
          breadcrumbs={[{ name: Schedule, href: "/schedule" }]}
          title={Schedule_List}
          classBreadcumb={null}
          classTitle={null}
        />
        <div className="pt-4 pb-4"/>
        <TableComponent
          apiServices={ScheduleRepository.getListSchedule}
          register={table}
          columns={columns}
          disableFirstCallApi={true}
          dataSource={arrDataSchedule}
          rowKey={"scheduleId"}
          // rowSelection={rowSelection}
          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: () => {onClickCheckbox(record)}, // click row
          //   };
          // }}
        />
      </section>
      <RightMenu arrayAction={arrayActionRight} />
    </>
  );
};

export default ListSchedule;
