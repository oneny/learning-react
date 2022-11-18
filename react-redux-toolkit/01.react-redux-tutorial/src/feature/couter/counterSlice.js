import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,

};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    }
  }
});

// both of these must be exported if we want to use these actions
// and we can see they're available from the counterSlice.actions
export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions;

// we also need to export the full reducer
// because the store will need that
export default counterSlice.reducer;