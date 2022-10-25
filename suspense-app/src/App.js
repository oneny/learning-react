import React, { lazy, useState, Suspense } from "react";
import Agreement from "./components/Agreement";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
// import Main from "./Main";
// Main 컴포넌트와 자식들의 모든 코드가 한 자바스크립트 파일, 즉 번들로 패키징된다는 점이 문제다.
// 이로 인해 모든 코드기반이 다운로드되어야만 Agreement가 처음 렌더링될 수 있다.
// 처음부터 컴포넌트를 임포트하지 않고, React.lazy를 사용하면 렌더링이 이뤄지는 시점까지 Main 컴포넌트 적재를 늦출 수 있다.

// 이 코드는 리액트가 컴포넌트가 처음 렌더링되기 전까지는 코드 기반을 적재하지 않도록 지시한다. 이에 따라 컴포넌트가 렌더링되는 시점에 import 함수를 통해 컴포넌트가 임포트된다. -> 나중에 마이페이지에 사용해보자.
const Main = lazy(() => import("./Main.js"));

function App() {
  const [agree, setAgree] = useState(false);

  if (!agree) return <Agreement onAgree={() => setAgree(true)} />;

  // 작업을 일시 중단시키는 해법으로 Suspense 컴포넌트가 있다.
  // Suspense는 소스 코드 요청이 진행 중인 동안 적재 중 애니메이션을 렌더링해준다.
  // 요청이 성공 후 Main 컴포넌트를 렌더링한다.
  return (
    <Suspense fallback={<ClimbingBoxLoader />}>
      <Main />
    </Suspense>
  );
}

export default App;
