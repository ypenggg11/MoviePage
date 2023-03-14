import React from "react";
import ReactDOM from "react-dom";

import { Dialog } from "@mui/material";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

const AuthModal = () => {
  const navigate = useNavigate();

  const closeHandler = () => {
    navigate("/");
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Dialog open={true} onClose={closeHandler}>
          <LoginForm onCloseForm={closeHandler} />
        </Dialog>,
        document.getElementById("auth-modal")
      )}
    </React.Fragment>
  );
};

export default AuthModal;
