import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../features/users/usersSlice";
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    users: usersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})