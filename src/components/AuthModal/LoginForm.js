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
        <DialogTitle>Login</DialogTitle>
        <DialogContent className='auth-form__content'>
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
            sx={{color:"black"}}
          />
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseForm} sx={{color:"black"}}>Cancel</Button>
          <Button onClick={loginHandler} disabled={!isSubmitEnabled} sx={{color:"black"}}>
            Login
          </Button>
        </DialogActions>
    </Card>
  );
};

export default LoginForm;
