// redux/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData, postData } from "../../app/utils/apicall";
import { toast } from "react-toastify";

// Async thunks
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    const res = getData("/users/getusercartlist");
    const response = await res;
    // console.log("cart data", response);
    
    return response?.data; // Assuming your API returns `{ items: [...] }`
  }
);

// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async ({ productId, Quantity, size }, thunkAPI) => {
//     const data = postData("/users/addtocart", { productId, Quantity, size });
//     const response = await data;
//     if (response?.success) {
//      toast.success("Item added! 🛒 Ready to check out?");
//       thunkAPI.dispatch(fetchCart());
//     }
//     return response?.data;
//   }
// );


export const addOrUpdateCartItem = createAsyncThunk(
  "cart/addOrUpdateCartItem",
  async ({ productId, Quantity, size }, thunkAPI) => {
    const data = postData("/users/addtocart", { productId, Quantity, size });
     const response = await data;
    if (response?.success) {
      toast.success("Cart updated!");
      thunkAPI.dispatch(fetchCart());
    } else {
      toast.error("Failed to update cart.");
    }
    return response?.data;
  }
);



export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, thunkAPI) => {
    const data = postData("/users/deletefromcart", { productId });
    const response = await data;
    if (response?.success) {
      thunkAPI.dispatch(fetchCart());
    }
    return data;
  }
);

// Cart slice
const cartSlice = createSlice({
  name: "cartt",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
