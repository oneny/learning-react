import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectNoteById } from '../features/notes/noteSlice';
import { selectAllUsers } from '../features/users/usersSlice';
import EditNoteForm from '../components/notes/EditNoteForm';

const EditNote = () => {
  const { id } = useParams();

  const note = useSelector((state) => selectNoteById(state, id));
  const users = useSelector(selectAllUsers);

  const content =
    note && users ? (
      <EditNoteForm note={note} users={users} />
    ) : (
      <p>loading...</p>
    );

  return content;
};

export default EditNote;
