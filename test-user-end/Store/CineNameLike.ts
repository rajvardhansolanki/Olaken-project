import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../Helpers/baseUrl";

const initialState = {
  cineLike: [],
  isLoading: true,
  page: 1,
};

export const cineLikeProduct: any = createAsyncThunk(
  "get/cineLike",
  async ({ userId, productId }: any, thunkAPI) => {
    try {
      const response = await axios.put(`${baseUrl}/toggle-like-cinename`, {
        userId,
        productId,
      });
      const data = await response.data;
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      throw new Error(error);
    }
  }
);

export const cineLikeSlice = createSlice({
  name: "cineLike",
  initialState,
  reducers: {
    setPageQuery: (state, action) => {
      state.page = action.payload;
    },
    setCineName: (state, action) => {
      state.cineLike = action.payload;
    },
  },
  extraReducers: {
    [cineLikeProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [cineLikeProduct.fulfilled]: (state, action) => {
      state.cineLike = action.payload;
      state.isLoading = false;
    },
    [cineLikeProduct.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setPageQuery, setCineName } = cineLikeSlice.actions;
export default cineLikeSlice.reducer;
