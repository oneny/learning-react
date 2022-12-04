## rtk query 기본 실습

```js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// baseURL과 endpoints들로 서비스 정의
export const apiSlice = createApi({
  reducerPath: "api", // 스토어의 reducer로 지정할 path의 이름
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }), // 기본으로 지정할 서버 URL
  tagTypes: ["Todos"], // tagTypes: 자동으로 데이터가 패치되게 구별할 타입
  endpoints: (builder) => ({
    // 엔드 포인트들
    getTodos: builder.query({
      query: () => "/todos",
      transformResponse: res => res.sort((a, b) => b.id - a.id),
      // providesTags는 invalidTags가 실행될 때 자동으로 패치될 쿼리를 나타낸다.
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});


// 정의된 엔드포인트에서 자동으로 생성된 훅을 함수형 컴포넌트에서 사용하기 위해 export
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
```

* `reducerPath`: 스토어의 reducer로 지정할 path의 이름
* `baseQuery`: 기본으로 지정할 서버 URL
* `tagTypes`: 자동으로 데이터가 패치되게 구별할 타입
* `endpoints`: 엔드포인트에서 request하여 받은 데이터를 가지고 hooks를 만든다.


## 기본 사항

### Query

주로 데이터를 가져올 때 query를 사용한다.

### Mutation

생성/업데이트 또는 삭제할 때 주로 Mutation을 사용하곤 한다.  
뮤테이션은 주로 업데이트를 하거나, 로컬 캐시에 변경된 사항을 적용하고, 무효화된 캐시 데이터를 강제로 리패치가 가능하다.

#### Mutation에서 제공해주는 property들

* `data`: 가장 최근 트리거된 응답이다. 데이터가 전달받기 전엔 undefined를 응답받을 것이다.
* `error`: 현재 기준의 에러
* `isUninitialized`: true일 경우, 이는 뮤테이션이 아직 실행이 안되었다는 말을 뜻한다.
* `isLoading`: true일 경우, 이는 뮤테이션이 아직 응답을 기다리고 있음을 뜻한다.
* `isSuccess`: true일 경우, 이는 마지막으로 실행된 뮤테이션이 응답에 성공했음을 의미한다.
* `isError`: true일 경우, 이는 마지막으로 실행된 뮤테이션 응답이 실패했음을 뜻하게 된다.
* `reset`: 이 메서드는 현재 캐싱된 응답을 지우고, 기존 state로 리셋시켜준다.
