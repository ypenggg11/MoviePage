import { useCallback, useMemo } from "react";
import { Subject } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { takeUntil } from "rxjs/operators";

const useSessionId = () => {

  //Handle loading and errors

  const cancel$ = useMemo(() => new Subject(), []);

  const generateSessionId = useCallback(
    (requestToken) =>
      fromFetch(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_MOVIES_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            request_token: requestToken.request_token,
          }),
          selector: (response) => response.json(),
        }
      )
        .pipe(takeUntil(cancel$))
        .subscribe((data) => {
          sessionStorage.setItem("sessionId", data.session_id);
        }),
    [cancel$]
  );

  const createLoginSession = useCallback(
    (username, password, requestToken) =>
      fromFetch(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.REACT_APP_MOVIES_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            request_token: requestToken.request_token,
            username: username,
            password: password,
          }),
          selector: (response) => response.json(),
        }
      )
        .pipe(takeUntil(cancel$))
        .subscribe((data) => generateSessionId(data)),
    [cancel$, generateSessionId]
  );

  const createSession = useCallback(
    (username, password) =>
      fromFetch(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_MOVIES_API_KEY}`,
        { selector: (response) => response.json() }
      )
        .pipe(takeUntil(cancel$))
        .subscribe((data) => createLoginSession(username, password, data)),
    [cancel$, createLoginSession]
  );

  const deleteSession = useCallback(
    (sessionId) =>
      fromFetch(
        `https://api.themoviedb.org/3/authentication/session?api_key=${process.env.REACT_APP_MOVIES_API_KEY}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id: sessionId,
          }),
          selector: (response) => response.json(),
        }
      )
        .pipe(takeUntil(cancel$))
        .subscribe((data) => {
          sessionStorage.removeItem("sessionId");
          console.log(data.success);
        }),
    [cancel$]
  );

  return {
    createSession,
    deleteSession,
    cancel$,
  };
};

export default useSessionId;
