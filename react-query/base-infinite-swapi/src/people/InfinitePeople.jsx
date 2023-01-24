import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';

import { Person } from './Person';

const initialUrl = 'https://swapi.dev/api/people/';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  const {
    data,
    fetchNextPage, // 더 많은 데이터가 필요할 때 어느 함수를 실행할지를 InfiniteScroll에 지시하는 함수
    hasNextPage, // 수집할 데이터가 더 있는지를 결정한는 boolean
    isLoading,
    isError,
    error,
    isFetching,
  } = useInfiniteQuery(
    'sw-people',
    // 쿼리 함수는 객체 매개변수를 받고, 프로퍼티 중 하나로 pageParam을 가지고 있다.
    // useInfiniteQuery의 모든 것이 pageParam에 달려 있다.
    // pageParam은 fetchNextPage이 어떻게 보일지 결정하고, 다음 페이지가 있는지 결정한다.
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      // 첫 번쨰 인자인 lastPage의 반환된 데이터에서 next 프로퍼티를 사용해
      // 다음 pageParam을 설정한다.
      // hasNextPage는 아래 함수가 undefined를 반환하는지 아닌지에 따라 결정된다.
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  if (isLoading) return <div className='loading'>Loading...</div>;
  if (isError) return <div>Error! {error.toString()}</div>;

  return (
    <>
      {isFetching && <div className='loading'>Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) =>
          pageData?.results?.map((person) => (
            <Person
              key={person.name}
              name={person.name}
              hairColor={person.hair_color}
              eyeColor={person.eye_color}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
