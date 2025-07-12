import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../app/utils/apicall';
// import axios from 'axios';

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = getData('/products/getallproducts');
      const response = await res;
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
