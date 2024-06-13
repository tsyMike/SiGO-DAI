import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import { ActivitiesManagement } from "./pages/admin-pages/ActivitiesManagement";
import { UsersManagement } from "./pages/admin-pages/UsersManagement";
import { AssignedActivities } from "./pages/auditor-pages/AssignedActivities";
import { AssignedRecomsManagement } from "./pages/auditor-pages/AssignedRecomsManagement";
const App = () => {
  return (
    <AuthProvider>
      <Box sx={{ padding: "2vw" }}>
        <Routes>
          <Route element={<Login />} path="*" />
          <Route element={<Login />} path="/" />
          <Route
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
            path="/home"
          />
          <Route
            element={
              <ProtectedRoute>
                <ActivitiesManagement />
              </ProtectedRoute>
            }
            path="/gestion-actividades"
          />
          <Route
            element={
              <ProtectedRoute>
                <UsersManagement />
              </ProtectedRoute>
            }
            path="/gestion-usuarios"
          />
          <Route
            element={
              <ProtectedRoute>
                <AssignedActivities />
              </ProtectedRoute>
            }
            path="/actividades-asignadas"
          />
          <Route
            element={
              <ProtectedRoute>
                <AssignedRecomsManagement />
              </ProtectedRoute>
            }
            path="/gestion-recomendaciones"
          />
        </Routes>
      </Box>
    </AuthProvider>
  );
};

export default App;
