## InfiniteQuery

### Shape of useInifiniteQuery Data

* Shape of data different than useQuery
* Objecr with two properties:
  * pages: 데이터 페이지 객체의 배열, 페이지에 있는 각 요소가 하나의 useQuery에서 받는 데이터에 해당한다.
  * pageParams: 각 페이지의 매개변수가 기록되어 있다.
* Every query has its own element in the pages array
  * 모든 쿼리는 페이지 배열에 고유한 요소를 가지고 있고, 그 요소는 해당 쿼리에 대한 데이터에 해당한다.
  * 페이지 진행되면서 쿼리도 바뀐다.
* pageParams tracks the keys of queries that have been retrieved
  * pageParams는 검색된 쿼리의 키를 추적한다.
  * rarely used, won't use here

### useInifiteQuery Syntax

* pageParam is a parameter passed to the queryFn
  * pageParams은 쿼리 함수에 전달되는 매개변수이다.
  ```js
  useInifiniteQuery('sw-people', ({ pageParam = defaultUrl }) => fetchUrl(pageParam));
  ```
* Current value of pageParam is maintained by React Query
  * React Query가 pageParma의 현재 값을 유지한다.
* useInifiniteQuery options
  * getNextPageParam: (lastPage, allPages)
    * Updates pageParam
    * Might use all of the pages of data (allPages)
    * we will use just the lastPage of data (specifically the next property)

### useInfiniteQuery Return Object Properties

* fetchNextPage
  * function to call when the user needs more data
* hasNextPage
  * Based on return value of getNextPageParam
  * getNextPageParam 함수의 반환값을 기반으로 하는데 이 프로퍼티를 useInfiniteQuery에 전달해서 마지막 쿼리의 데이터를 어떻게 사용할지 지시한다.
  * If undefined, no more data
* isFetchingNextPage
  * useInfiniteQuery는 다음 페이지를 가져오는지 아니면 일반적인 페칭인지 구별할 수 있다.
  * For displaying a loading spinner
  * We'll see an example of when it's useful to distinguish between isFetching and isFetchingNextPage

### The Flow

* Component mounts
  * 아직 useInfiniteQuery에서 반환된 data는 undefined이다.
* Fetch first page
  * useInfiniteScroll({ pageParam = defaultUrl }) => ...)
  * 해당 pageParam을 사용해서 첫 번째 페이지를 가져오고 반환 객체 데이터의 페이지 프로퍼티를 설정한다.
  * data.pages[0]: 인덱스가 0인 배열의 첫 번쨰 요소를 설정한다. <- 이게 쿼리 함수가 반환하는 값
* getNextPageParam, Update pageParam
  * 데이터가 반환된 후 React Query가 getNextPageParam을 실행한다.
  * getNextPageParam(lastPagae, allPages) => ...
  * useInfiniteScroll의 옵션으로 이게 lagePage와 allPages를 사용해서 pageParam을 업데이트한다.
* hasNextPage?
  * yes -> use scrolls / clicks button -> fetchNextPage
  * no -> done!