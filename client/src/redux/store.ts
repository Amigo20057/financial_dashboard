import { configureStore, combineReducers } from "@reduxjs/toolkit";
import type { UnknownAction } from "@reduxjs/toolkit";

import { dashBoardSlice } from "./slices/dashboard.slice";
import { logoutUser, userSlice } from "./slices/user.slice";
import { categorySlice } from "./slices/category.slice";

const appReducer = combineReducers({
  dashboard: dashBoardSlice.reducer,
  user: userSlice.reducer,
  category: categorySlice.reducer,
});

export type AppState = ReturnType<typeof appReducer>;

const rootReducer = (
  state: AppState | undefined,
  action: UnknownAction
): AppState => {
  if (logoutUser.fulfilled.match(action)) {
    state = undefined;
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
