import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

function PostExcerpt({ id, title, body, userId, date, reactions }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{body.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={userId} />
        <TimeAgo timestamp={date} />
      </p>
      <ReactionButtons id={id} reactions={reactions} />
    </article>
  );
}

export default PostExcerpt;
