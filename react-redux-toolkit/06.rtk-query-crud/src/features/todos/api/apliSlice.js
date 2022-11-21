import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      transformResponse: res => res.sort((a, b) => b.id - a.id),
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

// one very cool feature about rtk query is it creates custom hooks based on the methods that we provide
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;

// what is happening is the results get cached
// and we're not invalidating the previous cache
// and so it's not updating to show the new changes
// whether that's a delete an update or even a new to-do list or not a new to-do list, a new todo-item added to the to-do list
// it's not showing any of that because we're still seeing the cached version of the data
// what we need to do is assign a tag to the cache
// and then let it know which mutations invalidate the cache
// and so then it will automatically refetch that data for us
