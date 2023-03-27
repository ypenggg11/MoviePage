import React from "react";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

/* Used in ErrorBoundary components as fallback component */
export const ErrorFallbackComponent = () => {
  const navigate = useNavigate();

  /* Shows an error alert and a reload button */
  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
        height: "100vh",
      }}
    >
      <Alert severity='error'>An error has occurred!</Alert>
      <Button
        onClick={() => {
          navigate(0);
        }}
        sx={{ marginTop: "20px" }}
        variant='outlined'
        color='error'
      >
        Reload
      </Button>
    </div>
  );
};