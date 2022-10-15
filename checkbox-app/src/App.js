import React, { useEffect, useLayoutEffect } from "react";
import Checkbox from "./components/Checkbox";
import User from "./components/User";
import useMousePosition from "./hooks/useMousePosition";
import useWindowSize from "./hooks/useWindowSize";

function App() {
  // const [width, height] = useWindowSize();
  // const [x, y] = useMousePosition();

  // console.log(width, height);
  // console.log(x, y);
  
  return <User />;
}

export default App;
