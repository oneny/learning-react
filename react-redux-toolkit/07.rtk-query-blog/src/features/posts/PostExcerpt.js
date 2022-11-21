import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

function PostExcerpt({ postId }) {
  const { title, body, userId, date, reactions } = useSelector(state => selectPostById(state, postId));

  return (
    <article>
      <h2>{title}</h2>
      <p className="excerpt">{body.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`post/${postId}`}>View Post</Link>
        <PostAuthor userId={userId} />
        <TimeAgo timestamp={date} />
      </p>
      <ReactionButtons id={postId} reactions={reactions} />
    </article>
  );
}

export default PostExcerpt;
