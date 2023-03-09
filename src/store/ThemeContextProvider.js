import React, { useState } from "react";
import ThemeContext from "./theme-context";

const ThemeContextProvider = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const onChangeTheme = () => {
    setIsDarkTheme((prevState) => {
      return !prevState;
    });
  };

  return (
    <ThemeContext.Provider
      value={{ isDarkTheme: isDarkTheme, onChangeTheme: onChangeTheme }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
