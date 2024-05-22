import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Box, Container, Drawer, IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavBar } from "./components/NavBar";
import AssignActivities from "./pages/AssignActivities";
const userSwitch = [
  {
    userName: "userName",
    userType: "Auditor",
    menusAllowed: [
      { menuType: "Actividades Asignadas", route: "actividades" },
      { menuType: "Control de tiempos", route: "tiempos" },
      { menuType: "Memos", route: "memos" },
    ],
    activities: [
      {
        id: 1,
        type: "Auditoria especial",
        name: "Actividad 1",
        dueDate: "15/12/2023",
        assignedDate: "5/12/2023",
      },
      {
        id: 2,
        type: "Seguimiento",
        name: "Actividad 2",
        dueDate: "12/12/2023",
        assignedDate: "5/12/2023",
      },
      {
        id: 3,
        type: "Seguimiento",
        name: "Actividad 3",
        dueDate: "17/12/2023",
        assignedDate: "5/12/2023",
      },
    ],
  },
  {
    userName: "userName",
    userType: "Jefatura",
    menusAllowed: [
      { menuType: "Asignar actividades", route: "asignar_actividades" },
      {
        menuType: "Registrar actividades de auditoría",
        route: "registrar_actividades",
      },
      { menuType: "Seguimiento a actividades", route: "seguimiento" },
    ],
  },
  {
    userName: "userName",
    userType: "Admin",
    menusAllowed: [
      { menuType: "", route: "" },
      { menuType: "", route: "" },
      { menuType: "", route: "" },
    ],
  },
  {
    userName: "userName",
    userType: "UAs",
    menusAllowed: [
      { menuType: "", route: "" },
      { menuType: "", route: "" },
      { menuType: "", route: "" },
    ],
  },
];
const App = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Box sx={{ padding: "2vw" }}>
      <Stack spacing={2}>
        <Box sx={{ display: "fixed" }}>
          <Drawer
            open={openDrawer}
            onClose={() => {
              setOpenDrawer(false);
            }}
          >
            <NavBar menuOptions={userSwitch[1].menusAllowed} />
          </Drawer>
          <IconButton
            onClick={() => {
              setOpenDrawer(true);
            }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Box>
        <Container
          sx={{
            borderColor: "gray",
            borderStyle: "solid",
            borderRadius: "15px",
            borderWidth: "1px",
            paddingY: "2.5vh",
          }}
        >
          <Routes>
            {/* <Route element={<Login />} path="/" /> */}
            {/* <Route
              element={
                <AssignedActivities activities={userSwitch[1].activities} />
              }
              path="/actividades"
            /> */}
            {/* <Route element={<ListedMemos />} path="/memos" />
            <Route element={<TimeControl />} path="/tiempos" />
            <Route element={<Login />} path="/login" /> */}
            {/* // jefatura pages */}
            <Route element={<AssignActivities />} path="/asignar_actividades" />
          </Routes>
        </Container>
      </Stack>
    </Box>
  );
};

export default App;
