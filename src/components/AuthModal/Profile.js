import {
  Dialog,
  Card,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";

import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AuthContext from "../../store/auth-context";

const Profile = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [account, setAccount] = useState({});
  const { fetchGet } = useFetch();

  const loadAccount = useCallback((acc) => {
    const account = {
      id: acc.id,
      username: acc.username,
    };

    setAccount(account);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const sessionId = sessionStorage.getItem("sessionId");

    fetchGet(
      `https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&session_id=${sessionId}`,
      loadAccount,
      signal
    );

    return () => {
      controller.abort();
    };
  }, [loadAccount, fetchGet]);

  const closeHandler = () => {
    navigate("/");
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Dialog open={true} onClose={closeHandler}>
          <Card>
            <DialogTitle>{account.username}</DialogTitle>
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
