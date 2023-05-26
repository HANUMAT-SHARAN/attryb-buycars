import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";

export const store = configureStore({
  devTools: true,
  reducer: {
    auth: authSliceReducer,
  },
});
