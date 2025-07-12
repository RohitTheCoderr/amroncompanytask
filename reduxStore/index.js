import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import cartReducer from './slices/cartSlice';
// import cartCountReducer from "./slices/cartCountSlice";
import checkoutReducer from "./slices/checkoutSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer, // ⬅️ Add product slice here
    cart: cartReducer,
    // cartCount: cartCountReducer,
     checkout: checkoutReducer,
  },
});
