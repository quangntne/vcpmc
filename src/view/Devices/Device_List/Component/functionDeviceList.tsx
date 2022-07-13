import {DeleteConfirm} from "@view/shared/components/ConfirmDelete";
import RepositoryDevice from "@modules/devices/repository";
import {useTranslate} from "@hook/useTranslate";
import {deviceTranslateKey} from "@translateKey/index";
import * as moment from "moment";
import React from "react";

export const funDeviceSp = (dataAction, table, setDataAction, keyTrans?: any) => {


    const delDevice = () => {

        DeleteConfirm({
            handleOk: () =>
                RepositoryDevice.deleteDevice(dataAction).then(
                    (res) => {
                        table.fetchData({option: {pagination: {current: 1}}});
                        setDataAction({selectedRowKeys: [], selectedRows: []});
                    }
                ),
            handleCancel: () => {
            },
            content: `${keyTrans?.Are_U_Sure} ${keyTrans?.Delete} ${dataAction.selectedRows.map(
                (item) => item.deviceName
            )} ?`,
            title: `${keyTrans?.Delete} ${keyTrans?.Device}`,
            width: 500,
            textOk: keyTrans?.Ok_Text,
            textCancel: keyTrans?.Cancel_Text
        });
    };

    const delMemoryDevice = () => {
        // console.log(dataAction,"dataAction=====")
        // let arrIdDevice = dataAction.selectedRows.map((item) => item.deviceId);

        DeleteConfirm({
            handleOk: () =>
                RepositoryDevice.deleteMemoryDevice(dataAction.selectedRowKeys).then(
                    (res) => {
                        table.fetchData();
                        setDataAction({selectedRowKeys: [], selectedRows: []});
                    }
                ),
            handleCancel: () => {
            },
            // title: `${Delete} ${Memory}`,
            // content: `${Are_U_Sure} ${Delete} ${Memory} ${dataAction.selectedRows.map(
            //     (item) => item.deviceName
            // )} ?`,
        });
    };


    const blockMultiDevice = (value) => {
        const arrBlock = dataAction.selectedRowKeys.map((item) => ({
            deviceLock: value,
            deviceId: item,
        }));
        // console.log(arrBlock, 'arrBlock========')
        DeleteConfirm({
            handleOk: () =>
                RepositoryDevice.blockDevices(arrBlock).then((res) => {
                    table.fetchData();
                    setDataAction({selectedRowKeys: [], selectedRows: []});
                }),
            handleCancel: () => {
            },
            content: `${keyTrans?.Are_U_Sure} ${value == 1 ? keyTrans?.Lock_Trans : keyTrans?.Unlock
            } ${dataAction.selectedRows.map((item) => item.deviceName)} ?`,
            title: `${value == 1 ? keyTrans?.Lock_Trans : keyTrans?.Unlock} ${keyTrans?.Device}`,
            textOk: keyTrans?.Ok_Text,
            textCancel: keyTrans?.Cancel_Text
        });
    };

    const restartMultiDevice = () => {
        // const arrBlock = dataAction.selectedRows.map((item) => item.deviceId);

        DeleteConfirm({
            handleOk: () =>
                RepositoryDevice.restartDevices({
                    deviceIds: dataAction.selectedRowKeys,
                }).then((res) => {
                    table.fetchData();
                    setDataAction({selectedRowKeys: [], selectedRows: []});
                }),
            handleCancel: () => {
            },
            content: `${keyTrans?.Are_U_Sure} ${keyTrans?.Restart} ${dataAction.selectedRows.map(
                (item) => item.deviceName
            )} ?`,
            title: `${keyTrans?.Restart} ${keyTrans?.Device}`,
            textOk: keyTrans?.Ok_Text,
            textCancel: keyTrans?.Cancel_Text
        });
    };

    const statusMultiDevice = (status) => {
        //1: active
        //0: deactivate
        const arrStatus = dataAction.selectedRowKeys.map((item) => ({
            deviceStatus: status,
            deviceId: item,
        }));
        // console.log(arrBlock, 'arrBlock========')
        DeleteConfirm({
            handleOk: () =>
                RepositoryDevice.activeDevices(arrStatus).then((res) => {
                    table.fetchData();
                    setDataAction({selectedRowKeys: [], selectedRows: []});
                }),
            handleCancel: () => {
            },
            content: `${keyTrans?.Are_U_Sure} ${status == 1 ? keyTrans?.Activate : keyTrans?.Deactivate
            } ${dataAction.selectedRows.map((item) => item.deviceName)} ?`,
            title: `${status == 1 ? keyTrans?.Activate : keyTrans?.Deactivate} ${keyTrans?.Device}`,
            textOk: keyTrans?.Ok_Text,
            textCancel: keyTrans?.Cancel_Text
        });
    };

    return {
        delDevice,
        delMemoryDevice,
        restartMultiDevice,
        statusMultiDevice,
        blockMultiDevice
    }
}


