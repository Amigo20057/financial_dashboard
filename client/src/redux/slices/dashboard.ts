import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchDashboard = async () => {
  return await axios.get<IDashboard>(
    `${import.meta.env.VITE_SERVER_URL}/dashboard`,
    {
      withCredentials: true,
    }
  );
};

export const dashBoardSlice = createSlice({
  name: "dashboard",
  initialState: {
    value: {},
  },
  reducers: {
    fetchDashboard: async (state) => {
      state.value = await fetchDashboard();
    },
  },
});
