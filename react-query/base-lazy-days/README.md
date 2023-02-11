# Lazy Days Spa Client

## useIsFetching

- 각 컴포넌트마다 개별 로딩 인디케이터를 사용하는 대신 중앙화된 로딩 인디케이터를 사용하도록 앱 업데이트
- useIsFetching 훅을 로딩 컴포넌트에 사용하여 스피너 표시 앱을 표시할 수 있다.
- useisFeching은 현재 가져오기 상태인 쿼리 호출의 수를 나타내는 정수값을 반환한다.

## QueryClient default onError option

- 오류 핸들링 집중화하여 모든 useQuery 호출에 오류 핸들링 방식을 적용해서 각 호출에 따로 지정하지 않도록 만들 수 있다.
- useIsFetching과 같은 집중식 훅 대신 QueryClient를 위해 onError 핸들러 기본값을 만든다.
  - defaults for QueryClient
    - 일반적으로 QueryClient는 쿼리나 변이(Mutation)에 대해 기본값을 가질 수 있다.
- QueryClient는 defaultOptions 객체를 가질 수 있는데 이 객체는 두 가지 프로퍼티를 갖는다.
  - queries, mutations
  - queries 프로퍼티는 useQuery에 추가하는 options 형식의 값을 가진다.
  - mutations 프로퍼티의 값은 useMutation에 추가하는 options 형식을 가질 수 있다.
- 그럼 useTreatments에 있는 onError를 QueryClient에 전송해서 모든 useQuery 호출에 적용할 수 있다.
  - `/src/react-query/queryClient.ts` 확인

### Alternative to onError: Error Boundary

- Alternative: handle to errors with React Error Boundary
  - [reference]
