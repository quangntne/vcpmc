import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ITimeScheduleStore {
    arrayWeekly?: Array<any>,
    arrayMonthly?: Array<any>
    arrayYearly?: Array<any>

}
const iniTimeSchedule: ITimeScheduleStore = {
    arrayWeekly: [], //send to server
    arrayMonthly: [], //show local
    arrayYearly: [] //show local

};

const timeScheduleStore =  createSlice({
    name: 'timeSchedule',
    initialState: iniTimeSchedule as ITimeScheduleStore,
    reducers: {
        fetchTimeSchedule: (state, action: PayloadAction<ITimeScheduleStore>) => {
            return {
                ...state,
                ...action.payload
            }
        },
        updateTimeSchedule: (state, action: PayloadAction<ITimeScheduleStore>) => {
            return {
                ...state,
                ...action.payload
            }

        },
    }
});

export default timeScheduleStore