import React from "react";
import StarRating from "./StarRating";
import { FaTrash } from "react-icons/fa";
import { useColors } from "../hooks/color-hooks";

// Color 컴포넌트는 훅을 사용해 색을 제거하고 색의 평점을 메기는 함수를 직접 얻을 수 있다.
// 더 이상 prop으로 부모에게 이벤트를 전달하지 않아도 된다!
function Color({ id, title, color, rating }) {
  const { rateColor, removeColor } = useColors();
  // Color 컴포넌트는 순수 컴포넌트로 상태에 접근할 수 없다.
  // Color 컴포넌트는 상태가 없기 때문에 앱의 여러 부분이나 다른 애플리케이션에서 자유롭게 재사용할 수 있다.
  // Color 컴포넌트는 사용자가 삭제 버튼을 누를 때 벌어지는 일에 대해 신경쓰지 않는다.
  // Color 컴포넌트가 신경쓰는 것은 이벤트가 발생했다는 사실과 사용자가 제거하고 싶어하는 색에 대한 정보를 부모 컴포넌트에게 전달하는 것뿐이다!!!!!!

  return (
    <section>
      <h1>{title}</h1>

      <button onClick={() => removeColor(id)}>
        <FaTrash />
      </button>

      <div style={{ height: 50, background: color }} />

      {/* Color 컴포넌트의 부모에게 Color 컴포넌트가 프로퍼티로 받은 다른 onRate 핸들러를 사용해서 평점을 변경할 색의 id와 평점을 전달한다. */}
      <StarRating
        selectedStars={rating}
        onRate={(rating) => rateColor(id, rating)}
      />
    </section>
  );
}

export default Color;
