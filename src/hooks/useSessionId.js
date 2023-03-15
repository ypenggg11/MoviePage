import { useCallback } from "react";
import { fromFetch } from "rxjs/fetch";
import { of } from "rxjs";
import { mergeMap, map, catchError, switchMap } from "rxjs/operators";

const useSessionId = () => {
  //Handle loading and errors

  const generateSessionId$ = useCallback((requestToken) => {
    if (requestToken === "ERROR") {
      return of(requestToken);
    }

    return fromFetch(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_MOVIES_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_token: requestToken,
        }),
        selector: (response) => response.json(),
      }
    ).pipe(map((data) => data.session_id));
  }, []);

  const createLoginSession$ = useCallback(
    (username, password, requestToken) => {
      return fromFetch(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.REACT_APP_MOVIES_API_KEY}`,
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
      ).pipe(
        switchMap((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return of("ERROR");
            }
        }),
        mergeMap((data) => {
          if (data === "ERROR") {
            return generateSessionId$(data);
          } else {
            return generateSessionId$(data.request_token);
          }
        }),
        catchError(() => of("ERROR"))
      );
    },
    [generateSessionId$]
  );

  const createSession$ = useCallback(
    (username, password) => {
      return fromFetch(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_MOVIES_API_KEY}`,
        { selector: (response) => response.json() }
      ).pipe(
        mergeMap((data) =>
          createLoginSession$(username, password, data.request_token)
        )
      );
    },
    [createLoginSession$]
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
      ).subscribe((data) => {
        sessionStorage.removeItem("sessionId");
        console.log(data.success);
      }),
    []
  );

  return {
    createSession$,
    deleteSession,
  };
};

export default useSessionId;
