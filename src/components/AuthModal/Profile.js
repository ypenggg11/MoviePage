import {
  Dialog,
  Card,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AuthContext from "../../store/auth-context";
import { getApiDefaultPath, getApiKey } from "../../services/api-config";
import Loader from "../../UI/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [account, setAccount] = useState({});

  const { data, isLoading } = useFetch(
    `${getApiDefaultPath()}account?api_key=${getApiKey()}&session_id=${sessionStorage.getItem(
      "sessionId"
    )}`
  );

  useEffect(() => {
    if (data !== null) {
      const account = {
        id: data.id,
        username: data.username,
      };

      setAccount(account);
    }
  }, [data]);

  const closeHandler = () => {
    navigate("/");
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        !isLoading ? (
          <Dialog open={true} onClose={closeHandler}>
            <Card>
              <DialogTitle>{account.username}</DialogTitle>
              {/* <DialogContent></DialogContent> */}
              <DialogActions>
                <Button onClick={closeHandler}>Back</Button>
                <Button onClick={authContext.logout} aria-label="logout">Logout</Button>
              </DialogActions>
            </Card>
          </Dialog>
        ) : (
          <Loader />
        ),
        document.getElementById("profile-modal")
      )}
    </React.Fragment>
  );
};

export default Profile;
