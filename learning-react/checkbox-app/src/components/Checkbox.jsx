import React, { useEffect, useReducer, useState } from "react";

function Checkbox() {
  // const [checked, setChecked] = useState(false);
  // 리듀서 정의: 현재 상태를 받아서 새 상태를 반환하는 함수라고 할 수 있다.
  // useReducer는 리듀서 함수와 초기 상태를 인자로 받는다. 즉, Array.prototype.reduce가 녹아있다고 볼 수 있다.
  const [checked, toggle] = useReducer(checked => !checked, false);

  // useEffect 함수 안에 alert를 넣는다는 것은
  // 이 함수를 렌더러가 렌더링한 직후에 부수 효과(side effect)로 실행한다는 뜻이다.
  // Checkbox 함수는 UI를 렌더링한다. UI 렌더링 외에 컴포넌트가 수행해야 하는 일을 "효과(effect)"라고 한다.
  // 리액트 앱에서 렌더링은 렌더링에 속하지 않은 효과에게도 영향을 끼친다.
  useEffect(() => {
    localStorage.setItem("checkbox-value", checked);
    alert(`checked: ${checked.toString()}`);
  });

  return (
    <>
      <input
        type="checkbox"
        value={checked}
        onChange={toggle}
      />
      {checked ? "checked" : "not checked"}
    </>
  );
}

export default Checkbox;
