import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { Link, useParams } from "react-router-dom";
import { useGetPostsByUserIdQuery } from "../posts/postsSlice";

function UserPage() {
  const { userId } = useParams();
  const user = useSelector(state => selectUserById(state, Number(userId)));

  // const postsForUser = useSelector(state => {
  //   const allPosts = selectAllPosts(state);
  //   return allPosts.filter(post => post.userId === Number(userId));
  // });
  const { data: postsForUser, isLoading, isSuccess, isError, error } = useGetPostsByUserIdQuery(userId);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    console.log(postsForUser);
    const { ids, entities } = postsForUser
    content = ids.map(id => (
      <li key={id}>
        <Link to={`/post/${id}`}>{entities[id].title}</Link>
      </li>
    ))
  } else if (isError) {
    content = <p>{error}</p>
  }

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{content}</ol>
    </section>
  )
}

export default UserPage