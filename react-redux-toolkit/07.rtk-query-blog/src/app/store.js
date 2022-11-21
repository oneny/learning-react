import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import usersSlice from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    users: usersSlice,
  },
  // this middleware from api slice manages cache lifetimes and expirations
  // and it is required to use it when we're using rtk query and an api slice
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});