import { apiSlice } from '../../app/api/apiSlice';
import { logOut, setCredentials } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'GET',
      }),
      // rtk-query provides an onQueryStart that we can call inside of our endpoint
      // now what this does and it's async it accepts an argument
      // that we're not really defining but it needs it here as the first parameter
      // but then it also provides things like dispatch and queryFulfilled
      // so sw can verify our query has been fulfilled and
      // becuase we're putting async here we can await that
      // so i'm putting a try-catch inside of our onQueryStarted function
      // and we're awaiting the queryFulled now
      // notice I have this commented out because you could set const data equals queryFulled it returns a data property
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
          setTimeout(() => {
            // apiSlice which is separate from the authSlice
            // and this is going to need be cleared as well
            // and so we can call apiSlice
            // because we imported it at the top
            // and then we go dot util dot resetApiState
            // and that is a method that can be called and it well clear out the cache and the query subscriptions and everything to do with our apiSlice
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/refresh',
        method: 'GET',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice;
