import {
  Box,
  Divider,
  List,
  ListItemButton,
  Stack,
  Typography,
  Drawer,
  IconButton,
} from "@mui/material";

import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";

export const NavBar = ({ user, logout }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { name, type } = user;
  return (
    <Box sx={{ display: "fixed" }}>
      <Drawer
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        <Box sx={{ width: "250px", height: "100%" }}>
          <Stack spacing={1} alignItems="center" sx={{ marginY: "10px" }}>
            <AccountCircleIcon color="primary" fontSize="large" />
            <Typography textAlign="center" variant="h6">
              {name}
            </Typography>
            <Typography variant="h8">{type}</Typography>
          </Stack>
          <Divider />
          <List>
            <nav>
              {type === "admin" ? (
                <>
                  <ListItemButton component={Link} to="/gestion-usuarios">
                    Gestión de usuarios
                  </ListItemButton>
                  <ListItemButton component={Link} to="/gestion-actividades">
                    Gestión de actividades de auditoría
                  </ListItemButton>
                  <ListItemButton
                    component={Link}
                    to="/gestion-recomendaciones"
                  >
                    Seguimiento al cumplimiento de recomendaciones de control
                    interno
                  </ListItemButton>
                </>
              ) : type === "Auditor" ? (
                <>
                  <ListItemButton component={Link} to="/gestion-actividades-asignadas">
                    Actividades asignadas
                  </ListItemButton>
                  <ListItemButton
                    component={Link}
                    to="/gestion-recomendaciones-asignadas"
                  >
                    Seguimiento al cumplimiento de recomendaciones de control
                    interno
                  </ListItemButton>
                </>
              ) : type === "Unidad auditada" ? (
                <>
                  <ListItemButton component={Link} to="/actividades-asignadas">
                    Auditorías en proceso
                  </ListItemButton>
                  <ListItemButton
                    component={Link}
                    to="/recomendaciones-asignadas"
                  >
                    Recomendaciones de control interno
                  </ListItemButton>
                </>
              ) : (
                <></>
              )}
            </nav>
          </List>
          <Divider />
          <List>
            <ListItemButton>Perfil</ListItemButton>
            <ListItemButton>Configuraciones</ListItemButton>
            <ListItemButton component={Link} to="/" onClick={logout}>
              Cerrar sesión
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      <IconButton
        onClick={() => {
          setOpenDrawer(true);
        }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};
