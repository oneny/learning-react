import { apiSlice } from '../../app/api/apiSlice';
import { getUsers } from './usersSlice';

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
        ...result.map(({ id }) => ({ type: 'User', id })),
      ],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(getUsers(data));
        } catch (err) {
          console.error(err);
        }
      }
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      transformResponse: (responseData) => {
        responseData.id = responseData._id;
        return responseData;
      },
      providesTags: (result = [], err, arg) => [{ type: 'User', id: arg }],
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: '/register',
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

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();
