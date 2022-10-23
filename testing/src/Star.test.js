import React from "react";
import ReactDOM from "react-dom/client";
import Star from "./Star";

test("renders a star", () => {
  const div = document.createElement("div");
  div.setAttribute("id", "root");

  const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(<Star />);
  expect(div.querySelector("svg")).toBeTruthy();
});