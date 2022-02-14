import React from "react";

const useToggle = (initialState) => {
  const [value, setValue] = React.useState(initialState);

  const toggleState = () => {
    setValue(!value);
  };

  return [value, toggleState, setValue];
};

export { useToggle };
