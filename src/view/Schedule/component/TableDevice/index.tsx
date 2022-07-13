import React, { useEffect } from "react";
import { Button, Modal, Table } from "antd";
import { useSelector } from "react-redux";
import store, { RootState } from "@store/redux";
import { translateConfirm, useRouter } from "@helper/functions";
import { useTranslate } from "@hook/useTranslate";
import { scheduleTranslateKey } from "@translateKey/index";
import listDevicesStore from "@modules/devices/listDevicesStore";

const { confirm } = Modal;

const ListDeviceSchedule = (props) => {
  const { listTempDevice } = useSelector(
    (state: RootState) => state.listDevices
  );
  const { Name, Status, Login_name } = useTranslate(scheduleTranslateKey);
  const { Label_Device, SURE_DELETE, Continue, Cancel } = useTranslate(
    "scheduleTranslateKey"
  );
  // useEffect(()=>{
  //     console.log(listTempDevice,"listTempDevice======")
  // },[listTempDevice]);

  const handleDelDevice = (data) => {
    let arrDel = [...listTempDevice];
    const index = arrDel.findIndex((item) => item.deviceId == data.deviceId);

    confirm({
      style: { marginTop: "5%" },
      width: 700,
      title: Label_Device,
      content: `${SURE_DELETE} ${data.deviceName} ?`,
      // okText: okText|| translateConfirm("Yes"),
      okType: "danger",
      cancelText: Cancel,
      okText: Continue,

      onOk() {
        if (index != -1) {
          arrDel.splice(index, 1);
          store.dispatch(
            listDevicesStore.actions.updateListDevice({
              listTempDevice: arrDel,
            })
          );
        }
      },
      onCancel() {},
    });
  };

  const columns = [
    {
      title: Name,
      dataIndex: "deviceName",
      key: "deviceName",
      // render: text => <a>{text}</a>,
    },
    {
      title: Login_name,
      key: "loginName",
      dataIndex: "loginName",
    },
    {
      title: Status,
      key: "deviceStatus",
      dataIndex: "deviceStatus",
      render: (text) => <span>{text == 1 ? "Active" : "Deactivate"}</span>,
    },
    {
      title: "",
      key: "",
      dataIndex: "",
      render: (text) => (
        <Button
          className="icon-button normal-button"
          onClick={() => handleDelDevice(text)}
        >
          <i className="fa fa-trash-alt" /> Xoá
        </Button>
      ),
    },
  ];
  return (
    <>
      <Table
        {...props}
        className="main-table"
        dataSource={listTempDevice}
        columns={columns}
        loading={status == "loading"}
        rowKey={"deviceId"}
        rowSelection={""}
      />
    </>
  );
};

export default ListDeviceSchedule;
