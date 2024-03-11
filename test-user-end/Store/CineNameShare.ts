import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../Helpers/baseUrl";

const initialState = {
  cineShare: [],
  isLoading: true,
  page: 1,
  error: null, // Add error field to the initial state
};

export const cineShareProduct: any = createAsyncThunk(
  "get/cineShare",
  async ({ userId, productId }: any, thunkAPI) => {
    try {
      const response = await axios.put(`${baseUrl}/share-cinename`, {
        userId,
        productId,
      });
      const data = await response.data;
      return data;
    } catch (error) {
      // You should return the error payload here
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const cineShareSlice = createSlice({
  name: "cineShare",
  initialState,
  reducers: {
    setPageQuery: (state, action) => {
      state.page = action.payload;
    },
    setCineName: (state, action) => {
      state.cineShare = action.payload;
    },
  },
  extraReducers: {
    [cineShareProduct.pending]: (state) => {
      state.isLoading = true;
      state.error = null; // Reset error when starting the async operation
    },
    [cineShareProduct.fulfilled]: (state, action) => {
      console.log('actionpayload', action.payload)
      state.cineShare = action.payload;
      state.isLoading = false;
      state.error = null; // Reset error when the async operation is successful
    },
    [cineShareProduct.rejected]: (state, action) => {
      state.isLoading = false;
      // Handle the rejected action properly by updating the state
      state.error = action.payload; // Update state with the error payload
    },
  },
});
console.log('cineSharecineSharecineSharecineShare', initialState.cineShare)

export const { setPageQuery, setCineName } = cineShareSlice.actions;
export default cineShareSlice.reducer;
