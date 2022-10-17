import { useEffect, useRef } from "react";

// 현재 컴포넌트가 마운트됐는지 알려주는 훅
// 컴포넌트 마운트가 해제되면 상태가 해제되어 지워진다.
// 하지만 ref는 여전히 살아있다.
// 앞의 useEffect에는 의존 관계 배열이 없다.
  // 이 말은 컴포넌트가 렌더링될 때마다 이 훅이 호출되며 ref의 값이 true임을 보장해준다.
// 컴포넌트 마운트가 useEffect가 반환한 함수가 호출되며, ref의 값이 false가 된다.
export function useMountedRef() {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  });
  return mounted;
}
