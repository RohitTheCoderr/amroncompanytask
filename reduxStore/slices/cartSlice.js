import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items:
//     typeof window !== "undefined" && localStorage.getItem("guestCart")
//       ? JSON.parse(localStorage.getItem("guestCart"))
//       : [],
// };

const getInitialCart = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('guestCart');
    try {
      const parsed = JSON.parse(saved);
      return { items: Array.isArray(parsed) ? parsed : [] };
    } catch {
      return { items: [] };
    }
  }
  return { items: [] };
};


const saveToLocalStorage = (items) => {
  localStorage.setItem("guestCart", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialCart(),
  reducers: {
    addToCart: (state, action) => {
      const { productId, productName, price, images, size, description,discount } =
        action.payload;
      // const existing = state.items.find(
      //   item => item.productId === productId && item.size === size
      // );
      let existing = Array.isArray(state.items)
        ? state.items.find(
            (item) => item.productId === productId && item.size === size
          )
        : null;
      if (existing) {
        existing.Quantity += 1;
      } else {
        state.items.push({
          productId,
          productName,
          price,
          images,
          size,
          description,
          discount,
          Quantity: 1,
        });
      }
      saveToLocalStorage(state.items);
    },

    incrementQty: (state, action) => {
      const item = state.items.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.size === action.payload.size
      );
      if (item) item.Quantity += 1;
      saveToLocalStorage(state.items);
    },

    decrementQty: (state, action) => {
      const item = state.items.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.size === action.payload.size
      );
      if (item) {
        if (item.Quantity > 1) {
          item.Quantity -= 1;
        } else {
          state.items = state.items.filter(
            (i) => !(i.productId === item.productId && i.size === item.size)
          );
        }
        saveToLocalStorage(state.items);
      }
    },

    removeFromCart: (state, action) => {
      const { productId, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.productId === productId && item.size === size)
      );
      saveToLocalStorage(state.items);
    },

    setCartItems: (state, action) => {
      state.items = action.payload;
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("guestCart");
    },
  },
});

export const {
  addToCart,
  incrementQty,
  decrementQty,
  removeFromCart,
  clearCart,
  setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getData, postData } from '../../app/utils/apicall';

// // ✅ Fetch user cart
// export const fetchUserCart = createAsyncThunk(
//   'cart/fetchUserCart',
//   async (_, thunkAPI) => {
//     try {
//       const res = getData('/users/getusercartlist');
//        const cart=await res;
//       return cart?.data || []; // assuming `cart` key in response
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // ⬇️ Add to Cart
// export const addToCart = createAsyncThunk(
//   'cart/addToCart',
//   async ({ productId, Quantity, size }, thunkAPI) => {
//     try {
//       const res = postData('/users/addtocart', { productId, Quantity, size });
//       const data=await res

//        if (data) {
//         fetchUserCart()
//        }

//       return data?.data; // Assuming updated cart comes in response
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // ⬇️ Delete from Cart
// export const deleteFromCart = createAsyncThunk(
//   'cart/deleteFromCart',
//   async ({ productId }, thunkAPI) => {
//     try {
//       const res = postData('/users/deletefromcart',{ productId });
//       const result= await res
//       if (result) {
//         fetchUserCart()
//       }
//       return result?.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: [], // You can update this based on backend response
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setCartItems: (state, action) => {
//       state.items = action.payload;
//     },
//     clearCart: state => {
//       state.items = [];
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(addToCart.pending, state => {
//         state.loading = true;
//       })
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload.cart || state.items; // optional, adjust based on response
//       })
//       .addCase(addToCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(deleteFromCart.fulfilled, (state, action) => {
//         state.items = action.payload.cart || state.items;
//       })

//     //   for getting cartdata
//      .addCase(fetchUserCart.pending, state => {
//         state.loading = true;
//       })
//       .addCase(fetchUserCart.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchUserCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { setCartItems, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;
