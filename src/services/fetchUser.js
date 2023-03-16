import { fromFetch } from "rxjs/fetch";
import { switchMap, map } from "rxjs/operators";
import { getApiAuthPath, getPostConfig } from "./api-config";

/* Use RxJS observables for getting a session id using a verified user and password in tmdb */

/* Returns a session id based on a login token (from getLoginToken$ observable) */
const generateSessionId$ = (requestToken) => {
  return fromFetch(
    `${getApiAuthPath()}session/new?api_key=${
      process.env.REACT_APP_MOVIES_API_KEY
    }`,
    {
      ...getPostConfig("POST"),
      body: JSON.stringify({
        request_token: requestToken,
      }),
      selector: (response) => response.json(),
    }
  ).pipe(map((data) => data.session_id));
};

/* Subscribes to generateSessionId observable with it's own observable result */
const getLoginToken$ = (username, password, requestToken) => {
  return fromFetch(
    `${getApiAuthPath()}token/validate_with_login?api_key=${
      process.env.REACT_APP_MOVIES_API_KEY
    }`,
    {
      ...getPostConfig("POST"),
      body: JSON.stringify({
        request_token: requestToken,
        username: username,
        password: password,
      }),
      selector: (response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      },
    }
  ).pipe(switchMap((data) => generateSessionId$(data.request_token)));
};

/* Returns the request token as observable */
const generateToken$ = fromFetch(
  `${getApiAuthPath()}token/new?api_key=${
    process.env.REACT_APP_MOVIES_API_KEY
  }`,
  { selector: (response) => response.json() }
).pipe(map((data) => data.request_token));

// EXPORT

/* Get a session id, based on other observable subscriptions */
export const getSessionId$ = (username, password) => {
  return generateToken$.pipe(
    switchMap((requestToken) =>
      getLoginToken$(username, password, requestToken)
    )
  );
};

/* Deletes a session and removes it from the session storage */
export const deleteSession = (sessionId) => {
  const subscription = fromFetch(
    `${getApiAuthPath()}session?api_key=${
      process.env.REACT_APP_MOVIES_API_KEY
    }`,
    {
      ...getPostConfig("DELETE"),
      body: JSON.stringify({
        session_id: sessionId,
      }),
      selector: (response) => response.json(),
    }
  ).subscribe({
    next: (data) => {
      sessionStorage.removeItem("sessionId");
      console.log(data.success);
    },
    error: () => {},
    complete: () => {
      subscription.unsubscribe();
    },
  });
};
