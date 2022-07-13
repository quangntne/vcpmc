import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IListDeviceStore {
    listAllDevice?: Array<any>,
    listTempDevice?: Array<any>

}
const iniListDevice: IListDeviceStore = {
    listAllDevice: [],
    listTempDevice: [],

};

const listDevicesStore =  createSlice({
    name: 'listDevice',
    initialState: iniListDevice as IListDeviceStore,
    reducers: {
        fetchListDevice: (state, action: PayloadAction<IListDeviceStore>) => {
            return {
                ...state,
                ...action.payload
            }
        },
        updateListDevice: (state, action: PayloadAction<IListDeviceStore>) => {
            return {
                ...state,
                ...action.payload
            }
        },
    }
});

export default listDevicesStore