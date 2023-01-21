import { AxiosError } from 'axios';
import useSWR from 'swr';

import {
  getPostsByUserId,
  postsUrlEndpoint as postsCacheKey,
} from '../api/postsApi';
import { getUserById, usersUrlEndpoint as usersCacheKey } from '../api/usersApi';

import Post from './Post';
import SkeletonPost from './Skeleton/SkeletonPost';

type TPostsListProps = {
  currentUserId: number;
};

const PostsList = ({ currentUserId }: TPostsListProps) => {
  const {
    isLoading,
    error,
    data: posts,
    
  } = useSWR([postsCacheKey, currentUserId], ([url, userId]) =>
    getPostsByUserId(url, userId),
    {
      onError: (err: AxiosError) => err,
    }
  );

  const {
    isLoading: isLoadingUser,
    error: userError,
    data: user,
  } = useSWR(
    posts?.length ? [usersCacheKey, currentUserId] : null,
    ([url, userId]) => getUserById(url, userId),
    {
      onError: (err: AxiosError) => err,
    }
  );

  let content = <></>;
  if (currentUserId === 0) {
    content = <p className='loading'>Select an Employee to view posts</p>;
  } else if (isLoading || isLoadingUser) {
    content = (
      <>
        {[...Array(10).keys()].map((i) => (
          <SkeletonPost key={i} />
        ))}
      </>
    );
  } else if (error || userError) {
    content = <p>{error.message}</p>
  } else {
    content = (
      <main>
        {posts?.map((post) => (
          <Post key={post.id} post={post} user={user} /> 
        ))}
      </main>
    )
  }

  return content;
};

export default PostsList;
