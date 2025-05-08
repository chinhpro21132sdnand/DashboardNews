import { configureStore } from "@reduxjs/toolkit";
import vegatableReducer from "./vegatableslice";

export const store = configureStore({
  reducer: {
    auth: vegatableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
