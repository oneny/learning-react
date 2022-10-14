import React, { useState } from "react";
import { useColors } from "../hooks/color-hooks";
import { useInput } from "../hooks/useInput";

function AddColorFormState() {
  const [titleProps, resetTitle] = useInput("");
  const [colorProps, resetColor] = useInput("#000000");
  const { addColor } = useColors();

  const submit = (e) => {
    e.preventDefault();
    addColor(titleProps.value, colorProps.value);
    resetTitle();
    resetColor();
  };

  return (
    <form onSubmit={submit}>
      <input
        {...titleProps}
        type="text"
        placeholder="color title..."
        required
      />

      <input {...colorProps} type="color" required />
      <button>ADD</button>
    </form>
  );
}

export default AddColorFormState;
