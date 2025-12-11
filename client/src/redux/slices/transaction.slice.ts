import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ITransactionState } from "../../types/dashboard.interface";
import axios from "axios";

export const createTransaction = createAsyncThunk(
  "transaction/create",
  async (transactionData: {
    type: "income" | "expense";
    categoryId?: number;
    description?: string;
  }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/transaction/`,
        transactionData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.error("Error creating transaction: ", error);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  "transaction/fetchAll",
  async (params?: { lastDays?: number; limit?: number }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/transaction/params`,
        {
          withCredentials: true,
          params: params,
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.error("Error fetch all transactions: ", error);
    }
  }
);

export const getTransactionDataForGraphic = createAsyncThunk(
  "transaction/graphic",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/transaction/params`,
        {
          params: { lastDays: 30 },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.error("Error get transactions for graphic: ", error);
    }
  }
);

const initialState: ITransactionState = {
  value: {},
  status: "idle",
  error: null,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })

      .addCase(getTransactionDataForGraphic.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTransactionDataForGraphic.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(getTransactionDataForGraphic.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })

      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});
