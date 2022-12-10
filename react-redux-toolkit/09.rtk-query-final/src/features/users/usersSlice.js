import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [] },
  reducers: {
    getUsers: (state, action) => {
      state.users = [...action.payload];
    }
  },
})

export const { getUsers } = usersSlice.actions;

export const selectAllUsers = (state) => state.users.users;

export default usersSlice.reducer;