import React, { useState } from "react";
import colorData from "./data/color-data.json";
import ColorList from "./components/ColorList";
import AddColorForm from "./components/AddColorFormRef";
import { v4 } from "uuid";

export default function App() {
  // App 컴포넌트는 상태와 엮여이쓴ㄴ 컴포넌트다.
  // 따라서 색의 id를 사용해 상태에서 색을 제거할 수 있다.
  const [colors, setColors] = useState(colorData);

  return (
    <>
      <AddColorForm
        onNewColor={(title, color) => {
          const newColors = [
            ...colors,
            {
              id: v4(),
              rating: 0,
              title,
              color,
            },
          ];
          setColors(newColors);
        }}
      />

      <ColorList
        colors={colors}
        // 모든 컴포넌트를 거쳐 이벤트가 위로 올라가면 App에 도착한다.
        // App 컴포넌트는 ColorList가 onRateColor 프로퍼티에 새로운 평점과 색의 id를 전달해야 색 평점을 변경한다.
        // onRateColor를 통해 전달된 값을 기존 색에 매핑하면서 id 프로퍼티가 일치하는 색에 대해 새로운 평점을 할당한 배열을 구축한다.
        // colors 배열의 상태가 바뀌면 UI 트리가 새로운 데이터에 맞춰 렌더링된다.
        onRateColor={(id, rating) => {
          const newColors = colors.map((color) =>
            color.id === id ? { ...color, rating } : color
          );
          setColors(newColors);
        }}
        // ColorList가 onRemoveColor 이벤트를 발생시키면 이벤트의 인자로부터 색의 id를 얻어서 색 목록에 있는 색 중에 사용자가 제거하고 싶은 색을 filter로 걸러내는데 사용
        // 그 후 상태를 변경
        // setColors 함수를 사용해 사용자가 선택한 색을 제외한 색으로 이뤄진 배열로 상태를 변경

        // colors 배열의 상태를 바꾸면 App 컴포넌트가 새로운 색 목록에 맞춰 다시 렌더링된다.
        // 이 새로운 색 목록은 ColorList 컴포넌트에게 전달되며, 그에 따라 ColorList 컴포넌트도 다시 렌더링된다.
        // ColorList는 전달받은 색에 맞춰 Color 컴포넌트를 렌더링하고, 그에 따라 UI에는 색이 하나 줄어든 새로운 화면이 그려진다.
        onRemoveColor={(id) => {
          const newColors = colors.filter((color) => color.id !== id);
          setColors(newColors);
        }}
      />
    </>
  );
}
