import React, { useState } from "react";
import ColorList from "./components/ColorList";
import AddColorForm from "./components/AddColorFormState";

export default function App() {
  return (
    <>
      <AddColorForm />
      <ColorList />
    </>
  );
}
