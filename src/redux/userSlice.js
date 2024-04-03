// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    changePassword: false,
    user: [
      { email: "a@a", password: "password1" },
      { email: "b@b", password: "password2" },
      { email: "c@c", password: "password3" },
    ],
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    changePassword: (state, action) => {
      state.changePassword = true;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    newUser: (state, action) => {
      state.user.push(action.payload);
      state.isLoggedIn = false;
      state.changePassword = false;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout, changePassword, newUser } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
