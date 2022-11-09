import React, { useCallback, useEffect, useMemo } from "react";
import { useAnyKeyToRender } from "./src/hooks/useAnyKeyToRender";

function WordCount({ children = "" }) {
  useAnyKeyToRender();

  const words = useMemo(() => children.split(" "), [words]);

  useEffect(() => {
    console.log("fresh render");
  }, [words]);
  
  const fn = useCallback(() => {
    console.log("hello");
    console.log("world");
  }, []);

  useEffect(() => {
    fn();
  }, [fn]);

  return (
    <>
      <p>{children}</p>
      <p>
        <strong>{words.length} - words</strong>
      </p>
    </>
  );
}

function App() {
  return <WordCount>You are not going to believe this but...</WordCount>;
}

export default App;
