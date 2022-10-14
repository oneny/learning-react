import React, { createContext } from "react";
import { ColorProvider } from "./hooks/color-hooks";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));

export const ColorContext = createContext();

// App 자식 컴포넌트는 useColors 훅으로부터 colors를 얻을 수 있다.
root.render(
  <ColorProvider>
    <App />
  </ColorProvider>
);

