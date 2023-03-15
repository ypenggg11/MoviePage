import { useReducer, useEffect, useContext } from "react";
import AuthContext from "../store/auth-context";

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

const useAuthForm = () => {
  const authContext = useContext(AuthContext);

  const [authState, dispatchAuth] = useReducer(authReducer, {
    username: "",
    password: "",
    isUsernameValid: true,
    isPasswordValid: true,
    isAuthValid: false,
  });

  const { username, password, isAuthValid } = authState;

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

  const usernameChangeHandler = (event) => {
    dispatchAuth({ type: "usernameBinding", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchAuth({ type: "passwordBinding", value: event.target.value });
  };

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
