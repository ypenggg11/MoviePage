import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { Dialog, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../../store/theme-context";

import {LoginFormComponent} from "../../components";

/* Renders the modal for the user authentication */
export const AuthModalComponent = () => {
  const navigate = useNavigate();
  const [invalid, setInvalid] = useState();
  const { isDarkTheme } = useContext(ThemeContext);

  /* When the user is invalid, update the invalid state */
  useEffect(() => {
    const isUserInvalid = localStorage.getItem("isUserInvalid");

    isUserInvalid && setInvalid(isUserInvalid);

    return () => {
      localStorage.removeItem("isUserInvalid");
    };
  }, []);

  const closeHandler = () => {
    navigate("/");
  };

  return (
    <React.Fragment>
      {/* Renders inside of the 'auth-modal' div */}
      {ReactDOM.createPortal(
        <Dialog
          open={true}
          onClose={closeHandler}
          sx={{
            bgcolor: `${isDarkTheme ? "#3f3f3f" : "whitesmoke"}`,
          }}
        >
          <LoginFormComponent onCloseForm={closeHandler} />
          {/* If the credentials it's invalid, shows an alert */}
          {invalid && (
            <Alert severity='error' sx={{ marginTop: "-4px" }}>
              Wrong username or password!
            </Alert>
          )}
        </Dialog>,
        document.getElementById("auth-modal")
      )}
    </React.Fragment>
  );
};

