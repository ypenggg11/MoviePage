import { useState } from "react";
import { Subject } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { tap, concatMap, takeUntil } from "rxjs/operators";

const useSessionId = () => {
  const [sessionId, setSessionId] = useState();

  const cancel$ = new Subject();

  const getRequestKey = (username, password) => {
    fromFetch(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_MOVIES_API_KEY}`
    )
      .pipe(
        tap((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
        }),
        concatMap((response) => response.json()),
        tap((data) => updateSessionId(data.request_token, username, password)),
        takeUntil(cancel$)
      )
      .subscribe();
  };

  const updateSessionId = (requestToken, username, password) => {
    fromFetch(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_MOVIES_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_token: requestToken,
          username: username,
          password: password,
        }),
      }
    )
      .pipe(
        tap((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
        }),
        concatMap((response) => response.json()),
        tap((data) => setSessionId(data.session_id)),
        takeUntil(cancel$)
      )
      .subscribe();
  };

  return { sessionId, getRequestKey };
};

export default useSessionId;
