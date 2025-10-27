import { configureStore } from "@reduxjs/toolkit";
import { dashBoardSlice } from "./slices/dashboard.slice";
import { userSlice } from "./slices/user.slice";

export default configureStore({
  reducer: {
    dashboard: dashBoardSlice.reducer,
    user: userSlice.reducer,
  },
});
