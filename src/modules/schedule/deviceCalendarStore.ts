import Device from '@modules/devices/entity'
import Pagination from '@modules/pagination/entitiy'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment, { Moment } from "moment"
import Schedule from './Entity'

export interface IDeviceCalenderStore {
    pagination?: Pagination,
    currentMonth?: Moment,
    outOdData?: boolean,
    filter?: {
        search?: string,
        deviceStatus?: 0 | 1 | 2,
    },
    listDevice?: Array<{
        device: Device,
        calendar: Array<{
            day: Moment,
            listSchedule: Array<Schedule>
        }>
    }>,
    itemDrop?:any
}

const initialState: IDeviceCalenderStore = {
    pagination: new Pagination({}),
    currentMonth: moment(),
    filter: {
        search: "",
        deviceStatus: 0,
    },
    outOdData: false,
    listDevice: [],
    itemDrop: {},
}

const deviceCalendarStore = createSlice({
    name: 'deviceCalendar',
    initialState: initialState as IDeviceCalenderStore,
    reducers: {
        fetchDeviceCalendar: (state, action: PayloadAction<IDeviceCalenderStore>) => {
            return action.payload
        },
        updateDeviceCalendar: (state, action: PayloadAction<IDeviceCalenderStore>) => {
            return {
                ...state,
                ...action.payload,
                listDevice: [
                    ...state.listDevice,
                    ...action.payload.listDevice
                ]
            }
        },
        dropItem: (state, action: PayloadAction<IDeviceCalenderStore>) =>{
            state.itemDrop = action.payload.itemDrop;
            return state;
        },
        reset: (state) => {
            return initialState;
        }
    }
})

export default deviceCalendarStore