import { useCustomToast } from 'components/app/hooks/useCustomToast';
import jsonpatch from 'fast-json-patch';
import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';
import { queryKeys } from 'react-query/constants';

import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { useUser } from './useUser';

// for when we need a server function
async function patchUserOnServer(
  newData: User | null,
  originalData: User | null,
): Promise<User | null> {
  if (!newData || !originalData) return null;
  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData);

  // send patched data to the server
  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData),
    },
  );
  return data.user;
}

// TODO: update type to UseMutateFunction type
export function usePatchUser(): UseMutateFunction<
  User,
  unknown,
  User,
  unknown
> {
  const { user, updateUser } = useUser();
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  // TODO: replace with mutate function
  const { mutate: patchUser } = useMutation(
    (newUserData: User) => patchUserOnServer(newUserData, user),
    {
      // onMutate returns context that is passed to onError
      onMutate: async (newData: User | null) => {
        // 사용자 데이터를 대상으로 한 발싱하는 쿼리는 모두 취소
        // cancel any outgoing queries for user data, so old server data doesn't overwrite our optimistic update
        queryClient.cancelQueries(queryKeys.user);

        // 기존 사용자 데이터의 스냅샷을 찍는다.
        // snapshot of previous user value
        const previousUserData: User = queryClient.getQueryData(queryKeys.user);

        // 새로운 값으로 캐시를 낙관적 업데이트하고,
        // optimistically update the cache with new user value
        updateUser(newData);

        // 이후 해당 컨텍스트 반환
        // return context object with snapshotted value
        return { previousUserData };
      },
      onError: (error, newData, context) => {
        // roll back cache to saved value
        if (context.previousUserData) {
          updateUser(context.previousUserData);
          toast({
            title: 'Update failed; restoring previous values',
            status: 'warning',
          });
        }
      },
      onSuccess: (userData: User | null) => {
        if (user) {
          updateUser(userData);
          toast({
            title: 'User updated!',
            status: 'success',
          });
        }
      },
      // 데이터를 resolve했을 때 성공 여부와 관계 없이 onSettled 콜백을 실행한다.
      onSettled: () => {
        // invalidate user query to make sure we're in sync with server data
        // 쿼리가 무효화되면 리페치를 실행하여 우리의 데이터가 모두 서버 측과 동일하게 해줄 것이다.
        queryClient.invalidateQueries(queryKeys.user);
      },
    },
  );

  return patchUser;
}
