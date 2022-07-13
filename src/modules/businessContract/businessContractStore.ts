import _ from "lodash";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDay, IFormBusinessContract } from "@view/BusinessContract/interface";
import moment from "moment";
import BusinessContractEntity from "./entity";
interface IbusinessContractStore {
  businessContractValue: number;
  businessContractType: number;
  day: IDay;
  totalMoney: number | string;
  businessContractForEdit: IFormBusinessContract;
}

const calculateMonney = (value, type, duration) => {
  let totalMoney = 0;
  if (value && type && duration) {
    if (type == 1) {
      totalMoney = Math.floor(value / duration);
    } else if (type == 2) {
      totalMoney = value;
    }
  }
  return totalMoney;
};
const toFirstUpperCase = (string:string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const businessContractStore = createSlice({
  name: "businessContractStore",
  initialState: {
    businessContractForEdit: null,
    businessContractValue: null,
    businessContractType: 0,
    day: {
      start: null,
      end: null,
      duration: null,
    },
    totalMoney: 0,
  } as IbusinessContractStore,
  reducers: {
    updateBusinessContractValue: (state, action: PayloadAction<number>) => {
      state.businessContractValue = action.payload;
      if (state.businessContractType == 1 && state.day.duration) {
        state.totalMoney = Math.floor(
          state.businessContractValue / state.day.duration
        );
      } else if (state.businessContractType == 2) {
        state.totalMoney = action.payload;
      }
    },
    updateBusinessContractDay: (state, action: PayloadAction<Array<any>>) => {
      state.day.start = action.payload[0];
      state.day.end = action.payload[1];
      const duration = moment
        .duration(action.payload[1].diff(action.payload[0]))
        .as("day");
      state.day.duration = duration;
      if (state.businessContractType == 1) {
        state.totalMoney = Math.floor(state.businessContractValue / duration);
      } else if (state.businessContractType == 2) {
        state.totalMoney = 0;
      }
    },
    updateBusinessContractType: (state, action: PayloadAction<number>) => {
      state.businessContractType = action.payload;
      if (state.businessContractType == 1 && state.day.duration) {
        state.totalMoney = state.businessContractValue;
        state.totalMoney = Math.floor(
          state.businessContractValue / state.day.duration
        );
      } else if (state.businessContractType == 2) {
        state.totalMoney = 0;
      }
    },
    updateBusinessContractForEdit: (
      state,
      action: PayloadAction<BusinessContractEntity>
    ) => {
      const businessContractForEdit = action.payload;
      _.mapValues(businessContractForEdit, (value, key) => {
        console.log(toFirstUpperCase(key), "key");
        
        return;
      });
    },
  },
});

export const {
  updateBusinessContractValue,
  updateBusinessContractDay,
  updateBusinessContractType,
  updateBusinessContractForEdit,
} = businessContractStore.actions;

export default businessContractStore;
