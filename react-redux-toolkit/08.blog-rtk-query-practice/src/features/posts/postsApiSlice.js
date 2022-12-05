import { sub } from 'date-fns';
import { apiSlice } from '../api/apiSlice';
import { setPost } from './postsSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      transformResponse: (responseData) => {
        let min = 1;
        const loadedPosts = responseData.map((post) => {
          if (!post?.date)
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return post;
        });
        return loadedPosts.sort((a, b) => b.date.localeCompare(a.date));
      },
      providesTags: (result = [], error, arg) => [
        { type: 'Post', id: 'LIST' }, // List id로 all the posts들을 invalidate한다.
        // 개별 post를 id로 통해 invalidate할 수 있다.
        ...result.map(({ id }) => ({ type: 'Post', id })),
      ],
    }),
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
      transformResponse: (responseData) => {
        let min = 1;
        if (!responseData.date)
          responseData.date = sub(new Date(), { minutes: min++ }).toISOString();
        if (!responseData?.reactions) {
          responseData.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffe: 0,
          };
        }
        return responseData;
      },
      providesTags: (result = [], error, arg) => [{ type: 'Post', id: arg }],
    }),
    getPostsByUserId: builder.query({
      query: (id) => `/posts/?userId=${id}`,
      transformResponse: (responseData) => {
        let min = 1;
        return responseData.map((post) => {
          if (!post?.date)
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffe: 0,
            };
          return post;
        });
      },
      providesTags: (result, error, arg) => {
        console.log(result);
        return [...result.map(({ id }) => ({ type: 'Post', id }))];
      },
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: '/posts',
        method: 'POST',
        body: {
          ...initialPost,
          userId: Number(initialPost.userId),
          date: new Date().toISOString(),
          reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffe: 0,
          },
        },
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    updatePost: builder.mutation({
      query: (initialPost) => ({
        url: `/posts/${initialPost.id}`,
        method: 'PUT',
        body: {
          ...initialPost,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),
    // we don't want to reload our list every time we add a reaction
    // so we're going to do this differently
    // and this is what is called an optimistic update
    // and that's what we're going to perform here
    addReaction: builder.mutation({
      query: ({ postId, reactions }) => ({
        url: `posts/${postId}`,
        method: 'PATCH',
        // In a real app, we'd probably need to base this on user ID somehow
        // so that a user can't do the same reaction more than on
        body: { reactions },
      }),
      invalidatesTags: (ressult, err, arg) => [
        { type: 'Post', id: arg.postId },
      ],
      // we're once again passing the post id and the reactions just like we did above with the query
      // but then it has a second parameter as well
      // that parameter has has somethings in there we can use
      // one is dispatch and another is queryFulfilled which is a promise
      // ans so we're going to look at that to know some status as well
      async onQueryStared({ postId, reactions }, { dispatch, queryFulfilled }) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData(
            'getPosts',
            undefined,
            (draft) => {
              console.log(draft);
              // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
              const post = draft.posts[postId];
              if (post) post.reactions = reactions;
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetPostsByUserIdQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddReactionMutation,
} = extendedApiSlice;
