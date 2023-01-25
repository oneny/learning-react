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

|     | where to use? | data from? | added to cache? |
| --- | ------------- | ---------- | --------------- |
|prefetchQuery| method to queryClient|server|yes|
|setQueryData|method ot queryClient|client|yes|
|placeholderData|option to useQuery|client|no|
|initialData|option to useQuery|client|yes|

* 데이터는 서버에서 오기 때문에 데이터를 가져오기 위해 서버로 이동하고 데이터는 캐시에 추가된다.
* setQueryData: useQuery를 실행하지 않고, 쿼리 데이터를 캐시에 추가하는 또 다른 방법
  * setQueryData는 클라이언트에서 데이터를 가져온다.
  * 따라서 서버에서 변이(mutation)에 대한 응답으로 나온 데이터일 수 있다.
  * queryClient에서 setQueryData 메서드를 사용하여 캐시에 데이터를 추가하면 useQuery가 데이터를 요청할 때 캐시가 해당 데이터를 제공하도록 할 수 있다.
* placeholderData: useQuery를 실행할 떄 데이터를 제공하기 때문에 클라이언트에서 데이터를 가져오고 캐시에는 추가되지 않는다.
  * placeholderData는 고정값 또는 함수를 사용할 수 있다.
  * 자리 표시자 데이터값을 동적으로 결정하는 함수를 사용하려는 경우 placeholderData를 사용하는 것이 가장 좋다.
  * 즉, 자리 표시자가 필요한 경우에만 사용한다. 달리 표시할 데이터가 없는 경우 사용하는 표시용 데이터일 뿐, 다시 사용할 일잉 없기 때문에 캐시에 추가하지 않는다.
* initialData: placeholderData에 반대되는 것이 initialData
  * placeholder와 달리 캐시에 추가해야 하는 데이터이다.
  * 이 쿼리에 대한 유효한 데이터임을 공식적인 기록에 선언해 둘 필요가 있다.

## Prefetch Treatments

* saw prefetch with pagination
  * prefetch next page
  * 사용자가 현재 페이지를 보고 있는 동안 다음 페이지를 미리 가져와서 사용자가 다음 페이지 버튼을 클릭할 때 기다릴 필요가 없도록 하는데 사용한다.
* differenet trigger: prefetch treatments on home page load
  * 사용자가 전체 페이지를 로드할 때 Treatments 데이터를 미리 가져오기
  * user research: 85% of home page loads are followed by treatments tab loads
    * 홈페이지 로드 중 높은 비율이 Treatments 탭으로 이어진다는 사용자 연구 결과가 있다고 가정
  * Treatments don't change often, so cached data isn't really  a problem
    * Treatments 데이터는 비교적 안정적이기 때문에 prefetching에 적합하다.
    * 주식 시세와 같이 동적인 데이터를 가져오는 것이 아니기 때문에 캐시된 데이터에 의존하더라도 그다지 문제가 되지 않는다.
* garbage collected if no useQuery is called after cacheTime
  * 물론 캐시 시간 내에 useQuery로 데이터를 호출하지 않으면 가비지 컬렉션으로 수집된다.
  * if typically not loaded by default cacheTime(5 minutes), specify logher cacheTime
    * 만약 사용자가 기본 캐시 시간 즉, 5분 이내에 Treatments 탭을 로드하지 않는다면 캐시 시간을 더 길게 지정할 수도 있다.
* prefetchQuery is a method on the queryClient
  * adding to the client cache
* useQueryClient returns queryClient (within Provider)
* Procedure
  * user loads home page
  * queryClient.prefetchQuery adds treatments data to cache
  * user loads treaments page
  * within cacheTime?
    * yes -> treatments data loads from cache useQuery fetches fresh data
    * no -> no initial data useQuery fetches fresh data

```ts
// components/appointments/hooks/useAppointments.ts
useEffect(() => {
  // 데이터가 모두 만료(stale) 상태가 되어 정확한 데이터라고 볼 수는 없다.
  // 하지만 가장 최신의 데이터가 있는지 서버를 계속 확인하면서
  // 사용자에게 빈 달력 대신 프리페칭된 데이터를 보여줄 수 있다.
  const nextMonthYear = getNewMonthYear(monthYear, 1);
  queryClient.prefetchQuery(
    [queryKeys.appointments, nextMonthYear.year, nextMonthYear.month],
    () => getAppointments(monthYear.year, nextMonthYear.month),
  );
}, [monthYear, queryClient]);
```

## Query Key

* Why doesn't new data load? -> using the same key for every query
* after clicking arrow to load new month
  * data is stale (staleTime = 0), but...
  * nothing to trigger refetch
    * component remount
    * window refocus
    * running refetch function manually
    * automated refetch
* Only fetch new data for known key for the above reasons
  * Solution: New key for each page
    * treat keys as dependency arrays!