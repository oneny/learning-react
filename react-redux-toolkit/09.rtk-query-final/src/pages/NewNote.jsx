import { useSelector } from 'react-redux';
import NewNoteForm from '../components/notes/NewNoteForm';
import { selectAllUsers } from '../features/users/usersSlice';

const NewNote = () => {
  const users = useSelector(selectAllUsers);
  console.log(users);

  const content = users.length ? <NewNoteForm users={users} /> : <p>Loading...</p>;

  return content;
}

export default NewNote;