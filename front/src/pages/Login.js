import React, { useState } from "react";
import axios from "../api/axiosConfig";

import { useAuth } from "../contexts/AuthContext";
import { Container, Button, Stack, TextField, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", { username, password });
      let { id_user, name, last_name, type } = response.data;
      if (type === "user") {
        const auditedUnitResponse = await axios.get(
          "/audited-units/" + id_user
        );
        const auditedUnit = auditedUnitResponse.data;
        const auditorResponse = await axios.get("/auditors/" + id_user);
        const auditor = auditorResponse.data;

        if (auditedUnit.length !== 0) {
          type = "Unidad auditada";
        } else if (auditor.length !== 0) {
          type = "Auditor";
        }
      }
      localStorage.setItem(
        "userData",
        JSON.stringify({ id_user, name, last_name, type })
      );
      login({ id_user, name, last_name, type });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Container>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {user && <Navigate to="/home" replace={true} />}
        <Stack alignItems="center" spacing={2}>
          <Typography variant="h3">SiGO - DAI</Typography>
          <Typography variant="h5">Iniciar sesión</Typography>
          <TextField
            label="Nombre de usuario"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            // component={Link}
            // to="/home"
            type="submit"
            variant="contained"
            color="primary"
            // disabled={isLoading}
          >
            Iniciar Sesión
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Login;
