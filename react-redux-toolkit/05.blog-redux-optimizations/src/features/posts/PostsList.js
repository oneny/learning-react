import { useSelector } from "react-redux";
import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";
import PostExcerpt from "./PostExcerpt";

function PostsList() {
  // we can use selectAllPosts instead of what we did have in the useSelector
  const orderedPostIds = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeed") {
    content = orderedPostIds.map(postId => <PostExcerpt key={postId} postId={postId} />);
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>
  }

  return (
    <section>
      {content}
    </section>
  );
}

export default PostsList;
