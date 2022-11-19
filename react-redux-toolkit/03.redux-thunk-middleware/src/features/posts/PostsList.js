import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts  } from "./postsSlice";
import { useEffect } from "react";
import PostExcerpt from "./PostExcerpt";

function PostsList() {
  const dispatch = useDispatch();

  // we can use selectAllPosts instead of what we did have in the ustSelector
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch])

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
      <h2>Posts</h2>
      {content}
    </section>
  );
}

export default PostsList;
