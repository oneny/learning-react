import { AxiosResponse } from 'axios';
import { useQuery, useQueryClient } from 'react-query';

import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '../../../user-storage';

// 사용자의 로그인 여부에 따라 사용자 객체나 null이 될 수 있다.
async function getUser(user: User | null): Promise<User | null> {
  if (!user) return null;
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${user.id}`,
    {
      headers: getJWTHeader(user),
    },
  );

  return data.user;
}

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const queryClient = useQueryClient();
  // TODO: call useQuery to update user data from server
  // 기존 user의 값을 인자로 건네 user의 값을 업데이트하는데 사용된다.
  const { data: user } = useQuery(queryKeys.user, () => getUser(user), {
    // onSuccess는 쿼리 함수나 setQueryData에서 데이터를 가져오는 함수이다.
    initialData: getStoredUser(),
    onSuccess: (received: User | null) => {
      if (!received) {
        clearStoredUser();
      } else {
        setStoredUser(received);
      }
    },
  });

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    // TODO: update the user in the query cache
    // 설정하려는 쿼리 데이터에 대한 키를 입력하고, newUser로 전달된 데이터를 지정
    queryClient.setQueryData(queryKeys.user, newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    // TODO: reset user to null in query cache
    // setQueriesData는 실행 후 onSuccess가 실행되고, removeQueires는 실행되지 않는다.
    queryClient.setQueriesData(queryKeys.user, null);
    queryClient.removeQueries('user-appointments');
  }

  return { user, updateUser, clearUser };
}
