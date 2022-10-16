import React, { useEffect, useLayoutEffect, useState, memo, useCallback } from "react";
import Checkbox from "./components/Checkbox";
import User from "./components/User";
import useMousePosition from "./hooks/useMousePosition";
import useWindowSize from "./hooks/useWindowSize";

// Cat은 순수 컴포넌트
// 출력은 항상 name 프로퍼티를 표시하는 <p> 엘리먼트다.
// 프로퍼티로 제공되는 이름이 같으면 출력도 항상 같다.
// name이 바뀌면 컴포넌트를 렌더링한다.
//  -> 반대로 name이 같으면 리액트가 meow 프로퍼티가 변경됐는지 여부를 어떻게 판단하는지와 관계없이 컴포넌트가 다시 렌더링되지 않는다.
const Cat = memo(
  ({ name, meow = (f) => f }) => {
    console.log(`rendering ${name}`);

    return <p onClick={() => meow(name)}>{name}</p>;
  },
  (prevProps, nextProps) => prevProps.name === nextProps.name
);

// memo 함수는 컴포넌트를 다시 렌더링해야 하는 규칙을 좀 더 구체적으로 지정할 수 있게 해준다.
const RenderCatOnce = memo(Cat, () => true);
const AlwaysRenderCat = memo(Cat, () => false);

const PureCat = memo(Cat);

function App() {
  // const [width, height] = useWindowSize();
  // const [x, y] = useMousePosition();

  // console.log(width, height);
  // console.log(x, y);

  // return <User />;

  const [cats, setCats] = useState(["Biscuit", "Jungle", "Outlaw"]);

  const meow = useCallback(name => console.log(`${name} has meowed`), []);

  return (
    <>
      {cats.map((name, i) => (
        <AlwaysRenderCat
          key={i}
          name={name}
          // name 프로퍼티는 동일하지만 meow 프로퍼티는 함수로 정의할 떄마다 새로운 함수가 생긴다.
          // 따라서 리액트 입장에서는 meow 프로퍼티가 변경됐기 때문에 컴포넌트를 다시 렌더링해야 한다.
          meow={meow}
        />
      ))}
      <button onClick={() => setCats([...cats, prompt("Name a cat")])}>
        Add a Cat
      </button>
    </>
  );
}

export default App;
