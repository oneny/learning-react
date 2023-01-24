import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import { Species } from './Species';

const initialUrl = 'https://swapi.dev/api/species/';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const {
    isFetching,
    isLoading,
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'sw-species',
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
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
          pageData.results.map((specie) => (
            <Species
              key={specie.name}
              name={specie.name}
              language={specie.language}
              averageLifespan={specie.averageLifespan}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
