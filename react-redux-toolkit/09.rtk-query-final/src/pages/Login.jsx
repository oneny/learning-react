import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
// import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import usePersist from '../hooks/usePersist';
import useTitle from '../hooks/useTitle';

const Logins = () => {
  useTitle('RTK Practice | Login');

  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? 'errmsg' : 'offscreen';

  const content = (
    <section className='public'>
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className='login'>
        <p ref={errRef} className={errClass} aria-live='assertive'>
          {errMsg}
        </p>

        <form className='form' onSubmit={handleSubmit}>
          <label htmlFor='username'>Username:</label>
          <input
            className='form__input'
            type='text'
            id='username'
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete='off'
            required
          />

          <label htmlFor='password'>Password:</label>
          <input
            className='form__input'
            type='password'
            id='password'
            onChange={handlePwdInput}
            value={password}
            required
          />
          <button className='form__submit-button'>Sign In</button>

          <label htmlFor='persist' className='form__persist'>
            <input
              type='checkbox'
              className='form__checkbox'
              id='persist'
              onChange={handleToggle}
              checked={persist}
            />
            Trust This Device
          </label>
        </form>
      </main>
      <footer>
        <Link to='/'>Back to Home</Link>
      </footer>
    </section>
  );

  return content;
};

export default Logins;
