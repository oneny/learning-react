import { useState } from "react";

export const useInput = (initialValue) => {
  const [value, setValue] = useState(value);

  return [
    {
      value,
      onChange: (e) => {
        console.log(e.target.value);
        setValue(e.target.value);
      },
    },
    () => setValue(initialValue),
  ];
};
