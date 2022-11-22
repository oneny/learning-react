import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => "/users",
      keepUnusedDataFor: 5, // for testing it out and see the diffrence(default: 60)
    })
  })
});

export const {
  useGetUsersQuery,
} = usersApiSlice;