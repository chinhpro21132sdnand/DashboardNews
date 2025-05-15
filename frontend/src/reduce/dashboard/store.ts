import { configureStore } from "@reduxjs/toolkit";
import DasboardReducer from "./dashboardslice";

export const store = configureStore({
  reducer: {
    auth: DasboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
