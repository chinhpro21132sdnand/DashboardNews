import { configureStore } from "@reduxjs/toolkit";
import politicsReducer from "./businessslice";

export const store = configureStore({
  reducer: {
    auth: politicsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
