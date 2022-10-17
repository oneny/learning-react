import React, { useState } from "react";

export const useInput = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);

  return [{ value, onChange: (e) => setValue(e.target.value) }, setValue];
}