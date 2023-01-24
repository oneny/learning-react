/**
 * 독자적인 에러 핸들러를 확보하며, 에러 핸들러 및 기타 추가할 초기값들이
 * 이 독립적인 파일에서 살아있으며 실제로 QueryClient를 사용하게 될 app 파일을 오염시키지 않도록 하기 위함이다.
 */

import { createStandaloneToast } from '@chakra-ui/react';
import { QueryClient } from 'react-query';

import { theme } from '../theme';

const toast = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown): void {
  // error is type unknown because in JS, anything can be an error
  const title =
    error instanceof Error ? error.message : 'error connecting to server';

  // prevent duplicate toasts
  toast.closeAll();
  toast({
    title,
    status: 'error',
    variant: 'subtitle',
    isClosable: true,
  });
}

// to satisfy typescript until this file has uncommented contents
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        queryErrorHandler(error);
      },
    },
  },
});
