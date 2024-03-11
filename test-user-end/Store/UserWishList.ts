import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useContext } from "react";
import { baseUrl } from "../Helpers/baseUrl";
import ContextApi from "./context/ContextApi";

const initialState = {
  userWishlist: [],
  isLoading: true,
};

export const getUserWishlist: any = createAsyncThunk(
  "user/getUserWishlist",
  async (_, thunkAPI) => {
    try {
      const config = useContext(ContextApi).config;
      const response = await axios.get(`${baseUrl}/user/wishlist`, config);
      console.log('111111111111', response)
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      throw new Error(error);
    }
  }
);

export const userWishlistSlice = createSlice({
  name: "userWishlist",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserWishlist.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserWishlist.fulfilled]: (state, action) => {
      state.userWishlist = action.payload;
      state.isLoading = false;
    },
    [getUserWishlist.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default userWishlistSlice.reducer;
