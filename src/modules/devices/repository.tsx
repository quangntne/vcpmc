import httpRepository from "@repository/http";
import PaginationInfo from "@modules/pagination/entity";
import store from "@store/redux";
import listDevicesStore from "@modules/devices/listDevicesStore";


const getLogDevice = async (deviceId, payload: { pageSize: number; current: number }) => {
    const tempData = await  httpRepository.execute({
        path: `/api/DeviceLogs/showAllByDevice/${deviceId}`,//`/api/DeviceLogs/showAllByDevice/${deviceId}`,
        method: "get",
        params: {
            PageSize: payload.pageSize,
            PageNumber: payload.current,
        },
        config: {isPrivate: true},
        showSuccess: false,
    });
    return {
        data: tempData.pagedData,
        info: new PaginationInfo(tempData.pageInfo),
    };
};

const getGroupUser = async () => {
    const tempData = await  httpRepository.execute({
        path: `/api/Group`,
        method: "get",
        config: {isPrivate: true},
        showSuccess: false,
    });
    return tempData.pagedData
};

const getListDevices = async (payload: { pageSize: number; current: number }, option) => {
    const tempData = await httpRepository.execute({
        path: "/api/device",
        method: "get",
        params: {
            PageSize: payload.pageSize,
            PageNumber: payload.current,
            SearchContent: option.search,
        },
        config: {isPrivate: true},
        showSuccess: false,
    });
    return {
        data: tempData?.pagedData.map((item, index)=>({...item, stt: (index+1 )+((+payload.current-1)*10 )})),
        info: new PaginationInfo(tempData.pageInfo),
    };
};

const getAllDevice = async () => {
    const tempData = await httpRepository.execute({
        path: '/api/device',
        method: 'get',
        payload: {},
        config: {isPrivate: true},
        showSuccess: false
    });
    store.dispatch(listDevicesStore.actions.updateListDevice({listAllDevice: tempData.pagedData}));
    return {
        data: tempData.pagedData,
    }
};

const createDevice = async (data) => {
    return await httpRepository.execute({
        path: "/api/device",
        method: "post",
        payload: data,
        config: {isPrivate: true},
    });
};
const updateDevice = async (id, data) => {
    return await httpRepository.execute({
        path: "/api/device/" + id,
        method: "put",
        payload: data,
        config: {isPrivate: true},
    });
};

const deleteDevice = async (arrId) => {
    return await httpRepository.execute({
        path: "/api/device/multi",
        method: "delete",
        payload: {
            data: {deviceIds: arrId},
        },
    });
};

const deleteMemoryDevice = async (arrId) => {
    return await httpRepository.execute({
        path: "/api/device/deleteMultiMemory",
        method: "put",
        payload: {
            deviceIds: arrId,
        },
    });
};

const blockDevices = async (arrId) => {
    return await httpRepository.execute({
        path: "/api/device/changeLockMultiDevice",
        method: "put",
        payload: arrId,
    });
};

const restartDevices = async (arrId) => {
    return await httpRepository.execute({
        path: "/api/device/restartMultiDevice",
        method: "put",
        payload: arrId,
    });
};

const activeDevices = async (arrId) => {
    return await httpRepository.execute({
        path: "/api/device/changeActiveMultiDevice",
        method: "put",
        payload: arrId,
    });
};

const getTotalDeviceStatus = async () => {
    return await httpRepository.execute({
        path: "/api/device/dashboard",
        showSuccess: false,
        showError: false,
    })
}

export default {
    getListDevices,
    createDevice,
    updateDevice,
    deleteDevice,
    deleteMemoryDevice,
    blockDevices,
    restartDevices,
    activeDevices,
    getAllDevice,
    getTotalDeviceStatus,
    getLogDevice,
    getGroupUser
}
