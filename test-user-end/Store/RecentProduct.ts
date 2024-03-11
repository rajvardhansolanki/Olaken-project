import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../Helpers/baseUrl";
const initialState = {
  recentProduct: [],
  isLoading: true,
  page: 1,
};
export const getRecentProduct: any = createAsyncThunk(
  "get/recentProduct",
  async (page, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/products/recent`);
      const data = await response.data;
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      throw new Error(error);
    }
  }
);
//actions in reducer
export const recentProductSlice = createSlice({
  name: "recentProduct",
  initialState,
  reducers: {
    setPageQuery: (state, action) => {
      state.page = action.payload;
    },
    setCineName: (state, action) => {
      state.recentProduct = action.payload;
    },
  },
  extraReducers: {
    [getRecentProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getRecentProduct.fulfilled]: (state, action) => {
      state.recentProduct = action.payload;
      state.isLoading = false;
    },
    [getRecentProduct.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { setPageQuery, setCineName } = recentProductSlice.actions;
export default recentProductSlice.reducer;
