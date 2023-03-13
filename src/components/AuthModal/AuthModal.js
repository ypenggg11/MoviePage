import React, { useImperativeHandle, useState } from "react";
import ReactDOM from "react-dom";

import { Dialog } from "@mui/material";
import LoginForm from "./LoginForm";

const AuthModal = React.forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: openHandler,
    };
  });

  const openHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Dialog
          open={isOpen}
          onClose={closeHandler}
        >
            <LoginForm onCloseForm={closeHandler}/>
        </Dialog>,
        document.getElementById("auth-modal")
      )}
    </React.Fragment>
  );
});

export default AuthModal;
