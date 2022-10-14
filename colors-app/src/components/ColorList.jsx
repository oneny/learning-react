import React, { useContext } from "react";
import Color from "./Color";
import { useColors } from "../hooks/color-hooks";

function ColorList() {
  // 컴포넌트에 있던 컨텍스트에 대한 참조를 완전히 없앴다. 훅을 통해서만 접근 가능하므로 직접 접근하는 것도 불가능하다.
  const { colors } = useColors();
  if (!colors.length) return <div>No Colors Listed. (Add a Color)</div>;

  return (
    <div className="color-list">
      {colors.map((color) => (
        <Color key={color.id} {...color} />
      ))}
    </div>

    // <div className="color-list">
    //   {colors.map((color) => (
    //     <Color
    //       key={color.id}
    //       {...color}
    //       onRemove={onRemoveColor}
    //       // ColorList 컴포넌트는 개별 Color 컴포넌트에서 발생한 onReate 이벤트를 처리해야 한다.
    //       // 이벤트를 받으면 onRateColor 함수 프로퍼티를 통해 부모에게 평점 변경 정보를 전달한다.
    //       onRate={onRateColor}
    //     />
    //   ))}
    // </div>
  );
}

export default ColorList;
