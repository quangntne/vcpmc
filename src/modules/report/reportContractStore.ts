import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const reportContractStore = createSlice({
  name: "reportContractStore",
  initialState: {
    path: {
      from: null,
      to: null,
    },
    sortBy: 0,
    detailSort: 0
  },
  reducers: {
    updateReportQuy: (state, action: PayloadAction<any>) => {
      return { ...state, path: action.payload }
    },
    updateSortBy: (state, action: PayloadAction<any>) => {
      return { ...state, sortBy: action.payload }
    },
    updateDetailSort: (state, action: PayloadAction<any>) => {
      return { ...state, detailSort: action.payload }
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateReportQuy, updateSortBy, updateDetailSort } = reportContractStore.actions;

export default reportContractStore.reducer;