export const ColumnsTableDevice = (keyTrans?: any) => {

    const SKUColumn = {
        title: "SKU_ID",
        key: "3",
        dataIndex: "deviceSku",
    };
    const LoginName = {
        title: "Login_Name",
        dataIndex: "loginName",
        key: "5",
    };
    const Location = {
        title: "Location",
        dataIndex: "deviceLocation",
        key: "7",
        width: 391,
    }
    const Memory = {
        title:"Memory" ,
        dataIndex: "deviceMemory",
        key: "2",
        fixed: null,
    };
    const MACAddress = {
        title: "MAC_Address",
        dataIndex: "deviceMACAddress",
        key: "1",
        fixed: null,
    };
    const WarrantyExpired = {
        title: "Warranty_Expired",
        key: "4",
        dataIndex: "deviceWarrantyExpiresDate",
        fixed: null,
        render: (text) => <span>{moment(text).format("DD/MM/YYYY")}</span>,
    };
    const PowerScreen = {
        title: "Power_Screen",
        key: "",
        dataIndex: "",
        fixed: null,
        render: (text) => (
            <span
                className="text-capitalize">{text.devicePower == 0 ? keyTrans?.off : keyTrans?.on}/{text.deviceLock == 0 ? keyTrans?.unlock : keyTrans?.lock}</span>
        ),
    };

    const Group = {
        title: keyTrans,
        key: "8",
        dataIndex: "",
        fixed: null,
        render: (text) => <span>{text?.group?.groupName}</span>,
    }

    return {
        SKUColumn,
        LoginName,
        Location,
        Memory,
        MACAddress,
        WarrantyExpired,
        PowerScreen,
        Group,
    }
};

export const funRemoveColTable = (data: any[] = [], keyIndex: any) => {
    const arrTemp = [...data];
    const index = arrTemp.findIndex(item => item.key == keyIndex);

    if (index > -1) {
        arrTemp.splice(index, 1);
    }
    console.log(arrTemp,"arrTemp===")
    return arrTemp;
};

export const funShowColTable = (listColTable, arrShowCol, columnSelect, keyTrans) => {

    let arrTemp = [...listColTable];
    // console.log(arrShowCol,'arrShowCol====')
    if(arrShowCol.mac && columnSelect == 1){
        arrTemp.splice(arrTemp.length -1,0, ColumnsTableDevice({mac: keyTrans?.mac}).MACAddress)
    }else if(arrShowCol.mac === false && columnSelect == 1) {
        arrTemp = funRemoveColTable(arrTemp, "1")
    }else if(arrShowCol.memory && columnSelect == 2){
        arrTemp.splice(arrTemp.length -1,0, ColumnsTableDevice({memory: keyTrans?.memory}).Memory)
    }else if(arrShowCol.memory === false && columnSelect == 2){
        arrTemp = funRemoveColTable(arrTemp, "2")
    }else if(arrShowCol.sku && columnSelect == 3){
        arrTemp.splice(arrTemp.length -1,0, ColumnsTableDevice({sku: keyTrans?.sku}).SKUColumn)
    }else if(arrShowCol.sku === false && columnSelect == 3){
        arrTemp = funRemoveColTable(arrTemp, "3")
    }else if(arrShowCol.warranty && columnSelect == 4){
        arrTemp.splice(arrTemp.length -1,0, ColumnsTableDevice({warranty: keyTrans?.warranty}).WarrantyExpired)
    }else if(arrShowCol.warranty === false && columnSelect == 4){
        arrTemp = funRemoveColTable(arrTemp, "4")
    }else if(arrShowCol.user && columnSelect == 5){
        arrTemp.splice(arrTemp.length -1,0, ColumnsTableDevice({user: keyTrans?.user}).LoginName)
    }else if(arrShowCol.user === false && columnSelect == 5){
        arrTemp = funRemoveColTable(arrTemp, "5")
    }else if(arrShowCol.local && columnSelect == 6){
        arrTemp.splice(arrTemp.length -1,0, ColumnsTableDevice({local: keyTrans?.local}).Location)
    }else if(arrShowCol.local === false && columnSelect == 6){
        arrTemp = funRemoveColTable(arrTemp, "6")
    }else if(arrShowCol.power && columnSelect == 7){
        arrTemp.splice(arrTemp.length -1,0, ColumnsTableDevice({power: keyTrans?.power, off: keyTrans?.off,
            on: keyTrans?.on,
            unlock: keyTrans?.unlock,
            lock: keyTrans?.lock}).PowerScreen)
    }else if(arrShowCol.power === false && columnSelect == 7){
        arrTemp = funRemoveColTable(arrTemp, "7")
    }
    return arrTemp;
};

export const DisBtnDeActive = (data=[], type="", key="", valueKey={active: 1, deActive: 2}) => {
    const arrTemp = [...data]
    let status = {active: false, lock: false, activeText: false};
    if(arrTemp.length == 0) return {active: true, lock: false, activeText: false};
    // if(type == "active"){
    if(arrTemp.every(item=> item[key] == valueKey?.active)){
        status.active = false;
        status.activeText = false;

    } else if(arrTemp.every(item=> item[key] == valueKey?.deActive)){
        status.active = false
        status.activeText = true;

    }else if(arrTemp.some(item=> item[key] != valueKey?.active)){
        status.active = true
    }else if(arrTemp.some(item=> item[key] != valueKey?.deActive)){
        status.active = true
    }
    // }

    return status
};

export const funRenderStatusDevice = (data, keyTrans={active: "", deActive: ""}) => {
    switch (data?.deviceStatus) {
        case 1:
            return <div className="d-flex  align-items-center">
                <div className="circle-status circle-new"/>
                {keyTrans?.active}</div>;
        case 2:
            return <div className="d-flex  align-items-center">
                <div className="circle-status circle-cancel"/>
                {keyTrans?.deActive}</div>;
    }
}