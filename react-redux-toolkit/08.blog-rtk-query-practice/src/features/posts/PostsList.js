import PostExcerpt from './PostExcerpt';
import { useGetPostsQuery } from './postsApiSlice';

function PostsList() {
  const { data: posts, isLoading, isSuccess, isError, error } = useGetPostsQuery();
  // we can use selectAllPosts instead of what we did have in the useSelector
  
  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = posts.map((post) => (
      <PostExcerpt key={post.id} {...post} />
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
}

export default PostsList;
