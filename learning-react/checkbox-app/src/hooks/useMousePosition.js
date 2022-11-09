import  React, { useState, useLayoutEffect } from "react";

function useMousePosition() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const setPosition = ({ x, y }) => {
    setX(x);
    setY(y);
  };

  // useLayoutEffect를 사용할 때 보여주는 다른 예제로
  // 마우스 위치를 추적하는 경우를 들 수 있다.
  // 이렇게 사용하는 효과가 브라우저의 화면 그리기(UI엘리먼트의 모양을 화면에 표시함)에 필수적인 경우에 사용할 수 있다.
  useLayoutEffect(() => {
    window.addEventListener("mousemove", setPosition);
  
    return () => window.removeEventListener("mousemove", setPosition);
  }, []);

  return [x, y];
}

export default useMousePosition;