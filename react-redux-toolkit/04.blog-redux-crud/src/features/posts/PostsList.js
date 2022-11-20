import { useSelector } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError } from "./postsSlice";
import PostExcerpt from "./PostExcerpt";

function PostsList() {
  // we can use selectAllPosts instead of what we did have in the useSelector
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  const orderedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  console.log(orderedPosts);
  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeed") {
    const orderedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map(post => <PostExcerpt key={post.id} {...post} />);
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
