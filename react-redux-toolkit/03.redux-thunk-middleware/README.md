## 02. React Redux Posts 핵심

### Customizing Generated Action Creators

> If you need to customize the creation of the payload value of an action creator by means of a prepare callback, the value of the appropriate field of the reducers argument object should be an object instead of a function. This object must contain two properties: reducer and prepare. The value of the reducer field should be the case reducer function while the value of the prepare field should be the prepare callback function
> [출처: createslice](https://redux-toolkit.js.org/api/createslice)

```js
// features/postsSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say slice, the more I want pizza.",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffe: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
```

- `postAdded` 리듀서를 사용할 때에 객체에 많은 정보를 담아야할 필요가 있는 경우에는 컴포넌트에서 그 많은 정보를 담아서 보내도록 하지 말고, `reducer`와 `prepare` 프로퍼티를 가진 객체로 만들어 커스터마이징할 수 있다!
