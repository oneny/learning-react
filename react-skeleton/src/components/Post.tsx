import type { TPostsByUserIdData } from '../api/postsApi';
import type { TUserData } from '../api/usersApi';

type TPostProps = {
  post: TPostsByUserIdData,
  user: TUserData | undefined;
}

const Post = ({ post, user }: TPostProps) => {
  return (
    <article className='post'>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>{oneny}</p>
      <p>Post ID: {post.id}</p>
      <p>Author: {user?.name} from {user?.company.name}</p>
      <p>Taglines: {user?.company.catchPhrase}</p>
    </article>
  )
}

export default Post