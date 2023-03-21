import {
  Button,
  Card,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import useAuthForm from "../../hooks/useAuthForm";

/* Renders a login form */
const LoginForm = ({ onCloseForm }) => {
  const {
    authState,
    usernameChangeHandler,
    passwordChangeHandler,
    loginHandler,
  } = useAuthForm();

  const { username, password, isUsernameValid, isPasswordValid } = authState;

  const isSubmitEnabled =
    username.trim().length > 0 && password.trim().length > 0;

  return (
    <Card className='auth-form'>
      <DialogTitle>
        Login
        <span className='auth-form__sign-up'>
          or
          <a
            href='https://www.themoviedb.org/signup'
            target='_blank'
            rel='noreferrer'
          >
            Sign up
          </a>
        </span>
      </DialogTitle>
      <DialogContent className='auth-form__content'>
        {/* Username input */}
        <TextField
          id='username_field'
          label='Username'
          margin='normal'
          value={username}
          onChange={usernameChangeHandler}
          error={!isUsernameValid}
          variant='standard'
          helperText={
            !isUsernameValid ? "Should be at least 5 characters*" : ""
          }
          sx={{ color: "black" }}
          className='auth-form__text-field--username'
        />
        {/* Password input */}
        <TextField
          id='password_field'
          label='Password'
          type='password'
          margin='normal'
          value={password}
          onChange={passwordChangeHandler}
          error={!isPasswordValid}
          variant='standard'
          helperText={
            !isPasswordValid ? "Should be at least 8 characters*" : ""
          }
          className='auth-form__text-field--password'
        />
      </DialogContent>
      <DialogActions>
        {/* Cancel button */}
        <Button onClick={onCloseForm} sx={{ color: "black" }}>
          Cancel
        </Button>
        {/* Login button */}
        <Button
          onClick={loginHandler}
          disabled={!isSubmitEnabled}
          sx={{ color: "black" }}
        >
          Login
        </Button>
      </DialogActions>
    </Card>
  );
};

export default LoginForm;
