import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "@modules/user/entity";

const profileStore = createSlice({
  name: "currentAccount",
  initialState: {
    statusLogin: false,
    user: new User({}) as User,
  },
  reducers: {
    fetchProfile: (state, action: PayloadAction<User>) => {
      return {
        statusLogin: true,
        user: action.payload,
      };
    },
    removeProfile: () => {
      return {
        statusLogin: false,
        user: new User({}),
      };
    },
  },
});

export default profileStore;
