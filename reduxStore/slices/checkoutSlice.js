// redux/checkoutSlice.js
import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    products: [],
  },
  reducers: {
    setCheckoutProducts: (state, action) => {
      state.products = action.payload; // ✅ always replace
    },
    clearCheckout: (state) => {
      state.products = [];
    },
  },
});

export const { setCheckoutProducts, clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
