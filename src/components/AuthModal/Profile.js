import {
  Dialog,
  Card,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useContext } from "react";
import ReactDOM from "react-dom";

import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const Profile = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const closeHandler = () => {
    navigate("/");
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Dialog open={true} onClose={closeHandler}>
          <Card>
            <DialogTitle>{authContext.sessionId}</DialogTitle>
            {/* <DialogContent></DialogContent> */}
            <DialogActions>
              <Button onClick={closeHandler}>Back</Button>
              <Button onClick={authContext.logout}>Logout</Button>
            </DialogActions>
          </Card>
        </Dialog>,
        document.getElementById("profile-modal")
      )}
    </React.Fragment>
  );
};

export default Profile;
