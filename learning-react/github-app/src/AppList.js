import React from "react";
import GitHubUser from "./components/GitHubUser2";

// 배열에 대해 매핑하는 과정 추상화하기!
const tahoe_peaks = [
  { name: "Freel Peack", elevation: 10891 },
  { name: "Monument Peak", elevation: 10067 },
  { name: "Pyramid Peak", elevation: 9983 },
  { name: "Mt. Tallac", elevation: 9735 },
];

// 렌더 프롭: 말 그대로 렌더링되는 프로퍼티를 의미한다.
// 컴포넌트나 렌더링할 컴포넌트를 반환할 함수 컴포넌트인데 프로퍼티로 전달되는 컴포넌트를 가리킨다.
// 함수 렌더 프롭의 경우 함수이기 떄문에 (프로퍼티를 포함하는) 컴포넌트가 렌더링될 때 데이터를 함수에 인자로 넘겨서 반환되는 컴포넌트를 렌더링에 사용할 수 있다.

function List({ data = [], renderEmpty, renderItem }) {
  // "배열이 비어 있다면 부모로부터 렌더링해야 하는 컴포넌트를 전달받아 사용자에게 메시지를 표시한다."
  // 여기서 렌더 프롭은 renderEmpty, renderItem인데 renderEmpty는 컴포넌트로 전달, renderItem은 함수로 전달된다.
  return !data.length ? {
    renderEmpty
  } : (
    <ul>
      {data.map((item, i) => (
        <li key={i}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

function App() {
  return (
    // 리스트가 비어 있을 때 렌더링해야 하는 컴포넌트를 List 컴포넌트에게 전달할 수 있다.
    <List
      data={tahoe_peaks}
      renderEmpty={<p>This list is empty</p>}
      renderItem={(item) => (
        <>
          {item.name} - {item.elevation.toLocaleString()}ft
        </>
      )}
    />
  );
}

export default App;
