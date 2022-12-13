import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3500',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log('args', args); // request url, method, body
  // console.log('api', api); // signal, dispatch, getState()
  // console.log('extraOptions', extraOptions); // custom like { shout: true }
  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.originalStatus === 403) {
    console.log('sending refresh token');
    
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult?.data }))

      // retry orignial query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = 'Your login has expired.';
      }
      return refreshResult;
    }
  }
  
  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  // we provide a couple of tag types
  // because these will be used for cached data
  // so when we invalidate different caches or types
  // we'll referring to the note and the user data both
  tagTypes: ['Note', 'User'],
  // we provide endpoints with an emptybuilder
  // we are going to provide extended slices that we will attach to this api slice essentially for notes
  // and for users and that's where we'll provide the details that would really be the actual endpoints
  endpoints: (builder) => ({}),
});
