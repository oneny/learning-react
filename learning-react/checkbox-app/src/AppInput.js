import React, { useState, useEffect } from "react";
import Checkbox from "./components/Checkbox";

function App() {
  // 입력 필드 값을 표현하는 상태 -> 입력 필드 바뀔 때마다 val 바뀜 -> 컴포넌트 다시 렌더링
  const [val, setVal] = useState(""); 
  const [phrase, setPhrase] = useState("example phrase");

  // 사용자가 send 버튼을 클릭하면 텍스트 영역의 val이 저장되고, val이 ""로 재설정 -> 다시 렌더링
  const createPhrase = () => {
    setPhrase(val);
    setVal("");
  };

  // 렌더링이 이뤄질 때마다 효과가 호출되는 것을 바라지 않을 때 -> "의존 관계 배열"을 사용
  // "의존 관계 배열": 이펙트가 호출되는 시점을 제어한다.
  // 즉, useEffect 훅을 구체적인 데이터 변경과 연결시킬 수 있다.
  useEffect(() => {
    console.log(`typing ${val}`);
  }, [val]);

  useEffect(() => {
    console.log(`saved phrase: "${phrase}"`)
  }, [phrase])

  return (
    <>
      <label>Favorite phrase:</label>
      <input
        value={val}
        placeholder={phrase}
        onChange={(e) => setVal(e.target.value)}
      />
      <button onClick={createPhrase}>send</button>
    </>
  );
}

export default App;
