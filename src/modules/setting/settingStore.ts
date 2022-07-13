import MediaCategoriesEntity from "@modules/mediaCategories/entity";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISetting {
  dateExpried: string;
  scheduleTimeReport: {
    type: number;
    value: Array<{ DateFrom: string, dateTo: string }> | number
  };
  settingControl: {
    checkBy: number,
    startDate?: any,
    endDate?: any
  },
  numberDateWarning: number,
  mediaCategories?: Array<MediaCategoriesEntity>,
  mediaFormat?: Array<{}>
}

const settingStore = createSlice({
  name: "settingStore",
  initialState: {
    dateExpried: null,
    scheduleTimeReport: {
      type: null,
      value: null
    },
    status: "init" || "success",
    settingControl: {
      checkBy: 0,
      statrDate: "",
      endDate: ""
    },
    numberDateWarning: 365,
    mediaCategories: [],
    mediaFormat: []
  } as ISetting,
  reducers: {
    fetchSetting: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload }
    },
    fetchSettingControl: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload }
    },
    fetchNumberDateWarning: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload }
    },
    fetchMediaCategories: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload }
    },
    addMediaCategory:(state,action: PayloadAction<MediaCategoriesEntity>)=>{
      const mediaCategories=[action.payload,...state.mediaCategories];
      return { ...state,mediaCategories }
    },
    fetchMediaFormat: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload }
    },
  },
});

export const {
  fetchSetting, fetchSettingControl, fetchNumberDateWarning, fetchMediaCategories,addMediaCategory, fetchMediaFormat
} = settingStore.actions;


export default settingStore;
