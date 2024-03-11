import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../Helpers/baseUrl";
const initialState = {
  cineNames: [],
  isLoading: true,
  page: 1,
};
export const getCineNames: any = createAsyncThunk(
  "get/allCineName",
  async (page, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/cineNames`);
      const data = await response.data;
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      throw new Error(error);
    }
  }
);
//actions in reducer
export const cineNameSlice = createSlice({
  name: "cines",
  initialState,
  reducers: {
    setPageQuery: (state, action) => {
      state.page = action.payload;
    },
    setCineName: (state, action) => {
      state.cineNames = action.payload;
    },
  },
  extraReducers: {
    [getCineNames.pending]: (state) => {
      state.isLoading = true;
    },
    [getCineNames.fulfilled]: (state, action) => {
      state.cineNames = action.payload;
      state.isLoading = false;
    },
    [getCineNames.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { setPageQuery, setCineName } = cineNameSlice.actions;
export default cineNameSlice.reducer;
