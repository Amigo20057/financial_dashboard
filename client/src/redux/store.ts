import { configureStore } from "@reduxjs/toolkit";
import { dashBoardSlice } from "./slices/dashboard.slice";
import { userSlice } from "./slices/user.slice";
import { categorySlice } from "./slices/category.slise";

export const store = configureStore({
  reducer: {
    dashboard: dashBoardSlice.reducer,
    user: userSlice.reducer,
    category: categorySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
