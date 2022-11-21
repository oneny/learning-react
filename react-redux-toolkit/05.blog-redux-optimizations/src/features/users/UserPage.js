import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { selectAllPosts, selectPostsByUser } from "../posts/postsSlice";
import { Link, useParams } from "react-router-dom";

function UserPage() {
  const { userId } = useParams();
  const user = useSelector(state => selectUserById(state, Number(userId)));

  // const postsForUser = useSelector(state => {
  //   const allPosts = selectAllPosts(state);
  //   return allPosts.filter(post => post.userId === Number(userId));
  // });
  const postsForUser = useSelector(state => selectPostsByUser(state, Number(userId)));

  const postTitles = postsForUser.map(({ id, title }) => (
    <li key={id}>
      <Link to={`/post/${id}`}>{title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{postTitles}</ol>
    </section>
  )
}

export default UserPage