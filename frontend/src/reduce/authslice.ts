import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
      state.login.error = false;
    },
    loginSuccess: (state, action) => {
      state.login.currentUser = action.payload;
      state.login.isFetching = false;
    },
    loginFailure: (state) => {
      state.login.error = true;
      state.login.isFetching = false;
    },
    logout: (state) => {
      state.login.currentUser = null;
    },
  },
});
export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
