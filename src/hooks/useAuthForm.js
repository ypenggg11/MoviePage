import { useReducer, useEffect, useContext } from "react";
import AuthContext from "../store/auth-context";

/* Reducer function to dispatch, with two way binding and validate actions */
const authReducer = (state, action) => {
  if (action.type === "usernameBinding") {
    return {
      ...state,
      username: action.value,
      isUsernameValid: true,
    };
  }

  if (action.type === "passwordBinding") {
    return {
      ...state,
      password: action.value,
      isPasswordValid: true,
    };
  }

  if (action.type === "validate") {
    let result = { ...state };

    if (state.username.trim().length < 5) {
      result = { ...result, isUsernameValid: false };
    }

    if (state.password.trim().length < 8) {
      result = { ...result, isPasswordValid: false };
    }

    if (result.isUsernameValid && result.isPasswordValid) {
      result = { ...result, isAuthValid: true };
    }

    return result;
  }

  return {
    username: "",
    password: "",
    isUsernameValid: true,
    isPasswordValid: true,
    isAuthValid: false,
  };
};

/* Custom hook that manages the authentication form */
const useAuthForm = () => {
  const authContext = useContext(AuthContext);

  const [authState, dispatchAuth] = useReducer(authReducer, {
    username: "",
    password: "",
    isUsernameValid: true,
    isPasswordValid: true,
    isAuthValid: false,
  });

  /* Destructure the attributes needed by the useEffect as dependency */
  const { username, password, isAuthValid } = authState;

  /* Use a timeOut debounce to check if the credentials was correct and login */
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (isAuthValid) {
        authContext.login(username, password);
      }
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [isAuthValid, username, password, authContext]);

  /* Update the username state value on change */
  const usernameChangeHandler = (event) => {
    dispatchAuth({ type: "usernameBinding", value: event.target.value });
  };

  /* Update the password state value on change */
  const passwordChangeHandler = (event) => {
    dispatchAuth({ type: "passwordBinding", value: event.target.value });
  };

  /* Validate the username && password states */
  const loginHandler = () => {
    dispatchAuth({ type: "validate" });
  };

  return {
    authState,
    usernameChangeHandler,
    passwordChangeHandler,
    loginHandler,
  };
};

export default useAuthForm;
