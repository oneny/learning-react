import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { PostDetail } from './PostDetail';
const maxPostPage = 10;

async function fetchPosts(pageNum) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  // currentPage가 변하면 해당 로직을 실행하도록 useEffect 사용
  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      // prefetch의 목적은 캐시된 데이터를 표시하면서 
      // 백그라운드에서는 데이터의 업데이트 여부를 조용히 서버를 확인하는 것이다.
      // 즉, 사용자가 로딩창을 반복해서 보지 않아도 된다. 그 전에는 캐시된 데이터가 표시되고 있을 것이다.
      // 데이터를 최신 상태로 유지하기 위해 서버와 확인했다는 사실을 사용자는 모를 것이다.
      queryClient.prefetchQuery(
        ['posts', nextPage],
        () => fetchPosts(currentPage), // 4 페이지인 경우 다시 해당 페이지 데이터를 받아와 업데이트한다.
        {
          staleTime: 2000,
        }
      );
    }
  }, [currentPage, queryClient]);

  // replace with useQuery
  // isFetching
  // the async query function hasn't yet resolved(비동기 쿼리가 해결되지 않았음을 의미)
  // isLoading(isFetching의 하위집합) -> 가져오는 상태가 있음을 의미
  // no cached data, plus isFetching
  // 즉, 캐시된 데이터조차 없이, 처음 실행된 쿼리인 경우를 의미한다.
  // 나중에 Pagination을 진행할 때 캐시된 데이터가 있을 때와 없을 때를 구분해야 하는 경우가 생긴다.
  const { data, isError, error, isLoading, isFetching } = useQuery(
    ['posts', currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 2000,
      // 쿼리 키가 바뀔 때도 지난 데이터를 유지해서 혹시 이전 페이지로 돌아갔을 때 캐시에 해당 데이터가 있도록 만들고 싶은 경우
      keepPreviousData: true,
    }
  );

  // 화면에 아무것도 없을 때 로딩 인디케이터를 제공하려면 isLoading이 낫다.
  // 즉, 캐시에 아무것도 없고 서버에서 데이터를 가져오는 중이라면
  if (isLoading) return <h3>Fetching in progress...</h3>;

  // react query는 기본값으로 세 번 시도한 후에 해당 데이터를 가져올 수 없다고 결정한다.
  if (isError) return <h3>{error.toString()}</h3>;

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className='post-title'
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className='pages'>
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((prev) => --prev)}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => setCurrentPage((prev) => ++prev)}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} currentPage={currentPage} />}
    </>
  );
}
