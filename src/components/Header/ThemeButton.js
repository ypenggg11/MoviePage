import React, { useContext } from "react";

import ThemeContext from "../../store/theme-context";

const ThemeButton = () => {
  const themeContext = useContext(ThemeContext);

  const changeThemeHandler = () => {
    themeContext.onChangeTheme();
  };

  return (
    <label className="switch">
      <input type='checkbox' onChange={changeThemeHandler} checked={!themeContext.isDarkTheme}/>
      <span className={"switch__slider switch__round"}></span>
    </label>
  );
};

export default React.memo(ThemeButton);
