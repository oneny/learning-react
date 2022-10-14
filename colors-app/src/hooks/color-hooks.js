import React, { createContext, useState, useContext } from "react";
import colorData from "../data/color-data.json";
import { v4 } from "uuid";

const ColorContext = createContext();

// 콘텍스트 프로바이더 자체로 콘텍스트 상에 들어 있는 값을 변경할 수 없기 떄문에
// 콘텍스트 프로바이더를 렌더링하는 상태가 있는 컴포넌트 즉, 커스텀 프로바이더(custom provider) 생성
export function ColorProvider({ children }) {
  const [colors, setColors] = useState(colorData);

  const addColor = (title, color) => 
    setColors([
      ...colors,
      {
        id: v4(),
        rating: 0,
        title,
        color,
      },
    ]);

  const rateColor = (id, rating) =>
    setColors(
      colors.map((color) => (color.id === id ? { ...color, rating } : color))
    );

  const removeColor = (id) =>
    setColors(colors.filter((color) => color.id !== id));

  return (
    <ColorContext.Provider value={{ colors, addColor, rateColor, removeColor }}>
      {children}
    </ColorContext.Provider>
  );
}

// 상태에 들어 있은 색을 처리하고 렌더링하는데 필요한 모든 기능을 한 자바스크립트 모듈로 감쌌다.
// 이 모듈이 동작할 수 있는 이유는 콘텍스트를 useContext 훅을 통해 반환하기 떄문이다.
// useContext 훅은 파일 안에서만 지역적으로 ColorContext 훅을 통해 반환하기 때문이다.
// "중요": useContext 훅은 파일 안에서만 지역적으로 ColorContext에 접근할 수 있게 된다.
// 즉, 훅을 통해서만이 ColorContext에 접근할 수 있다.
export const useColors = () => useContext(ColorContext);