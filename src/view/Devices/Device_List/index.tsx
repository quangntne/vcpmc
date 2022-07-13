import React, { useEffect, useState } from "react";
import ModalEditDevice from "@view/Devices/Device_List/Component/ModalEditDevice";
import "./styles.scss";
import TableComponent from "@view/shared/components/TableComponent";
import RepositoryDevice from "@modules/devices/repository";
import * as moment from "moment";
import useTable from "@view/shared/components/TableComponent/hook";
import RightMenu from "@view/shared/components/layout/RightMenu";
import { useRouter } from "@helper/functions";
import { DeleteConfirm } from "@view/shared/components/ConfirmDelete";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import { Input, Select, Checkbox, Dropdown } from "antd";
import { useTranslate } from "@hook/useTranslate";
import { deviceTranslateKey } from "@translateKey/index";
import CheckPermission from "@hoc/CheckPermission";
import { Power, Lock } from "react-feather";
import UilAngelDown from "@iconscout/react-unicons/icons/uil-angle-down";
import {
  ColumnsTableDevice,
  DisBtnDeActive,
  funDeviceSp,
  funRemoveColTable,
  funRenderStatusDevice,
  funShowColTable,
} from "@view/Devices/Device_List/Component/functionDeviceList";
import SelectAndLabelComponent from "@view/shared/components/SelectAndLabelConponent";
import SearchComponent from "@view/shared/components/SearchComponent/SearchComponent";
import { useSelector } from "react-redux";
import { RootState } from "@modules/core/store/redux";

const { Search } = Input;
const { Option } = Select;

