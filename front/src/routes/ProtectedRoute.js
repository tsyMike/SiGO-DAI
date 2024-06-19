import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { NavBar } from "../components/NavBar";
import { Container, Grid, IconButton, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
const ProtectedRoute = ({ menuArray, children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const [type, setType] = useState("");
  console.log(user)
  useEffect(() => {
    if (isAuthenticated) {
      const { type } = user;
      setType(type);
    }
  }, [type, user, isAuthenticated]);
  console.log(type)
  console.log(menuArray.includes(type))
  return isAuthenticated ? (
    menuArray.includes(type) ? (
      <>
        <Stack direction="row">
          <NavBar logout={logout} user={user} />
          <IconButton component={Link} to="/home">
            <HomeIcon fontSize="large" />
          </IconButton>
        </Stack>
        <Container>
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
        </Container>
      </>
    ) : (
      <>Usted no tiene acceso</>
    )
  ) : (
    <>Espere...</>
  );
};

export default ProtectedRoute;
