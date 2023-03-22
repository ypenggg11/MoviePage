import {
  Dialog,
  Card,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AuthContext from "../../store/auth-context";
import { getApiDefaultPath, getApiKey } from "../../services/api-config";
import Loader from "../../UI/Loader";

/* Renders the current logged user profile */
const Profile = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [account, setAccount] = useState({});

  /* Fetch the current user account details */
  const { data, isLoading } = useFetch(
    `${getApiDefaultPath()}account?api_key=${getApiKey()}&session_id=${sessionStorage.getItem(
      "sessionId"
    )}`
  );

  /* Update the account state when data is fetched */
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

  const favouritesHandler = () => {
    navigate("/profile/favourites");
  };

  return (
    <React.Fragment>
      {/* Renders inside of the 'profile-modal' div */}
      {ReactDOM.createPortal(
        !isLoading ? (
          <Dialog open={true} onClose={closeHandler}>
            <Card>
              {/* Username */}
              <DialogTitle>{account.username}</DialogTitle>
              {/* WIP: Favourite movies button */}
              <DialogContent>
                <Button onClick={favouritesHandler}>Favourites</Button>
              </DialogContent>
              {/* Back & Logout buttons */}
              <DialogActions>
                <Button onClick={closeHandler}>Back</Button>
                <Button onClick={authContext.logout} aria-label='logout'>
                  Logout
                </Button>
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
