import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type {
  DashboardState,
  IDashboard,
} from "../../types/dashboard.interface";

export const fetchDashboard = createAsyncThunk("dashboard/fetch", async () => {
  const response = await axios.get<IDashboard>(
    `${import.meta.env.VITE_SERVER_URL}/dashboard`,
    { withCredentials: true }
  );
  return response.data;
});

const initialState: DashboardState = {
  value: {},
  status: "idle",
  error: null,
};

export const dashBoardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});
