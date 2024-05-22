import {
  Box,
  Divider,
  List,
  ListItemButton,
  // ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

export const NavBar = ({ menuOptions }) => {
  return (
    <Box sx={{ width: "250px", height: "100%" }}>
      <Stack alignItems="center" sx={{ marginY: "10px" }}>
        <AccountCircleIcon color="primary" fontSize="large" />
        <Typography variant="h6">Perfil</Typography>
        <Typography variant="h8">Auditor</Typography>
      </Stack>

      <Divider />
      <List>
        <nav>
          {menuOptions.map((e) => {
            return (
              <ListItemButton component={Link} to={"/" + e.route} key={e.route}>
                {e.menuType}
              </ListItemButton>
            );
          })}
        </nav>
      </List>
      <Divider />
      <List>
        <ListItemButton>Perfil</ListItemButton>
        <ListItemButton>Configuraciones</ListItemButton>
        <ListItemButton>Cerrar sesión</ListItemButton>
      </List>
    </Box>
  );
};
