// // store/slices/cartCountSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const cartCountSlice = createSlice({
//   name: 'cartCount',
//   initialState: {
//     count: 1,
//   },
//   reducers: {
//     setCartCount: (state, action) => {
//       state.count = action.payload;
//     },
//     incrementCartCount: (state) => {
//      if (state.count < 10) {
//     state.count += 1;
//   }
//     },
//     decrementCartCount: (state) => {
//       if (state.count > 1) state.count -= 1;
//     },
//     resetCartCount: (state) => {
//       state.count = 0;
//     },
//   },
// });

// export const {
//   setCartCount,
//   incrementCartCount,
//   decrementCartCount,
//   resetCartCount,
// } = cartCountSlice.actions;

// export default cartCountSlice.reducer;
