import { configureStore } from "@reduxjs/toolkit";
import entertaimentReducer from "./entertaimentslice";

export const store = configureStore({
  reducer: {
    auth: entertaimentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
