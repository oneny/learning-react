import { useGetNotesQuery } from '../features/notes/notesApiSlice';
import Note from '../components/Note';
import PulseLoader from 'react-spinners/PulseLoader';

const NotesList = () => {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery('notesList', {
    pollingInterval: 15000, // 쿼리가 지정된 milli seconds 간격으로 리패칭할지를 설정한다.
    refetchOnFocus: true, // 브라우저가 다시 focus되었을 때 쿼리를 리패칭해준다.
    refetchOnMountOrArgChange: true, // 네트워크 커넥션이 다시 이루어졌을 경우 리패칭해준다.
  });

  let content;

  if (isLoading) content = <PulseLoader color={'#FFF'} />;

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const tableContent = notes.map((note) => (
      <Note key={note.id} note={note} />
    ));

    content = (
      <table className='table table--notes'>
        <thead className='table__thead'>
          <tr>
            <th scope='col' className='table__th note__status'>
              Username
            </th>
            <th scope='col' className='table__th note__created'>
              Created
            </th>
            <th scope='col' className='table__th note__updated'>
              Updated
            </th>
            <th scope='col' className='table__th note__title'>
              Title
            </th>
            <th scope='col' className='table__th note__username'>
              Owner
            </th>
            <th scope='col' className='table__th note__edit'>
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default NotesList;
