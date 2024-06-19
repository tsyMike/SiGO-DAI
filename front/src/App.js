import "chart.js/auto";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import { ActivitiesManagement } from "./pages/admin-pages/ActivitiesManagement";
import { UsersManagement } from "./pages/admin-pages/UsersManagement";
import { AssignedActivitiesManagement } from "./pages/auditor-pages/AssignedActivitiesManagement";
import { AssignedRecomsManagement } from "./pages/auditor-pages/AssignedRecomsManagement";
import { RecomsManagement } from "./pages/admin-pages/RecomsManagement";
const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Login />} path="*" />
        <Route element={<Login />} path="/" />
        <Route
          element={
            <ProtectedRoute menuArray={["admin", "Auditor", "Supervisor"]}>
              <HomePage />
            </ProtectedRoute>
          }
          path="/home"
        />
        {/* Rutas Adminsitrador */}
        <Route
          element={
            <ProtectedRoute menuArray={["admin"]}>
              <ActivitiesManagement />
            </ProtectedRoute>
          }
          path="/gestion-actividades"
        />
        <Route
          element={
            <ProtectedRoute menuArray={["admin"]}>
              <UsersManagement />
            </ProtectedRoute>
          }
          path="/gestion-usuarios"
        />
        <Route
          element={
            <ProtectedRoute menuArray={["admin"]}>
              <RecomsManagement />
            </ProtectedRoute>
          }
          path="/gestion-recomendaciones"
        />
        {/* Rutas Auditor */}
        <Route
          element={
            <ProtectedRoute menuArray={["Auditor"]}>
              <AssignedActivitiesManagement />
            </ProtectedRoute>
          }
          path="/gestion-actividades-asignadas"
        />
        <Route
          element={
            <ProtectedRoute menuArray={["Auditor"]}>
              <AssignedRecomsManagement />
            </ProtectedRoute>
          }
          path="/gestion-recomendaciones-asignadas"
        />
        {/* Rutas Unidad auditada */}
        <Route
          element={
            <ProtectedRoute menuArray={["Unidad auditada"]}>
            </ProtectedRoute>
          }
          path="/actividades-asignadas"
        />
        <Route
          element={
            <ProtectedRoute menuArray={["Unidad auditada"]}>
            </ProtectedRoute>
          }
          path="/recomendaciones-asignadas"
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
