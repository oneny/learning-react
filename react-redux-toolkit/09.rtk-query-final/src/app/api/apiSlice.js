import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
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
