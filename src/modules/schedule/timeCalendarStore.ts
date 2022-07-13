import moment, { Moment } from 'moment';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Schedule from './Entity';
import Device from '@modules/devices/entity';
import User from '@modules/user/entity';

export interface ITimeCalendarStore {
    currentMonth: Moment,
    device: Device,
    listDayInMonth: Array<{
        day: Moment,
        listTimeInDay: Array<{
            scheduleInfo: {
                schedule: Schedule,
                author: User
            },
            hour: any,
        }>,
    }>
}

const initialState: ITimeCalendarStore = {
    currentMonth: moment(),
    device: new Device({}),
    listDayInMonth: [],
}

const timeCalendarStore = createSlice({
    name: 'timeCalendar',
    initialState: initialState as ITimeCalendarStore,
    reducers: {
        fetchTimeCalendar: (state, action: PayloadAction<ITimeCalendarStore>) => {
            return action.payload
        }
    }
})

export default timeCalendarStore;
