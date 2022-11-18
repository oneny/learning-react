import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

function ReactionBUttons({ id, reactions }) {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      key={name}
      type="button"
      className="reactionButton"
      onClick={() =>
        dispatch(reactionAdded({ postId: id, reaction: name }))
      }
    >
      {emoji} {reactions[name]}
    </button>
  ));

  return <div>{reactionButtons}</div>;
}

export default ReactionBUttons;
