import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

function PostsList() {
  // we can use selectAllPosts instead of what we did have in the ustSelector
  const posts = useSelector(selectAllPosts);

  const orderedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  const renderPosts = orderedPosts.map(({ id, title, content, userId, date, reactions }) => (
    <article key={id}>
      <h3>{title}</h3>
      <p>{content.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={userId} />
        <TimeAgo timestamp={date} />
      </p>
      <ReactionButtons id={id} reactions={reactions} />
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderPosts}
    </section>
  );
}

export default PostsList;
