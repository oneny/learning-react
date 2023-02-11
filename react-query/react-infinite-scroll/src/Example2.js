import { useRef, useCallback } from 'react';
import Post from './Post';
import { useInfiniteQuery } from 'react-query';
import { getPostsPage } from './api/axios';

const Example2 = () => {
  const {
    fetchNextPage, // function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    data,
    status,
    error,
  } = useInfiniteQuery(
    'post',
    ({ pageParam }) => getPostsPage(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        console.log(lastPage);
        console.log(allPages);
        return lastPage.items.length ? allPages.length + 1 : undefined;
      },
    }
  );

  console.log(data);

  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        console.log('post', posts);
        if (posts[0].isIntersecting && hasNextPage) {
          console.log('We are near the last post!');
          fetchNextPage();
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (status === 'error')
    return <p className='center'>Error: {error.message}</p>;

  const content = data?.pages.map((pg) => {
    return pg.items.map((post, i) => {
      if (pg.items.length === i + 1) {
        console.log('hi')
        return <Post ref={lastPostRef} key={post.date} post={post} />;
      }
      return <Post key={post.date} post={post} />;
    });
  });

  return (
    <>
      <h1 id='top'>
        &infin; Infinite Query &amp; Scroll
        <br />
        &infin; Ex. 2 - React Query
      </h1>
      {content}
      {isFetchingNextPage && <p className='center'>Loading More Posts...</p>}
      <p className='center'>
        <a href='#top'>Back to Top</a>
      </p>
    </>
  );
};

export default Example2;