const DevicesList = (props) => {
  const table = useTable();
  const [openModal, setOpenModal] = useState({ modal: false, data: {} });
  const [dataAction, setDataAction] = useState({
    selectedRowKeys: [],
    selectedRows: [],
  });
  const [arrShowCol, setArrShowCol] = useState<any>({
    mac: false,
    memory: false,
    sku: false,
    warranty: false,
    user: false,
    local: false,
    power: false,
  });
  const router = useRouter();
  const {
    Device_Name,
    Login_Name,
    Memory,
    SKU_ID,
    Warranty_Expired,
    Power_Screen,
    Status,
    Location,
    Add_Device,
    Update,
    Deactivate,
    Activate,
    Delete_Selected,
    Restart,
    Placeholder,
    Are_U_Sure,
    Lock_Trans,
    Unlock,
    Delete,
    Device,
    Device_List,
    Device_Log,
    Off,
    On,
    Group,
    MAC_Address,
    Ok_Text,
    Cancel_Text,
    Deactivation,
    Activation,
    DETAIL
  } = useTranslate("deviceTranslateKey", "common");
  const [columnSelect, SetColumnSelect] = useState(null);
const currentLang = useSelector((state:RootState) => state.translateStore.currentLanguage);
  const handleUpdateDevice = () => {
    if (dataAction.selectedRows.length == 1)
      return setOpenModal({ modal: true, data: dataAction.selectedRows[0] });
    else return setOpenModal({ modal: false, data: {} });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      className: "text-center",
      fixed: "left",
      width: 85,
      render: (text) => <span className="main-column ">{text}</span>,
    },
    {
      title: "Device_Name",
      dataIndex: "deviceName",
      key: "deviceName",
      fixed: "left",
      render: (text) => <span className="main-column">{text}</span>,
    },
    {
      title: "Status",
      key: "",
      dataIndex: "",
      fixed: "left",
      className: "status-column",
      render: (record) =>
        funRenderStatusDevice(record, {
          active: Activation,
          deActive: Deactivation,
        }),
    },
    {
      width: 100,
      render: (text) => (
        <span
          className="btn-detail cursor-pointer"
          onClick={() => {
            router.push({ pathname: "/device-detail", search: "" });
          }}
        >
          {DETAIL}
        </span>
      ),
    },
  ];

  // console.log(dataAction,"dataAction===")

  const [listColTable, setListColTable] = useState(columns);
  const key = {
    mac: MAC_Address,
    memory: Memory,
    sku: SKU_ID,
    warranty: Warranty_Expired,
    user: Login_Name,
    local: Location,
    power: Power_Screen,
    off: Off,
    on: On,
    unlock: Unlock,
    lock: Lock_Trans,
  };

  useEffect(() => {
    setListColTable(
      funShowColTable(listColTable, arrShowCol, columnSelect, key)
    );
  }, [currentLang, arrShowCol]);

  const rowSelection = {
    selectedRowKeys: dataAction.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(selectedRowKeys, 'selectedRowKeys=====')
      setDataAction((pre) => ({ ...pre, selectedRows, selectedRowKeys }));
    },
  };

  const CloseModal = (value) => {
    setOpenModal({ modal: false, data: {} });
    if (value) return table.fetchData();
  };

  const onClickCheckbox = (record) => {
    const selectedRowKeys = [...dataAction.selectedRowKeys];
    const selectedRows = [...dataAction.selectedRows];
    if (selectedRowKeys.indexOf(record.deviceId) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.deviceId), 1);
      selectedRows.splice(selectedRows.indexOf(record.deviceId), 1);
    } else {
      selectedRowKeys.push(record.deviceId);
      selectedRows.push(record);
    }
    setDataAction({
      selectedRowKeys: selectedRowKeys,
      selectedRows: selectedRows,
    });
  };

  const handleOke = (value) => {
    setDataAction({ selectedRowKeys: [], selectedRows: [] });
  };

  const activeDisBtn = DisBtnDeActive(
    dataAction.selectedRows,
    "active",
    "deviceStatus",
    { active: 1, deActive: 2 }
  );
  const lockDisBtn = DisBtnDeActive(
    dataAction.selectedRows,
    "block",
    "deviceLock",
    { active: 0, deActive: 1 }
  );

  const arrayActionRight = [
    {
      // icon: "fa fa-plus",
      iconType: "add",
      name: Add_Device,
      handleAction: () => {
        router.push("/device-add");
      },
      permissionCode: "CREAT_DEVICE",
    },
    // {
    //   // icon: "fa fa-edit",
    //   iconType: "edit",
    //   name: Update,
    //   handleAction: () => handleUpdateDevice(),
    //   disable: dataAction.selectedRowKeys.length != 1,
    //   permissionCode: "EDIT_DEVICE",
    // },
    // {
    //   icon: "fa fa-times-circle",
    //   name: `${Deactivate} (${dataAction.selectedRowKeys.length})`,
    //   handleAction: () => statusMultiDevice(0),
    //   disable: dataAction.selectedRowKeys.length <= 0,
    //   permissionCode: "EDIT_DEVICE",
    // },
    {
      icon: <Power />,
      name: `${activeDisBtn.activeText ? Deactivate : Activate} (${
        dataAction.selectedRowKeys.length
      })`,
      handleAction: () =>
        funDeviceSp(dataAction, table, handleSetDataAction, {
          Are_U_Sure,
          Activate,
          Deactivate,
          Device,
          Ok_Text,
          Cancel_Text,
        }).statusMultiDevice(1),
      disable: activeDisBtn.active,
      permissionCode: "EDIT_DEVICE",
    },
    {
      icon: <Lock />,
      name: `${lockDisBtn.activeText ? Unlock : Lock_Trans} ${Device} (${
        dataAction.selectedRowKeys.length
      })`,
      handleAction: () =>
        funDeviceSp(dataAction, table, handleSetDataAction, {
          Are_U_Sure,
          Lock_Trans,
          Unlock,
          Device,
          Ok_Text,
          Cancel_Text,
        }).blockMultiDevice(1),
      disable: lockDisBtn.active,
      permissionCode: "EDIT_DEVICE",
    },
    {
      // icon: "fa fa-trash-alt",
      iconType: "delete",
      name: `${Delete_Selected} (${dataAction.selectedRowKeys.length})`,
      handleAction: () =>
        funDeviceSp(dataAction, table, handleSetDataAction, {
          Are_U_Sure,
          Delete,
          Device,
          Ok_Text,
          Cancel_Text,
        }).delDevice(),
      disable: dataAction.selectedRowKeys.length <= 0,
      permissionCode: "DELETE_DEVICE",
    },
    // {
    //   icon: <Power/>,
    //   name: `${Restart} (${dataAction.selectedRowKeys.length})`,
    //   handleAction: () => restartMultiDevice(),
    //   disable: dataAction.selectedRowKeys.length <= 0,
    //   permissionCode: "EDIT_DEVICE",
    // },
    // {
    //   icon: "fa fa-memory",
    //   name: `${Delete} ${Memory} (${dataAction.selectedRowKeys.length})`,
    //   handleAction: () => delMemoryDevice(),
    //   disable: dataAction.selectedRowKeys.length <= 0,
    //   permissionCode: "EDIT_DEVICE",
    // },

    // {
    //   icon: "fa fa-unlock",
    //   name: `${Unlock} ${Device} (${dataAction.selectedRowKeys.length})`,
    //   handleAction: () => blockMultiDevice(0),
    //   disable: dataAction.selectedRowKeys.length <= 0,
    //   permissionCode: "EDIT_DEVICE",
    // },
    // {
    //   icon: "fas fa-clipboard-list",
    //   name: `${Device_Log} (${dataAction.selectedRowKeys.length})`,
    //   handleAction: () =>
    //     router.push({
    //       pathname: "/device-log",
    //       search: `?key=${dataAction.selectedRows[0]?.deviceId}`,
    //     }),
    //   disable: dataAction.selectedRowKeys.length <= 0,
    //   permissionCode: "VIEW_DEVICE",
    // },
  ];

  const handleChecked = (e) => {
    const target = e.target;
    const value = target.checked;
    const name = target.name;
    setArrShowCol((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectColumn = (value) => {
    // console.log(value,"value====")
    SetColumnSelect(value);
  };

  const menu = (
    <>
      <Option value={1}>
        <Checkbox name={"mac"} value={1} onChange={handleChecked}>
          {MAC_Address}
        </Checkbox>
      </Option>
      <Option value={2}>
        <Checkbox name={"memory"} value={2} onChange={handleChecked}>
          {Memory}
        </Checkbox>
      </Option>
      <Option value={3}>
        <Checkbox name={"sku"} value={3} onChange={handleChecked}>
          {SKU_ID}
        </Checkbox>
      </Option>
      <Option value={4}>
        <Checkbox name={"warranty"} value={4} onChange={handleChecked}>
          {Warranty_Expired}
        </Checkbox>
      </Option>
      <Option value={5}>
        <Checkbox name={"user"} value={5} onChange={handleChecked}>
          {Login_Name}
        </Checkbox>
      </Option>
      <Option value={6}>
        <Checkbox name={"local"} value={6} onChange={handleChecked}>
          {Location}
        </Checkbox>
      </Option>
      <Option value={7}>
        <Checkbox name={"power"} value={7} onChange={handleChecked}>
          {Power_Screen}
        </Checkbox>
      </Option>
    </>
  );
  const handleSetDataAction = () => {
    setDataAction({ selectedRowKeys: [], selectedRows: [] });
  };

  const handleChangeSelectColumn = (value) => {
    console.log(value, "value=======");
  };

  const arrGroupUser = [
    { value: 0, name: "Tất cả" },
    { value: 1, name: "Công ty TMCP Bách Hóa Xanh" },
    {
      value: 2,
      name: "Công ty TNHH XYZ",
    },
    { value: 3, name: "Công ty TMCP Adora" },
  ];

  return (
    <>
      {/* <CheckPermission permissionCode={"VIEW_DEVICE"}> */}
        <section className="list-devices">
          <MainTitleComponent
            breadcrumbs={[{ name: Device_List, href: "/device" }]}
            title={Device_List}
            classBreadcumb={null}
            classTitle={null}
          />
          <div className="d-flex div-search justify-content-between">
            <div className="d-flex align-items-center">
              <div className="type-user">
                <SelectAndLabelComponent
                  placeholder={`Chọn nhóm tài khoản`}
                  style={{ width: "250px" }}
                  dataString={arrGroupUser}
                  dropdownClassName="device-dropdown"
                  
                />
              </div>
              <div className="columns-table">
                <Select
                  value={"Ẩn hiện cột"}
                  defaultValue={"Ẩn hiện cột"}
                  showSearch={false}
                  onChange={handleSelectColumn}
                  style={{ width: "200px" }}
                  showArrow
                  dropdownClassName="device-dropdown"
                  suffixIcon={[
                    <>
                      <UilAngelDown
                        size={25}
                        color={"#FF7506"}
                        style={{ marginTop: "-5px" }}
                      />
                    </>,
                  ]}
                >
                  {menu}
                </Select>
              </div>
            </div>

          </div>

          <TableComponent
            register={table}
            apiServices={RepositoryDevice.getListDevices}
            columns={listColTable}
            rowKey={"deviceId"}
            rowSelection={rowSelection}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  onClickCheckbox(record);
                }, // click row
              };
            }}
            noStt={true}
            search={{placeholder: Placeholder, align:"right"}}
            scroll={{ x: listColTable?.length > 4 ? 1700 : 900 }}
            langs={["deviceTranslateKey"]}
          />
        </section>

        <RightMenu arrayAction={arrayActionRight} />
        {/*</CheckPermission>*/}
        <ModalEditDevice
          visible={openModal.modal}
          onCancel={CloseModal}
          data={openModal.data}
          onOke={handleOke}
        />
      {/* </CheckPermission> */}
    </>
  );
};

export default DevicesList;
