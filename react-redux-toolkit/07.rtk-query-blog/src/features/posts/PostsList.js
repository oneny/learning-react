import { useSelector } from "react-redux";
import { selectPostIds } from "./postsSlice";
import PostExcerpt from "./PostExcerpt";
import { useGetPostsQuery } from "./postsSlice";

function PostsList() {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();

  const orderedPostIds = useSelector(selectPostIds);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = orderedPostIds.map(postId => <PostExcerpt key={postId} postId={postId} />);
  } else if (isError) {
    content = <p>{error}</p>
  }

  return (
    <section>
      {content}
    </section>
  );
}

export default PostsList;
