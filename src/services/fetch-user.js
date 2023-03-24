import { fromFetch } from "rxjs/fetch";
import { switchMap, map } from "rxjs/operators";
import {
  deleteSession,
  getConfig,
  getLoginToken,
  getRequestToken,
  getSessionId,
} from "./api-requests";

/* Use RxJS observables for getting a session id using a verified user and password in tmdb */

/* Returns a session id based on a login token (from getLoginToken$ observable) */
const generateSessionId$ = (requestToken) => {
  return fromFetch(getSessionId(), {
    ...getConfig("POST", {
      request_token: requestToken,
    }),
    selector: (response) => response.json(),
  }).pipe(map((data) => data.session_id));
};

/* Subscribes to generateSessionId observable with it's own observable result */
const generateLoginToken$ = (username, password, requestToken) => {
  return fromFetch(getLoginToken(), {
    ...getConfig("POST", {
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
  }).pipe(switchMap((data) => generateSessionId$(data.request_token)));
};

/* Returns the request token as observable */
const generateToken$ = fromFetch(getRequestToken(), {
  selector: (response) => response.json(),
}).pipe(map((data) => data.request_token));

// EXPORT

/* Get a session id, based on other observable subscriptions */
export const getSessionId$ = (username, password) => {
  return generateToken$.pipe(
    switchMap((requestToken) =>
      generateLoginToken$(username, password, requestToken)
    )
  );
};

/* Deletes a session and removes it from the session storage */
export const deleteSessionId = (sessionId) => {
  const subscription = fromFetch(deleteSession(), {
    ...getConfig("DELETE", {
      session_id: sessionId,
    }),
    selector: (response) => response.json(),
  }).subscribe({
    next: (data) => {
      console.log(data.success);
    },
    error: () => {},
    complete: () => {
      subscription.unsubscribe();
    },
  });
};
