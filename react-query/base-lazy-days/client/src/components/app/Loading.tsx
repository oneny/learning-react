import { Spinner, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { useIsFetching } from 'react-query';

/**
 * 각 컴포넌트마다 개별 로딩 인디케이터를 사용하는 대신 중앙화된 로딩 인디케이터를 사용하도록 앱 업데이트
 * useIsFetching 훅을 로딩 컴포넌트에 사용하여 스피너의 표시 여부를 사용자에게 알려준다.
 */

export function Loading(): ReactElement {
  // will use React Query `useIsFetching` to determine whether or not to display
  // useIsFetching은 현재 가져오기 상태인 쿼리 호출의 수를 나타내는 정수값을 반환한다.
  // isFetching이 0보다 크 가져오기 상태인 호출이 존재하며 참으로 평가될 것이다.
  const isFetching = useIsFetching(); // for now, just don't display

  // display는 inherit으로 설정되어 로딩 스피너를 표시하게 된다.
  const display = isFetching ? 'inherit' : 'none';

  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="olive.200"
      color="olive.800"
      role="status"
      position="fixed"
      zIndex="9999"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      display={display}
    >
      <Text display="none">Loading...</Text>
    </Spinner>
  );
}
