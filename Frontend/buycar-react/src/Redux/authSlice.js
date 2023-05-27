import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: {},
  auth: localStorage.get("userTokenBuyCars") ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
      state.auth = true;
    },
    logoutUser: (state) => {
      state.user = {};
      state.auth = false;
    },
  },
});

export const { logoutUser, setUser } = authSlice.actions;

const authSliceReducer = authSlice.reducer;

export default authSliceReducer;
