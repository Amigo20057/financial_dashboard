import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CategoryState, ICategory } from "../../types/category.interface";

export const createCategory = createAsyncThunk(
  "category/create",
  async (categoryData: ICategory) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/category/`,
        categoryData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.error("Error creating category:", error);
    }
  }
);

const initialState: CategoryState = {
  value: {},
  status: "idle",
  error: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});
