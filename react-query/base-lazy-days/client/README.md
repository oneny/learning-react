# Lazy Days Spa Client

## useIsFetching

* 각 컴포넌트마다 개별 로딩 인디케이터를 사용하는 대신 중앙화된 로딩 인디케이터를 사용하도록 앱 업데이트  
* useIsFetching 훅을 로딩 컴포넌트에 사용하여 스피너 표시 앱을 표시할 수 있다.
* useisFeching은 현재 가져오기 상태인 쿼리 호출의 수를 나타내는 정수값을 반환한다.

## QueryClient default onError option

* 오류 핸들링 집중화하여 모든 useQuery 호출에 오류 핸들링 방식을 적용해서 각 호출에 따로 지정하지 않도록 만들 수 있다.
* useIsFetching과 같은 집중식 훅 대신 QueryClient를 위해 onError 핸들러 기본값을 만든다.
  * defaults for QueryClient
    * 일반적으로 QueryClient는 쿼리나 변이(Mutation)에 대해 기본값을 가질 수 있다.
* QueryClient는 defaultOptions 객체를 가질 수 있는데 이 객체는 두 가지 프로퍼티를 갖는다.
  * queries, mutations
  * queries 프로퍼티는 useQuery에 추가하는 options 형식의 값을 가진다.
  * mutations 프로퍼티의 값은 useMutation에 추가하는 options 형식을 가질 수 있다.
* 그럼 useTreatments에 있는 onError를 QueryClient에 전송해서 모든 useQuery 호출에 적용할 수 있다.
  * `/src/react-query/queryClient.ts` 확인

### Alternative to onError: Error Boundary

* Alternative: handle to errors with React Error Boundary
  * [reference]
* useErrorBoundary for useQuery
  * [reference](https://react-query.tanstack.com/reference/useQuery)
* option to useQuery / useMutation
  * or in defaultOptions when creating QueryClient
* Set to true to propagate errors to the nearest error boundary
  * useErrorBoundary 옵션을 true로 설정하면 ReactQuery 내에서 에러를 처리하는 대신
  * 가장 가까운 에러 경계로 에러를 전파한다.