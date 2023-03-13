import {
  Button,
  Card,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useContext, useReducer, useState } from "react";
import AuthContext from "../../store/auth-context";

const authReducer = (state, action) => {
  if (action.type === "username") {
    if (action.value.length === 0) {
      return {
        ...state,
        username: action.value,
        isUsernameValid: false,
      };
    } else {
      return {
        ...state,
        username: action.value,
        isUsernameValid: true,
      };
    }
  }

  if (action.type === "password") {
    if (action.value.length < 8) {
      return {
        ...state,
        password: action.value,
        isPasswordValid: false,
      };
    } else {
      return {
        ...state,
        password: action.value,
        isPasswordValid: true,
      };
    }
  }

  return {
    username: "",
    password: "",
    isUsernameValid: false,
    isPasswordValid: false,
  };
};

const LoginForm = ({ onCloseForm }) => {
  const authContext = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const [authState, dispatchAuth] = useReducer(authReducer, {
    username: "",
    password: "",
    isUsernameValid: false,
    isPasswordValid: false,
  });

  const { isUsernameValid, isPasswordValid } = authState;

  const loginChangeHandler = () => {
    setIsLogin(true);
  };

  const registerChangeHandler = () => {
    setIsLogin(false);
  };

  const usernameChangeHandler = (event) => {
    dispatchAuth({ type: "username", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchAuth({ type: "password", value: event.target.value });
  };

  const loginHandler = () => {
    if (isLogin) {
      authContext.login(authState.username, authState.password);
    } else {
      authContext.register(authState.username, authState.password);
    }
  };

  return (
    <Card className='auth-form'>
      <DialogTitle className='auth-form__access-types'>
        <span
          className='auth-form__access-types--login'
          onClick={loginChangeHandler}
        >
          Login
        </span>{" "}
        /{" "}
        <span
          className='auth-form__access-types--register'
          onClick={registerChangeHandler}
        >
          Register
        </span>
      </DialogTitle>
      <DialogContent className='auth-form__content'>
        <TextField
          label='Username'
          margin='normal'
          value={authState.username}
          onChange={usernameChangeHandler}
          error={!authState.isUsernameValid}
          variant='standard'
          helperText={!isUsernameValid ? "Required*" : ""}
        />
        <TextField
          label='Password'
          type='password'
          margin='normal'
          value={authState.password}
          onChange={passwordChangeHandler}
          error={!authState.isPasswordValid}
          variant='standard'
          helperText={!isPasswordValid ? "Should be at least 8 characters*" : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseForm}>Cancel</Button>
        <Button
          onClick={loginHandler}
          disabled={!(isUsernameValid && isPasswordValid)}
        >
          {isLogin ? "Login" : "Register"}
        </Button>
      </DialogActions>
    </Card>
  );
};

export default LoginForm;
