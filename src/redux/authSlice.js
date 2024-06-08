// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    loginStart: (state, action) => {
      state.login.isFetching = true;
      state.user = action.payload;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    RegisterStart: (state, action) => {
      state.register.isFetching = true;
    },
    RegisterSuccess: (state, action) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    RegisterFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },
    logoutSuccess: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.error = false;
    },
    logoutFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    logoutStart: (state) => {
      state.login.isFetching = true;
    },
  },
});

export const {
  loginStart,
  logout,
  loginSuccess,
  loginFailed,
  RegisterStart,
  RegisterFailed,
  RegisterSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = userSlice.actions;

export default userSlice.reducer;
