import React, { memo } from "react";

// Cat은 순수 컴포넌트
// 출력은 항상 name 프로퍼티를 표시하는 <p> 엘리먼트다.
// 프로퍼티로 제공되는 이름이 같으면 출력도 항상 같다.
function Cat({ name }) {
  console.log(`rendering ${name}`);

  return <p>{name}</p>;
}

export default memo(Cat);
