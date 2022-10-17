import React, { useState, useCallback, useMemo } from "react";

// 메모화해도 그리 큰 성능 향상을 얻지 못하거나, 성능 향상을 얻더라도 코드가 더 복잡해지는 것을 정당화할 만큼의 성능이 향상되는 것은 아니다.
// But! 사용자가 useIterator 컴포넌트를 사용하면 메모화한 값이 항상 같은 객체와 함수를 가리킨다.
// 사용자가 이런 값을 서로 비교하거나 자신의 의존 관계 배열 안에 이런 값을 넣을 때는 메모화한 값이 항상 같으면 일 처리가 더 편해진다.
export const useIterator = (items = [], initialIndex = 0) => {
  const [i, setIndex] = useState(initialIndex);

  const prev = useCallback(() => {
    if (i === 0) return setIndex(items.length - 1);
    setIndex(i - 1);
  }, [i]);

  const next = useCallback(() => {
    if (i === items.length - 1) return setIndex(0);
    setIndex(i + 1);
  }, [i]);

  const item = useMemo(() => items[i], [i]);

  return [item || items[0], prev, next];
};
