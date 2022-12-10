import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import usersSlice from "../features/users/usersSlice";
import notesSlice from "../features/notes/noteSlice";

import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    users: usersSlice,
    notes: notesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

/**
 * A utility used to enable refetchOnFocus and refetchOnReconnect behaviors.
 * It requires the dispatch method from your store.
 * Calling setupListeners(store.dispatch) will configure listeners with the recommended defaults,
 * but you have the option of providing a callback for more granular control.
 */

setupListeners(store.dispatch);