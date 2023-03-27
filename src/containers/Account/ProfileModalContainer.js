import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import useFetch from "../../hooks/useFetch";
import { getAccountDetailUrl } from "../../services/api-requests";

import { ProfileModalComponent, LoaderComponent } from "../../components";

/* Renders the current logged user profile */
export const ProfileModalContainer = () => {
  const [account, setAccount] = useState({});

  /* Fetch the current user account details */
  const { data, isLoading } = useFetch(
    getAccountDetailUrl(sessionStorage.getItem("sessionId"))
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

  return (
    <React.Fragment>
      {/* Renders inside of the 'profile-modal' div */}
      {ReactDOM.createPortal(
        !isLoading ? (
          <ProfileModalComponent account={account} />
        ) : (
          <LoaderComponent />
        ),
        document.getElementById("profile-modal")
      )}
    </React.Fragment>
  );
};