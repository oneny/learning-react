import React from 'react';
import User from '../components/users/User';
import { useGetUsersQuery } from '../features/users/usersApiSlice';
import useTitle from '../hooks/useTitle';

const UsersList = () => {
  useTitle('userList');

  // const {
  //   data: users,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useGetUsersQuery(undefined, {
  //     pollingInterval: 60000, // new request for notes every 15 seconds
  //     refetchOnFocus: true,
  //     refetchOnMountOrArgChange: true, // 페이지 들어가면 새로 리패칭함
  //   });
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>;
  }

  if (isSuccess) {

    const tableContent = users.length
      ? users.map((user) => <User key={user.id} user={user} />)
      : null;

    content = (
      <table className='table table--users'>
        <thead className='table__thead'>
          <tr>
            <th scope='col' className='table__th user__username'>
              Username
            </th>
            <th scope='col' className='table__th user__roles'>
              Roles
            </th>
            <th scope='col' className='table__th user__edit'>
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

export default UsersList;
