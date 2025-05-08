import { configureStore } from "@reduxjs/toolkit";
import drinkcacbonatedReducer from "./drinkcacbonatedslice";

export const store = configureStore({
  reducer: {
    auth: drinkcacbonatedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
