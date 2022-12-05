import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPost } from './postsSlice';
import { useUpdatePostMutation, useDeletePostMutation } from './postsApiSlice';
import { useParams, useNavigate } from 'react-router-dom';

import { selectAllUsers } from '../users/usersSlice';

function EditPostForm() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector(selectPost);
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);

  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        // 결과에 상관없이 항상 이행된 프로미스를 반환한다.
        // 따라서 오류 처리는 별도의 방법을 사용해서 진행해야 한다.
        // 디스패치된 thunk가 반환한 이행된 프로미스는 unwrap 프로퍼티를 가지고 있는데, 이를 사용해서 오류 처리를 할 수 있다.
        // 이 방식은 액션을 디스패치한 컴포넌트 내부에서 오류를 처리한다.
        // 각각의 컴포넌트가 서로 다른 방식으로 오류를 처리할 수 있다는 장점이 있다.
        updatePost({
          id: post.id,
          title,
          body: content,
          userId,
          reactions: post.reactions,
        }).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error('Failed to save the post', err);
      }
    }
  };

  const usersOptions = users.map(({ id, name }) => (
    <option key={id} value={id}>
      {name}
    </option>
  ));

  const onDeletePostClicked = async () => {
    try {
      await deletePost({ id: post.id }).unwrap();

      setTitle('');
      setContent('');
      setUserId('');
      navigate('/');
    } catch (err) {
      console.error('Failed to delete the post', err);
    }
  };

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor='postTitle'>Post Title!</label>
        <input
          type='text'
          id='postTitle'
          name='postTitle'
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor='postAuthor'>Author:</label>
        <select
          id='postAuthor'
          defaultValue={userId}
          onChange={onAuthorChanged}
        >
          <option value=''></option>
          {usersOptions}
        </select>
        <label htmlFor='postContent'>Content:</label>
        <textarea
          id='postContent'
          name='postContent'
          value={content}
          onChange={onContentChanged}
        />
        <button typ='button' onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button
          className='deleteButton'
          type='button'
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
}

export default EditPostForm;
