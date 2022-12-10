import { store } from '../../app/store';
import { notesApiSlice } from '../../features/notes/notesApiSlice';
import { usersApiSlice } from '../../features/users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
  // we only want this to reun when this component mounts
  // when it mouns we're going to log subscribing
  // and I really want to highlight that or leave it on the code for you
  // because of react 18 and we're using strict mode
  // so it's going to moun unmoun and remount
  // we'll see that with a subscribing unsubscribing
  useEffect(() => {
    console.log('subscribing');
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(
      usersApiSlice.endpoints.getUsers.initiate()
    );

    // we'll unsubscribe if we ever leave the protected pages we're going to do that
    // of course this returns an outlet so all of the children we're going to wrap our protected pages in this
    // Prefetch component will also help us when we refresh the page and we stell want to have that state including pre-filing our forms
    return () => {
      console.log('unsubscribing');
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;
