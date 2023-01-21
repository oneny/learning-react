import useSWR from 'swr';
import React from 'react';
import { getUsers, usersUrlEndpoint as usersCacheKey } from '../api/usersApi';

type NavProps = {
  currentUserId: number;
  setCurrentUserId: React.Dispatch<React.SetStateAction<number>>;
};

const Nav = ({ currentUserId, setCurrentUserId }: NavProps) => {
  const { isLoading, error, data: employees } = useSWR(usersCacheKey, getUsers);

  console.log(employees);

  let options = <></>;
  if (isLoading) {
    options = <option>Loading...</option>;
  } else if (!error) {
    options = (
      <>
        <option value='0'>Employees</option>
        {employees?.map((user) => (
          <option key={`opt${user.id}`} value={user.id}>
            {user.name}
          </option>
        ))}
      </>
    );
  }

  const onChangeUser = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCurrentUserId(parseInt(e.target.value));

  let content = <></>;

  content = (
    <select
      name='selectMenu'
      id='selectMenu'
      className='selectMenu'
      value={currentUserId}
      aria-label='Employee Name'
      onChange={onChangeUser}
    >
      {options}
    </select>
  );

  return content;
};

export default Nav;
