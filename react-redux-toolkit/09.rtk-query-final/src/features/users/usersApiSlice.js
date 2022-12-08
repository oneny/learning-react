import { apiSlice } from '../../app/api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: '/users',
        // Example: we have a backend API always returns a 200,
        // but sets an `isError` property when there is an error.
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return loadedUsers;
      },
      providesTags: (result = [], error, arg) => [
        { type: 'User', id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'Post', id })),
      ],
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: '/users',
        method: 'POST',
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: '/users',
        method: 'PATCH',
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();