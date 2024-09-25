import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBookingPage: 1,
  totalBookingPages: 10,
  currentGiftCardPage: 1,
  totalGiftCardPages: 10,
  currentOrderGcPage: 1,
  totalOrderGcPages: 10,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setupdateBookingPage: (state, action) => {
      state.currentBookingPage = action.payload;
    },
    setTotalBookingPage: (state, action) => {
      state.totalBookingPages = action.payload;
    },
    setupdateGiftCardPage: (state, action) => {
      state.currentGiftCardPage = action.payload;
    },
    setTotalGiftCardPage: (state, action) => {
      state.totalGiftCardPages = action.payload;
    },
    setupdateOrderGcPage: (state, action) => {
      state.currentOrderGcPage = action.payload;
    },
    setTotalOrderGcPage: (state, action) => {
      state.totalOrderGcPages = action.payload;
    },
  },
});

export const {
  setupdateBookingPage,
  setupdateGiftCardPage,
  setTotalBookingPage,
  setTotalGiftCardPage,
  setupdateOrderGcPage,
  setTotalOrderGcPage,
} = pageSlice.actions;
export default pageSlice.reducer;
