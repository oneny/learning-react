import { useQuery, useQueryClient } from 'react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useCustomToast } from '../../app/hooks/useCustomToast';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  // TODO: get data from server via useQuery
  const fallback = [];
  const { data = fallback } = useQuery(queryKeys.treatments, getTreatments, {
    // defaultOption에 추가함
    // staleTime: 1000 * 60 * 10, // 10 minutes
    // // 만료 타임이 캐싱 타임을 초과하는 것은 말이 안된다.
    // // 만료된 데이터륿 불러오는 동안 캐싱에 백업된 내용이 보여진다.
    // // 따라서 만료된 데이터보다 캐싱이 먼저 만료된다는 것은 리페칭을 실행시키는 동안 보여줄 화면이 없다는 것을 의미한다.
    // cacheTime: 1000 * 60 * 15, // 15 minutes (doesn't make sence for staleTime to exceed cacheTime)
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
  });
  return data;
}

export function usePrefetchTreatments(): void {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.treatments, getTreatments);
}
