import React, { createContext, useState, useContext } from "react";
import colorData from "./data/color-data.json";
import v4 from "uuid";

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

export const useColors = () => useContext(ColorContext);