import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IStore {
  currentLanguage: string;
}

const translateStore = createSlice({
  name: "translateStore",
  initialState: {
    currentLanguage: "USA",
  } as IStore,
  reducers: {
    updateLanguage: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        currentLanguage: action.payload,
      };
    },
  },
});

export default translateStore;
