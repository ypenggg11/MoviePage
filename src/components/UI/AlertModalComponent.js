import React, { useState } from "react";

import { Alert, Backdrop } from "@mui/material";

/* Modal that shows an alert */
export const AlertModalComponent = ({openned, severity, children}) => {
    const [open, setOpen] = useState(openned);
    const closeHandler = () => {
        setOpen(false);
    };

  return (
    <Backdrop open={open} onClick={closeHandler} sx={{zIndex:"999999"}}>
      <Alert severity={severity}>{children}</Alert>
    </Backdrop>
  );
};