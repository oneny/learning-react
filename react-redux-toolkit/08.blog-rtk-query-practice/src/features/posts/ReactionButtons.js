import { useAddReactionMutation } from './postsApiSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};

function ReactionBUttons({ id, reactions }) {
  const [addReaction] = useAddReactionMutation();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      key={name}
      type='button'
      className='reactionButton'
      onClick={() => {
        const newValue = reactions[name] + 1;
        addReaction({
          postId: id,
          reactions: { ...reactions, [name]: newValue },
        });
      }}
    >
      {emoji} {reactions[name]}
    </button>
  ));

  return <div>{reactionButtons}</div>;
}

export default ReactionBUttons;
