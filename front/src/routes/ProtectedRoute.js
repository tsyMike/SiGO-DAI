import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { NavBar } from "../components/NavBar";
import { Grid } from "@mui/material";
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <NavBar user={user} />
      <Grid
        container
        spacing={2}
        sx={{
          paddingY: "2.5vh",
        }}
        alignItems="center"
      >
        {children}
      </Grid>
    </>
  );
};

export default ProtectedRoute;
