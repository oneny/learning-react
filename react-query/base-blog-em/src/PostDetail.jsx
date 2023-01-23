import { useMutation, useQuery, useQueryClient } from 'react-query';

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { method: 'DELETE' }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { method: 'PATCH', data: { title: 'REACT QUERY FOREVER!!!!' } }
  );
  return response.json();
}

export function PostDetail({ post, currentPage }) {
  // replace with useQuery
  const { isLoading, data, isError, error } = useQuery(
    ['comments', post.id],
    () => fetchComments(post.id)
  );

  const queryClient = useQueryClient();

  const {
    mutate: mutateDeletePost,
    isError: isDeleteError,
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSuccess,
  } = useMutation((postId) => deletePost(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', post.id]);
    },
  });
  const {
    mutate: mutateUpdatePost,
    isError: isUpdateError,
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
  } = useMutation((postId) => updatePost(postId), {
    // onSuccess: () => {
    //   queryClient.invalidateQueries(['comments', post.id]);
    // },
  });

  if (isLoading) return <h4>Loading...</h4>;
  if (isError)
    return (
      <>
        <h3>Error</h3>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => mutateDeletePost(post.id)}>Delete</button>
      {isDeleteError && (
        <p style={{ color: 'red' }}>Error deleting the post</p>
      )}
      {isDeleteLoading && (
        <p style={{ color: 'purple' }}>Deleting the post</p>
      )}
      {isDeleteSuccess && (
        <p style={{ color: 'green' }}>Post has (not) been deleted</p>
      )}

      <button onClick={() => mutateUpdatePost(post.id)}>Update title</button>
      {isUpdateError && (
        <p style={{ color: 'red' }}>Error updating the post</p>
      )}
      {isUpdateLoading && (
        <p style={{ color: 'purple' }}>Updating the post</p>
      )}
      {isUpdateSuccess && (
        <p style={{ color: 'green' }}>Post has (not) been updated</p>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
