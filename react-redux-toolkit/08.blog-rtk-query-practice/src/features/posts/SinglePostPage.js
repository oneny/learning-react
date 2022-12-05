import { useGetPostQuery } from "./postsApiSlice";

import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

import { Link, useParams } from "react-router-dom";
import { setPost } from './postsSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from "react";

function SinglePostPage() {
  // retrieve postId
  const { postId } = useParams();
  const dispatch = useDispatch();

  const { data: post, isLoading, isError, error } = useGetPostQuery(postId);

  useEffect(() => {
    console.log('hi')
    dispatch(setPost(post))
  }, [post])

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  } else if (isLoading) {
    return <p>Loading...</p>
  } else if (isError) {
    return <p>{error}</p>
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons id={post.id} reactions={post.reactions} />
    </article>
  )
}

export default SinglePostPage