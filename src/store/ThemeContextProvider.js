import React, { useState } from "react";
import ThemeContext from "./theme-context";

const ThemeContextProvider = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("isDarkTheme") === "true" ? true : false
  );

  const onChangeTheme = () => {
    setIsDarkTheme((prevState) => {
      localStorage.setItem("isDarkTheme", !prevState);
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
