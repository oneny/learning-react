import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";

function PostExcerpt({ id, title, body, userId, date, reactions }) {
  return (
    <article>
      <h2>{title}</h2>
      <p className="excerpt">{body.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`post/${id}`}>View Post</Link>
        <PostAuthor userId={userId} />
        <TimeAgo timestamp={date} />
      </p>
      <ReactionButtons id={id} reactions={reactions} />
    </article>
  );
}

export default PostExcerpt;
