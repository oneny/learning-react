import { createSelector, createSlice } from "@reduxjs/toolkit";

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

export const selectUserById = (state, userId) =>
  state.users.users.find(({ id }) => id === userId)

// export const selectUserById = createSelector(
//   [selectAllUsers, (state, userId) => userId],
//   (users, userId) => users.find(({ id }) => id === userId)
// );

export default usersSlice.reducer;