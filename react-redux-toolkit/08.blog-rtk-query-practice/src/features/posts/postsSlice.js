import { createSelector, createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: { posts: [], post: {} },
  reducers: {
    setPosts: (state, action) => {
      state.posts = [...action.payload];
    },
    setPost: (state, action) => {
      state.post = { ...action.payload };
    },
  },
});

export const selectPost = (state) => state.posts.post;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

// createSelector accepts one or more input function
// and notice they're inside of brackets like an array that should be your first clue that these are dependencies
// actually the values returned from these functions are the dependencies
// and they provide the input parameters for the output function of our memoized selector
// so if the select all post value changes or this anonymous function which is taking state and userId
// and it's simply returning the userId. we just need the userId.
// So, we have to write a simple function to do that
// because these are input functions
// but then if posts or the userId changes essentially, that's the only time that we'll get something new from this selector
// that's the only time that is well return so it's memoized
// export const selectPostsByUser = createSelector(
//   selectAllPosts,
//   (state, userId) => userId,
//   (posts, userId) => posts.filter((post) => post.userId === userId),
// );

export const { setPosts, setPost } = postsSlice.actions;

export default postsSlice.reducer;
