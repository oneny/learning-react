import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../feature/couter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
