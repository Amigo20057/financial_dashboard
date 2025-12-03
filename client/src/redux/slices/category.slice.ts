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

export const fetchCategories = createAsyncThunk(
  "category/fetchAll",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/category/`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetch category:", error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, name, color }: { id: number; name: string; color: string }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/category/${id}`,
        { name, color },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.error("Error updating category:", error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id: number) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/category/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.error("Error deleting category:", error);
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
      })

      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })

      .addCase(updateCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })

      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});