- useErrorBoundary for useQuery
  - [reference](https://react-query.tanstack.com/reference/useQuery)
- option to useQuery / useMutation
  - or in defaultOptions when creating QueryClient
- Set to true to propagate errors to the nearest error boundary
  - useErrorBoundary 옵션을 true로 설정하면 ReactQuery 내에서 에러를 처리하는 대신
  - 가장 가까운 에러 경계로 에러를 전파한다.

## Options for pre-populating data

|                 | where to use?         | data from? | added to cache? |
| --------------- | --------------------- | ---------- | --------------- |
| prefetchQuery   | method to queryClient | server     | yes             |
| setQueryData    | method ot queryClient | client     | yes             |
| placeholderData | option to useQuery    | client     | no              |
| initialData     | option to useQuery    | client     | yes             |

- 데이터는 서버에서 오기 때문에 데이터를 가져오기 위해 서버로 이동하고 데이터는 캐시에 추가된다.
- setQueryData: useQuery를 실행하지 않고, 쿼리 데이터를 캐시에 추가하는 또 다른 방법
  - setQueryData는 클라이언트에서 데이터를 가져온다.
  - 따라서 서버에서 변이(mutation)에 대한 응답으로 나온 데이터일 수 있다.
  - queryClient에서 setQueryData 메서드를 사용하여 캐시에 데이터를 추가하면 useQuery가 데이터를 요청할 때 캐시가 해당 데이터를 제공하도록 할 수 있다.
- placeholderData: useQuery를 실행할 떄 데이터를 제공하기 때문에 클라이언트에서 데이터를 가져오고 캐시에는 추가되지 않는다.
  - placeholderData는 고정값 또는 함수를 사용할 수 있다.
  - 자리 표시자 데이터값을 동적으로 결정하는 함수를 사용하려는 경우 placeholderData를 사용하는 것이 가장 좋다.
  - 즉, 자리 표시자가 필요한 경우에만 사용한다. 달리 표시할 데이터가 없는 경우 사용하는 표시용 데이터일 뿐, 다시 사용할 일잉 없기 때문에 캐시에 추가하지 않는다.
- initialData: placeholderData에 반대되는 것이 initialData
  - placeholder와 달리 캐시에 추가해야 하는 데이터이다.
  - 이 쿼리에 대한 유효한 데이터임을 공식적인 기록에 선언해 둘 필요가 있다.

## Prefetch Treatments

- saw prefetch with pagination
  - prefetch next page
  - 사용자가 현재 페이지를 보고 있는 동안 다음 페이지를 미리 가져와서 사용자가 다음 페이지 버튼을 클릭할 때 기다릴 필요가 없도록 하는데 사용한다.
- differenet trigger: prefetch treatments on home page load
  - 사용자가 전체 페이지를 로드할 때 Treatments 데이터를 미리 가져오기
  - user research: 85% of home page loads are followed by treatments tab loads
    - 홈페이지 로드 중 높은 비율이 Treatments 탭으로 이어진다는 사용자 연구 결과가 있다고 가정
  - Treatments don't change often, so cached data isn't really a problem
    - Treatments 데이터는 비교적 안정적이기 때문에 prefetching에 적합하다.
    - 주식 시세와 같이 동적인 데이터를 가져오는 것이 아니기 때문에 캐시된 데이터에 의존하더라도 그다지 문제가 되지 않는다.
- garbage collected if no useQuery is called after cacheTime
  - 물론 캐시 시간 내에 useQuery로 데이터를 호출하지 않으면 가비지 컬렉션으로 수집된다.
  - if typically not loaded by default cacheTime(5 minutes), specify logher cacheTime
    - 만약 사용자가 기본 캐시 시간 즉, 5분 이내에 Treatments 탭을 로드하지 않는다면 캐시 시간을 더 길게 지정할 수도 있다.
- prefetchQuery is a method on the queryClient
  - adding to the client cache
- useQueryClient returns queryClient (within Provider)
- Procedure
  - user loads home page
  - queryClient.prefetchQuery adds treatments data to cache
  - user loads treaments page
  - within cacheTime?
    - yes -> treatments data loads from cache useQuery fetches fresh data
    - no -> no initial data useQuery fetches fresh data

```ts
// components/appointments/hooks/useAppointments.ts
useEffect(() => {
  // 데이터가 모두 만료(stale) 상태가 되어 정확한 데이터라고 볼 수는 없다.
  // 하지만 가장 최신의 데이터가 있는지 서버를 계속 확인하면서
  // 사용자에게 빈 달력 대신 프리페칭된 데이터를 보여줄 수 있다.
  const nextMonthYear = getNewMonthYear(monthYear, 1);
  queryClient.prefetchQuery(
    [queryKeys.appointments, nextMonthYear.year, nextMonthYear.month],
    () => getAppointments(monthYear.year, nextMonthYear.month)
  );
}, [monthYear, queryClient]);
```

## Query Key

- Why doesn't new data load? -> using the same key for every query
- after clicking arrow to load new month
  - data is stale (staleTime = 0), but...
  - nothing to trigger refetch
    - component remount
    - window refocus
    - running refetch function manually
    - automated refetch
- Only fetch new data for known key for the above reasons
  - Solution: New key for each page
    - treat keys as dependency arrays!

## Prefetch Summary

- Pre-populating data options:
  - pre-fetch, setQueryData, placeholderData, initialData
- Pre-fetch to pre-populate cache
  - on component render
  - on page (month/year) update
  - `keepPreviousData` only useful if background doesn't change
- Treat keys as dependency arrays

## Transforming Data and Re-fetch

### Filtering with the select option

- Allow user to filter out any appointments that aren't available
  - useQuery의 select 옵션을 사용하면 쿼리 함수가 반환하는 데이터를 변환할 수 있다.
- Why the the select option the best way to do this?
  - React Query memo-izes to reduce unnecessary computation
    - React Query는 불필요한 연산을 줄이는 최적화를 하는데 이를 메모이제이션(memoization)이라고 한다.
  - tech details:
    - triple equals comparison of `select` function
    - only runs if data changes and the function has changed
  - select 함수는 데이터와 함수가 모두 변경되었을 경우에만 실행된다.
  - 마지막으로 검색한 데이터와 동일한 데이터이, select 함수에도 변동이 없으면 select 함수를 재실행하지 않는 것이 React Query의 최적화이다.
  - need a **stable** function (useCallback for anonymous function)
    - 따라서 `select` 함수에는 안정적인 함수가 필요하다.
    - 익명 함수를 안정적인 ㅎ마수로 만들고 싶을 때는 React의 useCallback 함수를 사용한다.
- [reference](https://tkdodo.eu/blog/react-query-data-transformations)
- State contained in hook (like monthYear)
- Filter function in utils: `getAvailableAppointments`

## Re-fetching! Why? When?

- Re-fetch ensures stale data gets updated from server
  - 리페칭을 위해서는 꼭 알아둬야 할 사항으로 만료된(stale) 데이터를 서버로부터 업데이트한다는 것이다.
  - 즉, 일정 시간이 지나면 서버가 만료된 데이터를 삭제하는데 우리와의 의지와는 상관이 없다.
  - Seen when we leave the page page and refocus
    - 이런 리페칭은 페이지를 벗어났다가 다시 돌아왔을 떄 볼 수 있다.
- Stale queries are re-fetched automatically in the background when:
  - stale 쿼니는 어떤 조건 하에 자동적으로 다시 가져오기가 된다.
  - New instances of the query mount
    - 새로운 쿼리 인스턴스가 많아지거나 쿼리 키가 처음 호출된다거나
  - Every time a react component (that has a useQuery call) mounts
    - 쿼리를 호출하는 반응 컴포넌트를 증가시킨다거나
  - The window is refocused
    - 창을 리포커스 한다거나
  - The network is reconnected
    - 만료된 데이터의 업데이트 여부를 확인할 수 있는 네트워크가 다시 연결된 경우에 리페칭이 일어난다.
  - configured refetchInterval has expired
    - 리페칭 간경이 지난 경우도 해당된다.
    - Automatic polling
      - 이 경우는 간격에 리페칭을 해서 서버를 풀링하고 사용자 조치가 없더라도 데이터가 업데이트된다.

### Re-fetching! How?

- Control with global or query-specific options:
  - 옵션으로 제어를 할 수 있는데 일반적인 경우인 전역일 수도 있고 호출 쿼리 사용에 특정된 것일 수도 있다.
  - `refetchOnMount`, `refetchOnWindowFocus`, `refetchOnReconnect`, `refetchInterval`
- Or, imperatively: `refetch` function in `useQuery` return object
  - 리페칭을 명령할 수도 있어서 useQuery를 쓰면 객체를 반환한다.
- [reference](https://react-query.tanstack.com/guides/important-defaults)

### Suppressing Re-fetch

- How?
  - Increase stale time
    - stale 시간을 증가시키면 창을 재포커스 하거나 네트워크에 재연결하는 트리거는 데이터가 실제로 만료된 경우에만 작용을 하기 때문이다.
  - turn off refetchOnMount / refetchOnWindowFocus / refetchOnReconnect
- Only for very rarely changed, not mission-critical data
  - 리페칭을 제한할 때는 신중해야 한다.
  - 변동이 잦지 않은 데이터에 적용해야 하며, 미세한 변동에도 큰 변화를 불러오는 데이터에는 적용하지 말아야 한다.

## Update Global Settings

- Global default options vs individual query options
  - useQuery와 prefetchQuery 적용이 기본 설정 옵션이 되고, 각각의 쿼리 옵션으로 override할 수 있다.
- Here, want settings for everything but appointments
  - appointments를 제외한 나머지에 기본 설정을 사용한다.
  - appointments는 시간에 가장 민감하기도 하고, 사용자의 활동과는 무관하게 서버에서 가장 변경이 잦은 데이터다.
  - 새로운 사용자가 다른 브라우저에서 특정 마사지를 예약한다면 appointments에 변경이 생긴다.
  - 그리고 우리가 할 일은 어느 시간에 예약이 가능한지 사용자에게 실시간으로 데이터를 전달해야 한다.
- User profile and user appointments invalidated after mutations
  - 사용자가 프로필을 업데이트하면 프로필 정보가 예약을 하게 되면 예약 정보가 변경될 것이다.
  - 변이(mutation)를 만들어 데이터를 무효화시키면 리페칭된다.
  - 리페칭 옵션의 기본값이 엄격한 것은 아니라 실시간으로 리페칭을 해야 하는 사용자 프로필과 예약 사항에 적합하다.
- Appointments get special settings (including auto-refetching on interval)
  - 폴링 간격도 설정해서 주기적으로 데이터를 서버에서 불러올 것이다.
- Global options in `src/react-query/queryClient.ts`
  - 전역 옵션의 위치는 `src/react-query/queryClient.ts`

# React Query and Auth

> 어떤 조건 하에서만 활성화되는 의존적 쿼리(Dependent queries), 쿼리 클라이언트에 관한 새로운 방식.  
> setQuery는 실제로 캐시에 데이터를 설정하기 위함이고 removeQueries는 캐시에서 쿼리를 삭제하기 위함이다.

## React Query and Auth

- Who should "own" the user data, `useAuth` or `useQuery`?
  - Should `useAuth` call `useQuery`, or make the axios calls directly?
  - Should `useAuth` have a provider that stores data, or store user data in React Query cache?

### Separation of Concerns

- React Query: provide cache for **server state** on the client
  - React Query의 책임은 클라이언트의 서버 상태를 관리하는 것이다.
- `useAuth`: provides functions for signin/signup/signout
- Conclusion: React QUery will store data (via useUser)

### Role of useUser

- Returns user data from React Query
  - Load from localStorage on initialization
- Keep user data up to date with server via useQuery
  - query function returns null if no user logged in
- Whenever user updates (sign in / sign out / mutation)
  - update React Query cache via setQueryData
  - update localStorage in onSuccess callback
    - onSuccess runs after setQueryData and query function
    - 어떤 방식으로든 쿼리 캐시는 업데이트가 되는데 setQueryData를 통해 업데이트되거나
    - query function이 실행될 때 생긴 변이 뒤에 업데이트될 수도 있다.

### Set query cache values in useAuth

- React Query acting as a provider for auth
- Use queryClient.setQueryData
  - 쿼리 캐시에 값을 설정하기 위해 queryClient.setQueryData를 사용할 것이다.
  - 쿼리 키와 값을 가져와 쿼리 캐시에 해당 키에 대한 값을 설정할 수 있다.
  - 쿼리 함수의 작동 방식과 유사하지만 여기서는 쿼리 함수 없이 직접 설정하는 것이다.
- Add to updateUser and clearUser
  - useUser 훅에 있는 updateUser와 clearUser에 setQueryData 호출을 추가할 것이다.
  - useAuth already calls these functions
    - useAuth는 이미 이러한 함수들을 호출하도록 작성되었다.

## Setting Initial Value

- Use initialData value to useQuery
  - For use when you want initial value to be added to the cache
  - For placeholder, use placeholderData or default destructured value
- Initial value will come from localStorage
- [reference](https://tanstack.com/query/v4/docs/react/guides/initial-query-data#using-initialdata-to-prepopulate-a-query)

## Dependent Queries

- Call useQuery in useUserApointments
  - For now, use the key `user-appointments`
  - Will change when we start looking at query key prefixes
- Make the query dependent on `user` being truthy
  - [reference](https://tanstack.com/query/v4/docs/react/guides/dependent-queries)

## Remove userAppointments Query

- Make sure user appointments data is cleared on sign out
  - queryClient.removeQueries
- Why not use removeQueries for user data?
  - setQueryData invokes onSuccess (removeQueries does not)

# Mutations and Query Invalidations

- Here, use in a more realistic way (server will update!)
  - Invalidate query on mutation so data is purged from the cache
  - Update cache with data returned from the server after mutation
  - Optimistic update (assume mutation will succeed, rollback if not)
    - 낙관적 업데이트, 변이가 성공하기를 희망하지만 실패하더라도 롤백할 수 있다.

## useMutation

- very similar to useQuery!
- Differences
  - no cache data
  - no retries
  - no refresh
    - 관련된 데이터가 없으므로 리페치가 없다.
  - no isLoading vs isFetching
    - 또한 캐시 데이터가 없으므로 isLoading과 isFetching이 구분되지 않는다.
    - isLoading은 데이터가 없을 때 이루어지는 페칭이기 때문이다.
    - 즉, useMutation에는 캐시 데이터 개념이 없으므로 isLoading은 없고, isFetching만 있다.
  - returns mutate function which actually runs mutation
    - useMutation은 반환 객체에서 mutate 함수를 반환하고 이것이 변이를 실행하는데 사용된다.a
  - `onMutate` callback (useful for optimistic queries!)

### TypeScript: Returning mutate Function

- Type for returning mutate function from custom hook
  - useMutateFuntion<TData = unknown, TError = unknown, TVariable = void, TContext = unknown>
  - TData: 변이 함수 자체에서 반환된 데이터(Data) 유형
    - Data type returned by mutation function
  - TError: 변이 함수에서 발생할 것으로 예상되는 오류(Error) 유형
    - Error type thrown by mutation function
  - TVariable: mutate 함수가 예상하는 변수 유형
    - mutate funtion variables type
  - TContext: 낙관적 업데이트 롤백을 위해 onMutate에 설정하는 유형
    - Context type set in onMutate function for optimistic update rollback.

### invalidateQueries

- 관련 쿼리를 무효화하여 데이터가 최신이 아님을 React Query에 알릴 때 사용
- Invalidate appointments cache data on mutation
  - so user doesn't have to refresh the page
- `invalidateQueries` effects:
  - marks query as stale(쿼리를 만료로 표시하고)
  - triggers re-fetch if query currently being rendered
    - 쿼리가 현재 렌더링 중이면 리페치(Refetch)를 트리거한다.
    - 쿼리를 사용하는 컴포넌트가 표시되는 경우
- mutate => onSuccess => invalidateQueries => re-fetch

### Query Key Prefixes

- Goal: invalidate all queries related to appointments on mutation
  - 모든 에약 관련 쿼리를 무효화하는 것!
- `invalidateQueries` takes a query key **prefix**
  - 쿼리 키 접두사로 이를 수행할 수 있다.
  - `invalidateQueries`는 정확한 키가 아닌 접두사를 사용한다.
  - **invalidate all related queries at once**
  - **can make i exact with** { exact: true } **option**
  - other queryClient methods take prefix too (like removeQueries)

#### Query Key Prefix for Appointments

- For use appointments(useUserAppointments)
  - [queryKeys.appointments, queryKeys.user, user?.id]
  - 사용자 예약에 대한 사용자 키를 업데이트할 것인데 `user-appointments`로 된 문자열을 위와 같은 배열로 업데이트할 것이다.
- For appointments(useAppointments)
  - [queryKeys.appoinements, queryMonthYear.year, queryMonthYear.month]
  - Appointments에는 이미 쿼리 키에 대한 배열이 있다.
  - 월 및 연도로 예약을 페이지 매김했었다.
- Pass [queryKeys.appointments] as prefix to invalidateQueries
  - 따라서 쿼리를 무효화하기 위한 접두사로 queryKeys.appointments를 전달하면 위 두 가지 모두 무효화된다.
- For more complicated apps, use functions to create query keys to ensure consistency
  - 복잡한 어플리케이션일수록, 전체적인 일관성을 유지하기 위해 쿼리 키를 생성하는 함수를 이용해야 한다.
- 이 앱의 경우 예약에 대한 문자열을 사용하는 대신 쿼리 키 객체만으로도 충분하다.
- reference: https://react-query.tanstack.com/guides/query-keys
- reference: https://react-query.tanstack.com/guides/query-invalidation#query-matching-with-invalidatequeries