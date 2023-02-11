# Blog-em Ipsum

### A React App for the Udemy course "React Query: Server State Management for React"

## React Qeury 라이프 사이클

* A 쿼리 인스턴스가 mount됨
* 네트워크에서 데이터 fetch하고 A라는 query key로 캐싱함
* 이 데이터는 `fresh` 상태에서 `staleTime`(기본값 0) 이후 `stale` 상태로 변경됨
* A 쿼리 인스턴스가 unmount됨
* 캐시는 `cacheTime`(기본값 5min)만큼 유지되다가 가비지 콜렉터가 수집함
* 만일 `cacheTime`이 지나기 전에 A 쿼리 인스턴스가 새롭게 mount되면, `fetch`가 실행되고 `fresh`한 값을 가져오는 동안 캐시 데이터를 보여줌

## stale status

* 개발자 도구에서 데이터가 만료(stale) 상태로 바뀌는데 무엇일까?
* stale 상태로 자동 변경되는 이유는?

### Stale Data

* Why does it matter if the data stale?
* Data refetch only triggers for stale data
  * 데이터 리페칭은 만료된 데이터에서만 실행된다.
  * 그 외에도 component remount, window refocus 등 여러 트리거가 있다.
* staleTime **translates to "max age"**
  * staleTime은 데이터를 허용하는 'max age'라고 할 수 있다.
  * **How to tolerate data potentially being out of data**
    * 데이터가 만료됐다고 판단하기 전까지 허용하는 시간이 stale Time이다.
    * 즉, 데이터가 `fresh` -> `stale` 상태로 변경되는데 걸리는 시간이다.
  * `fresh` 상태일때는 쿼리 인스턴스가 새롭게 mount 되어도 네트워크 fetch가 일어나지 않는다.
* staleTime 기본값이 0인 이유
  * '데이터가 어떻게 늘 최신 상태를 유지하나요?'를 의문으로
  * 데이터는 항상 만료 상태이므로 서버에서 다시 가져와야 한다고 가정한다는 뜻이다.

### staleTime vs cacheTime

* staleTime is for re-freching
  * staleTime은 리패칭할 때 고려사항이다.
* Cache is for data that might be re-used later
  * 캐시는 나중에 다시 필요할 수도 있는 데이터용이다.
  * query goes into 'cold storage' if there's no active useQuery
    * 특정 쿼리에 대한 활성 useQuery가 없는 경우 해당 쿼리는 'cold storage'로 이동한다.
  * cache data expires after cachTime (default: five minutes)
    * 구성된 cacheTime이 지나면 캐시의 데이터가 만료되며 유효 시간의 기본값은 5분이다.
  * After the cache expires, the data is gabage collected
    * 캐시가 만료되면 가바지 컬렉션이 실행되고 클라이언트는 데이터를 사용할 수 없다.
* Cache is backup data to display while fetching
  * 데이터가 캐시에 있는 동안에는 페칭(Fetching)할 때 사용될 수 있다.
  * 새로운 데이터를 수집하는 동안 약간 오래된 데이터를 표시하는 편이 빈 페이지보다 나아 이에 사용이 되기도 한다.
  
## Prefetching

* Pagination을 구현할 때 데이터를 받아오는 동안(isLoading) 화면이 로딩창을 보여주며 좋지 못한 사용자 경험을 제공하고 있다.
* 페이지가 캐시에 없기 때문에 next page 버튼을 누를 때마다 페이지가 로딩되길 기다려야 한다.
* 데이터를 미리 가져와 캐시에 넣어서 사용자가 기다릴 필요 없도록 하면 좋은 사용자 경험을 줄 수 있다.

### Prefetch

* adds data to cache
  * 데이터를 캐시에 추가한다.
* automatically stale (configurable)
  * configurable(* 옵션으로 설정 가능)하긴 하지만 기본값으로 만료(stale) 상태이다.
* shows while re-fetching
  * 데이터를 사용하고자 할 때 만료 상태에서 데이터를 다시 가져온다.
  * 데이터를 다시 가져오는 중에는 캐시에 있는 데이터를 이용해 앱에 나타낸다.
* Prefetching can be used for any anticipated data needs
  * 추후 사용자가 사용할 법한 모든 데이터에 프리페칭을 사용한다.

## Mutation

* making a network call that changes data on the server
  * 변이는 서버에 데이터를 업데이트(추가 및 삭제)하도록 서버에 네트워크 호출을 실시한다.
* Day Spa app will demonstrate showing changes to user:
  * Optimistic updates (assume change will happen)
    * 낙관적 업데이트로 서버 호출에서 모든 내용이 잘 진행될 것으로 간주하는 것이다.
    * 그리고 사실이 아닌 것으로 판명될 경우 롤백을 진행한다.
  * Update React Query cache with data returned from the server
    * 또 다른 방법은 변이 호출을 실행할 때 서버에서 받는 데이터를 취하고
    * 업데이트된 해당 데이터로 React Query 캐시를 업데이트하는 것이다.
  * Trigger re-fetch of relevant data (invalidation)
    * 관련 쿼리를 무효화할 수 있다.
    * 무효화하는 경우 서버에서 리페치를 개시하여 클라이언트에 있는 데이터를 서버의 데이터와 최신 상태로 유지하게 된다.

### useMutation

* Similar to useQuery, but
  * returns `mutate` function
  * doesn't need query key
  * `isLoading` but no `isFetching`
    * isLoading은 존재하지만 isFetching은 없다! (캐시된 항목이 없으므로!)
  * by defaultm no retries (configurable!)
    * 변이에 관련된 캐시는 존재하지 않고, 재시도 또한 기본값으로 존재하지 않는다. 
    * useQuery는 기본값으로 3회 재시도하지만 useMutation은 기본값으로 재시도하지 않는다.
