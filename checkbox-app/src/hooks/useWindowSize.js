import React, { useState, useLayoutEffect } from 'react'

function useWindowSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const resize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }
 
  // useLayoutEffect는 렌더링 다음에 호출되지만 브라우저가 변경 내역을 화면에 그리기 전에 호출된다.
  // 창의 width, height는 브라우저가 화면을 그리기 전에 사용자의 컴포넌트에 필요한 정보다.
  // useLayoutEffect를 사용해서 화면을 그리기 전에 창의 width와 height를 계산한다.
  useLayoutEffect(() => {
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return [width, height];
}

export default useWindowSize