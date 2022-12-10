import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from '../../features/users/usersApiSlice';
import useTitle from '../../hooks/useTitle';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = () => {
  useTitle('techNotes: Edit User');
  const { id } = useParams();
  const { data: user, isSuccess: isGetSuccess } = useGetUserQuery(id);

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setUsername('');
      setPassword('');
      navigate('/dash/users');
    }
  }, [isSuccess, isDelSuccess, navigate]);

  useEffect(() => {
    if (isGetSuccess) {
      setUsername(user.username);
      setActive(user.active);
    }
  }, [isGetSuccess])

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, username, password, active });
    } else {
      await updateUser({ id: user.id, username, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  let canSave;
  if (password) {
    canSave = [validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [validUsername].every(Boolean) && !isLoading;
  }

  const errClass = isError || isDelError ? 'errmsg' : 'offscreen';
  const validUserClass = !validUsername ? 'form__input--incomplete' : '';
  const validPwdClass =
    password && !validPassword ? 'form__input--incomplete' : '';

  const errContent = (error?.data?.message || delError?.data?.message) ?? '';

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className='form' onSubmit={(e) => e.preventDefault()}>
        <div className='form__title-row'>
          <h2>Edit User</h2>
          <div className='form__action-buttons'>
            <button
              className='icon-button'
              title='Save'
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className='icon-button'
              title='Delete'
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className='form__label' htmlFor='username'>
          Username: <span className='nowrap'>[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id='username'
          name='username'
          type='text'
          autoComplete='off'
          value={username}
          onChange={onUsernameChanged}
        />

        <label className='form__label' htmlFor='password'>
          Password: <span className='nowrap'>[empty = no change]</span>{' '}
          <span className='nowrap'>[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={onPasswordChanged}
        />

        <label
          className='form__label form__checkbox-container'
          htmlFor='user-active'
        >
          ACTIVE:
          <input
            className='form__checkbox'
            id='user-active'
            name='user-active'
            type='checkbox'
            checked={active}
            onChange={onActiveChanged}
          />
        </label>
      </form>
    </>
  );

  return content;
};

export default EditUserForm;
