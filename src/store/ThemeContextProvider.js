import React, { useState } from "react";
import ThemeContext from "./theme-context";

/* Provide the state of the dark theme, and updates that on change click */
const ThemeContextProvider = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("isDarkTheme") === "true" ? true : false
  );

  if (isDarkTheme) {
    document.body.style.backgroundColor = "#3f3f3f";
  } else {
    document.body.style.backgroundColor = "rgba(232, 232, 232, 0.883)";
  }

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
