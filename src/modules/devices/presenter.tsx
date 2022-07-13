import RepositoryDevice from "@modules/devices/repository";
import * as moment from "moment";
import {DataTemp, IFaceLog} from "@modules/devices/interface";
import PaginationInfo from "@modules/pagination/entity";






const devicesPresenter = { ...RepositoryDevice };

devicesPresenter.getListDevices = async (payload) => {
    const listDevice = await RepositoryDevice.getListDevices(payload, {});
    return listDevice;
};

devicesPresenter.getGroupUser = async () => {
    //expired: "2021-03-27T01:32:01"
    // groupCode: "PHATNE"
    // groupId: "05408826-db4a-46e5-b55a-9e86ac440f9f"
    // groupName: "PHATNE"
    const listGroup = await RepositoryDevice.getGroupUser();
    const arrConvert = listGroup.map(item=>({value: item.groupId, name: item.groupName, code: item.groupCode}))

    return arrConvert
};


devicesPresenter.getLogDevice = async (id,payload) => {
    const listLog = await RepositoryDevice.getLogDevice(id,payload);
    // console.log(listLog,'listLog=====')
    const tempData:Array<DataTemp> = [];
    let thisDate = "";
    listLog.data.map((item:IFaceLog) => {
        // console.log(thisDate)
        if(thisDate === moment(item.deviceLogCreatedAt).format("DD/MM/YYYY")){
            tempData[tempData.length-1].listLog.push(item)
            return
        }
        thisDate = moment(item.deviceLogCreatedAt).format("DD/MM/YYYY");
        tempData.push({date: item.deviceLogCreatedAt, listLog: [item] })
    });

    return {
        data: tempData,
        info: listLog.info,
    };

};

export default devicesPresenter;