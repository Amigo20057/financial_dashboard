import type {
  ILogin,
  IRegister,
  IUser,
  UserState,
} from "../../types/user.interface";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get<IUser>(
    `${import.meta.env.VITE_SERVER_URL}/users/profile`,
    {
      withCredentials: true,
    }
  );
  return response.data;
});

export const registerUser = createAsyncThunk(
  "users/register",
  async (userData: IRegister, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/register`,
        userData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (errorP: unknown) {
      if (axios.isAxiosError(errorP)) {
        return rejectWithValue(errorP.response?.data?.error || errorP.message);
      }
      if (errorP instanceof Error) {
        return rejectWithValue(errorP.message);
      }
      return rejectWithValue(String(errorP));
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async (userData: ILogin, { rejectWithValue }) => {
    try {
      const response = await axios.post<IUser & { token: string }>(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        userData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || error.message);
      }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(String(error));
    }
  }
);

export const logoutUser = createAsyncThunk("users/logout", async () => {
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
});

const initialState: UserState = {
  value: {},
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.value = {};
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});
